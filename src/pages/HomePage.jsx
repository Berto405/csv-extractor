import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Zap, Download } from "lucide-react";
import FileUpload from "../components/FileUpload";
import ColumnSelector from "../components/ColumnSelector";
import Header from "../components/Header";

const HomePage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [csvData, setCsvData] = useState([]); // Store parsed CSV rows
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file) => {
    setIsProcessing(true);
    setUploadedFile(file);

    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        complete: (results) => {
          const header = results.meta.fields || [];
          setColumns(header);
          setCsvData(results.data || []);
          setIsProcessing(false);
        },
        error: () => {
          setColumns([]);
          setCsvData([]);
          setIsProcessing(false);
        },
      });
    } else {
      // fallback for non-CSV files (e.g., Excel) or if no file
      setColumns([]);
      setCsvData([]);
      setIsProcessing(false);
    }
  };

  const handleDownload = (selectedColumns) => {
    if (!csvData.length || !selectedColumns.length) return;

    // Build CSV rows: header + filtered data
    const headerRow = selectedColumns.join(",");
    const dataRows = csvData.map((row) =>
      selectedColumns
        .map((col) => {
          // Escape quotes and commas
          const val =
            row[col] !== undefined && row[col] !== null ? String(row[col]) : "";
          return '"' + val.replace(/"/g, '""') + '"';
        })
        .join(",")
    );
    const csvContent = [headerRow, ...dataRows].join("\n");

    // Add UTF-8 BOM to preserve special characters in Excel and other apps
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `extracted_${uploadedFile?.name || "data"}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setColumns([]);
    setCsvData([]);
    setIsProcessing(false);
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 rounded-3xl -z-10"></div>
          <div className="py-16 px-8">
            <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 text-foreground">
              Transform Your Data
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Upload CSV or Excel files, extract specific columns, and download
              clean data in seconds. Professional-grade data processing made
              simple.
            </p>
          </div>
        </div>

        {!uploadedFile && (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Process files instantly with our optimized engine
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Your data never leaves your browser
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Easy Export</h3>
                <p className="text-sm text-muted-foreground">
                  Download processed files in CSV format
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-8">
          {!uploadedFile ? (
            <FileUpload onFileSelect={handleFileSelect} />
          ) : (
            <>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={resetUpload}
                  className="gap-2 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Upload Different File
                </Button>
              </div>

              {isProcessing ? (
                <div className="text-center py-16">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent animate-pulse"></div>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Processing your file...
                  </p>
                </div>
              ) : (
                <ColumnSelector columns={columns} onDownload={handleDownload} />
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 mt-24 py-12 bg-card/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <a
              href="#privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
            <a
              href="https://github.com/Berto405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-muted-foreground">
            &copy; 2024 CSV Extractor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
