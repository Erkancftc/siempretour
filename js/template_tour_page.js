function renderDayInfo(dayInfo) {
    const container = document.getElementById('daysAccordion');
    container.innerHTML = ""; 

    dayInfo.forEach((day, index) => {
        const isActive = index === 0 ? " active" : ""; 
        const display = index === 0 ? "block" : "none";

        const acc = document.createElement('div');
        acc.className = "accrodion" + isActive;

        acc.innerHTML = `
            <div class="accrodion-title rounded">
                <h5 class="mb-0">
                    <span>${day.dayNumber}. Gün</span> - ${day.title}
                </h5>
            </div>
            <div class="accrodion-content" style="display: ${display};">
                <div class="inner">
                    <p>${day.description}</p>
                </div>
            </div>
        `;

        container.appendChild(acc);
    });

    
    initAccordions();
}

function renderTour(tour) {
    document.getElementById('currentDestination').textContent = tour.destination;
    document.getElementById('tourTitle').textContent = tour.tourName;
    document.getElementById('tourTitle2').textContent = tour.tourName;

    document.getElementById('mainPhoto').style = `background-image: url(${tour.mainPhoto});`;
    document.getElementById('placesVisited').textContent = tour.placesVisited;

    document.getElementById('generalInfo').innerHTML = tour.generalInfo;
    document.getElementById('whatExpect').innerHTML = tour.whatExpect;

    document.getElementById('durationDays').innerHTML =
        `<i class="fa fa-clock-o pink mr-1" aria-hidden="true"></i> ${tour.durationDays} gün`;
    document.getElementById('personNumber').innerHTML =
        `<i class="fa fa-group pink mr-1" aria-hidden="true"></i> Kişi Sayısı : ${tour.personNumber}`;
    document.getElementById('dates').innerHTML =
        `<i class="fa fa-calendar pink mr-1" aria-hidden="true"></i> ${tour.dates}`;
    document.getElementById('minimumAge').innerHTML =
        `<i class="fa fa-user pink mr-1" aria-hidden="true"></i> Min. Yaş : ${tour.minimumAge}`;
    document.getElementById('meet').innerHTML =
        `<i class="fa fa-map-signs pink mr-1" aria-hidden="true"></i> Karşılama : ${tour.meet}`;

    document.getElementById('mappp').innerHTML = `
        <iframe
            src="${tour.map}"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>`;

    document.getElementById('image1').innerHTML = `<img src="${tour.image1}" alt="${tour.imagealt}">`;
    document.getElementById('image2').innerHTML = `<img src="${tour.image2}" alt="${tour.imagealt}">`;
    document.getElementById('image3').innerHTML = `<img src="${tour.image3}" alt="${tour.imagealt}">`;
    document.getElementById('image4').innerHTML = `<img src="${tour.image4}" alt="${tour.imagealt}">`;
    document.getElementById('image5').innerHTML = `<img src="${tour.image5}" alt="${tour.imagealt}">`;
    document.getElementById('image6').innerHTML = `<img src="${tour.image6}" alt="${tour.imagealt}">`;

    document.getElementById('image11').innerHTML = `<img src="${tour.image1}" alt="${tour.imagealt}">`;
    document.getElementById('image22').innerHTML = `<img src="${tour.image2}" alt="${tour.imagealt}">`;
    document.getElementById('image33').innerHTML = `<img src="${tour.image3}" alt="${tour.imagealt}">`;
    document.getElementById('image44').innerHTML = `<img src="${tour.image4}" alt="${tour.imagealt}">`;
    document.getElementById('image55').innerHTML = `<img src="${tour.image5}" alt="${tour.imagealt}">`;
    document.getElementById('image66').innerHTML = `<img src="${tour.image6}" alt="${tour.imagealt}">`;

    renderDayInfo(tour.dayInfo);
}

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

async function loadTourFromJson() {
    const id = getQueryParam('id');
    if (!id) {
        console.error('URL de id parametresi yok');
        return;
    }

    try {
        const res = await fetch('data/tours.json');
        if (!res.ok) {
            throw new Error('HTTP hata: ' + res.status);
        }

        const tours = await res.json();
        const tour = tours.find(t => t.id === id);

        if (!tour) {
            console.error('Bu id için tur bulunamadı:', id);;
            return;
        }
        renderTour(tour);

    } catch (err) {
        console.error('Tur yüklenirken hata oluştu:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadTourFromJson);
