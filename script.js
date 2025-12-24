// Init Icons
lucide.createIcons();

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('mobile-menu');
    // Toggle between hidden and flex
    if (navLinks.classList.contains('hidden')) {
        navLinks.classList.remove('hidden');
        navLinks.classList.add('flex');
    } else {
        navLinks.classList.add('hidden');
        navLinks.classList.remove('flex');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const navbar = document.querySelector('header');
    const navLinks = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');

    if (!navbar.contains(event.target) && !navLinks.classList.contains('hidden')) {
        navLinks.classList.add('hidden');
        navLinks.classList.remove('flex');
    }
});

// Image Slider Simulation
document.querySelectorAll('.img-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', () => {
        console.log("Hovered card image");
    });
});

// Lazy Loading initialization
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.setAttribute('loading', 'lazy');
});


// --- Leaflet Map Code ---

// 1. Initialize Interactive Map
const map = L.map('map').setView([30.2672, -97.7431], 12); // Austin, TX Coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Define Property Data
const properties = [
    { id: 1, lat: 30.2672, lng: -97.7431, price: "$3,349,000", address: "2856 Meadow Park Ave, Austin, TX 78701" },
    { id: 2, lat: 30.2638, lng: -97.7131, price: "$2,850,000", address: "1234 Oak Street, Austin, TX 78702" },
    { id: 3, lat: 30.2914, lng: -97.7682, price: "$4,200,000", address: "5678 Pine Lane, Austin, TX 78703" },
    { id: 4, lat: 30.2500, lng: -97.7500, price: "$3,100,000", address: "9101 Elm Drive, Austin, TX 78704" }
];

// Add Markers to Map
properties.forEach(prop => {
    const marker = L.marker([prop.lat, prop.lng]).addTo(map);
    marker.bindPopup(`<b>${prop.price}</b><br>${prop.address}`);
});


// --- Dynamic Property Data ---
const listings = [
    {
        id: 1,
        images: ["assests/1.png", "assests/2.png", "assests/3.png", "assests/4.png"],
        price: 3349000,
        beds: 4,
        baths: 3,
        sqft: 998,
        address: "2856 Meadow Park Ave, Henderson, NV 89052",
        status: "House For Sale",
        statusColor: "#10B981", // Green
        daysOnHouzeo: 6,
        views: "2.3K",
        source: "Nashville (Real Tracs Mid) MLS-TN as distributed by MLS GRID"
    },
    {
        id: 2,
        images: ["assests/2.png", "assests/1.png", "assests/3.png", "assests/4.png"],
        price: 2850000,
        beds: 3,
        baths: 2,
        sqft: 1200,
        address: "1234 Oak Street, Austin, TX 78701",
        status: "Condo For Sale",
        statusColor: "#10B981",
        daysOnHouzeo: 12,
        views: "1.8K",
        source: "Austin MLS as distributed by MLS GRID"
    },
    {
        id: 3,
        images: ["assests/3.png", "assests/2.png", "assests/1.png", "assests/4.png"],
        price: 4200000,
        beds: 5,
        baths: 4,
        sqft: 2500,
        address: "5678 Pine Lane, Austin, TX 78702",
        status: "Multi-family",
        statusColor: "#10B981",
        daysOnHouzeo: 3,
        views: "2.3K",
        source: "Austin MLS as distributed by MLS GRID"
    },
    {
        id: 4,
        images: ["assests/4.png", "assests/2.png", "assests/3.png", "assests/1.png"],
        price: 3100000,
        beds: 4,
        baths: 3,
        sqft: 1800,
        address: "9101 Elm Drive, Austin, TX 78703",
        status: "House For Sale",
        statusColor: "#10B981",
        daysOnHouzeo: 10,
        views: "2.7K",
        source: "Austin MLS as distributed by MLS GRID"
    }
];

// --- Render Listings Function ---
function renderListings(data) {
    const grid = document.getElementById('property-list');
    grid.innerHTML = ''; // Clear existing content

    data.forEach(item => {
        // Format price
        const formattedPrice = item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
        const formattedSqft = item.sqft.toLocaleString('en-US');

        // Generate Images HTML
        let imagesHtml = '';
        let indicatorsHtml = '';
        item.images.forEach((img, index) => {
            const activeClass = index === 0 ? 'active' : '';
            imagesHtml += `<img src="${img}" class="property-img ${activeClass} absolute w-full h-full object-cover">`;

            indicatorsHtml += `<span class="w-2 h-2 rounded-full ${index === 0 ? 'bg-white scale-125 shadow-sm active' : 'bg-white/60 hover:bg-white'} indicator" onclick="goToImage(${item.id}, ${index})"></span>`;
        });

        const cardHtml = `
        <article class="card group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300" data-id="${item.id}">
          <div class="relative h-64 overflow-hidden img-wrapper cursor-pointer">
            <div class="image-slider w-full h-full relative">
              ${imagesHtml}
            </div>

            <button class="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-110 z-10" onclick="changeImage(${item.id}, 'prev')">
              <i data-lucide="chevron-left" class="w-5 h-5 text-gray-800"></i>
            </button>
            <button class="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:scale-110 z-10" onclick="changeImage(${item.id}, 'next')">
              <i data-lucide="chevron-right" class="w-5 h-5 text-gray-800"></i>
            </button>

            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 image-indicators">
              ${indicatorsHtml}
            </div>

            <div class="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm">
              ${item.daysOnHouzeo} days on Houzeo
            </div>
            <button class="absolute top-4 right-4 text-white hover:text-red-500 hover:animate-heartPulse transition-colors drop-shadow-md">
              <i data-lucide="heart" class="w-7 h-7 fill-black/30 hover:fill-current stroke-2"></i>
            </button>
          </div>

          <div class="p-5">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.statusColor}"></span>
                <span class="text-xs font-semibold text-gray-700">${item.status}</span>
              </div>
              <span class="text-xs text-gray-500 flex items-center gap-1 font-medium">
                <i data-lucide="eye" class="w-4 h-4 text-gray-400"></i> ${item.views}
              </span>
            </div>

            <div class="flex items-baseline justify-between mb-1">
              <h2 class="text-2xl font-bold text-houzeo-blue">${formattedPrice}</h2>
              <div class="flex gap-3 text-sm text-gray-500">
                <span><b class="text-houzeo-blue text-lg">${item.beds}</b> Beds</span>
                <span><b class="text-houzeo-blue text-lg">${item.baths}</b> Baths</span>
                <span><b class="text-houzeo-blue text-lg">${formattedSqft}</b> sqft.</span>
              </div>
            </div>

            <address class="not-italic text-[15px] font-semibold text-gray-800 mb-2 truncate">${item.address}</address>
            <p class="text-[11px] text-gray-400 leading-tight">${item.source}</p>
          </div>
        </article>
        `;
        grid.insertAdjacentHTML('beforeend', cardHtml);
    });

    // Re-initialize icons for new elements
    lucide.createIcons();
}

// --- Sorting Functionality ---
document.getElementById('sort-select').addEventListener('change', function () {
    const sortBy = this.value;
    let sortedData = [...listings]; // Create a copy

    switch (sortBy) {
        case 'price-low':
            sortedData.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedData.sort((a, b) => b.price - a.price);
            break;
        case 'beds':
            sortedData.sort((a, b) => b.beds - a.beds);
            break;
        case 'sqft':
            sortedData.sort((a, b) => b.sqft - a.sqft);
            break;
        case 'newest':
            // Assuming initial order is "newest" or sort by id/days
            // sortedData.sort((a, b) => a.daysOnHouzeo - b.daysOnHouzeo); 
            break;
        default:
            break;
    }

    renderListings(sortedData);
});


function changeImage(cardId, direction) {
    // Find card by data-id attribute to ensure it works after sorting
    const card = document.querySelector(`.card[data-id="${cardId}"]`);
    if (!card) return;

    const images = card.querySelectorAll('.property-img');
    const indicators = card.querySelectorAll('.indicator');

    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });

    images[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');

    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % images.length;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    images[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
}

function goToImage(cardId, imageIndex) {
    const card = document.querySelector(`.card[data-id="${cardId}"]`);
    if (!card) return;

    const images = card.querySelectorAll('.property-img');
    const indicators = card.querySelectorAll('.indicator');

    images.forEach(img => img.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    images[imageIndex].classList.add('active');
    indicators[imageIndex].classList.add('active');
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', function () {
    renderListings(listings);
});

