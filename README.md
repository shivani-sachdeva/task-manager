# Task Manager

A simple and efficient Task Manager built with following technology:
 - Frontend (React + TypeScript + Vite)
 - Backend (Node.js + Express)
 - Testing (Vitest + @testing-library/jest-dom)

This project demonstrates CRUD operations, modular architecture, and unit testing.

### Features
 - Add, edit, delete, and toggle task completion
 - Modular component-based architecture
 - Lightweight backend using Node.js + Express
 - Form validation and keyboard support
 - Unit testing with Vitest

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation and Running

```bash
# Clone the repository
git clone https://github.com/shivani-sachdeva/task-manager.git
cd task-manager

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

### Running App

cd client      #frontend
npm run dev    # Runs on http://localhost:5173


cd server        #backend
npm run start    # Runs on http://localhost:5000


# Running Test
cd client
npm run test:run

