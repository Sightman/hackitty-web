import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Trophy, Coins, Users, Monitor, Smartphone, Server, Router, Wifi, HardDrive, Shield, Compass, Zap } from 'lucide-react';

const HackittyGame = () => {
  const [gameState, setGameState] = useState('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 400 });
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });
  const [cyberCoins, setCyberCoins] = useState(0);
  const [collectibles, setCollectibles] = useState([]);
  const [playerSkills, setPlayerSkills] = useState([]);
  const [networkNodes, setNetworkNodes] = useState([]);
  const [networkConnections, setNetworkConnections] = useState([]);
  const [language, setLanguage] = useState('en');
  const [commandPool, setCommandPool] = useState([]);
  const [tracingProgram, setTracingProgram] = useState([]);
  const [isExecutingProgram, setIsExecutingProgram] = useState(false);
  const [mainframeCompromised, setMainframeCompromised] = useState(0);
  const [blockedNodes, setBlockedNodes] = useState([]);
  const [disconnectedNodes, setDisconnectedNodes] = useState([]);
  const [mouseInventory, setMouseInventory] = useState([]);
  const svgRef = useRef(null);

  const text = {
    en: {
      title: "HACKITTY",
      subtitle: "Stop the Cyber Mouse from Taking Over the Citrix Network!",
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
        "🐱 You are Hackitty, a Citrix network security specialist",
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
      networkNodes: "Citrix Network Architecture"
    },
    es: {
      title: "HACKITTY",
      subtitle: "¡Detén al Ratón Cyber de Tomar Control de la Red Citrix!",
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
        "🐱 Eres Hackitty, un especialista en seguridad de redes Citrix",
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
      networkNodes: "Arquitectura de Red Citrix"
    }
  };

  const collectibleTypes = [
    {
      id: 'firewall',
      name: {
        en: 'Firewall Shield',
        es: 'Escudo Firewall'
      },
      icon: '🛡️',
      concept: {
        en: 'Firewall - Network security barrier that filters traffic',
        es: 'Firewall - Barrera de seguridad que filtra el tráfico de red'
      },
      skill: {
        en: 'Blocks a node with firewall protection',
        es: 'Bloquea un nodo con protección firewall'
      },
      command: 'FIREWALL',
      coins: 15,
      mouseEffect: 'bypass_firewall'
    },
    {
      id: 'stealth',
      name: {
        en: 'Stealth Mode',
        es: 'Modo Sigiloso'
      },
      icon: '👻',
      concept: {
        en: 'Stealth - Allows passing through same node as opponent',
        es: 'Sigilo - Permite pasar por el mismo nodo que el oponente'
      },
      skill: {
        en: 'Find quickest path to reach the mouse',
        es: 'Encuentra el camino más rápido para alcanzar al ratón'
      },
      command: 'PATHFIND',
      coins: 20,
      mouseEffect: 'stealth_mode'
    },
    {
      id: 'pathfinder',
      name: {
        en: 'Network Compass',
        es: 'Brújula de Red'
      },
      icon: '🧭',
      concept: {
        en: 'Pathfinding - Calculates optimal network routes',
        es: 'Búsqueda de rutas - Calcula rutas óptimas de red'
      },
      skill: {
        en: 'Disconnect a node from the network',
        es: 'Desconecta un nodo de la red'
      },
      command: 'DISCONNECT',
      coins: 25,
      mouseEffect: 'smart_pathfind'
    },
    {
      id: 'disruptor',
      name: {
        en: 'Network Disruptor',
        es: 'Disruptor de Red'
      },
      icon: '⚡',
      concept: {
        en: 'Network Isolation - Disconnects compromised nodes',
        es: 'Aislamiento de Red - Desconecta nodos comprometidos'
      },
      skill: {
        en: 'Advanced network manipulation tools',
        es: 'Herramientas avanzadas de manipulación de red'
      },
      command: 'ISOLATE',
      coins: 30,
      mouseEffect: 'tunnel_mode'
    }
  ];

  const availableCommands = [
    { id: 'MOVE_TO_NODE', name: 'MOVE TO', description: 'Move to a connected node', color: 'bg-blue-600' },
    { id: 'SCAN_AREA', name: 'SCAN', description: 'Scan nearby nodes', color: 'bg-purple-600' },
    { id: 'WAIT', name: 'WAIT', description: 'Wait one turn', color: 'bg-gray-600' }
  ];

  // Citrix network architecture nodes
  const initializeNetwork = (level) => {
    const nodes = [
      // Client Access Layer
      { id: 'client1', x: 50, y: 100, type: 'workstation', name: 'Client 1' },
      { id: 'client2', x: 150, y: 100, type: 'workstation', name: 'Client 2' },
      
      // Load Balancer Layer
      { id: 'loadbalancer', x: 100, y: 200, type: 'router', name: 'Load Balancer' },
      
      // Citrix Gateway Layer
      { id: 'gateway1', x: 50, y: 300, type: 'server', name: 'Citrix Gateway 1' },
      { id: 'gateway2', x: 150, y: 300, type: 'server', name: 'Citrix Gateway 2' },
      
      // Session Host Layer
      { id: 'sessionhost1', x: 25, y: 400, type: 'server', name: 'Session Host 1' },
      { id: 'sessionhost2', x: 75, y: 400, type: 'server', name: 'Session Host 2' },
      { id: 'sessionhost3', x: 125, y: 400, type: 'server', name: 'Session Host 3' },
      { id: 'sessionhost4', x: 175, y: 400, type: 'server', name: 'Session Host 4' },
      
      // Database Layer
      { id: 'database', x: 100, y: 500, type: 'server', name: 'Database Server' },
      
      // Mainframe
      { id: 'mainframe', x: 100, y: 600, type: 'mainframe', name: 'Mainframe' }
    ];

    const connections = [
      // Client to Load Balancer
      { from: 'client1', to: 'loadbalancer' },
      { from: 'client2', to: 'loadbalancer' },
      
      // Load Balancer to Gateways
      { from: 'loadbalancer', to: 'gateway1' },
      { from: 'loadbalancer', to: 'gateway2' },
      
      // Gateways to Session Hosts
      { from: 'gateway1', to: 'sessionhost1' },
      { from: 'gateway1', to: 'sessionhost2' },
      { from: 'gateway2', to: 'sessionhost3' },
      { from: 'gateway2', to: 'sessionhost4' },
      
      // Session Hosts to Database
      { from: 'sessionhost1', to: 'database' },
      { from: 'sessionhost2', to: 'database' },
      { from: 'sessionhost3', to: 'database' },
      { from: 'sessionhost4', to: 'database' },
      
      // Database to Mainframe
      { from: 'database', to: 'mainframe' }
    ];

    setNetworkNodes(nodes);
    setNetworkConnections(connections);
    
    // Place collectibles randomly on nodes (except client nodes and mainframe)
    const availableNodes = nodes.filter(node => 
      node.type !== 'mainframe' && !node.id.startsWith('client')
    );
    
    const levelCollectibles = [];
    const collectibleCount = Math.min(level + 1, 4);
    
    for (let i = 0; i < collectibleCount; i++) {
      const nodeIndex = Math.floor(Math.random() * availableNodes.length);
      const node = availableNodes[nodeIndex];
      const collectible = collectibleTypes[i % collectibleTypes.length];
      levelCollectibles.push({ 
        ...collectible, 
        x: node.x, 
        y: node.y, 
        nodeId: node.id,
        collected: false 
      });
      availableNodes.splice(nodeIndex, 1);
    }

    setCollectibles(levelCollectibles);
    setPlayerPosition({ x: 100, y: 400 }); // Start at a session host
    setMousePosition({ x: 100, y: 100 }); // Start at load balancer
    setMainframeCompromised(0);
    setTracingProgram([]);
    setBlockedNodes([]);
    setDisconnectedNodes([]);
    setMouseInventory([]);
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

  const findPathToMainframe = (startPos) => {
    const startNode = findNearestNode(startPos);
    const mainframeNode = networkNodes.find(node => node.type === 'mainframe');
    
    if (!startNode || !mainframeNode) return [];
    
    // Simple BFS pathfinding
    const queue = [{ node: startNode, path: [startNode] }];
    const visited = new Set([startNode.id]);
    
    while (queue.length > 0) {
      const { node, path } = queue.shift();
      
      if (node.id === mainframeNode.id) {
        return path;
      }
      
      const connections = networkConnections.filter(conn => 
        (conn.from === node.id || conn.to === node.id) &&
        !disconnectedNodes.includes(conn.from) &&
        !disconnectedNodes.includes(conn.to)
      );
      
      for (const conn of connections) {
        const nextNodeId = conn.from === node.id ? conn.to : conn.from;
        const nextNode = networkNodes.find(n => n.id === nextNodeId);
        
        if (!visited.has(nextNodeId) && nextNode) {
          visited.add(nextNodeId);
          queue.push({ node: nextNode, path: [...path, nextNode] });
        }
      }
    }
    
    return [];
  };

  const findNearestNode = (position) => {
    let nearest = null;
    let minDistance = Infinity;
    
    for (const node of networkNodes) {
      const distance = Math.sqrt(
        Math.pow(node.x - position.x, 2) + Math.pow(node.y - position.y, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = node;
      }
    }
    
    return nearest;
  };

  const moveMouseTowardsMainframe = () => {
    const currentNode = findNearestNode(mousePosition);
    if (!currentNode) return;
    
    // Check if mouse has special abilities
    const hasCompass = mouseInventory.includes('smart_pathfind');
    const hasStealth = mouseInventory.includes('stealth_mode');
    const hasTunnel = mouseInventory.includes('tunnel_mode');
    
    let path;
    if (hasCompass) {
      // Smart pathfinding - always optimal route
      path = findPathToMainframe(mousePosition);
    } else {
      // Random movement towards mainframe
      const availableConnections = networkConnections.filter(conn => {
        const isConnected = conn.from === currentNode.id || conn.to === currentNode.id;
        const isNotBlocked = !blockedNodes.includes(conn.from) && !blockedNodes.includes(conn.to);
        const isNotDisconnected = !disconnectedNodes.includes(conn.from) && !disconnectedNodes.includes(conn.to);
        
        // Special abilities
        if (hasTunnel && (disconnectedNodes.includes(conn.from) || disconnectedNodes.includes(conn.to))) {
          return isConnected; // Can pass through disconnected nodes
        }
        
        return isConnected && isNotBlocked && isNotDisconnected;
      });
      
      if (availableConnections.length > 0) {
        const randomConnection = availableConnections[Math.floor(Math.random() * availableConnections.length)];
        const nextNodeId = randomConnection.from === currentNode.id ? randomConnection.to : randomConnection.from;
        const nextNode = networkNodes.find(n => n.id === nextNodeId);
        path = nextNode ? [currentNode, nextNode] : [currentNode];
      } else {
        path = [currentNode];
      }
    }
    
    if (path.length > 1) {
      const nextNode = path[1];
      setMousePosition({ x: nextNode.x, y: nextNode.y });
      
      // Check if mouse reached mainframe
      if (nextNode.type === 'mainframe') {
        setMainframeCompromised(100);
        setGameState('game-over');
      }
      
      // Check for collectibles
      const collectible = collectibles.find(c => 
        c.nodeId === nextNode.id && !c.collected
      );
      if (collectible) {
        setCollectibles(prev => prev.map(c => 
          c.nodeId === nextNode.id ? { ...c, collected: true } : c
        ));
        setMouseInventory(prev => [...prev, collectible.mouseEffect]);
        setMainframeCompromised(prev => Math.min(100, prev + 15));
      }
    }
  };

  const executeTracingProgram = async () => {
    if (tracingProgram.length === 0 || isExecutingProgram) return;
    
    setIsExecutingProgram(true);
    setGameState('playing');
    
    for (let i = 0; i < tracingProgram.length; i++) {
      const command = tracingProgram[i];
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (command.id) {
        case 'MOVE_TO_NODE':
          // Move to nearest connected node
          movePlayerToNearestNode();
          break;
        case 'FIREWALL':
          activateFirewall();
          break;
        case 'PATHFIND':
          findPathToMouse();
          break;
        case 'DISCONNECT':
          disconnectNode();
          break;
        case 'SCAN_AREA':
          scanArea();
          break;
        case 'WAIT':
          // Just wait
          break;
        default:
          break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mouse moves after each player action
      if (gameState === 'playing') {
        moveMouseTowardsMainframe();
      }
    }
    
    setIsExecutingProgram(false);
  };

  const movePlayerToNearestNode = () => {
    const currentNode = findNearestNode(playerPosition);
    if (!currentNode) return;
    
    const availableConnections = networkConnections.filter(conn => 
      conn.from === currentNode.id || conn.to === currentNode.id
    );
    
    if (availableConnections.length > 0) {
      const randomConnection = availableConnections[Math.floor(Math.random() * availableConnections.length)];
      const nextNodeId = randomConnection.from === currentNode.id ? randomConnection.to : randomConnection.from;
      const nextNode = networkNodes.find(n => n.id === nextNodeId);
      
      if (nextNode) {
        setPlayerPosition({ x: nextNode.x, y: nextNode.y });
        
        // Check for collectibles
        const collectible = collectibles.find(c => 
          c.nodeId === nextNode.id && !c.collected
        );
        if (collectible) {
          setCollectibles(prev => prev.map(c => 
            c.nodeId === nextNode.id ? { ...c, collected: true } : c
          ));
          setCyberCoins(prev => prev + collectible.coins);
          setPlayerSkills(prev => [...prev, collectible]);
          updateCommandPool();
        }
      }
    }
  };

  const activateFirewall = () => {
    const nearestNode = findNearestNode(playerPosition);
    if (nearestNode && !blockedNodes.includes(nearestNode.id)) {
      setBlockedNodes(prev => [...prev, nearestNode.id]);
    }
  };

  const findPathToMouse = () => {
    const mouseNode = findNearestNode(mousePosition);
    const playerNode = findNearestNode(playerPosition);
    
    if (mouseNode && playerNode) {
      // Simple pathfinding - move towards mouse
      const dx = mouseNode.x - playerNode.x;
      const dy = mouseNode.y - playerNode.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        setPlayerPosition(prev => ({ x: prev.x + Math.sign(dx) * 50, y: prev.y }));
      } else {
        setPlayerPosition(prev => ({ x: prev.x, y: prev.y + Math.sign(dy) * 50 }));
      }
    }
  };

  const disconnectNode = () => {
    const nearestNode = findNearestNode(playerPosition);
    if (nearestNode && nearestNode.type !== 'mainframe' && !disconnectedNodes.includes(nearestNode.id)) {
      setDisconnectedNodes(prev => [...prev, nearestNode.id]);
    }
  };

  const scanArea = () => {
    // Visual effect - could add temporary highlighting
    console.log("Scanning area...");
  };

  useEffect(() => {
    initializeNetwork(currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    if (gameState === 'playing') {
      const playerNode = findNearestNode(playerPosition);
      const mouseNode = findNearestNode(mousePosition);
      
      if (playerNode && mouseNode && playerNode.id === mouseNode.id) {
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

  const getNodeColor = (nodeType, isMainframe, compromised) => {
    if (nodeType === 'mainframe') {
      return compromised > 0 ? '#ef4444' : '#60a5fa'; // Red when compromised, blue-white when safe
    }
    
    switch (nodeType) {
      case 'workstation': return '#60a5fa';
      case 'smartphone': return '#34d399';
      case 'server': return '#a78bfa';
      case 'router': return '#fb923c';
      case 'switch': return '#fbbf24';
      default: return '#9ca3af';
    }
  };

  const NetworkDiagram = () => (
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
      
      <svg 
        ref={svgRef}
        viewBox="0 0 200 700" 
        className="w-full h-96 bg-black rounded border border-gray-700"
      >
        {/* Draw connections */}
        {networkConnections.map((conn, index) => {
          const fromNode = networkNodes.find(n => n.id === conn.from);
          const toNode = networkNodes.find(n => n.id === conn.to);
          
          if (!fromNode || !toNode) return null;
          
          const isDisconnected = disconnectedNodes.includes(conn.from) || disconnectedNodes.includes(conn.to);
          const isBlocked = blockedNodes.includes(conn.from) || blockedNodes.includes(conn.to);
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isDisconnected ? '#ef4444' : isBlocked ? '#fbbf24' : '#06b6d4'}
              strokeWidth={isDisconnected ? 1 : isBlocked ? 3 : 2}
              strokeDasharray={isDisconnected ? '5,5' : 'none'}
              opacity={isDisconnected ? 0.5 : 1}
            />
          );
        })}
        
        {/* Draw nodes */}
        {networkNodes.map(node => {
          const NodeIcon = getNodeIcon(node.type);
          const isPlayer = Math.abs(playerPosition.x - node.x) < 20 && Math.abs(playerPosition.y - node.y) < 20;
          const isMouse = Math.abs(mousePosition.x - node.x) < 20 && Math.abs(mousePosition.y - node.y) < 20;
          const isBlocked = blockedNodes.includes(node.id);
          const isDisconnected = disconnectedNodes.includes(node.id);
          const collectible = collectibles.find(c => c.nodeId === node.id && !c.collected);
          
          return (
            <g key={node.id}>
              {/* Node background */}
              <circle
                cx={node.x}
                cy={node.y}
                r={15}
                fill={getNodeColor(node.type, node.type === 'mainframe', mainframeCompromised)}
                stroke={isPlayer ? '#06b6d4' : isMouse ? '#ef4444' : '#374151'}
                strokeWidth={isPlayer || isMouse ? 3 : 1}
                opacity={isDisconnected ? 0.3 : 1}
              />
              
              {/* Firewall shield overlay */}
              {isBlocked && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  strokeDasharray="3,3"
                />
              )}
              
              {/* Node label */}
              <text
                x={node.x}
                y={node.y - 25}
                textAnchor="middle"
                className="fill-white text-xs"
                fontSize="10"
              >
                {node.name}
              </text>
              
              {/* Collectible */}
              {collectible && (
                <text
                  x={node.x + 20}
                  y={node.y - 10}
                  textAnchor="middle"
                  fontSize="16"
                >
                  {collectible.icon}
                </text>
              )}
              
              {/* Player and Mouse */}
              {isPlayer && (
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="16"
                >
                  🐱
                </text>
              )}
              {isMouse && (
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="16"
                >
                  🐭
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );

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

      {mouseInventory.length > 0 && (
        <div>
          <h4 className="text-red-400 font-semibold mb-2">Mouse Abilities</h4>
          <div className="space-y-1">
            {mouseInventory.map((ability, index) => (
              <div key={index} className="bg-red-900/20 p-1 rounded text-xs text-red-300">
                {ability.replace('_', ' ').toUpperCase()}
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
            <NetworkDiagram />
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