"use client"

import { useRef, useEffect } from "react"
import { Stage, Layer, Line } from "react-konva"
import { useCanvaStore } from "../stores/canvas.store"

interface CanvasProps {
  setSelectedComponent: (component: any) => void
}

export function Canvas({ setSelectedComponent }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { stageSize, setStageSize, scale, setScale, position, setPosition, showGrid, setShowGrid } = useCanvaStore();

  const toggleGrid = () => setShowGrid(!showGrid)

  useEffect(() => {
    if (containerRef.current) {
      setStageSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }, [setStageSize])

  const handleWheel = (e: any) => {
    e.evt.preventDefault()
    const scaleBy = 1.1
    const stage = e.target.getStage()
    const oldScale = stage.scaleX()
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    }
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy
    setScale(newScale)
    setPosition({
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    })
  }

  const handleDragEnd = (e: any) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  const gridSize = 100
  const gridLines = []
  for (let i = 0; i < stageSize.width / gridSize; i++) {
    gridLines.push(
      <Line key={`v${i}`} points={[i * gridSize, 0, i * gridSize, stageSize.height]} stroke="#ddd" strokeWidth={1} />,
    )
  }
  for (let i = 0; i < stageSize.height / gridSize; i++) {
    gridLines.push(
      <Line key={`h${i}`} points={[0, i * gridSize, stageSize.width, i * gridSize]} stroke="#ddd" strokeWidth={1} />,
    )
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 overflow-hidden" ref={containerRef}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onWheel={handleWheel}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        draggable
        onDragEnd={handleDragEnd}
      >
        <Layer>
          {showGrid && gridLines}
          {/* Add your ventilation system components here */}
        </Layer>
      </Stage>
    </div>
  )
}