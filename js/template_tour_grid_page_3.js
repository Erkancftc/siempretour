(() => {

    /* ===============================
       COUNTRY PARAM
    ================================ */
    function getCountryFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get("country");
    }

    /* ===============================
       FETCH datas.json (LOCAL CACHE)
    ================================ */
    let cachedDatasLocal = null;

    async function fetchCountryDatas(countrySlug) {
        if (cachedDatasLocal) return cachedDatasLocal;

        const res = await fetch(
            `data/siempre_tour_country_datas/${countrySlug}/datas.json`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("datas.json bulunamadı");
        }

        cachedDatasLocal = await res.json();
        return cachedDatasLocal;
    }

    /* ===============================
       CLEAN ONLY SUGGESTION LINKS
    ================================ */
    function cleanSuggestions(html) {
        return html
            .replace(/<b>.*?is great for<\/b>/gi, "")
            .replace(/<a[^>]*>.*?<\/a>/gi, "");
    }

    /* ===============================
       AUSTRIA TYPE RENDER
    ================================ */
    function renderAustriaType(html) {
        const listEl = document.getElementById("bestTimeWhenToGoList");
        if (!listEl) return;

        listEl.innerHTML = "";

        const bullets = html.match(/<bullet>(.*?)<\/bullet>/gis) || [];

        bullets.forEach(bullet => {
            const content = bullet.replace(/<\/?bullet>/gi, "").trim();
            if (!content) return;

            const li = document.createElement("li");
            li.className = "list-group-item py-4";
            li.innerHTML = content;
            listEl.appendChild(li);
        });
    }

    /* ===============================
   ALBANIA TYPE RENDER (FIXED)
================================ */
    function renderAlbaniaType(html) {
        const ul = document.getElementById("bestTimeWhenToGoList");
        if (!ul || !html) return;

        ul.innerHTML = "";

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        /* 🔥 SADECE ÖNERİ / LINK TEMİZLİĞİ */
        let cleaned = html
            .replace(/<a[^>]*>.*?<\/a>/gi, "")              // linkleri sil
            .replace(/<bullet>[\s\S]*?<\/bullet>/gi, "")   // bullet önerileri sil
            .replace(/.*is great for.*$/gim, "")            // "is great for" satırları
            .replace(/<br\s*\/?>/gi, "\n");

        /* 🔑 AY AY BÖL (20px divider) */
        const blocks = cleaned
            .split('<div style="margin-top: 20px;"></div>')
            .map(b =>
                b
                    .replace(/<div style="margin-top:\s*10px;"><\/div>/gi, "") // ay içi divider
                    .replace(/<\/?[^>]+>/g, "") // kalan tüm html taglerini sil
                    .trim()
            )
            .filter(Boolean);

        blocks.forEach((block, i) => {
            if (!months[i]) return;

            const lines = block
                .split("\n")
                .map(l => l.trim())
                .filter(Boolean);

            if (!lines.length) return;

            const highlights = lines.slice(0, 3);
            const description = lines.slice(3).join(" ");

            const li = document.createElement("li");
            li.className = "list-group-item py-4";

            li.innerHTML = `
            <strong>${months[i]} in ${countrySlug}</strong><br>
            ${highlights.join("<br>")}
            <br><br>
            ${description}
        `;

            ul.appendChild(li);
        });
    }



    /* ===============================
       MAIN RENDER
    ================================ */
    async function renderBestTimeToGo() {
        const countrySlug = getCountryFromUrl();
        if (!countrySlug) return;

        const datas = await fetchCountryDatas(countrySlug);
        const bestTime = datas.find(d => d.type === "best-time-to");
        if (!bestTime) return;

        /* Main title */
        const titleEl = document.getElementById("list-item-2");
        if (titleEl && bestTime.Main_Title) {
            titleEl.textContent = bestTime.Main_Title;
        }

        /* Main paragraph */
        const paragraphEl = document.getElementById("bestTimeMainParagraph");
        if (paragraphEl && bestTime.Main_Paragraph) {
            paragraphEl.textContent = bestTime.Main_Paragraph;
        }

        /* When to go title */
        const whenToGoTitleEl = document.getElementById("bestTimeWhenToGoTitle");
        if (whenToGoTitleEl && bestTime.when_to_go) {
            whenToGoTitleEl.textContent = bestTime.when_to_go;
        }

        const html = bestTime.when_to_go_html || "";
        const trimmed = html.trim();

        /* 🔥 STRUCTURAL DECISION */
        if (trimmed.startsWith("<bullet>")) {
            renderAustriaType(html);
        } else {
            renderAlbaniaType(html);
        }
    }

    /* ===============================
       INIT
    ================================ */
    document.addEventListener("DOMContentLoaded", renderBestTimeToGo);

})();
