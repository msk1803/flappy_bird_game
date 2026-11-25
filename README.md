Live link : - https://flappy-bird-game5.vercel.app

# Flappy Bird Clone (React + Vite)

A modern, web-based clone of the classic Flappy Bird game, built from scratch using **React** and **Vite**. 

This project demonstrates how to build a real-time game engine loop inside a React application using `useState` and `useEffect`, complete with gravity, physics, collision detection, and high score tracking.

## ✨ Features

- **Classic Gameplay**: Features the original Flappy Bird assets (bird, green pipes, and background scenery).
- **Custom Game Engine**: Built entirely with React hooks (`useEffect` intervals) instead of a traditional canvas/game engine.
- **Persistent High Scores**: Automatically saves your highest score using your browser's `localStorage` so you never lose your progress.
- **Responsive Controls**: Jump by clicking the screen or hitting the `Spacebar`.
- **Modern UI Styling**: Features a sleek glassmorphism overlay on the start/game-over screens and uses premium typography.

## 🛠️ Technologies Used

- **React**: For UI components and state management (game logic).
- **Vite**: For blazing fast development and building.
- **Vanilla CSS**: For all styling, animations, and image asset positioning.

## 🚀 Getting Started

To run this project locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/msk1803/flappy_bird_game.git
   cd flappy_bird_game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Play the game!**
   Open your browser and navigate to `http://localhost:5173`. Click the game area or press `Space` to start flying!

## 🎮 How to Play
- **Jump**: Click anywhere on the game container or press the `Spacebar`.
- **Goal**: Navigate the bird through the gaps in the green pipes.
- **Scoring**: You earn 1 point for every pipe you successfully pass.
- **Game Over**: Hitting a pipe, the ground, or the ceiling will end the game. 

## 📝 License

This project is created for educational purposes. Original Flappy Bird assets and concepts are the property of .GEARS Studios and Dong Nguyen.
