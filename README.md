# Battleships Internship Assignment

This is a Battleships game with a Node.js backend and a Vite.js React frontend. The backend handles the game logic, and the frontend provides the user interface.

## Project Structure

The project consists of two main folders:

- `battleships-back/`: Node.js server with game logic.
- `battleships-front/`: Vite.js frontend.

## Requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PM2](https://pm2.keymetrics.io/)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/LukasVaicaitis/battleships
```
### 2. Run the backend server
```bash
cd battleships-back
npm install
pm2 start ecosystem.config.js
```
pm2 needs to be installed globally.

### 3. Run the frontend application in a new terminal window
```bash
cd battleships-front
npm install
npm run dev
```
 The website can now be accessed at http://localhost:5173/
