import React, { useState, useEffect, useRef, useCallback } from 'react';

const JumpGame: React.FC = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(200);
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState<Array<{ x: number; height: number; id: number }>>([]);
  const gameLoopRef = useRef<number>();
  const lastObstacleRef = useRef(0);
  const obstacleIdRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const GROUND_Y = 200;
  const JUMP_HEIGHT = 100;
  const JUMP_DURATION = 600;
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_SPEED = 3;
  const PLAYER_SIZE = 20;

  const jump = useCallback(() => {
    if (!isJumping && !gameOver && isGameActive) {
      setIsJumping(true);
      setPlayerY(GROUND_Y - JUMP_HEIGHT);
      
      setTimeout(() => {
        setPlayerY(GROUND_Y);
        setIsJumping(false);
      }, JUMP_DURATION);
    }
  }, [isJumping, gameOver, isGameActive]);

  const startGame = () => {
    setIsGameActive(true);
    setGameOver(false);
    setScore(0);
    setPlayerY(GROUND_Y);
    setIsJumping(false);
    setObstacles([]);
    lastObstacleRef.current = 0;
    obstacleIdRef.current = 0;
  };

  const stopGame = () => {
    setIsGameActive(false);
    setGameOver(true);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  const checkCollision = useCallback((playerX: number, playerY: number, obstacles: Array<{ x: number; height: number; id: number }>) => {
    const playerLeft = playerX;
    const playerRight = playerX + PLAYER_SIZE;
    const playerTop = playerY;
    const playerBottom = playerY + PLAYER_SIZE;

    for (const obstacle of obstacles) {
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + OBSTACLE_WIDTH;
      const obstacleTop = GROUND_Y + PLAYER_SIZE - obstacle.height;
      const obstacleBottom = GROUND_Y + PLAYER_SIZE;

      if (
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight &&
        playerBottom > obstacleTop &&
        playerTop < obstacleBottom
      ) {
        return true;
      }
    }
    return false;
  }, []);

  const gameLoop = useCallback(() => {
    if (!isGameActive || gameOver) return;

    setObstacles(prevObstacles => {
      const newObstacles = prevObstacles
        .map(obstacle => ({ ...obstacle, x: obstacle.x - OBSTACLE_SPEED }))
        .filter(obstacle => obstacle.x > -OBSTACLE_WIDTH);

      // Add new obstacles
      if (Date.now() - lastObstacleRef.current > 2000) {
        lastObstacleRef.current = Date.now();
        obstacleIdRef.current++;
        newObstacles.push({
          x: 400,
          height: 30 + Math.random() * 20,
          id: obstacleIdRef.current
        });
      }

      // Check collision
      if (checkCollision(50, playerY, newObstacles)) {
        stopGame();
        return prevObstacles;
      }

      // Update score
      newObstacles.forEach(obstacle => {
        if (obstacle.x === 50 - OBSTACLE_SPEED) {
          setScore(prev => prev + 10);
        }
      });

      return newObstacles;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [isGameActive, gameOver, playerY, checkCollision]);

  useEffect(() => {
    if (isGameActive && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isGameActive, gameOver, gameLoop]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!isGameActive && !gameOver) {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, isGameActive, gameOver]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Data Jump 🎮
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Help the data packet jump over obstacles! Press SPACE to jump.
        </p>
        <div className="text-lg font-semibold text-primary-600 dark:text-primary-400 mt-2">
          Score: {score}
        </div>
      </div>

      <div 
        ref={gameAreaRef}
        className="relative bg-gradient-to-b from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden"
        style={{ width: '400px', height: '250px', margin: '0 auto' }}
        onClick={() => {
          if (!isGameActive && !gameOver) {
            startGame();
          } else {
            jump();
          }
        }}
      >
        {/* Ground */}
        <div 
          className="absolute bg-green-400 dark:bg-green-600"
          style={{ 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: `${250 - GROUND_Y - PLAYER_SIZE}px` 
          }}
        />

        {/* Player */}
        <div
          className="absolute bg-blue-500 rounded transition-all duration-150 flex items-center justify-center text-white font-bold text-xs"
          style={{
            width: `${PLAYER_SIZE}px`,
            height: `${PLAYER_SIZE}px`,
            left: '50px',
            bottom: `${250 - playerY - PLAYER_SIZE}px`,
            transform: isJumping ? 'rotate(-10deg)' : 'rotate(0deg)'
          }}
        >
          📊
        </div>

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="absolute bg-red-500 dark:bg-red-400"
            style={{
              width: `${OBSTACLE_WIDTH}px`,
              height: `${obstacle.height}px`,
              left: `${obstacle.x}px`,
              bottom: `${250 - GROUND_Y - PLAYER_SIZE}px`
            }}
          />
        ))}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Game Over!
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Final Score: {score}
              </p>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!isGameActive && !gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Ready to Jump?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Press SPACE or click to start!
              </p>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Use SPACE key or click to jump • Avoid the red obstacles
        </p>
      </div>
    </div>
  );
};

export default JumpGame;