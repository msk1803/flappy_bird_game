import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

const GRAVITY = 6;
const JUMP = -80;
const PIPE_SPEED = 6;
const PIPE_WIDTH = 50;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const TICK_RATE = 24;

function App() {
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipePosition, setPipePosition] = useState(GAME_WIDTH);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('flappyHighScore')) || 0;
  });

  const bottomPipeHeight = GAME_HEIGHT - PIPE_GAP - pipeHeight;

  useEffect(() => {
    let timeId;
    if (gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY);
      }, TICK_RATE);
    }
    return () => {
      clearInterval(timeId);
    };
  }, [birdPosition, gameHasStarted]);

  useEffect(() => {
    let pipeId;
    if (gameHasStarted && pipePosition >= -PIPE_WIDTH) {
      pipeId = setInterval(() => {
        setPipePosition((pipePosition) => pipePosition - PIPE_SPEED);
      }, TICK_RATE);
      return () => {
        clearInterval(pipeId);
      };
    } else if (gameHasStarted && pipePosition < -PIPE_WIDTH) {
      setPipePosition(GAME_WIDTH);
      setPipeHeight(Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 50)) + 25);
      setScore((s) => s + 1);
    }
  }, [pipePosition, gameHasStarted]);

  useEffect(() => {
    // Collision detection
    const birdLeft = 50;
    const birdRight = 50 + BIRD_SIZE;
    const birdTop = birdPosition;
    const birdBottom = birdPosition + BIRD_SIZE;

    const pipeLeft = pipePosition;
    const pipeRight = pipePosition + PIPE_WIDTH;

    const hasCollidedWithTopPipe = 
      birdRight > pipeLeft && 
      birdLeft < pipeRight && 
      birdTop < pipeHeight;

    const hasCollidedWithBottomPipe = 
      birdRight > pipeLeft && 
      birdLeft < pipeRight && 
      birdBottom > (GAME_HEIGHT - bottomPipeHeight);

    const isOutOfBounds = birdBottom >= GAME_HEIGHT || birdTop <= 0;

    if (hasCollidedWithTopPipe || hasCollidedWithBottomPipe || isOutOfBounds) {
      if (gameHasStarted) {
        setGameHasStarted(false);
        setIsGameOver(true);
        setHighScore((prev) => {
          const newHigh = score > prev ? score : prev;
          localStorage.setItem('flappyHighScore', newHigh);
          return newHigh;
        });
        setBirdPosition(GAME_HEIGHT / 2);
        setPipePosition(GAME_WIDTH);
      }
    }
  }, [birdPosition, pipeHeight, bottomPipeHeight, pipePosition, gameHasStarted, score]);

  const handleClick = useCallback(() => {
    let newBirdPosition = birdPosition + JUMP;
    if (!gameHasStarted) {
      setGameHasStarted(true);
      setIsGameOver(false);
      setScore(0);
      setBirdPosition(GAME_HEIGHT / 2);
      setPipePosition(GAME_WIDTH);
    } else {
      if (newBirdPosition < 0) {
        setBirdPosition(0);
      } else {
        setBirdPosition(newBirdPosition);
      }
    }
  }, [birdPosition, gameHasStarted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClick]);

  return (
    <div className="game-container" onClick={handleClick}>
      <div className="game-box" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        <div 
          className="bird" 
          style={{ 
            top: birdPosition, 
            width: BIRD_SIZE, 
            height: BIRD_SIZE,
            transform: `rotate(${gameHasStarted ? Math.min(birdPosition * 0.1 - 20, 90) : 0}deg)`
          }} 
        />
        <div 
          className="pipe top" 
          style={{ 
            left: pipePosition, 
            width: PIPE_WIDTH, 
            height: pipeHeight 
          }} 
        />
        <div 
          className="pipe bottom" 
          style={{ 
            left: pipePosition, 
            width: PIPE_WIDTH, 
            height: bottomPipeHeight, 
            bottom: 0 
          }} 
        />
        {!gameHasStarted && (
          <div className="start-overlay">
            <div className="start-message">
              {isGameOver ? "GAME OVER" : "FLAPPY BIRD"}
              {isGameOver && (
                <div style={{ fontSize: '32px', textShadow: 'none', color: '#ffb900' }}>
                  Score: {score}
                </div>
              )}
              <span className="start-subtext">Click or Press Space to Start/Jump</span>
            </div>
          </div>
        )}
      </div>
      <div className="score-board">
        <div className="score">Score: {score}</div>
        <div className="score">High: {highScore}</div>
      </div>
    </div>
  );
}

export default App;
