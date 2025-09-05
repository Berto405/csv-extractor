import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";

const ColumnSelector = ({ columns, onDownload }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnToggle = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const selectAll = () => {
    setSelectedColumns(columns);
  };

  const deselectAll = () => {
    setSelectedColumns([]);
  };

  const handleDownload = () => {
    if (selectedColumns.length > 0) {
      onDownload(selectedColumns);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-balance">
          Select Columns to Extract
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={deselectAll}>
            Deselect All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {columns.map((column) => (
            <div key={column} className="flex items-center space-x-2">
              <Checkbox
                id={column}
                checked={selectedColumns.includes(column)}
                onCheckedChange={() => handleColumnToggle(column)}
              />
              <label
                htmlFor={column}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {column}
              </label>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleDownload}
            disabled={selectedColumns.length === 0}
            className="w-full md:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Selected Columns ({selectedColumns.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColumnSelector;
