<!-- README.md -->

# Nanny Services App

## Опис проєкту

Цей застосунок дозволяє користувачам знаходити та обирати нянь, переглядати їх профілі, додавати у обрані та записуватися на особисту зустріч.

Застосунок складається з трьох сторінок:

1. **Home** – заголовок, слоган та кнопка переходу до списку нянь.
2. **Nannies** – перелік нянь з фільтрами, сортуванням, Load More та інтерактивними картками.
3. **Favorites** – приватна сторінка, доступна лише для авторизованих користувачів, з картками обраних нянь.

---

## Основні функції

- **Авторизація**:
  - Google Sign-In
  - Email/Password (реєстрація та логін)
  - Вихід із системи (Logout)
- **Favorites**:
  - Додавання/видалення нянь у обране
  - Синхронізація з Firebase Realtime Database
  - Збереження стану при перезавантаженні
- **Nannies**:
  - Сортування за алфавітом
  - Фільтрування за ціною
  - Load More (показує спочатку 3 картки, решта завантажується по кліку)
  - Кнопки “серце” працюють так само, як у Favorites
  - Модалки:
    - **Read more** – детальна інформація про няню
    - **Make an appointment** – форма запису на зустріч з валідацією через `react-hook-form` + `yup`
- **Приватна маршрутизація**:
  - `/favorites` доступна лише авторизованим користувачам (PrivateRoute)

---

## Технології

- **React 18**
- **React Router v6**
- **Firebase** (Auth + Realtime Database)
- **React Hook Form** + **Yup**
- **Vite** (бандлер)
- **CSS** (для стилізації)

---

## Структура проєкту

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

## Як запустити

1. Клонувати репозиторій:

```bash
git clone https://github.com/your-username/nanny-services-app.git
cd nanny-services-app

2. Встановити залежності:

npm install

3. Створити .env файл у корені:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DB_URL=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

4. Запустити локально:

npm run dev

5. Деплой можна робити на Netlify, Vercel або GitHub Pages.

Макет

Figma Design

Примітки

* Всі модалки закриваються по backdrop, хрестик, або клавіші Esc.

* Всі поля форм обов'язкові і валідовані через yup.

* Реєстрація/логін + кнопки “серце” синхронізовані з Firebase.
```
