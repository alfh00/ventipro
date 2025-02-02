import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Moon, Sun, Save, FileUp, Share2, Undo2, Redo2, Trash2, AlignCenter } from "lucide-react"

interface HeaderProps {
  view: string
  setView: (view: string) => void
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export function Header({ view, setView, darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Ventilation Planner</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Save className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <FileUp className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Undo2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Redo2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignCenter className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{view} View</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setView("2D")}>2D View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("3D")}>3D View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}

