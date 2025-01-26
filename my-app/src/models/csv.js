// models/csvJsonfile.js

export const csvJsonfileSchema = (fileName, jsonData) => ({
    fileName, // The name of the uploaded file
    data: jsonData, // Parsed CSV data in JSON format
    uploadedAt: new Date(), // Timestamp for when the file was uploaded
  });

  