# Houzeo Real Estate Listing Page (Austin, TX)

This project is a responsive real estate listing page for Austin, TX, built with **HTML5**, **Tailwind CSS** (via CDN), and **JavaScript**. It features a mobile-first design, interactive image sliders, and a dynamic map integration using **Leaflet** (OpenStreetMap).

## Features

-   **Responsive Design**: Fully responsive layout optimized for mobile (iPhone 14 Pro Max) and desktop.
-   **Tailwind CSS**: Utility-first styling for consistent and rapid UI development.
-   **Interactive Map**: Integrated OpenStreetMap via Leaflet.js to display property locations.
-   **Image Sliders**: Custom-built JS image slider for browsing property photos on each card.
-   **Dynamic Filters**: Filter bar with scrolled pill design on mobile and dropdowns on desktop.
-   **Sorting**: Functional client-side sorting by price, beds, square footage, and newest listings.

## Project Structure

-   `index.html`: Main HTML file containing the structure and Tailwind classes.
-   `script.js`: Handles logic for the mobile menu, image sliders, map initialization, and sorting.
-   `assests/`: Directory containing images (logos, property photos).
-   `README.md`: Project documentation.

## Setup & Running

This project uses Tailwind CSS via CDN, so no build step is required.

1.  **Clone or Download** the repository (or unzip the provided file).
2.  **Navigate** to the project folder.
3.  **Open `index.html`** in any modern web browser.

## Customization

-   **Map**: The map is implemented using [Leaflet](https://leafletjs.com/). You can switch to Google Maps or Mapbox by modifying the script tags in `index.html` and the initialization logic in `script.js` (code examples available in comments or history).
-   **Icons**: [Lucide Icons](https://lucide.dev/) are used throughout the project.

## Technologies

-   HTML5
-   Tailwind CSS (CDN)
-   JavaScript (ES6+)
-   Leaflet.js
-   Lucide Icons
