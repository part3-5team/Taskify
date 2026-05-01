import { useState, useEffect, useCallback } from 'react'

// --- 타입 정의 ---
type CellColor = string | null
type Grid = CellColor[][]

interface Tetromino {
  shape: number[][]
  color: string
}

const COLS = 10
const ROWS = 20

const TETROMINOS: Record<string, Tetromino> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'bg-brand-600',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-brand-600',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-brand-600',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'bg-brand-600',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: 'bg-brand-600',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-brand-600',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-brand-600',
  },
}

export const useTetris = () => {
  const [grid, setGrid] = useState<Grid>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
  )
  const [activePiece, setActivePiece] = useState<Tetromino | null>(null)
  const [position, setPosition] = useState({ x: 3, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  // 1. 충돌 검사
  const checkCollision = useCallback(
    (nx: number, ny: number, shape: number[][], currentGrid: Grid): boolean => {
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            const nextY = ny + y
            const nextX = nx + x
            if (
              nextY >= ROWS ||
              nextX < 0 ||
              nextX >= COLS ||
              (currentGrid[nextY] && currentGrid[nextY][nextX] !== null)
            ) {
              return true
            }
          }
        }
      }
      return false
    },
    [],
  )

  // 2. 조각 생성
  const spawnPiece = useCallback(() => {
    const keys = Object.keys(TETROMINOS)
    const type = keys[Math.floor(Math.random() * keys.length)]
    const newPiece = TETROMINOS[type]

    if (checkCollision(3, 0, newPiece.shape, grid)) {
      setGameOver(true)
    } else {
      setActivePiece(newPiece)
      setPosition({ x: 3, y: 0 })
    }
  }, [grid, checkCollision])

  // 3. 조각 고정 (lockPiece)
  const lockPiece = useCallback(() => {
    if (!activePiece) return

    const newGrid = grid.map((row) => [...row])
    activePiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const gridY = position.y + y
          const gridX = position.x + x
          if (newGrid[gridY]) {
            newGrid[gridY][gridX] = activePiece.color
          }
        }
      })
    })

    let linesCleared = 0
    const filteredGrid = newGrid.filter((row) => {
      const isFull = row.every((cell) => cell !== null)
      if (isFull) linesCleared++
      return !isFull
    })

    while (filteredGrid.length < ROWS) {
      filteredGrid.unshift(Array(COLS).fill(null))
    }

    setGrid(filteredGrid)
    setScore((prev) => prev + linesCleared * 100)
    spawnPiece()
  }, [grid, activePiece, position, spawnPiece])

  // 4. 이동 및 회전 로직
  const moveLeft = () => {
    if (!activePiece || gameOver) return
    if (!checkCollision(position.x - 1, position.y, activePiece.shape, grid)) {
      setPosition((prev) => ({ ...prev, x: prev.x - 1 }))
    }
  }

  const moveRight = () => {
    if (!activePiece || gameOver) return
    if (!checkCollision(position.x + 1, position.y, activePiece.shape, grid)) {
      setPosition((prev) => ({ ...prev, x: prev.x + 1 }))
    }
  }

  const moveDown = useCallback(() => {
    if (!activePiece || gameOver) return
    if (!checkCollision(position.x, position.y + 1, activePiece.shape, grid)) {
      setPosition((prev) => ({ ...prev, y: prev.y + 1 }))
    } else {
      lockPiece()
    }
  }, [activePiece, position, grid, checkCollision, lockPiece, gameOver])

  const rotate = useCallback(() => {
    if (!activePiece || gameOver) return
    const rotatedShape = activePiece.shape[0].map((_, index) =>
      activePiece.shape.map((col) => col[index]).reverse(),
    )
    if (!checkCollision(position.x, position.y, rotatedShape, grid)) {
      setActivePiece({ ...activePiece, shape: rotatedShape })
    }
  }, [activePiece, position, grid, checkCollision, gameOver])

  // 5. 하드 드롭 (버그 수정 버전)
  const hardDrop = useCallback(() => {
    if (!activePiece || gameOver) return

    // 이미 바닥에 닿아 있다면 하드 드롭 로직을 실행하지 않음 (연타 버그 방지)
    if (checkCollision(position.x, position.y + 1, activePiece.shape, grid)) {
      return
    }

    let tempY = position.y
    while (!checkCollision(position.x, tempY + 1, activePiece.shape, grid)) {
      tempY++
    }

    // 최종 위치 계산 및 고정 로직 수행
    const newGrid = grid.map((row) => [...row])
    activePiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const gridY = tempY + y
          const gridX = position.x + x
          if (newGrid[gridY]) {
            newGrid[gridY][gridX] = activePiece.color
          }
        }
      })
    })

    let linesCleared = 0
    const filteredGrid = newGrid.filter((row) => {
      const isFull = row.every((cell) => cell !== null)
      if (isFull) linesCleared++
      return !isFull
    })

    while (filteredGrid.length < ROWS) {
      filteredGrid.unshift(Array(COLS).fill(null))
    }

    // 상태 업데이트
    setPosition({ x: position.x, y: tempY })
    setGrid(filteredGrid)
    setScore((prev) => prev + linesCleared * 100)
    spawnPiece()
  }, [activePiece, position, grid, checkCollision, spawnPiece, gameOver])

  // --- Effects ---
  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (!activePiece && !gameOver) spawnPiece()
    }, 0)
    return () => clearTimeout(startTimer)
  }, [spawnPiece, activePiece, gameOver])

  useEffect(() => {
    if (gameOver || !activePiece) return
    const interval = setInterval(moveDown, 800)
    return () => clearInterval(interval)
  }, [moveDown, gameOver, activePiece])

  return {
    grid,
    activePiece,
    position,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    gameOver,
    score,
  }
}
