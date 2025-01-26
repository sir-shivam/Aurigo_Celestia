import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbConfig";
import { parseCSVToJSON } from "@/models/csvData";
import { csvJsonfileSchema } from "@/models/csv"; 

export async function POST(req) {
  try {
    const csvData = await req.text(); // Read the raw CSV data from the request body
    const jsonData = parseCSVToJSON(csvData); // Parse CSV to JSON

    // Define the file name (optional: you can fetch it dynamically if needed)
    const fileName = "uploaded_data.csv";

    // Create the document schema for MongoDB
    const document = csvJsonfileSchema(fileName, jsonData);

    // Connect to MongoDB and save the document
    const client = await connectDB;
    const db = client.db("yourDatabaseName"); // Replace with your database name
    const collection = db.collection("csvJsonfiles"); // Replace with your collection name

    // Insert the document into the collection
    await collection.insertOne(document);

    console.log("CSV Data Saved to MongoDB as csvJsonfile:", document);

    return NextResponse.json({ message: "CSV file uploaded and saved successfully!" });
  } catch (error) {
    console.error("Error saving CSV file to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to process CSV file" },
      { status: 500 }
    );
  }
}
