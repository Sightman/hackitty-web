import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Trophy, Coins, Users, Monitor, Smartphone, Server, Router, Wifi, HardDrive } from 'lucide-react';

const HackittyGame = () => {
  const [gameState, setGameState] = useState('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 9, y: 9 });
  const [cyberCoins, setCyberCoins] = useState(0);
  const [collectibles, setCollectibles] = useState([]);
  const [playerSkills, setPlayerSkills] = useState([]);
  const [networkGrid, setNetworkGrid] = useState([]);
  const [language, setLanguage] = useState('en');
  const [commandPool, setCommandPool] = useState([]);
  const [tracingProgram, setTracingProgram] = useState([]);
  const [isExecutingProgram, setIsExecutingProgram] = useState(false);
  const [mainframeCompromised, setMainframeCompromised] = useState(0);

  const text = {
    en: {
      title: "HACKITTY",
      subtitle: "Stop the Cyber Mouse from Taking Over the Network!",
      play: "Play",
      pause: "Pause",
      reset: "Reset Level",
      level: "Level",
      coins: "CyberCoins",
      skills: "Skills Unlocked",
      caught: "Network Secured!",
      escaped: "Mainframe Compromised!",
      parentMode: "Ask Parents to Design a Network!",
      instructions: "Program Hackitty's trace route to stop the cyber mouse from reaching the mainframe!",
      collectiblesTitle: "Network Security Tools & CS Concepts",
      howToPlayTitle: "How to Play",
      howToPlay: [
        "🐱 You are Hackitty, a network security specialist",
        "🐭 Stop the AI cyborg mouse from compromising the mainframe",
        "🔧 Collect security tools and learn CS concepts",
        "⚡ Program your trace route using drag-and-drop commands",
        "🛡️ Secure the network before it's too late!"
      ],
      commandPool: "Available Commands",
      tracingProgram: "Tracing Program",
      executeProgram: "Execute Trace",
      clearProgram: "Clear Program",
      mainframeStatus: "Mainframe Security",
      networkNodes: "Network Topology"
    },
    es: {
      title: "HACKITTY",
      subtitle: "¡Detén al Ratón Cyber de Tomar Control de la Red!",
      play: "Jugar",
      pause: "Pausa",
      reset: "Reiniciar Nivel",
      level: "Nivel",
      coins: "CiberMonedas",
      skills: "Habilidades Desbloqueadas",
      caught: "¡Red Asegurada!",
      escaped: "¡Servidor Principal Comprometido!",
      parentMode: "¡Pide a tus Padres que Diseñen una Red!",
      instructions: "¡Programa la ruta de rastreo de Hackitty para detener al ratón cyber antes de que llegue al servidor principal!",
      collectiblesTitle: "Herramientas de Seguridad de Red y Conceptos de CC",
      howToPlayTitle: "Cómo Jugar",
      howToPlay: [
        "🐱 Eres Hackitty, un especialista en seguridad de redes",
        "🐭 Detén al ratón cyborg IA de comprometer el servidor principal",
        "🔧 Recoge herramientas de seguridad y aprende conceptos de CC",
        "⚡ Programa tu ruta de rastreo usando comandos arrastrar y soltar",
        "🛡️ ¡Asegura la red antes de que sea demasiado tarde!"
      ],
      commandPool: "Comandos Disponibles",
      tracingProgram: "Programa de Rastreo",
      executeProgram: "Ejecutar Rastreo",
      clearProgram: "Limpiar Programa",
      mainframeStatus: "Seguridad del Servidor Principal",
      networkNodes: "Topología de Red"
    }
  };

  const collectibleTypes = [
    {
      id: 'firewall',
      name: {
        en: 'Firewall Protocol',
        es: 'Protocolo Firewall'
      },
      icon: '🛡️',
      concept: {
        en: 'Firewall - Network security barrier that filters traffic',
        es: 'Firewall - Barrera de seguridad que filtra el tráfico de red'
      },
      skill: {
        en: 'Unlocks: Block command - stops mouse for 1 turn',
        es: 'Desbloquea: Comando bloquear - detiene al ratón por 1 turno'
      },
      command: 'BLOCK',
      coins: 15
    },
    {
      id: 'encryption',
      name: {
        en: 'Encryption Key',
        es: 'Clave de Encriptación'
      },
      icon: '🔐',
      concept: {
        en: 'Encryption - Scrambles data to protect it from unauthorized access',
        es: 'Encriptación - Codifica datos para protegerlos del acceso no autorizado'
      },
      skill: {
        en: 'Unlocks: Encrypt command - makes you invisible for 2 moves',
        es: 'Desbloquea: Comando encriptar - te hace invisible por 2 movimientos'
      },
      command: 'ENCRYPT',
      coins: 20
    },
    {
      id: 'tracer',
      name: {
        en: 'Network Tracer',
        es: 'Rastreador de Red'
      },
      icon: '📡',
      concept: {
        en: 'Packet Tracing - Follows data packets through network paths',
        es: 'Rastreo de Paquetes - Sigue paquetes de datos por rutas de red'
      },
      skill: {
        en: 'Unlocks: Trace command - reveals mouse next 3 moves',
        es: 'Desbloquea: Comando rastrear - revela próximos 3 movimientos del ratón'
      },
      command: 'TRACE',
      coins: 25
    },
    {
      id: 'antivirus',
      name: {
        en: 'Antivirus Scanner',
        es: 'Escáner Antivirus'
      },
      icon: '🦠',
      concept: {
        en: 'Antivirus - Software that detects and removes malicious code',
        es: 'Antivirus - Software que detecta y elimina código malicioso'
      },
      skill: {
        en: 'Unlocks: Scan command - teleport to any network node',
        es: 'Desbloquea: Comando escanear - teletransporte a cualquier nodo de red'
      },
      command: 'SCAN',
      coins: 30
    }
  ];

  const availableCommands = [
    { id: 'MOVE_UP', name: 'MOVE ↑', description: 'Move one node up', color: 'bg-blue-600' },
    { id: 'MOVE_DOWN', name: 'MOVE ↓', description: 'Move one node down', color: 'bg-blue-600' },
    { id: 'MOVE_LEFT', name: 'MOVE ←', description: 'Move one node left', color: 'bg-blue-600' },
    { id: 'MOVE_RIGHT', name: 'MOVE →', description: 'Move one node right', color: 'bg-blue-600' },
    { id: 'LOOP_3', name: 'LOOP 3x', description: 'Repeat next command 3 times', color: 'bg-purple-600' }
  ];

  useEffect(() => {
    initializeNetwork(currentLevel);
  }, [currentLevel]);

  const initializeNetwork = (level) => {
    const size = 10;
    const grid = Array(size).fill(null).map(() => Array(size).fill({ type: 'empty' }));
    
    const nodePositions = [
      { x: 0, y: 0, type: 'workstation' },
      { x: 2, y: 0, type: 'router' },
      { x: 4, y: 0, type: 'server' },
      { x: 6, y: 0, type: 'workstation' },
      { x: 8, y: 0, type: 'smartphone' },
      { x: 0, y: 2, type: 'smartphone' },
      { x: 2, y: 2, type: 'switch' },
      { x: 4, y: 2, type: 'router' },
      { x: 6, y: 2, type: 'server' },
      { x: 8, y: 2, type: 'workstation' },
      { x: 1, y: 4, type: 'router' },
      { x: 3, y: 4, type: 'server' },
      { x: 5, y: 4, type: 'switch' },
      { x: 7, y: 4, type: 'workstation' },
      { x: 9, y: 9, type: 'mainframe' }
    ];

    nodePositions.forEach(({ x, y, type }) => {
      if (x < size && y < size) {
        grid[y][x] = { type };
      }
    });

    const connections = [
      [[0,0], [2,0]], [[2,0], [4,0]], [[4,0], [6,0]], [[6,0], [8,0]],
      [[0,0], [0,2]], [[2,0], [2,2]], [[4,0], [4,2]], [[6,0], [6,2]], [[8,0], [8,2]],
      [[0,2], [2,2]], [[2,2], [4,2]], [[4,2], [6,2]], [[6,2], [8,2]],
      [[1,4], [3,4]], [[3,4], [5,4]], [[5,4], [7,4]],
      [[2,2], [1,4]], [[4,2], [3,4]], [[6,2], [5,4]], [[8,2], [7,4]],
      [[7,4], [9,9]]
    ];

    connections.forEach(([[x1,y1], [x2,y2]]) => {
      if (x1 === x2) {
        const startY = Math.min(y1, y2);
        const endY = Math.max(y1, y2);
        for (let y = startY + 1; y < endY; y++) {
          if (grid[y][x1].type === 'empty') {
            grid[y][x1] = { type: 'path' };
          }
        }
      } else {
        const startX = Math.min(x1, x2);
        const endX = Math.max(x1, x2);
        for (let x = startX + 1; x < endX; x++) {
          if (grid[y1][x].type === 'empty') {
            grid[y1][x] = { type: 'path' };
          }
        }
      }
    });

    const levelCollectibles = [];
    const collectibleCount = Math.min(level + 1, 4);
    const availableNodes = nodePositions.filter(node => 
      node.type !== 'mainframe' && !(node.x === 0 && node.y === 0)
    );

    for (let i = 0; i < collectibleCount; i++) {
      const nodeIndex = Math.floor(Math.random() * availableNodes.length);
      const node = availableNodes[nodeIndex];
      const collectible = collectibleTypes[i % collectibleTypes.length];
      levelCollectibles.push({ 
        ...collectible, 
        x: node.x, 
        y: node.y, 
        collected: false 
      });
      availableNodes.splice(nodeIndex, 1);
    }

    setNetworkGrid(grid);
    setCollectibles(levelCollectibles);
    setPlayerPosition({ x: 0, y: 0 });
    setMousePosition({ x: 9, y: 9 });
    setMainframeCompromised(0);
    setTracingProgram([]);
    updateCommandPool();
  };

  const updateCommandPool = () => {
    let commands = [...availableCommands];
    playerSkills.forEach(skill => {
      if (skill.command) {
        commands.push({
          id: skill.command,
          name: skill.command,
          description: skill.skill[language],
          color: 'bg-cyan-600'
        });
      }
    });
    setCommandPool(commands);
  };

  const executeTracingProgram = async () => {
    if (tracingProgram.length === 0 || isExecutingProgram) return;
    
    setIsExecutingProgram(true);
    setGameState('playing');
    
    for (let i = 0; i < tracingProgram.length; i++) {
      const command = tracingProgram[i];
      await new Promise(resolve => setTimeout(resolve, 800));
      
      switch (command.id) {
        case 'MOVE_UP':
          movePlayer('up');
          break;
        case 'MOVE_DOWN':
          movePlayer('down');
          break;
        case 'MOVE_LEFT':
          movePlayer('left');
          break;
        case 'MOVE_RIGHT':
          movePlayer('right');
          break;
        default:
          break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 400));
      moveMouse();
    }
    
    setIsExecutingProgram(false);
  };

  const movePlayer = (direction) => {
    const { x, y } = playerPosition;
    let newX = x, newY = y;

    switch (direction) {
      case 'up': newY = Math.max(0, y - 1); break;
      case 'down': newY = Math.min(networkGrid.length - 1, y + 1); break;
      case 'left': newX = Math.max(0, x - 1); break;
      case 'right': newX = Math.min(networkGrid[0].length - 1, x + 1); break;
    }

    const targetCell = networkGrid[newY] && networkGrid[newY][newX];
    if (!targetCell || targetCell.type === 'empty') return;

    setPlayerPosition({ x: newX, y: newY });

    const collectible = collectibles.find(c => c.x === newX && c.y === newY && !c.collected);
    if (collectible) {
      setCollectibles(prev => prev.map(c => 
        c.x === newX && c.y === newY ? { ...c, collected: true } : c
      ));
      setCyberCoins(prev => prev + collectible.coins);
      setPlayerSkills(prev => [...prev, collectible]);
      updateCommandPool();
    }
  };

  const moveMouse = () => {
    if (gameState !== 'playing') return;
    
    const { x: mouseX, y: mouseY } = mousePosition;
    let newMouseX = mouseX;
    let newMouseY = mouseY;
    
    if (mouseX < 9) newMouseX = mouseX + 1;
    else if (mouseY < 9) newMouseY = mouseY + 1;
    
    const targetCell = networkGrid[newMouseY] && networkGrid[newMouseY][newMouseX];
    if (targetCell && targetCell.type !== 'empty') {
      setMousePosition({ x: newMouseX, y: newMouseY });
      
      if (newMouseX === 9 && newMouseY === 9) {
        setMainframeCompromised(100);
        setGameState('game-over');
      }
      
      const mouseCollectible = collectibles.find(c => c.x === newMouseX && c.y === newMouseY && !c.collected);
      if (mouseCollectible) {
        setCollectibles(prev => prev.map(c => 
          c.x === newMouseX && c.y === newMouseY ? { ...c, collected: true } : c
        ));
        setMainframeCompromised(prev => Math.min(100, prev + 20));
      }
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      if (playerPosition.x === mousePosition.x && playerPosition.y === mousePosition.y) {
        setGameState('level-complete');
        setCyberCoins(prev => prev + 100);
      }
    }
  }, [playerPosition, mousePosition, gameState]);

  const getNodeIcon = (nodeType) => {
    switch (nodeType) {
      case 'workstation': return Monitor;
      case 'smartphone': return Smartphone;
      case 'server': return Server;
      case 'router': return Router;
      case 'switch': return Wifi;
      case 'mainframe': return HardDrive;
      default: return null;
    }
  };

  const getNodeColor = (nodeType) => {
    switch (nodeType) {
      case 'workstation': return 'text-blue-400';
      case 'smartphone': return 'text-green-400';
      case 'server': return 'text-purple-400';
      case 'router': return 'text-orange-400';
      case 'switch': return 'text-yellow-400';
      case 'mainframe': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

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

  const NetworkBoard = () => (
    <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-cyan-400 font-semibold">{text[language].networkNodes}</h3>
        <div className="flex items-center">
          <span className="text-sm mr-2">{text[language].mainframeStatus}:</span>
          <div className="w-24 h-3 bg-gray-700 rounded-full">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                mainframeCompromised > 60 ? 'bg-red-500' : 
                mainframeCompromised > 30 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${mainframeCompromised}%` }}
            />
          </div>
          <span className="text-sm ml-2">{mainframeCompromised}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-10 gap-1 mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
        {networkGrid.map((row, y) =>
          row.map((cell, x) => {
            const isPlayer = playerPosition.x === x && playerPosition.y === y;
            const isMouse = mousePosition.x === x && mousePosition.y === y;
            const collectible = collectibles.find(c => c.x === x && c.y === y && !c.collected);
            const NodeIcon = getNodeIcon(cell.type);
            
            return (
              <div
                key={`${x}-${y}`}
                className={`aspect-square flex items-center justify-center text-xs border relative
                  ${cell.type === 'empty' ? 'border-gray-800 bg-gray-900' : 
                    cell.type === 'path' ? 'border-cyan-700 bg-cyan-900/20' :
                    'border-gray-600 bg-gray-800'}
                  ${isPlayer ? 'ring-2 ring-cyan-400' : ''}
                  ${isMouse ? 'ring-2 ring-red-400' : ''}
                  ${cell.type === 'mainframe' ? 'bg-red-900/50 ring-2 ring-red-500' : ''}
                `}
              >
                {cell.type === 'path' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-full bg-cyan-400/50" />
                    <div className="absolute w-full h-1 bg-cyan-400/50" />
                  </div>
                )}
                
                {NodeIcon && (
                  <NodeIcon 
                    className={`w-4 h-4 ${getNodeColor(cell.type)} ${
                      cell.type === 'mainframe' ? 'animate-pulse' : ''
                    }`} 
                  />
                )}
                
                {collectible && (
                  <span className="absolute top-0 right-0 text-xs transform translate-x-1 -translate-y-1">
                    {collectible.icon}
                  </span>
                )}
                
                {isPlayer && <span className="absolute text-lg z-10">🐱</span>}
                {isMouse && <span className="absolute text-lg z-10">🐭</span>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const ProgrammingInterface = () => (
    <div className="space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500">
        <h3 className="text-cyan-400 font-semibold mb-3">{text[language].commandPool}</h3>
        <div className="grid grid-cols-2 gap-2">
          {commandPool.map(command => (
            <div
              key={command.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(command))}
              className={`${command.color} p-2 rounded cursor-move hover:opacity-80 transition-opacity`}
            >
              <div className="font-mono text-xs text-white">{command.name}</div>
              <div className="text-xs text-gray-200">{command.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black p-4 rounded-lg border border-green-500">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-green-400 font-mono">{text[language].tracingProgram}</h3>
          <div className="flex gap-2">
            <button
              onClick={executeTracingProgram}
              disabled={tracingProgram.length === 0 || isExecutingProgram}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-3 py-1 rounded text-xs font-mono"
            >
              {text[language].executeProgram}
            </button>
            <button
              onClick={() => setTracingProgram([])}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-mono"
            >
              {text[language].clearProgram}
            </button>
          </div>
        </div>
        
        <div
          className="min-h-32 border border-green-700 rounded p-2 bg-gray-900"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const command = JSON.parse(e.dataTransfer.getData('text/plain'));
            setTracingProgram(prev => [...prev, command]);
          }}
        >
          {tracingProgram.length === 0 ? (
            <div className="text-green-600/50 font-mono text-sm text-center py-8">
              Drag commands here to build your trace program...
            </div>
          ) : (
            <div className="space-y-1">
              {tracingProgram.map((command, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-green-800/20 p-2 rounded font-mono text-sm"
                >
                  <span className="text-green-400">{index + 1}. {command.name}</span>
                  <button
                    onClick={() => setTracingProgram(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
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

      {playerSkills.length > 0 && (
        <div>
          <h4 className="text-cyan-400 font-semibold mb-2">{text[language].skills}</h4>
          <div className="space-y-2">
            {playerSkills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-2 rounded text-xs">
                <div className="flex items-center mb-1">
                  <span className="mr-2">{skill.icon}</span>
                  <span className="font-semibold text-cyan-300">{skill.name[language]}</span>
                </div>
                <div className="text-gray-300 mb-1">{skill.concept[language]}</div>
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
      <div className="max-w-7xl mx-auto">
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
              onClick={() => initializeNetwork(currentLevel)}
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

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <NetworkBoard />
          </div>
          
          <div>
            <ProgrammingInterface />
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
              <p className="text-yellow-400 mb-6">+100 CyberCoins Bonus!</p>
              
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

        {gameState === 'game-over' && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg border border-red-500 text-center">
              <HardDrive className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-red-400 mb-4">{text[language].escaped}</h2>
              <p className="text-gray-300 mb-4">The cyber mouse reached the mainframe!</p>
              <p className="text-red-400 mb-6">Network security compromised at {mainframeCompromised}%</p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    initializeNetwork(currentLevel);
                    setGameState('playing');
                  }}
                  className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
                >
                  Try Again
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