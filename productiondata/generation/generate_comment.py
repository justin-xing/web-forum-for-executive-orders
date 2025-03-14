import csv
import random
from datetime import datetime, timedelta

BASE_DATA_FILE = "base_data.csv"
OUTPUT_FILE = "output_comments.csv"

SAMPLE_MESSAGES = [
    "yay no tariffs",
    "justin trudeau for president",
    "This order will strengthen our borders.",
    "This order will NOT strengthen our borders.",
    "I support this order.",
    "I oppose this order.",
    "What a move!",
    "Unbelievable!",
    "Totally agree.",
    "Disagree completely."
]

def load_executive_order_ids(base_csv: str) -> list:
    order_ids = []
    with open(base_csv, mode="r", encoding="utf-8") as fin:
        reader = csv.DictReader(fin)
        for row in reader:
            order_id = row.get("executive_order_id", "").strip()
            if order_id:
                order_ids.append(order_id)
    return order_ids

def random_timestamp() -> str:
    start = datetime(2024, 1, 1, 0, 0, 0)
    end = datetime(2025, 3, 31, 23, 59, 59)
    delta = end - start
    random_seconds = random.randint(0, int(delta.total_seconds()))
    return (start + timedelta(seconds=random_seconds)).strftime("%Y-%m-%d %H:%M:%S")

def generate_comments(num_comments: int = 1000) -> None:
    """
    Generates a CSV file with columns: cid, uid, executive_order_id, message, timestamp.
    - cid: Sequential starting at 1.
    - uid: Random integer between 1 and 250 -> assuming that we have users from 1-250
    - executive_order_id: Randomly chosen from the base_data.csv file.
    - message: Randomly chosen from a list of sample messages.
    - timestamp: Randomly generated within a given range.
    """
    order_ids = load_executive_order_ids(BASE_DATA_FILE)
    if not order_ids:
        print("No executive order IDs found in", BASE_DATA_FILE)
        return

    header = ["cid", "uid", "executive_order_id", "message", "timestamp"]
    
    with open(OUTPUT_FILE, mode="w", encoding="utf-8", newline="") as fout:
        writer = csv.DictWriter(fout, fieldnames=header)
        writer.writeheader()
        for cid in range(1, num_comments + 1):
            uid = random.randint(1, 250)
            exec_order_id = random.choice(order_ids)
            message = random.choice(SAMPLE_MESSAGES)
            ts = random_timestamp()
            writer.writerow({
                "cid": cid,
                "uid": uid,
                "executive_order_id": exec_order_id,
                "message": message,
                "timestamp": ts
            })
    

if __name__ == "__main__":
    generate_comments(5000)
    print(f"Generated comments in {OUTPUT_FILE}")
