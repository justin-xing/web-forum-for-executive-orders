import csv
import random
import string
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

def generate_password_hash(length=10):
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choices(characters, k=length))

canadian_cities = [
    "Waterloo", "Toronto", "Ottawa", "Montreal", "Vancouver", 
    "Calgary", "Edmonton", "Quebec City", "Winnipeg", "Hamilton"
]

def generate_account_creation_date():
    start = datetime(2024, 1, 1, 0, 0, 0)
    end = datetime(2025, 3, 31, 23, 59, 59)
    delta = end - start
    random_seconds = random.randint(0, int(delta.total_seconds()))
    return (start + timedelta(seconds=random_seconds)).strftime("%Y-%m-%d %H:%M:%S")

def generate_date_of_birth():
    start = datetime(1960, 1, 1)
    end = datetime(2005, 12, 31)
    delta = end - start
    random_days = random.randint(0, delta.days)
    return (start + timedelta(days=random_days)).strftime("%Y-%m-%d")

def generate_users(num_users=500, output_file="output_user.csv"):
    """
    Generate users for base data CSVs using Faker library.
    """
    header = [
        "uid",
        "name",
        "username",
        "location",
        "role",
        "password_hash",
        "email",
        "gender",
        "account_creation_date",
        "date_of_birth",
        "profile_picture_url",
        "bio"
    ]
    
    genders = ["Male", "Female"]
    
    with open(output_file, mode="w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(header)
        
        for uid in range(1, num_users + 1):
            name = fake.first_name()
            username = fake.user_name()
            location = random.choice(canadian_cities)
            role = "regular"
            password_hash = generate_password_hash()
            email = fake.email()
            gender = random.choice(genders)
            account_creation_date = generate_account_creation_date()
            date_of_birth = generate_date_of_birth()
            profile_picture_url = "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341"
            bio = f"i am {name.lower()}. me like politics"
            
            writer.writerow([
                uid,
                name,
                username,
                location,
                role,
                password_hash,
                email,
                gender,
                account_creation_date,
                date_of_birth,
                profile_picture_url,
                bio
            ])

if __name__ == "__main__":
    generate_users(250)
    print("Generated users in output_user.csv")
