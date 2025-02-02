import type React from "react"
import { useState } from "react"
import axios from "axios"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Upload } from "lucide-react"

const UploadBlueprint = () => {
  const [file, setFile] = useState<File | null>(null)
  const [projectName, setProjectName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return alert("Please select a file.")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("project_name", projectName)

    try {
      const response = await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log("Uploaded:", response.data)
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload Blueprint</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blueprint">Blueprint File</Label>
            <Input
              id="blueprint"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
          <Button type="submit" className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Upload Blueprint
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UploadBlueprint

