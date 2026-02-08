from app.db import get_db

def safe_round(val, ndigits=2):
    return round(val, ndigits) if val is not None else None

def get_top_rated_restaurants():
    conn = get_db()
    cur = conn.cursor()

    query = """
        SELECT
            restaurant_name,
            avg_rating,
            avg_weekday_rating,
            avg_weekend_rating,
            avg_prep_time,
            avg_weekday_prep_time,
            avg_weekend_prep_time,
            avg_cost,
            cuisine_type,
            higher_rating_day,
            faster_prep_day
        FROM restaurant_summary
        GROUP BY restaurant_name 
        ORDER BY avg_rating DESC
        """

    cur.execute(query)
    rows = cur.fetchall()
    conn.close()

    return [
        {
            "name": r[0], 
            "avg_rating": safe_round(r[1]), 
            "avg_weekday_rating": safe_round(r[2]),
            "avg_weekend_rating": safe_round(r[3]),
            "avg_prep_time": safe_round(r[4], 0), 
            "avg_weekday_prep_time": safe_round(r[5], 0),
            "avg_weekend_prep_time": safe_round(r[6], 0),
            "avg_cost": safe_round(r[7], 0), 
            "cuisine": r[8],
            "higher_rating_day": r[9],
            "faster_prep_day": r[10]
            } for r in rows
    ]
