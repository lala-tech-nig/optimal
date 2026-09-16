# Optimal Management Consultancy - Client Application

A modern, standalone website built using standard **HTML5**, **Vanilla CSS3**, and **JavaScript (ES6+)**.

## Project Structure

```
client/
├── index.html                           # Home page (Hero video, Marquee, Standards, Testimonials, Form)
├── about.html                           # About Us (Mission video, Founder profile, 5-step roadmap)
├── services.html                        # Services catalog (6 solutions, training photo collage)
├── iso-programs.html                    # ISO certification programs (ISO 9001, 14001, 45001, etc.)
├── gallery.html                         # Full interactive photo gallery with lightbox modal
├── contact.html                         # Contact page with split video layout & consultation form
├── login.html                           # Admin portal login screen
├── admin.html                           # Admin dashboard (Overview, Leads, Gallery CRUD, Analytics)
├── services/                            # Dedicated Service Detail Pages
│   ├── iso-certification.html
│   ├── management-systems.html
│   ├── professional-training.html
│   ├── fire-safety-training.html
│   ├── staff-training.html
│   └── accident-and-road-safety-training.html
├── css/
│   ├── style.css                        # Main design system, typography, animations, responsive layout
│   └── admin.css                        # Admin dashboard & portal styling
├── js/
│   ├── config.js                        # Global API endpoint configuration
│   ├── main.js                          # Navigation, sticky CTA, mobile drawer, scroll animations
│   ├── leads.js                         # Consultation form AJAX submission handler
│   ├── gallery.js                       # Dynamic album loader and interactive lightbox
│   ├── auth.js                          # Admin login, token storage, and logout
│   └── admin.js                         # Admin dashboard tab switching, search, filters, gallery upload
└── assets/                              # High-definition images, brand logos, and background videos
```

## Running Locally

You can open `index.html` directly in any web browser or serve it using any static HTTP server:

```bash
# Using npx serve
npx serve -p 3000 .

# Or using Python 3
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Integration

The client communicates asynchronously via `fetch()` with the Express / MongoDB backend (hosted at `https://optimal-fkiy.onrender.com` by default, or `http://localhost:5000` in local development):
- **Leads**: `POST /api/leads`
- **Gallery**: `GET /api/gallery`, `POST /api/gallery`, `DELETE /api/gallery/:id`
- **Admin Auth & Stats**: `POST /api/auth/login`, `GET /api/stats`, `GET /api/leads`, `PATCH /api/leads/:id`

The default base API URL is configured in `js/config.js` (`https://optimal-fkiy.onrender.com`). You can also override it dynamically via `localStorage.setItem('optimal_api_url', '...')`.
