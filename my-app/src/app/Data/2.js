import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadForm() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e, fileSetter) => {
    fileSetter(e.target.files[0]);
  };

  const convertExcelToCSV = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    return new Blob([csvData], { type: "text/csv" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    if (!file1 || !file2) {
      setError("Both files must be uploaded.");
      setIsLoading(false);
      return;
    }

    try {
      // Convert Excel files to CSV
      const csvFile1 = await convertExcelToCSV(file1);
      const csvFile2 = await convertExcelToCSV(file2);

      // Prepare FormData
      const formData = new FormData();
      formData.append("file1", csvFile1, file1.name.replace(/\.\w+$/, ".csv"));
      formData.append("file2", csvFile2, file2.name.replace(/\.\w+$/, ".csv"));

      const res = await fetch("http://localhost:8080/process", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Something went wrong.");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Excel Files for Processing</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="file1" className="font-medium">Prediction File (Excel):</label>
          <input
            type="file"
            id="file1"
            accept=".xlsx,.xls"
            onChange={(e) => handleFileChange(e, setFile1)}
            className="mt-2"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="file2" className="font-medium">Training File (Excel):</label>
          <input
            type="file"
            id="file2"
            accept=".xlsx,.xls"
            onChange={(e) => handleFileChange(e, setFile2)}
            className="mt-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg w-full max-w-3xl">
          <h2 className="font-bold text-lg mb-4">Response Data:</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
