'use client'

import { useEffect, useMemo } from 'react'
import { useTetris } from '@/libs/hooks/useTetris'

// --- 타입 정의 ---
interface ControlConfig {
  readonly key: string
  readonly label: string
  readonly colSpan?: string
}

const CONTROLS: readonly ControlConfig[] = [
  { key: '↑', label: 'Rot' },
  { key: '←', label: 'Left' },
  { key: '↓', label: 'Fast' },
  { key: '→', label: 'Right' },
  { key: 'Space', label: 'Drop', colSpan: 'col-span-2' },
] as const

// --- 메인 컴포넌트 ---
export default function Tetris() {
  const {
    grid,
    activePiece,
    position,
    moveLeft,
    moveRight,
    moveDown,
    gameOver,
    score,
    rotate,
    hardDrop,
  } = useTetris()

  // 1. 키보드 조작 로직
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return

      if (e.key === ' ') {
        e.preventDefault()
        hardDrop()
        return
      }

      const actions: Record<string, () => void> = {
        ArrowLeft: moveLeft,
        ArrowRight: moveRight,
        ArrowDown: moveDown,
        ArrowUp: rotate,
      }

      if (actions[e.key]) actions[e.key]()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveLeft, moveRight, moveDown, rotate, hardDrop, gameOver])

  // 2. 그리드 계산 (고스트 블록 + 실제 블록 합성)
  const displayGrid = useMemo(() => {
    const newGrid = grid.map((row) => [...row])

    if (activePiece) {
      // (A) 충돌 체크 헬퍼 함수
      const isCollision = (nx: number, ny: number, shape: number[][]) => {
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] !== 0) {
              const targetY = ny + y
              const targetX = nx + x
              if (
                targetY >= grid.length ||
                targetX < 0 ||
                targetX >= grid[0].length ||
                (grid[targetY] && grid[targetY][targetX] !== null)
              ) {
                return true
              }
            }
          }
        }
        return false
      }

      // (B) 고스트 블록의 Y 좌표 계산 (바닥까지 미리 내려보기)
      let ghostY = position.y
      while (!isCollision(position.x, ghostY + 1, activePiece.shape)) {
        ghostY++
      }

      // (C) 고스트 블록 렌더링 (반투명 또는 테두리)
      activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0 && newGrid[ghostY + y]) {
            newGrid[ghostY + y][position.x + x] = 'GHOST' // 고스트 전용 키워드
          }
        })
      })

      // (D) 실제 활성 블록 렌더링 (고스트 위에 덮어씀)
      activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0 && newGrid[position.y + y]) {
            newGrid[position.y + y][position.x + x] = activePiece.color
          }
        })
      })
    }
    return newGrid
  }, [grid, activePiece, position])

  return (
    <div className="bg-modal flex min-h-screen flex-col items-center justify-center p-6 text-white shadow-xl">
      <div className="text-brand-400 mb-4 text-3xl font-extrabold tracking-widest">
        SCORE: {score}
      </div>

      <div className="relative border-8 border-slate-700 bg-slate-950 p-1 shadow-inner">
        {displayGrid.map((row, y) => (
          <div key={`row-${y}`} className="flex">
            {row.map((cell, x) => {
              const isGhost = cell === 'GHOST'
              const colorClass = isGhost
                ? `${activePiece?.color.replace('bg-1', 'border-1') || 'border-slate-500'} border-2 opacity-30`
                : cell || 'bg-transparent'

              return (
                <div
                  key={`cell-${y}-${x}`}
                  className={`h-7 w-7 border-[0.5px] border-slate-800 transition-colors duration-75 ${colorClass}`}
                />
              )
            })}
          </div>
        ))}

        {gameOver && <GameoverUI />}
      </div>

      <div className="mt-8 grid grid-cols-4 gap-2">
        {CONTROLS.map((control) => (
          <TetrisDesc key={control.label} control={control} />
        ))}
      </div>
    </div>
  )
}

// --- 하위 컴포넌트 ---

const GameoverUI = () => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm">
    <h2 className="mb-6 animate-bounce text-4xl font-black text-red-500">
      GAME OVER
    </h2>
    <button
      onClick={() => window.location.reload()}
      className="bg-brand-600 hover:bg-brand-500 transform rounded-full px-6 py-3 font-bold text-white transition-all hover:scale-105 active:scale-95"
    >
      TRY AGAIN
    </button>
  </div>
)

const TetrisDesc = ({ control }: { control: ControlConfig }) => (
  <div
    className={`flex flex-col items-center justify-center rounded-lg border border-slate-700 p-2 ${
      control.colSpan || ''
    }`}
  >
    <span className="mb-1 font-bold text-slate-300">
      {control.key === 'Space' ? '└──────┘' : control.key}
    </span>
    <span className="text-[10px] text-slate-500 uppercase">
      {control.label}
    </span>
  </div>
)
