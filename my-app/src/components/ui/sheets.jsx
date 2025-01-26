import axios from "axios";

// Function to fetch spreadsheet data using service account credentials
const fetchSpreadsheetData = async (spreadsheetId, sheetName, credentials) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/133PYbWa_kvdIYWsGlkmSk3MFM7qrBOzarI2r_KLwPdg/values/${sheetName}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${credentials.access_token}`,
      },
    });
    return response.data.values;
  } catch (error) {
    console.error("Error fetching spreadsheet data:", error.message);
    throw error;
  }
};

// Convert data to CSV
const convertToCSV = (data) => {
  return data.map((row) => row.join(",")).join("\n");
};

// Send CSV data to an endpoint
const sendCSVToEndpoint = async (endpoint, csvData) => {
  try {
    // const response = await axios.post(endpoint, csvData, {
    //   headers: {
    //     "Content-Type": "text/csv",
    //   },
    // });
    console.log("Data sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending data:", error.message);
    throw error;
  }
};

// Main function to fetch, convert, and send the data
export const processAndSendSpreadsheet = async () => {
  // Replace with your environment variables or service account details
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const sheetName = "Sheet1";
  const serviceAccountCredentials = { /* Your service account credentials */ };

  try {
    // Step 1: Fetch the spreadsheet data
    const data = await fetchSpreadsheetData(spreadsheetId, sheetName, serviceAccountCredentials);

    // Step 2: Convert the data to CSV
    const csvData = convertToCSV(data);

    // Step 3: Send the CSV data to the endpoint
    await sendCSVToEndpoint("https://your-friend-endpoint.com/api", csvData);

    console.log("Process completed successfully!");
  } catch (error) {
    console.error("Error in process:", error.message);
  }
};

// Run the process (optional)
// processAndSendSpreadsheet();

export default processAndSendSpreadsheet;