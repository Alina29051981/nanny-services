<!-- README.md -->

# Nanny Services App

## Project Description

This application allows users to find and select nannies, view their profiles, add them to favorites, and book a personal meeting.

The application consists of three pages:

1. **Home** – a heading, slogan, and a button to navigate to the list of nannies.
2. **Nannies** – a list of nannies with filtering, sorting, Load More functionality, and interactive cards.
3. **Favorites** – a private page accessible only to authenticated users, containing favorite nanny cards.

---

## Main Features

### Authentication

- Google Sign-In
- Email/Password (registration and login)
- Logout

### Favorites

- Add/remove nannies from favorites
- Synchronization with Firebase Realtime Database
- State persistence after page refresh

### Nannies

- Sorting alphabetically
- Filtering by price
- Load More (initially shows 3 cards, more loaded on click)
- Favorite (heart) buttons synchronized with Firebase
- Modals:
  - **Read more** – detailed nanny information
  - **Make an appointment** – booking form with validation using `react-hook-form` + `yup`

### Private Routing

- `/favorites` is accessible only to authenticated users (PrivateRoute)

---

## Technologies

- **React 18**
- **React Router v6**
- **Firebase** (Auth + Realtime Database)
- **React Hook Form** + **Yup**
- **Vite** (bundler)
- **CSS** (for styling)

---

## Project Structure

src/
├─ api/
│ ├─ favorites.js # API для обраних нянь
│ └─ nannies.js # API для всіх нянь
├─ components/
│ ├─ Header.jsx
│ ├─ NannyCard.jsx
│ ├─ ReadMoreModal.jsx
│ ├─ AppointmentModal.jsx
│ └─ AuthModal.jsx
├─ pages/
│ ├─ Home.jsx
│ ├─ Nannies.jsx
│ └─ Favorites.jsx
├─ routes/
│ ├─ router.jsx
│ └─ PrivateRoute.jsx
├─ auth.js # авторизація користувача
├─ firebase.js # конфігурація Firebase
└─ App.jsx

---

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/your-username/nanny-services-app.git
cd nanny-services-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory:
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DB_URL=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...

4. Run locally:

```bash
npm run dev
```

5. Deployment can be done on Netlify, Vercel, or GitHub Pages.

## Design

Figma design: https://www.figma.com/file/u36ajEOsnwio2GDGiabVPD/Nanny-Sevices?type=design&node-id=0-1&mode=design&t=CZpMnnOCRwAYc81O-0

## Notes

- All modals close via backdrop click, close button, or Esc key.
- All form fields are required and validated using Yup.
- Registration/login and heart (favorite) buttons are synchronized with Firebase.
