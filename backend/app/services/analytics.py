from typing import Optional
from app.db import get_db

def get_top_rated_restaurants(
        cuisine: Optional[str] = None,
        day: Optional[str] = None
    ):
    conn = get_db()
    cur = conn.cursor()

    query = "SELECT restaurant_name, AVG(rating) as avg_rating, AVG(food_preparation_time) as avg_prep_time, AVG(cost_of_the_order) as avg_cost, cuisine_type FROM orders WHERE 1=1"
    params = []

    if cuisine:
        query += " AND cuisine_type = ?"
        params.append(cuisine)
    if day:
        query += " AND day_of_the_week = ?"
        params.append(day)

    query += " GROUP BY restaurant_name HAVING COUNT(*) >= 6 ORDER BY avg_rating DESC LIMIT 50"

    cur.execute(query, params)
    rows = cur.fetchall()
    conn.close()

    return [
        {"name": r[0], "avg_rating": round(r[1], 2), "avg_prep_time": round(r[2]), "avg_cost": round(r[3]), "cuisine": r[4]}
        for r in rows
    ]


def get_fastest_restaurants(
        cuisine: Optional[str] = None,
        day: Optional[str] = None
    ):
    conn = get_db()
    cur = conn.cursor()

    query = "SELECT restaurant_name, AVG(food_preparation_time) as avg_prep_time FROM orders WHERE 1=1"
    params = []

    if cuisine:
        query += " AND cuisine_type = ?"
        params.append(cuisine)
    if day:
        query += " AND day_of_the_week = ?"
        params.append(day)

    query += " GROUP BY restaurant_name HAVING COUNT(*) >= 6 ORDER BY avg_prep_time LIMIT 10"

    cur.execute(query, params)
    rows = cur.fetchall()
    conn.close()

    return [
        {"restaurant": r[0], "fulfilment_time": r[1]}
        for r in rows
    ]