import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { RotateCw, FlipVerticalIcon as Flip } from "lucide-react"

interface PropertiesPanelProps {
  selectedComponent: any | null
}

export default function PropertiesPanel({ selectedComponent }: PropertiesPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="w-64 bg-gray-100 dark:bg-gray-900 p-4">
        <p className="text-gray-500 dark:text-gray-400">Select a component to view its properties</p>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-900 p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{selectedComponent.name}</h2>
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Input id="width" type="number" value={selectedComponent.width} onChange={() => {}} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="height">Height</Label>
        <Input id="height" type="number" value={selectedComponent.height} onChange={() => {}} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="flow-rate">Flow Rate</Label>
        <Input id="flow-rate" type="number" value={selectedComponent.flowRate} onChange={() => {}} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pressure">Pressure</Label>
        <Input id="pressure" type="number" value={selectedComponent.pressure} onChange={() => {}} />
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon">
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Flip className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

