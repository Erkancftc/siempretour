import os
import json

# ===============================
# CONFIG (PATH SAFE)
# ===============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SOURCE_ROOT = os.path.join(BASE_DIR, "big_siempre_tour_tours")
TARGET_ROOT = os.path.join(BASE_DIR, "siempre_tour_ship_tours")

TARGET_CATEGORY = "Ship/Cruise"


def load_json(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: str, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def export_ship_cruise_tours():
    if not os.path.isdir(SOURCE_ROOT):
        raise FileNotFoundError(f"Source folder not found: {SOURCE_ROOT}")

    os.makedirs(TARGET_ROOT, exist_ok=True)

    countries_created = 0
    total_tours_exported = 0

    for country in os.listdir(SOURCE_ROOT):
        country_path = os.path.join(SOURCE_ROOT, country)
        tours_path = os.path.join(country_path, "tours.json")

        if not os.path.isdir(country_path):
            continue
        if not os.path.exists(tours_path):
            continue

        try:
            tours = load_json(tours_path)
        except Exception as e:
            print(f"⚠️ JSON okunamadı: {tours_path} | {e}")
            continue

        if not isinstance(tours, list):
            print(f"⚠️ Geçersiz format (array değil): {tours_path}")
            continue

        ship_tours = [t for t in tours if t.get("category") == TARGET_CATEGORY]

        # Bu ülkede ship turu yoksa skip
        if not ship_tours:
            continue

        # hedef ülke klasörü + tours.json
        out_country_dir = os.path.join(TARGET_ROOT, country)
        os.makedirs(out_country_dir, exist_ok=True)

        out_tours_path = os.path.join(out_country_dir, "tours.json")
        save_json(out_tours_path, ship_tours)

        countries_created += 1
        total_tours_exported += len(ship_tours)

        print(f"✅ {country}: {len(ship_tours)} тур -> {out_tours_path}")

    print("\n==============================")
    print(f"✅ Ülke klasörü oluşturulan: {countries_created}")
    print(f"✅ Export edilen toplam тур: {total_tours_exported}")
    print(f"📁 Target root: {TARGET_ROOT}")
    print("==============================\n")


if __name__ == "__main__":
    export_ship_cruise_tours()
