import { Header } from "../components/Header"
import { Toolbar } from "../components/Toolbar"
import { Canvas } from "../components/Canvas"
import PropertiesPanel from "../components/PropertiesPanel"
import { StatusBar } from "../components/StatusBar"
import { useCanvaStore } from "../stores/canvas.store"

export default function VentilationPlanner() {
  const { selectedComponent, setSelectedComponent, view, setView, darkMode, setDarkMode } = useCanvaStore();

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
      <Header view={view} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
        <Canvas setSelectedComponent={setSelectedComponent} />
        <PropertiesPanel selectedComponent={selectedComponent} />
      </div>
      <StatusBar />
    </div>
  )
}