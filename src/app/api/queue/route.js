import { SQSClient, SendMessageCommand, GetQueueUrlCommand } from "@aws-sdk/client-sqs";
import { NextResponse } from "next/server";

const sqs = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { jobId, files } = await req.json();
    if (!jobId || !files || !files.length) {
      return NextResponse.json({ error: "Missing jobId or files" }, { status: 400 });
    }

    // First get the queue URL
    const getUrlCommand = new GetQueueUrlCommand({
      QueueName: process.env.AWS_SQS_QUEUE_NAME,
    });
    const { QueueUrl } = await sqs.send(getUrlCommand);

    // Send the message to SQS
    const messageBody = JSON.stringify({
      jobId,
      files,
      timestamp: new Date().toISOString(),
    });

    const sendCommand = new SendMessageCommand({
      QueueUrl,
      MessageBody: messageBody,
    });

    await sqs.send(sendCommand);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SQS error:", error);
    return NextResponse.json({ error: error.message || "Failed to queue job" }, { status: 500 });
  }
}
