# CSV Extractor

A modern web application for extracting and processing columns from CSV and Excel files.

## Overview

This application allows users to upload spreadsheet files (CSV, Excel) and select specific columns to extract and download. It features an intuitive drag-and-drop interface, column selection functionality, and a modern UI built with React and Shadcn UI components.

## Features

- **File Upload**:

  - Drag-and-drop interface for CSV and Excel files
  - File type validation
  - Visual feedback during upload process

- **Column Selection**:

  - Interactive UI to select/deselect specific columns
  - Bulk selection options (Select All / Deselect All)
  - Download only the data you need

- **Modern UI/UX**:
  - Clean, responsive design
  - Dark/light mode toggle
  - Visual feedback for all user interactions

## Technology Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Berto405/csv-extractor.git
   cd csv-extractor
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Upload a File**:

   - Drag and drop a CSV or Excel file onto the upload area
   - Alternatively, click "Choose File" to select from your device

2. **Select Columns**:

   - Once a file is uploaded, you'll see a list of available columns
   - Check the columns you want to extract
   - Use "Select All" or "Deselect All" for quick selection

3. **Download Extracted Data**:
   - Click the "Download Selected Columns" button
   - The app will generate a new file with only your selected columns

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the component library
- Lucide for the beautiful icons
