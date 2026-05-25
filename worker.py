import os
import time
import json
import boto3
import subprocess
from dotenv import load_dotenv

# Load local environment variables from .env.local
load_dotenv(".env.local")

# Initialize AWS clients
sqs = boto3.client(
    "sqs",
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)
s3 = boto3.client(
    "s3",
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

QUEUE_URL = None
BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")

def get_queue_url():
    global QUEUE_URL
    if not QUEUE_URL:
        response = sqs.get_queue_url(QueueName=os.getenv("AWS_SQS_QUEUE_NAME"))
        QUEUE_URL = response["QueueUrl"]
    return QUEUE_URL

def process_job(job_id, files):
    print(f"\n--- Starting Job: {job_id} ---")
    
    # 1. Create a local working directory
    work_dir = os.path.join(os.getcwd(), "tmp", job_id)
    os.makedirs(work_dir, exist_ok=True)
    
    # 2. Download files from S3
    print(f"Downloading {len(files)} files from S3...")
    for file_key in files:
        filename = os.path.basename(file_key)
        local_path = os.path.join(work_dir, filename)
        s3.download_file(BUCKET_NAME, file_key, local_path)
        print(f"  Downloaded {filename}")
    
    # 3. Run panX pipeline (Mocking execution for now to test flow)
    print("Executing panX bioinformatics pipeline...")
    # Here we would call the actual panX run_pipeline.py script
    # subprocess.run(["python", "../pangenome analysis/run_pipeline.py", "-d", work_dir], check=True)
    time.sleep(5)  # Simulating compute time
    
    # 4. Upload results back to S3
    print("Pipeline complete. Uploading visualization dashboard to S3...")
    # In reality, this would upload the panX 'public/' output folder.
    # For now, we simulate success by creating a simple status file.
    status_file = os.path.join(work_dir, "status.json")
    with open(status_file, "w") as f:
        json.dump({"jobId": job_id, "status": "completed"}, f)
    
    s3.upload_file(status_file, BUCKET_NAME, f"results/{job_id}/status.json")
    print(f"--- Job {job_id} Completed successfully! ---\n")

def poll_queue():
    queue_url = get_queue_url()
    print(f"Polling SQS queue for jobs... ({os.getenv('AWS_SQS_QUEUE_NAME')})")
    
    while True:
        try:
            response = sqs.receive_message(
                QueueUrl=queue_url,
                MaxNumberOfMessages=1,
                WaitTimeSeconds=10, # Long polling
            )
            
            if "Messages" in response:
                for message in response["Messages"]:
                    body = json.loads(message["Body"])
                    job_id = body.get("jobId")
                    files = body.get("files", [])
                    
                    if job_id and files:
                        process_job(job_id, files)
                    
                    # Delete the message from the queue so it isn't processed again
                    sqs.delete_message(
                        QueueUrl=queue_url,
                        ReceiptHandle=message["ReceiptHandle"]
                    )
            else:
                print(".", end="", flush=True) # Print dots to show it's alive
                
        except Exception as e:
            print(f"Error polling queue: {e}")
            time.sleep(5)

if __name__ == "__main__":
    try:
        poll_queue()
    except KeyboardInterrupt:
        print("\nWorker shutting down.")
