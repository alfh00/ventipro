import { useState } from "react"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Airplay, Fan, GitBranch, CornerUpRight, Search } from "lucide-react"

const components = [
  { name: "Duct", icon: GitBranch },
  { name: "Vent", icon: Airplay },
  { name: "Elbow", icon: CornerUpRight },
  { name: "Connector", icon: GitBranch },
  { name: "Fan", icon: Fan },
]

export function Toolbar() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-900 p-4 flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder="Search components"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-4">
          {filteredComponents.map((component) => (
            <div
              key={component.name}
              className="flex flex-col items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
            >
              <component.icon className="h-8 w-8 mb-2 text-blue-500" />
              <span className="text-sm text-center text-gray-700 dark:text-gray-300">{component.name}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

