const fetchCSV = async () => {
    try {
      // Replace with your Google Sheets public CSV export link
      const csvUrl = "https://docs.google.com/spreadsheets/1ipmTWyZV8XcW869dUmuMhvHTmndvx3y55Tv4odua-mI/gviz/tq?tqx=out:csv";

  
      // Fetch the CSV file
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }
  
      // Get the CSV text
      const csvText = await response.text();
  
      // Console the raw CSV text
      console.log("Raw CSV Data:\n", csvText);
  
      // Optional: Parse CSV to JSON (if needed)
      const rows = csvText.split("\n").map((row) => row.split(","));
      console.log("Parsed CSV Data as Array of Arrays:\n", rows);
    } catch (error) {
      console.error("Error fetching CSV:", error);
    }
  };
  
  // Call the function
 export default fetchCSV;
  