# Danjeon Dungeon

A web-based, retro-inspired **Roguelike Dungeon Crawler** built with a PHP backend and a vanilla JavaScript frontend. Navigate procedurally generated floors, manage a party of diverse heroes, and survive the depths of the Danjeon.

## ⚔️ Key Features

* **Procedural Dungeon Generation:** Uses a "Random Walker" algorithm to create unique map layouts every time you descend.
* **Tactical Exploration:** Features a custom Fog of War system with Line-of-Sight (Bresenham’s Algorithm) and diagonal wall-blocking logic.
* **Hero Roster System:** Manage a party of heroes with distinct base stats (HP, ATK, SPA, DEF, SPD, CRIT) and unique passives like *Swift Strike* or *Rage*.
* **Persistent Save System:** Server-side save management that stores player progress, currency, and rosters in JSON format.
* **Data-Driven Design:** Game balance for characters, enemies, and items is handled via external JSON configuration for easy modding and scaling.

## 🛠️ Technical Stack

* **Frontend:** HTML5, CSS3 (including CSS Animations for UI transitions), and Vanilla JavaScript (ES6+).
* **Backend:** PHP for server-side logic and modular component loading.
* **Data:** JSON-based local database for character and game state management.
* **Icons:** Integrated with Font Awesome Pro for high-quality UI elements.

## 🚀 Getting Started

1.  **Server Setup:** Clone the repository into your local server environment (e.g., XAMPP/htdocs).
2.  **Permissions:** Ensure the `docs/saves/` directory exists and has write permissions for the PHP script.
3.  **Launch:** Open your browser and navigate to `gameInit.php` to begin your adventure.

---

*Note: This project uses Font Awesome Pro assets. Ensure you have the appropriate license if hosting publicly.*