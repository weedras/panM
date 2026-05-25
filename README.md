# panM: Next-Generation Pangenome Analysis

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Status">
  <img src="https://img.shields.io/badge/License-Proprietary-blue" alt="License">
  <img src="https://img.shields.io/badge/Framework-Next.js%2014-black" alt="Next.js">
</div>

<br />

**panM** is a premium, cloud-based platform designed for rapid bacterial pangenome exploration and visualization. It accelerates the discovery of core and accessory genomes, orthologous gene clusters, and phylogenetic relationships across large microbial cohorts.

## Features

- 🧬 **Rapid Gene Clustering:** Leverage high-speed homology searches (DIAMOND) and robust clustering (MCL) to process dozens of bacterial strains in minutes.
- 🌳 **Interactive Phylogenetic Trees:** Explore evolutionary relationships using dynamic, fully interactive D3.js phylogenetic trees.
- 📊 **Rich Metadata Integration:** Seamlessly map clinical, temporal, and geographical metadata directly onto ancestral nodes for outbreak tracking.
- 🔍 **Sequence Alignment Visualization:** Dive deep into specific core genes with embedded Multiple Sequence Alignment (MSA) viewers.
- 🚀 **Cloud-Native Architecture:** Built on Next.js with a modern, glassmorphism UI for a seamless user experience.

## Quick Start

### Cloud Platform
Visit our live SaaS platform at **[panmxgenome.vercel.app](https://panmxgenome.vercel.app)** to access the demo dataset and upload your own `.gbk` (GenBank) or FASTA files.

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/weedras/panM.git
   cd panM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Input Data Requirements
panM accepts standard GenBank (`.gbk`) files containing both nucleotide sequences and functional annotations (CDS features). Ensure unique strain identifiers are used for file names (e.g., `Strain_A.gbk`).

## Copyright
© 2026 weedras. All Rights Reserved.
This project and its source code are proprietary and closed-source. Unauthorized copying, modification, distribution, or use is strictly prohibited.
