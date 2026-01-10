import sqlite3
import csv

# Create helper function to parse ratings
def parse_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None


# Connect to SQLite (creates db if not exist)
conn = sqlite3.connect("dashboard.db")
cur = conn.cursor()

# Create table
cur.execute("""
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    restaurant_name TEXT NOT NULL,
    cuisine_type TEXT,
    cost_of_the_order REAL,
    day_of_the_week TEXT,
    rating INTEGER,
    food_preparation_time INTEGER,
    delivery_time INTEGER
)
""")

# Read CSV and insert
with open("../data/food_order.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        cur.execute("""
        INSERT INTO orders (
            order_id, customer_id, restaurant_name, cuisine_type, cost_of_the_order,
            day_of_the_week, rating, food_preparation_time, delivery_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            parse_int(row["order_id"]),
            parse_int(row["customer_id"]),
            row["restaurant_name"],
            row["cuisine_type"] or None,
            float(row["cost_of_the_order"]) if row["cost_of_the_order"] else None,
            row["day_of_the_week"] or None,
            parse_int(row["rating"]),
            parse_int(row["food_preparation_time"]),
            parse_int(row["delivery_time"])
        ))

conn.commit()
conn.close()
print("Database seeded successfully!")