import { AlertTriangle } from "lucide-react"

export function StatusBar() {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 text-sm">
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 dark:text-gray-300">Total Load: 1000 CFM</span>
        <span className="text-gray-600 dark:text-gray-300">Airflow: 500 CFM</span>
        <span className="flex items-center text-yellow-600 dark:text-yellow-400">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Exceeded capacity in Zone A
        </span>
      </div>
      <span className="text-gray-600 dark:text-gray-300">Mouse: X: 100, Y: 200</span>
    </div>
  )
}

