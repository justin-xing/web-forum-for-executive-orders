import csv
import random

OUTPUT_FILE = "output_votes.csv"

def generate_votes(num_rows: int, output_file: str) -> None:
    with open(output_file, mode="w", encoding="utf-8", newline="") as fout:
        writer = csv.writer(fout)
        writer.writerow(["uid", "cid", "is_upvote"])
        
        for _ in range(num_rows):
            uid = random.randint(1, 250)
            cid = random.randint(1, 5000)
            is_upvote = random.choice([0, 1])
            writer.writerow([uid, cid, is_upvote])

if __name__ == "__main__":
    generate_votes(50000, OUTPUT_FILE)
    print(f"Generated rows in {OUTPUT_FILE}")
