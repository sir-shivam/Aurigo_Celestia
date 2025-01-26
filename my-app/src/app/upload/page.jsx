"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileUp, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { read, utils } from "xlsx"
import processAndSendSpreadsheet from "@/components/ui/sheets"



export default function BOQUpload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()
    const accessToken = 'ya29.a0AXeO80Rb8Ne9PEBEdmShYpHZv_df331PonUCJf48z6vrFUDEbjamkDDZ7hEfFz0iv6gaDVyuWzAGYGV4to3UCyEGy2CntZfggWmiDbMVhIBpFSbJLWQSukPDg7gtD_k1pCZbzkrfIGI0LX14Csy04GP5E7yeuGtKpBIcpzUEaCgYKAbESARESFQHGX2MiLQBl2NbLIoCZrRx-onz1hw0175';
    // const accessToken = 'ya29.a0AXeO80TGY5znRKKsloG2Cc2DyZLG3LFbxI9-AvXlF9Kq-6CE8pBz8X2O-diOeD2noSninA9SO6is7W5i2l13UNKvIrjUPQfQwxuQ1ty9tKXGS5N4_4uddGfQTYvM9FQ1PzqbBZvsfBDcYcbYAaxLxKrihSmPrTeYy_LLIQ0aaCgYKAfISARESFQHGX2MiW5tP8XF9qblEgg3bBmXZ1Q0175';
    const spreadsheetId1 = '1ipmTWyZV8XcW869dUmuMhvHTmndvx3y55Tv4odua-mI';
    const spreadsheetId2 = '10i5hecSe3cjczgWbGSoiTfgSAGw56RdqPjz9maNijUA';
  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    

    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const reader = new FileReader();

    // Read the file as an ArrayBuffer
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result); // Convert file data to binary
      const workbook = read(data, { type: "array" }); // Parse the binary data

      // Get the first sheet's data
      const sheetName = workbook.SheetNames[0]; // First sheet name
      const sheet = workbook.Sheets[sheetName]; // First sheet content

      // Convert sheet to CSV
      const csvData = utils.sheet_to_csv(sheet); // Convert sheet to CSV
      console.log("CSV Data:", csvData); // Log the CSV output (optional)

      // Send CSV data to backend
      await sendToBackend(csvData);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsArrayBuffer(file); // Read file as binary data
  };
  const sendToBackend = async (csvData) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "text/csv", // Set content type to CSV
        },
        body: csvData, // Send the CSV data
      });

      const result = await response.json();
      if (response.ok) {
        alert("CSV data sent successfully!");
        console.log("Response from server:", result);
      } else {
        alert("Failed to send CSV data: " + result.error);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("An error occurred while sending data.");
    }
  };
  
  async function fetchSheetCSV(accessToken, spreadsheetId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
  
      // More detailed error logging
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Google Sheets API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorBody
        });
        throw new Error(`Google Sheets API error: ${response.status} - ${errorBody}`);
      }
  
      const data = await response.json();
      
      // Validate data
      if (!data.values || data.values.length === 0) {
        console.warn('No data found in the spreadsheet');
        return '';
      }
  
      // Convert values to CSV with more robust handling
      const csvText = data.values.map(row => 
        row.map(cell => 
          `"${String(cell).replace(/"/g, '""')}"` // Escape quotes
        ).join(',')
      ).join('\n');
  
      return csvText;
    } catch (error) {
      console.error('Detailed Fetch Error:', {
        message: error.message,
        stack: error.stack
      });
      throw error; // Re-throw to allow calling function to handle
    }
  }
  
  const sendcsv = async () => {
    try {
      // Fetch the two spreadsheets as CSV
      const csvFile1 = await fetchSheetCSV(accessToken, spreadsheetId1);
      const csvFile2 = await fetchSheetCSV(accessToken, spreadsheetId2);
  
      console.log("CSV File 1:", csvFile1);
      console.log("CSV File 2:", csvFile2);
  
      if (!csvFile1 || !csvFile2) {
        throw new Error("One or both CSV files are empty. Check the spreadsheet data.");
      }
  
      // Prepare the form data
      const formData = new FormData();
      formData.append("file1", new Blob([csvFile1], { type: "text/csv" }), "spreadsheet1.csv");
      formData.append("file2", new Blob([csvFile2], { type: "text/csv" }), "spreadsheet2.csv");
  
      // Send the data to the backend
      const res = await fetch("http://localhost:8080/process", {
        method: "POST",
        body: formData,
      });
  
      // Check the response
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from backend:", errorData);
        throw new Error(errorData.detail || "Server processing error");
      }
  
      const data = await res.json();
      console.log("Server response:", data);
  
      // Handle successful response
    } catch (err) {
      console.error("Error during CSV submission:", err.message);
      // Proper error handling
    }
  };
   

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">BOQ File Upload</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">XLSX or XLS (MAX. 10MB)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden "
                onChange={handleFileChange}
                accept=".xlsx,.xls"
              />
            </label>
          </div>
          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-white"
            >
              <FileUp className="w-5 h-5" />
              <span className="text-sm truncate">{file.name}</span>
            </motion.div>
          )}
          <Button
            // onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          >
            {uploading ? "Uploading..." : "Upload BOQ"}
          </Button>
          <div
            // onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            onClick={sendcsv}
          >
            {uploading ? "Uploading..." : "Upload BOQ"}
          </div>
          {uploading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-center text-sm text-gray-400">Uploading: {uploadProgress}%</p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
    </div>
  )
}


