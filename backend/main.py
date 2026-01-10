from fastapi import FastAPI
import sqlite3

app = FastAPI()
DB_PATH = "dashboard.db"

# Health check endpoint
@app.get("/health")
def health():
    return {"status": "ok"}

# Endpoint to fetch orders (first 50 rows for testing)
@app.get("/orders")
def get_orders():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # returns dict-like rows
    cur = conn.cursor()
    cur.execute("SELECT * FROM orders LIMIT 50")  # test fetch
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]
