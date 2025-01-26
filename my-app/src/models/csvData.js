// models/csvData.js

// Function to parse CSV string into JSON format
export const parseCSVToJSON = (csvString) => {
    const rows = csvString.split("\n"); // Split CSV into rows
    const headers = rows.shift().split(","); // Extract headers from the first row
  
    return rows.map((row) => {
      const values = row.split(","); // Split each row into values
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || null; // Map header to value
        return obj;
      }, {});
    });
  };

  