import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Trophy, Coins, Users, Zap, Shield, Database, Network } from 'lucide-react';

const HackittyGame = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, level-complete
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [mousePosition, setMousePosition] = useState({ x: 8, y: 8 });
  const [cyberCoins, setCyberCoins] = useState(0);
  const [collectibles, setCollectibles] = useState([]);
  const [playerSkills, setPlayerSkills] = useState([]);
  const [mouseSkills, setMouseSkills] = useState([]);
  const [gameGrid, setGameGrid] = useState([]);
  const [language, setLanguage] = useState('en');
  const [moveCount, setMoveCount] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  const text = {
    en: {
      title: "HACKITTY",
      subtitle: "Chase the Cyber Mouse Through the Network!",
      play: "Play",
      pause: "Pause",
      reset: "Reset Level",
      level: "Level",
      coins: "CyberCoins",
      skills: "Skills Unlocked",
      caught: "Mouse Caught!",
      escaped: "Mouse Escaped!",
      parentMode: "Ask Parents to Design a Maze!",
      difficulty: "Difficulty Level",
      instructions: "Move Hackitty to catch the cyber mouse before it collects all the data crystals!",
      collectiblesTitle: "Collectibles & CS Concepts",
      howToPlayTitle: "How to Play",
      howToPlay: [
        "🐱 You are Hackitty, a cyber-detective cat",
        "🐭 Chase the AI cyborg mouse through the network",
        "💎 Collect data crystals to learn CS concepts",
        "⚡ Unlock new abilities with each collectible",
        "🏆 Catch the mouse before it escapes!"
      ]
    },
    es: {
      title: "HACKITTY",
      subtitle: "¡Persigue al Ratón Cyber por la Red!",
      play: "Jugar",
      pause: "Pausa",
      reset: "Reiniciar Nivel",
      level: "Nivel",
      coins: "CiberMonedas",
      skills: "Habilidades Desbloqueadas",
      caught: "¡Ratón Capturado!",
      escaped: "¡El Ratón Escapó!",
      parentMode: "¡Pide a tus Padres que Diseñen un Laberinto!",
      difficulty: "Nivel de Dificultad",
      instructions: "¡Mueve a Hackitty para atrapar al ratón cyber antes de que recoja todos los cristales de datos!",
      collectiblesTitle: "Coleccionables y Conceptos de Ciencias de la Computación",
      howToPlayTitle: "Cómo Jugar",
      howToPlay: [
        "🐱 Eres Hackitty, un gato cyber-detective",
        "🐭 Persigue al ratón cyborg IA por la red",
        "💎 Recoge cristales de datos para aprender conceptos de CC",
        "⚡ Desbloquea nuevas habilidades con cada coleccionable",
        "🏆 ¡Atrapa al ratón antes de que escape!"
      ]
    }
  };

  const collectibleTypes = [
    {
      id: 'algorithm',
      name: {
        en: 'Algorithm Gem',
        es: 'Gema de Algoritmo'
      },
      icon: '💎',
      concept: {
        en: 'Algorithm - Step-by-step instructions for solving problems',
        es: 'Algoritmo - Instrucciones paso a paso para resolver problemas'
      },
      skill: {
        en: 'Unlocks: Auto-pathfinding to nearest collectible',
        es: 'Desbloquea: Búsqueda automática al coleccionable más cercano'
      },
      coins: 10
    },
    {
      id: 'loop',
      name: {
        en: 'Loop Crystal',
        es: 'Cristal de Bucle'
      },
      icon: '🔄',
      concept: {
        en: 'Loop - Repeats actions automatically until a condition is met',
        es: 'Bucle - Repite acciones automáticamente hasta que se cumple una condición'
      },
      skill: {
        en: 'Unlocks: Multi-move ability (move 2 spaces at once)',
        es: 'Desbloquea: Habilidad multi-movimiento (mover 2 espacios a la vez)'
      },
      coins: 15
    },
    {
      id: 'binary',
      name: {
        en: 'Binary Token',
        es: 'Token Binario'
      },
      icon: '⚡',
      concept: {
        en: 'Binary - Computer language using only 0s and 1s',
        es: 'Binario - Lenguaje de computadora usando solo 0s y 1s'
      },
      skill: {
        en: 'Unlocks: Phase through one barrier per level',
        es: 'Desbloquea: Atravesar una barrera por nivel'
      },
      coins: 20
    },
    {
      id: 'encryption',
      name: {
        en: 'Crypto Shield',
        es: 'Escudo Cripto'
      },
      icon: '🛡️',
      concept: {
        en: 'Encryption - Scrambles data to keep it secure',
        es: 'Encriptación - Codifica datos para mantenerlos seguros'
      },
      skill: {
        en: 'Unlocks: Immunity to mouse traps for 3 moves',
        es: 'Desbloquea: Inmunidad a trampas del ratón por 3 movimientos'
      },
      coins: 25
    }
  ];

  // Initialize game grid
  useEffect(() => {
    initializeLevel(currentLevel);
  }, [currentLevel]);

  const initializeLevel = (level) => {
    const size = Math.min(10, 6 + level);
    const grid = Array(size).fill(null).map(() => Array(size).fill('empty'));
    
    // Add barriers
    const barrierCount = Math.floor(size * 0.3);
    for (let i = 0; i < barrierCount; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (!(x === 1 && y === 1) && !(x === size-2 && y === size-2)) {
        grid[y][x] = 'barrier';
      }
    }

    // Add collectibles
    const levelCollectibles = [];
    const collectibleCount = Math.min(level + 2, 6);
    for (let i = 0; i < collectibleCount; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
      } while (grid[y][x] !== 'empty' || (x === 1 && y === 1) || (x === size-2 && y === size-2));
      
      const collectible = collectibleTypes[i % collectibleTypes.length];
      levelCollectibles.push({ ...collectible, x, y, collected: false });
      grid[y][x] = 'collectible';
    }

    setGameGrid(grid);
    setCollectibles(levelCollectibles);
    setPlayerPosition({ x: 1, y: 1 });
    setMousePosition({ x: size-2, y: size-2 });
    setMoveCount(0);
  };

  const movePlayer = (direction) => {
    if (gameState !== 'playing') return;

    const { x, y } = playerPosition;
    let newX = x, newY = y;

    switch (direction) {
      case 'up': newY = Math.max(0, y - 1); break;
      case 'down': newY = Math.min(gameGrid.length - 1, y + 1); break;
      case 'left': newX = Math.max(0, x - 1); break;
      case 'right': newX = Math.min(gameGrid[0].length - 1, x + 1); break;
    }

    // Check for barriers
    if (gameGrid[newY][newX] === 'barrier') return;

    setPlayerPosition({ x: newX, y: newY });
    setMoveCount(prev => prev + 1);

    // Check for collectible pickup
    const collectible = collectibles.find(c => c.x === newX && c.y === newY && !c.collected);
    if (collectible) {
      setCollectibles(prev => prev.map(c => 
        c.x === newX && c.y === newY ? { ...c, collected: true } : c
      ));
      setCyberCoins(prev => prev + collectible.coins);
      setPlayerSkills(prev => [...prev, collectible]);
    }

    // Move mouse after player moves
    setTimeout(moveMouse, 500);
  };

  const moveMouse = () => {
    if (gameState !== 'playing') return;
    
    setIsMouseMoving(true);
    const { x: mouseX, y: mouseY } = mousePosition;
    
    // Mouse AI: try to reach uncollected collectibles
    const availableCollectibles = collectibles.filter(c => !c.collected);
    if (availableCollectibles.length > 0) {
      const target = availableCollectibles[0];
      let newMouseX = mouseX;
      let newMouseY = mouseY;
      
      // Simple pathfinding toward target
      if (target.x > mouseX) newMouseX = Math.min(gameGrid[0].length - 1, mouseX + 1);
      else if (target.x < mouseX) newMouseX = Math.max(0, mouseX - 1);
      else if (target.y > mouseY) newMouseY = Math.min(gameGrid.length - 1, mouseY + 1);
      else if (target.y < mouseY) newMouseY = Math.max(0, mouseY - 1);
      
      // Check for barriers (mouse can phase through some with skills)
      if (gameGrid[newMouseY][newMouseX] !== 'barrier') {
        setMousePosition({ x: newMouseX, y: newMouseY });
        
        // Check if mouse reached a collectible
        const mouseCollectible = collectibles.find(c => c.x === newMouseX && c.y === newMouseY && !c.collected);
        if (mouseCollectible) {
          setCollectibles(prev => prev.map(c => 
            c.x === newMouseX && c.y === newMouseY ? { ...c, collected: true } : c
          ));
          setMouseSkills(prev => [...prev, mouseCollectible]);
        }
      }
    }
    
    setTimeout(() => setIsMouseMoving(false), 300);
  };

  // Check win/lose conditions
  useEffect(() => {
    if (gameState === 'playing') {
      // Check if player caught mouse
      if (playerPosition.x === mousePosition.x && playerPosition.y === mousePosition.y) {
        setGameState('level-complete');
        setCyberCoins(prev => prev + 50); // Bonus for catching mouse
      }
      
      // Check if all collectibles are taken
      const remaining = collectibles.filter(c => !c.collected);
      if (remaining.length === 0) {
        // Determine winner based on who got more collectibles
        if (playerSkills.length > mouseSkills.length) {
          setGameState('level-complete');
        }
      }
    }
  }, [playerPosition, mousePosition, collectibles, gameState]);

  const Logo = () => (
    <div className="flex items-center justify-center mb-4">
      <svg viewBox="0 0 200 200" className="w-16 h-16 mr-3">
        <rect width="200" height="200" fill="#1a1a1a"/>
        <circle cx="100" cy="110" r="60" fill="#00BFFF" stroke="#000" strokeWidth="3"/>
        <ellipse cx="100" cy="65" rx="55" ry="8" fill="#00BFFF" stroke="#000" strokeWidth="3"/>
        <rect x="60" y="35" width="80" height="30" rx="15" fill="#00BFFF" stroke="#000" strokeWidth="3"/>
        <rect x="60" y="50" width="80" height="6" fill="#00BFFF" stroke="#000" strokeWidth="2"/>
        <ellipse cx="82.5" cy="104" rx="15" ry="9" fill="#00BFFF" stroke="#000" strokeWidth="2"/>
        <ellipse cx="117.5" cy="104" rx="15" ry="9" fill="#00BFFF" stroke="#000" strokeWidth="2"/>
        <rect x="97.5" y="101" width="5" height="6" fill="#00BFFF" stroke="#000" strokeWidth="2"/>
        <polygon points="100,125 95,135 105,135" fill="#00BFFF" stroke="#000" strokeWidth="2"/>
        <path d="M 100 140 Q 90 150 85 145" stroke="#000" strokeWidth="2" fill="none"/>
        <path d="M 100 140 Q 110 150 115 145" stroke="#000" strokeWidth="2" fill="none"/>
        <line x1="60" y1="120" x2="40" y2="115" stroke="#000" strokeWidth="2"/>
        <line x1="60" y1="130" x2="40" y2="130" stroke="#000" strokeWidth="2"/>
        <line x1="140" y1="120" x2="160" y2="115" stroke="#000" strokeWidth="2"/>
        <line x1="140" y1="130" x2="160" y2="130" stroke="#000" strokeWidth="2"/>
      </svg>
      <div>
        <h1 className="text-4xl font-bold text-cyan-400 tracking-wider">{text[language].title}</h1>
        <p className="text-cyan-300 text-sm">{text[language].subtitle}</p>
      </div>
    </div>
  );

  const GameBoard = () => (
    <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500">
      <div className="grid gap-1 mb-4" style={{ 
        gridTemplateColumns: `repeat(${gameGrid[0]?.length || 10}, minmax(0, 1fr))`,
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {gameGrid.map((row, y) =>
          row.map((cell, x) => {
            const isPlayer = playerPosition.x === x && playerPosition.y === y;
            const isMouse = mousePosition.x === x && mousePosition.y === y;
            const collectible = collectibles.find(c => c.x === x && c.y === y && !c.collected);
            
            return (
              <div
                key={`${x}-${y}`}
                className={`aspect-square flex items-center justify-center text-lg border border-gray-700 relative
                  ${cell === 'barrier' ? 'bg-red-900' : 'bg-gray-800'}
                  ${isPlayer ? 'ring-2 ring-cyan-400' : ''}
                  ${isMouse ? 'ring-2 ring-red-400' : ''}
                `}
              >
                {cell === 'barrier' && '🚫'}
                {collectible && <span>{collectible.icon}</span>}
                {isPlayer && <span className="absolute">🐱</span>}
                {isMouse && <span className={`absolute ${isMouseMoving ? 'animate-pulse' : ''}`}>🐭</span>}
              </div>
            );
          })
        )}
      </div>
      
      {/* Game Controls */}
      <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-4">
        <div></div>
        <button onClick={() => movePlayer('up')} className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded">↑</button>
        <div></div>
        <button onClick={() => movePlayer('left')} className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded">←</button>
        <div className="bg-gray-700 p-2 rounded text-center">🐱</div>
        <button onClick={() => movePlayer('right')} className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded">→</button>
        <div></div>
        <button onClick={() => movePlayer('down')} className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded">↓</button>
        <div></div>
      </div>
    </div>
  );

  const StatsPanel = () => (
    <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500 space-y-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center"><Coins className="w-4 h-4 mr-2 text-yellow-400"/>{text[language].coins}</span>
        <span className="text-yellow-400 font-bold">{cyberCoins}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span>{text[language].level}</span>
        <span className="text-cyan-400 font-bold">{currentLevel}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span>Moves</span>
        <span className="text-green-400 font-bold">{moveCount}</span>
      </div>

      {playerSkills.length > 0 && (
        <div>
          <h4 className="text-cyan-400 font-semibold mb-2">{text[language].skills}</h4>
          <div className="space-y-2">
            {playerSkills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-2 rounded text-xs">
                <div className="font-semibold text-cyan-300">{skill.name[language]}</div>
                <div className="text-gray-300">{skill.concept[language]}</div>
                <div className="text-green-400">{skill.skill[language]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-4xl mx-auto">
          <Logo />
          
          <div className="text-center mb-8">
            <p className="text-gray-300 mb-4">{text[language].instructions}</p>
            
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded ${language === 'en' ? 'bg-cyan-600' : 'bg-gray-700'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-4 py-2 rounded ${language === 'es' ? 'bg-cyan-600' : 'bg-gray-700'}`}
              >
                Español
              </button>
            </div>
            
            <button
              onClick={() => setGameState('playing')}
              className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg text-xl font-bold flex items-center mx-auto"
            >
              <Play className="w-6 h-6 mr-2" />
              {text[language].play}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{text[language].collectiblesTitle}</h3>
              <div className="space-y-3">
                {collectibleTypes.map(item => (
                  <div key={item.id} className="bg-gray-800 p-3 rounded">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <span className="font-semibold text-cyan-300">{item.name[language]}</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-1">{item.concept[language]}</div>
                    <div className="text-sm text-green-400">{item.skill[language]}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-cyan-500">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{text[language].howToPlayTitle}</h3>
              <div className="space-y-3 text-gray-300">
                {text[language].howToPlay.map((instruction, index) => (
                  <p key={index}>{instruction}</p>
                ))}
              </div>
              
              <button
                onClick={() => alert(text[language].parentMode)}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center justify-center"
              >
                <Users className="w-4 h-4 mr-2" />
                {text[language].parentMode}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Logo />
          
          <div className="flex gap-2">
            <button
              onClick={() => setGameState(gameState === 'playing' ? 'paused' : 'playing')}
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded flex items-center"
            >
              {gameState === 'playing' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {gameState === 'playing' ? text[language].pause : text[language].play}
            </button>
            
            <button
              onClick={() => initializeLevel(currentLevel)}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {text[language].reset}
            </button>
            
            <button
              onClick={() => setGameState('menu')}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Menu
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameBoard />
          </div>
          
          <div>
            <StatsPanel />
          </div>
        </div>

        {gameState === 'level-complete' && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg border border-cyan-500 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">{text[language].caught}</h2>
              <p className="text-gray-300 mb-4">Level {currentLevel} Complete!</p>
              <p className="text-yellow-400 mb-6">+50 CyberCoins Bonus!</p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentLevel(prev => prev + 1);
                    setGameState('playing');
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
                >
                  Next Level
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
                >
                  Main Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackittyGame;