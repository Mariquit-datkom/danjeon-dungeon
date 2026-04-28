const container = document.getElementById('grid-container');
let playerPos = { x: 1, y: 1 };
let playerDir = 'face-right';
let isTransitioning = false;
let discoveredTiles = [];

function generateRandomMap(width, height, maxFloorTiles, startX, startY) {
    // 1. Create a map filled entirely with walls (0)
    let newMap = Array.from({ length: height }, () => Array(width).fill(0));

    // 2. Start the "walker"
    let x = startX;
    let y = startY;
    let floorCount = 0;
    let attempts = 0;

    // The starting tile is always a floor
    newMap[y][x] = 1;
    floorCount++;

    let lastDir = { x: 0, y: 0 };

    while (floorCount < maxFloorTiles && attempts < 2000) {
        attempts++;

        const dirs = [
            { x: 0, y: -1 }, { x: 0, y: 1 },
            { x: -1, y: 0 }, { x: 1, y: 0 }
        ];

        let dir = (Math.random() < 0.6 && (lastDir.x !== 0 || lastDir.y !== 0))
            ? lastDir
            : dirs[Math.floor(Math.random() * dirs.length)];

        x += dir.x;
        y += dir.y;

        // If out of bounds, reset to player but don't stop
        if (x < 1 || x >= width - 1 || y < 1 || y >= height - 1) {
            x = startX;
            y = startY;
            continue;
        }

        // Carve only a SINGLE tile for narrow paths
        if (newMap[y][x] === 0) {
            newMap[y][x] = 1;
            floorCount++;
            lastDir = dir; // Remember direction
        }
    }
    return newMap;
}

function placeObjects(map, type, amount) {
    let placed = 0;
    while (placed < amount) {
        let rx = Math.floor(Math.random() * map[0].length);
        let ry = Math.floor(Math.random() * map.length);

        // Only place on empty floors (1) and not on the player's starting spot
        if (map[ry][rx] === 1 && (rx !== playerPos.x || ry !== playerPos.y)) {
            map[ry][rx] = type;
            placed++;
        }
    }
}

function drawMap() {
    container.style.gridTemplateColumns = `repeat(${mapData[0].length}, 1fr)`;
    container.innerHTML = ''; // Clear the grid
    
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            if (!discoveredTiles[y][x]) {
                tile.classList.add('hidden');
            } else {
                // If not hidden, draw normally
                if (mapData[y][x] === 0) tile.classList.add('wall');
                if (mapData[y][x] === 2) tile.classList.add('monster');
                if (mapData[y][x] === 3) tile.classList.add('loot');
                if (mapData[y][x] === 4) tile.classList.add('staircase');

                const dx = Math.abs(x - playerPos.x);
                const dy = Math.abs(y - playerPos.y);
                const visionRadius = 2;

                const inRadius = (dx + dy) <= visionRadius;

                const hasLOS = hasLineOfSight(playerPos.x, playerPos.y, x, y) && 
                               !isPathBlockedDiagonally(playerPos.x, playerPos.y, x, y);

                if (!inRadius || !hasLOS) {
                    tile.classList.add('visited');
                }
            }
            
            // Player always visible
            if (x === playerPos.x && y === playerPos.y) {
                tile.classList.remove('hidden'); // Safety
                tile.classList.add('player', playerDir);
            }
            
            container.appendChild(tile);
        }
    }
}

function countMonsters() {
    let count = 0;
    for (let row of mapData) {
        for (let tile of row) {
            if (tile === 2) count++;
        }
    }
    return count;
}

function checkProximity() {  
    let checkX = playerPos.x;
    let checkY = playerPos.y;

    if (playerDir === 'face-up') checkY--;
    if (playerDir === 'face-down') checkY++;
    if (playerDir === 'face-left') checkX--;
    if (playerDir === 'face-right') checkX++;

    if (!mapData[checkY]) return;

    let target = mapData[checkY][checkX];

    if (target === 2) startBattle(checkY, checkX);
    else if (target === 3) openLoot(checkY, checkX);
    else if (mapData[playerPos.y][playerPos.x] === 4) {
        attemptDescent();
        return;
    }
}

function updateFogOfWar() {
    const visionRadius = 2; // How many tiles far the player can see

    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            // Calculate distance between player and this tile
            const dx = Math.abs(x - playerPos.x);
            const dy = Math.abs(y - playerPos.y);

            // If within radius, mark as discovered
            if (dx <= visionRadius && dy <= visionRadius) {
                if (dx === 0 && dy === 0) {
                    discoveredTiles[y][x] = true;
                    continue;
                }

                if (hasLineOfSight(playerPos.x, playerPos.y, x, y)) {
                    if (isPathBlockedDiagonally(playerPos.x, playerPos.y, x, y)) continue;
                    discoveredTiles[y][x] = true;
                }
            }
        }
    }
}

function isPathBlockedDiagonally(x0, y0, x1, y1) {
    const dx = x1 - x0;
    const dy = y1 - y0;

    // Only applies to diagonal checks (where both dx and dy are non-zero)
    if (Math.abs(dx) > 0 && Math.abs(dy) > 0) {
        // Check the two tiles that form the "corner" the player is looking through
        const corner1 = mapData[y0][x0 + (dx > 0 ? 1 : -1)];
        const corner2 = mapData[y0 + (dy > 0 ? 1 : -1)][x0];

        // If both corners are walls, you shouldn't be able to see through the gap
        if (corner1 === 0 && corner2 === 0) {
            return true;
        }
    }
    return false;
}

function hasLineOfSight(x0, y0, x1, y1) {
    // Calculate the distance in steps
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    let curX = x0;
    let curY = y0;

    while (true) {
        // If we reached the target tile, the path is clear
        if (curX === x1 && curY === y1) return true;

        // If the CURRENT tile we are looking at (not the start) is a wall, 
        // and it's not the target tile itself, then the line is blocked.
        if ((curX !== x0 || curY !== y0) && mapData[curY][curX] === 0) {
            return false;
        }

        // Standard Bresenham's algorithm step
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; curX += sx; }
        if (e2 < dx) { err += dx; curY += sy; }
    }
}

window.addEventListener('keydown', (e) => {
    if (isTransitioning) return;

    let newX = playerPos.x;
    let newY = playerPos.y;
    let key = e.key.toLowerCase();
    let targetDir = playerDir;

    if (key === 'w') { newY--; targetDir = 'face-up'; }
    else if (key === 's') { newY++; targetDir = 'face-down'; }
    else if (key === 'a') { newX--; targetDir = 'face-left'; }
    else if (key === 'd') { newX++; targetDir = 'face-right'; }
    else if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        checkProximity();
        return;
    } else {
        return;
    }

    // 2. SMART CHECK: Is the move unrestricted?
    if (mapData[newY] && (mapData[newY][newX] === 1 || mapData[newY][newX] === 4)) {
        // Move AND Rotate immediately
        playerPos.x = newX;
        playerPos.y = newY;
        playerDir = targetDir;
        
    } else {
        // Path is restricted (wall/monster/loot), so ONLY Rotate
        playerDir = targetDir;
    }

    updateFogOfWar();
    drawMap();
});