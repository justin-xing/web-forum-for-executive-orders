import csv
from datetime import datetime
from transformers import pipeline

TAG_CATEGORIES = [
    "Military",
    "Immigration",
    "Economics",
    "Regulation",
    "Environment",
    "Health",
    "Cyber",
    "Justice",
    "Diplomacy",
    "Equality",
    "Infrastructure",
    "Education"
]

def unify_date_format(date_str: str) -> str:
    """
    Attempt to parse a date string in either MM/DD/YYYY or YYYY-MM-DD format
    and return it as YYYY-MM-DD. If parsing fails, return the original string.
    """
    date_str = date_str.strip()
    if not date_str:
        return ""

    try:
        dt = datetime.strptime(date_str, "%m/%d/%Y")
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        pass

    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        return dt.strftime("%Y-%m-%d")
    except ValueError:
        pass

    return date_str


def transform_csv(input_file: str, output_file: str) -> None:
    """
    Reads the original data.gov CSV, extracts/renames fields,
    uses a local zero-shot classification pipeline for tagging,
    and normalizes date formats to YYYY-MM-DD.
    """

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

    with open(input_file, mode="r", encoding="utf-8") as fin:
        reader = csv.DictReader(fin)

        fieldnames = [
            "executive_order_id",
            "pdf_url",
            "citation",
            "start_page",
            "end_page",
            "title",
            "signing_date",
            "publication_date",
            "tag",
        ]

        with open(output_file, mode="w", encoding="utf-8", newline="") as fout:
            writer = csv.DictWriter(fout, fieldnames=fieldnames)
            writer.writeheader()

            for row in reader:
                eo_number = row.get("executive_order_number", "")
                pdf_url = row.get("pdf_url", "")
                citation = row.get("citation", "")
                start_page = row.get("start_page", "")
                end_page = row.get("end_page", "")
                title = row.get("title", "")
                signing_date = row.get("signing_date", "")
                pub_date = row.get("publication_date", "")

                signing_date = unify_date_format(signing_date)
                pub_date = unify_date_format(pub_date)

                best_label = "Uncategorized"
                if title.strip():
                    classification = classifier(
                        title, candidate_labels=TAG_CATEGORIES, multi_label=False
                    )
                    best_label = classification["labels"][0]

                new_row = {
                    "executive_order_id": eo_number,
                    "pdf_url": pdf_url,
                    "citation": citation,
                    "start_page": start_page,
                    "end_page": end_page,
                    "title": title,
                    "signing_date": signing_date,
                    "publication_date": pub_date,
                    "tag": best_label,
                }

                writer.writerow(new_row)


if __name__ == "__main__":
    input_csv = "base_data.csv"
    output_csv = "output.csv"
    transform_csv(input_csv, output_csv)
    print(f"Transformed CSV written to {output_csv}")
