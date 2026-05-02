# K Sangameshwar | Performance Psychology

Professional portfolio website for a sports psychologist focused on mental conditioning for competitive athletes.

## Overview

This project is a modern React + Vite portfolio website built for **K Sangameshwar**, a sports psychologist specializing in:

- performance under pressure
- confidence building
- injury recovery mental training
- return-to-competition readiness
- structured mental skills training for athletes

The website is designed to present the psychologist's profile, services, programs, work experience, education, and contact/application flow in a premium and conversion-focused format.

## Key Features

- Premium one-page portfolio website
- Strong hero section with conversion-focused CTA
- About section with profile image, education, and experience
- Programs and services showcase
- Google Form integration for athlete applications
- WhatsApp and email contact integration
- Sticky top navigation
- Responsive layout for desktop and mobile
- Client admin panel for content editing through UI

## Client Admin Panel

This project includes a built-in client-side admin interface.

### Admin access

Open:

```text
/#admin
```

Default login:

```text
username: admin
password: ChangeMe123!
```

### What the client can edit

- website logo
- psychologist profile photo
- branding text
- hero section content
- about section content
- services
- programs
- work experience
- education
- contact links
- footer text

### Current limitation

The current admin system stores changes in **browser local storage**. That means:

- changes are browser-specific
- changes are device-specific
- this is not yet a full production CMS

For a secure and scalable production setup, the next step is to connect the admin panel to:

- **Cloudinary** for image hosting
- **Supabase** or **Firebase** for authentication and shared content storage

## Tech Stack

- React
- Vite
- Tailwind CSS
- Custom CSS
- Local storage based admin editing

## Project Structure

```text
elite-psychology-website/
├── public/
├── resume/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── siteConfig.js
├── index.html
├── package.json
└── README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

Recommended deployment workflow:

1. Push code to GitHub
2. Import repository into Vercel
3. Deploy the frontend
4. Later connect Cloudinary for image uploads
5. Later replace local-storage admin with backend-based content management

## Contact Links Used In Project

- Google Form application link
- WhatsApp direct contact
- Email direct contact

These links are configured through the site content configuration and admin UI.

## Future Improvements

- Cloudinary integration for logo/profile uploads
- Secure backend authentication
- Shared admin editing across devices
- Database-backed content management
- Analytics integration
- SEO improvements

## Purpose

This website is built to help a sports psychologist establish a premium online presence, attract athletes, and manage core portfolio content through an easy editing interface.
