# 🚀 COSMOS — Space Dashboard

An interactive space exploration dashboard that pulls live data from 3 real NASA and space APIs. Explore today's astronomy picture, upcoming rocket launches, and detailed solar system planet data — all in one beautiful dark-themed UI.

🌐 **Live Demo:** [mohammed-kandeel.github.io/11-COSMOS-Space-Dashboard](https://mohammed-kandeel.github.io/11-COSMOS-Space-Dashboard/#)

---

## 🌌 Features

### 1️⃣ Today in Space — NASA APOD
- Displays NASA's **Astronomy Picture of the Day** with title, date, description, and copyright
- Supports both **image** and **video** media types
- **Date picker** to browse any past APOD
- **"Today"** button to jump back to current date
- Loading state, error fallback, and "View Full Resolution" overlay on hover
- Smart date logic: if it's before 8 AM, shows yesterday's APOD (NASA uploads at midnight UTC)

### 2️⃣ Launches — SpaceDevs API
- **Featured launch** card with full details: provider, rocket, location, country, days until launch, mission description, and launch image
- **Upcoming launches grid** with 9 additional cards showing date, time, rocket, and pad location
- Image zoom on hover, status badge overlay

### 3️⃣ Planets — Solar System OpenData API
- **8-planet grid** with planet images, distance in AU, and color-coded hover borders
- **Planet detail panel** with: image, description, semimajor axis, radius, mass, density, orbital period, rotation period, moons count, gravity
- **Discovery info**: discoverer, discovery date, body type, volume
- **Orbital characteristics**: perihelion, aphelion, eccentricity, inclination, axial tilt, avg temperature, escape velocity
- **Comparison table** with sticky planet name column: distance, diameter, mass, orbital period, moons, type

### 🗂️ Navigation
- **Collapsible sidebar** with section links (Today in Space, Launches, Planets)
- **Mobile overlay layer** — clicking outside closes the sidebar
- Active link highlighting with smooth state management

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Dark theme with Tailwind CSS utility classes
- **Tailwind CSS** — Full utility-class styling via CDN
- **Vanilla JavaScript** — Async/Await, fetch API, DOM manipulation, template literals
- **Font Awesome** — Icons

---

## 🔌 APIs Used

| API | Endpoint | Used For |
|-----|----------|----------|
| **NASA APOD** | `api.nasa.gov/planetary/apod` | Daily astronomy photo/video + metadata |
| **SpaceDevs Launches** | `ll.thespacedevs.com/2.3.0/launches/upcoming` | Upcoming rocket launches |
| **Solar System OpenData** | `solar-system-opendata-proxy.vercel.app/api/planets` | Planet data and stats |

---

## 🧠 JavaScript Concepts Used

### Async/Await API Calls
```javascript
async function getTodayInSpaceData(date) {
  var response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=...&date=${date}`
  );
  if (response.ok) {
    var data = await response.json();
    displayTodayInSpace(data);
  } else {
    failedLoadImageForTodayInSpace();
  }
}
```

### Sequential API Loading (IIFE)
```javascript
(async function () {
  await getTodayInSpaceData(formatDateForInput(new Date()));
  await getLaunchesData();
  await getPlanetsData();
})();
```

### Dynamic Template Literals for UI
All sections are rendered via template literal functions — zero hardcoded HTML for data content:
```javascript
function launchContainers() {
  function featured(item) { return `<div class="...">...</div>`; }
  function upcoming(item) { return `<div class="...">...</div>`; }
  return { featured, upcoming };
}
```

### Smart Date Logic
```javascript
function formatDateForInput(date) {
  var now = new Date();
  date = new Date(date);
  // Show yesterday's APOD before 8 AM
  if (isSameDate(date, now) && date.getHours() < 8)
    date.setDate(date.getDate() - 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-...`;
}
```

### Planet Color Mapping
```javascript
style="--planet-color:${
  item.id === 'mercure' ? '#eab308' :
  item.id === 'venus'   ? '#f97316' :
  item.id === 'terre'   ? '#3b82f6' : ...
}"
```

---

## 📁 Project Structure

```
COSMOS-Space-Dashboard/
│
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── mercury.png
│       ├── venus.png
│       ├── earth.png
│       ├── mars.png
│       ├── jupiter.png
│       ├── saturn.png
│       ├── uranus.png
│       ├── neptune.png
│       └── launch-placeholder.png
│
└── README.md
```

---

## ⚙️ CSS / Tailwind Concepts Used

| Concept | Usage |
|---------|-------|
| Tailwind dark theme | Full dark UI with `slate-*`, `blue-*`, `purple-*` palette |
| `bg-linear-to-*` | Gradient overlays on images and cards |
| `backdrop-blur-md` | Glassmorphism on hover overlays |
| `group` + `group-hover:*` | Image scale on card hover, overlay fade-in |
| `line-clamp-*` | Text truncation for launch names |
| `overflow-hidden` | Image containment in cards |
| `sticky left-0` | Sticky planet name column in comparison table |
| CSS custom properties | `--planet-color` per planet for dynamic hover borders |
| `hidden` class toggle | Section switching via JS classList manipulation |

---

## ▶️ How to Run

No setup needed — open directly in any browser:

```bash
open index.html
```

> Note: Uses a live NASA API key — requires internet connection.

---

## 👤 Author

**Mohammed Kandeel**  
🔗 [11-COSMOS-Space-Dashboard](https://github.com/mohammed-kandeel/11-COSMOS-Space-Dashboard)  
🌐 [Live Demo](https://mohammed-kandeel.github.io/11-COSMOS-Space-Dashboard/#)
