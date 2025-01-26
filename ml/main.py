from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
import io
import numpy as np
from sklearn.linear_model import LinearRegression
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from your frontend's domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process")
async def process_files(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    """
    Process two CSV files:
    - file1: Item data for predictions (gov_rate, quantity, item_total, market_cost).
    - file2: Historical data for training (gov_price, bid_price, market_cost).
    """
    try:
        # Ensure both files are CSV
        if not (file1.filename.endswith(".csv") and file2.filename.endswith(".csv")):
            raise HTTPException(status_code=400, detail="Both files must be in CSV format.")

        # Read historical data (file2)
        historical_contents = await file2.read()
        historical_data = pd.read_csv(io.StringIO(historical_contents.decode("utf-8")))

        # Validate historical data columns
        required_historical_columns = ["gov_price", "market_cost", "bid_price"]
        if not all(col in historical_data.columns for col in required_historical_columns):
            raise HTTPException(
                status_code=400,
                detail=f"Historical CSV must contain the following columns: {required_historical_columns}",
            )

        # Train the Linear Regression model
        X_train = historical_data[["gov_price", "market_cost"]]
        y_train = historical_data["bid_price"]
        model = LinearRegression()
        model.fit(X_train, y_train)

        # Read item data (file1)
        item_contents = await file1.read()
        item_data = pd.read_csv(io.StringIO(item_contents.decode("utf-8")))

        # Validate item data columns
        required_item_columns = ["item", "gov_rate", "quantity", "item_total", "market_cost"]
        if not all(col in item_data.columns for col in required_item_columns):
            raise HTTPException(
                status_code=400,
                detail=f"Item CSV must contain the following columns: {required_item_columns}",
            )

        # Fetch the total values for prediction
        total_gov_price = item_data["item_total"].sum()
        total_market_cost = item_data["market_cost"].sum()

        # Predict the total bid price
        input_data = pd.DataFrame({"gov_price": [total_gov_price], "market_cost": [total_market_cost]})
        predicted_total_bid = model.predict(input_data)[0]

        # Adjust item-level costs
        adjusted_items = []
        for _, row in item_data.iterrows():
            item_name = row["item"]
            gov_rate = row["gov_rate"]
            quantity = row["quantity"]
            gov_price = row["item_total"]
            market_cost = row["market_cost"]

            # Proportional allocation
            proportion = market_cost / total_market_cost
            adjusted_cost = predicted_total_bid * proportion

            # Ensure within ±10% bounds of gov_price
            lower_limit = gov_price * 0.8
            upper_limit = gov_price * 1.2
            adjusted_cost = max(min(adjusted_cost, upper_limit), lower_limit)

            profit = predicted_total_bid - total_market_cost

            adjusted_items.append({
                "Item": item_name,
                "Quantity": quantity,
                "Government Price (Total)": float(gov_price),  # Convert to float
                "Market Cost": float(market_cost),
                "Adjusted Cost": float(adjusted_cost)  # Convert to float
            })

        # Prepare the response
        response_data = {
            "Predicted_Total_Bid": float(predicted_total_bid),
            "Adjusted_Item_Costs": adjusted_items,
            "Total_Government_Price": float(total_gov_price),
            "Total_Market_Cost": float(total_market_cost),
            "Profit": float(profit)
        }

        return JSONResponse(content=response_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the files: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=1000)
