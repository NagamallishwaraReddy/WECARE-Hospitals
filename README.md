# WeCare Hospitals

A modern, clean hospital website built with React, Tailwind CSS, and Firebase. It features patient authentication, departmental listings, doctor profiles, and a real-time appointment booking system.

## 🌐 Live Demo
[View Live Demo Here](https://6a3a115740c03cf57bff36b7--splendorous-halva-0aca0f.netlify.app/)

## ✨ Features
- **User Authentication**: Secure user registration, login, and password reset functionality using Firebase Auth.
- **Appointment Booking**: Authenticated users can book appointments with specific doctors or broadly by department.
- **Patient Dashboard**: Users can view their appointment history and status securely.
- **Department & Doctor Directories**: Browse hospital specialties, facility details, and individual doctor profiles.
- **Responsive Design**: fully responsive UI for seamless experience across mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Backend/Database**: Firebase (Authentication & Firestore Cloud Database)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wecare-hospitals.git
   cd wecare-hospitals
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password).
   - Enable **Firestore Database**.
   - Update the `src/firebase.ts` file with your own Firebase configuration object.

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
