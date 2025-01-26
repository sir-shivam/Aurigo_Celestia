

import React, { useState, useEffect } from 'react';
import { google } from 'googleapis';

const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS); 

const GenerateSvc = () => {
  const [svc, setSvc] = useState('');
  const sheetId = '1ipmTWyZV8XcW869dUmuMhvHTmndvx3y55Tv4odua-mI'; // Extract from your URL
  const range = 'Sheet1!A1:Z'; // Adjust as needed

  useEffect(() => {
    const auth = new google.auth.GoogleAuth({
      keyFile: credentials,
      scopes,
    });

    const sheets = google.sheets({ version: 'v4', auth });

    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    })
    .then(response => {
      const values = response.data.values;
      const generatedSvc = generateSvcFromData(values); 
      setSvc(generatedSvc);
    })
    .catch(err => {
      console.error('Error:', err);
      setSvc('Failed to generate SVC');
    });

  }, []); 

  // Placeholder function for SVC generation (replace with your actual logic)
  const generateSvcFromData = (data) => {
    // Implement your logic to generate SVC from the spreadsheet data here
    // This is a simplified example
    return 'Generated SVC data from ' + JSON.stringify(data); 
  };

  return (
    <div>
      <p>Generated SVC: {svc}</p>
    </div>
  );
};

export default GenerateSvc;