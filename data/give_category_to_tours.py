import os
import json
import time
from openai import OpenAI
from tqdm import tqdm

# ===============================
# CONFIG (PATH SAFE)
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(BASE_DIR, "big_siempre_tour_tours")

MODEL = "gpt-4o-mini"
SLEEP_BETWEEN_CALLS = 0.3  # rate limit safety

CATEGORIES = [
    "Luxury",
    "Safari",
    "Ship/Cruise",
    "Adventure",
    "Polar",
    "Family",
    "Yoga&Wellness",
    "Horse Riding",
    "Diving",
    "Honeymoon",
    "Culture"
]

PROMPT_TEMPLATE = """
You are classifying travel tours.

Choose ONE AND ONLY ONE category from the list below.
Do not explain.
Do not add extra text.
Respond with only the category name.

Allowed categories:
{categories}

Tour name:
{tour_name}

General information:
{general_info}
""".strip()

client = OpenAI()

# ===============================
# CATEGORY CALL
# ===============================
def get_category(tour_name, general_info):
    prompt = PROMPT_TEMPLATE.format(
        categories="\n".join(CATEGORIES),
        tour_name=tour_name or "",
        general_info=general_info or ""
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a strict classifier."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    category = response.choices[0].message.content.strip()

    if category not in CATEGORIES:
        raise ValueError(f"Invalid category returned: {category}")

    return category

# ===============================
# MAIN PROCESS (RESUME SAFE)
# ===============================
def process_all_countries():
    if not os.path.exists(ROOT_DIR):
        raise FileNotFoundError(f"ROOT_DIR not found: {ROOT_DIR}")

    for country in os.listdir(ROOT_DIR):
        country_path = os.path.join(ROOT_DIR, country)
        tours_path = os.path.join(country_path, "tours.json")

        if not os.path.isdir(country_path):
            continue
        if not os.path.exists(tours_path):
            continue

        print(f"\n📍 Processing country: {country}")

        with open(tours_path, "r", encoding="utf-8") as f:
            tours = json.load(f)

        if not isinstance(tours, list):
            print(f"❌ Invalid format: {tours_path}")
            continue

        changed = False

        for tour in tqdm(tours, desc=f"{country} tours"):
            # 🔥 RESUME LOGIC
            if "category" in tour and tour["category"]:
                continue

            try:
                category = get_category(
                    tour.get("tourName", ""),
                    tour.get("generalInfo", "")
                )

                tour["category"] = category
                changed = True

                time.sleep(SLEEP_BETWEEN_CALLS)

            except Exception as e:
                print(f"\n⚠️ Skipped tour ID {tour.get('id')}: {e}")
                continue

        if changed:
            with open(tours_path, "w", encoding="utf-8") as f:
                json.dump(tours, f, ensure_ascii=False, indent=2)

            print(f"✅ Updated: {tours_path}")

# ===============================
# RUN
# ===============================
if __name__ == "__main__":
    print("📂 ROOT_DIR =", ROOT_DIR)
    process_all_countries()
