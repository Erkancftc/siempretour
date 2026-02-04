console.log("extra text js yüklendi");

/* ===============================
   EXTRA TEXT RENDER
   (_countrySlug zaten başka dosyada var)
================================ */
async function renderExtraTexts() {
    if (typeof _countrySlug === "undefined" || !_countrySlug) return;

    const container = document.getElementById("extraTextSection");
    if (!container) return;

    try {
        const res = await fetch(
            `data/siempre_tour_country_datas/${_countrySlug}/datas.json`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            container.innerHTML = "";
            return;
        }

        const datas = await res.json();
        const bestTime = datas.find(d => d.type === "best-time-to");

        if (!bestTime) {
            container.innerHTML = "";
            return;
        }

        const img1 = document.getElementById("image1forwhentogo");
        img1.innerHTML = `<div class="tour-bg__image"
                                    style="background-image: url(${bestTime.image1});">
                                </div>`;


        container.innerHTML = "";

        let image2Inserted = false;

        for (let i = 1; i <= 20; i++) {
            const title = bestTime[`title${i}`];
            const paragraph = bestTime[`paragraph${i}`];

            if (!title && !paragraph) break;

            if (title) {
                const h4 = document.createElement("h4");
                h4.textContent = title;
                container.appendChild(h4);
            }

            if (paragraph) {
                const p = document.createElement("p");
                p.innerHTML = paragraph.replace(/\n/g, "<br>");
                container.appendChild(p);
            }

            // 🔥 SADECE title1 + paragraph1 sonrası
            if (i === 1 && bestTime.image2 && !image2Inserted) {
                const imgDiv = document.createElement("div");
                imgDiv.className = "tour-bg__image";
                imgDiv.style.backgroundImage = `url(${bestTime.image2})`;
                container.appendChild(imgDiv);
                image2Inserted = true;
            }
        }

    } catch (err) {
        console.error("Extra text yüklenemedi:", err);
        container.innerHTML = "";
    }
}

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", renderExtraTexts);
