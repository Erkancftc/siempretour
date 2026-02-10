import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(BASE_DIR, "big_siempre_tour_tours")

SHIP_CATEGORY = "Ship/Cruise"

countries_with_ship_tours = []

for country in os.listdir(ROOT_DIR):
    country_path = os.path.join(ROOT_DIR, country)
    tours_path = os.path.join(country_path, "tours.json")

    if not os.path.isdir(country_path):
        continue
    if not os.path.exists(tours_path):
        continue

    with open(tours_path, "r", encoding="utf-8") as f:
        tours = json.load(f)

    if not isinstance(tours, list):
        continue

    for tour in tours:
        if tour.get("category") == SHIP_CATEGORY:
            countries_with_ship_tours.append(country)
            break  # bu ülkede en az 1 tane bulduk, yeter

# 🔥 SONUÇ
print("🚢 Ship/Cruise kategorisine sahip ülkeler:")
for c in sorted(countries_with_ship_tours):
    print("-", c)

print(f"\nToplam ülke sayısı: {len(countries_with_ship_tours)}")
