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

# Create table: orders
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

cur.execute("DELETE FROM orders;")

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

# Create table: restaurant_summary
cur.execute("""
    CREATE TABLE IF NOT EXISTS restaurant_summary (
        restaurant_name TEXT,
        cuisine_type TEXT,
        avg_rating REAL,
        avg_weekday_rating REAL,
        avg_weekend_rating REAL,
        avg_cost REAL,
        avg_prep_time REAL,
        avg_weekday_prep_time REAL,
        avg_weekend_prep_time REAL,
        higher_rating_day TEXT,
        faster_prep_day TEXT
    );
    """)

cur.execute("DELETE FROM restaurant_summary;")

# Derive restaurant-level summary metrics from order data
cur.execute("""
    INSERT INTO restaurant_summary (
        restaurant_name,
        cuisine_type,
        avg_rating,
        avg_weekday_rating,
        avg_weekend_rating,
        avg_cost,
        avg_prep_time,
        avg_weekday_prep_time,
        avg_weekend_prep_time,
        higher_rating_day,
        faster_prep_day
    )
    WITH stats AS (
        SELECT
            restaurant_name,
            cuisine_type,
            AVG(cost_of_the_order) AS avg_cost,
            AVG(rating) AS avg_rating,
            AVG(food_preparation_time) AS avg_prep_time,
            AVG(CASE WHEN day_of_the_week = 'Weekday' THEN rating END) AS avg_weekday_rating,
            AVG(CASE WHEN day_of_the_week = 'Weekend' THEN rating END) AS avg_weekend_rating,
            AVG(CASE WHEN day_of_the_week = 'Weekday' THEN food_preparation_time END) AS avg_weekday_prep_time,
            AVG(CASE WHEN day_of_the_week = 'Weekend' THEN food_preparation_time END) AS avg_weekend_prep_time,
            CASE
                WHEN COUNT(CASE WHEN day_of_the_week = 'Weekday' THEN 1 END) >= 2
                AND COUNT(CASE WHEN day_of_the_week = 'Weekend' THEN 1 END) >= 2
                AND ABS(
                    AVG(CASE WHEN day_of_the_week = 'Weekday' THEN rating END) -
                    AVG(CASE WHEN day_of_the_week = 'Weekend' THEN rating END)
                ) >= 0.2
                THEN
                    CASE
                        WHEN AVG(CASE WHEN day_of_the_week = 'Weekday' THEN rating END) >
                            AVG(CASE WHEN day_of_the_week = 'Weekend' THEN rating END)
                        THEN 'Weekday'
                        ELSE 'Weekend'
                    END
                ELSE NULL
            END AS higher_rating_day,
            CASE
                WHEN COUNT(CASE WHEN day_of_the_week = 'Weekday' THEN 1 END) >= 2
                AND COUNT(CASE WHEN day_of_the_week = 'Weekend' THEN 1 END) >= 2
                AND ABS(
                    AVG(CASE WHEN day_of_the_week = 'Weekday' THEN food_preparation_time END) -
                    AVG(CASE WHEN day_of_the_week = 'Weekend' THEN food_preparation_time END)
                ) >= 5
                THEN
                    CASE
                        WHEN AVG(CASE WHEN day_of_the_week = 'Weekday' THEN food_preparation_time END) <
                            AVG(CASE WHEN day_of_the_week = 'Weekend' THEN food_preparation_time END)
                        THEN 'Weekday'
                        ELSE 'Weekend'
                    END
                ELSE NULL
            END AS faster_prep_day
        FROM orders
        GROUP BY restaurant_name
    )
    SELECT
        restaurant_name,
        cuisine_type,
        avg_rating,
        avg_weekday_rating,
        avg_weekend_rating,
        avg_cost,
        avg_prep_time,
        avg_weekday_prep_time,
        avg_weekend_prep_time,
        higher_rating_day,
        faster_prep_day
    FROM stats
    WHERE avg_rating >= 3.5;
    """)


conn.commit()
conn.close()
print("Database seeded successfully!")