"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Trash } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function NewTaskPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState("") 
  const [taskImage, setTaskImage] = useState("")
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }])
  const [args, setArgs] = useState([""])

  useEffect(() => {
    const loggedInUserId = "user123" 
    setUserId(loggedInUserId)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const taskData = {
      userId,
      taskImage,
      env: envVars.filter((env) => env.key && env.value), 
      args: args.filter((arg) => arg), 
      status: "PENDING",
    }

    try {
      const response = await fetch("http://localhost:8000/insertdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection: "tasks",
          data: taskData,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }])
  }

  const removeEnvVar = (index: number) => {
    const newEnvVars = envVars.filter((_, i) => i !== index)
    setEnvVars(newEnvVars)
  }

  const handleEnvVarChange = (index: number, field: "key" | "value", value: string) => {
    const newEnvVars = [...envVars]
    newEnvVars[index][field] = value
    setEnvVars(newEnvVars)
  }

  const addArg = () => {
    setArgs([...args, ""])
  }

  const removeArg = (index: number) => {
    const newArgs = args.filter((_, i) => i !== index)
    setArgs(newArgs)
  }

  const handleArgChange = (index: number, value: string) => {
    const newArgs = [...args]
    newArgs[index] = value
    setArgs(newArgs)
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create New Task
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User ID (Auto-filled and Non-editable) */}
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-gray-700 dark:text-gray-300">
                User ID
              </Label>
              <Input
                id="userId"
                value={userId}
                readOnly
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-image" className="text-gray-700 dark:text-gray-300">
                Task Image
              </Label>
              <Input
                id="task-image"
                placeholder="Enter task image"
                value={taskImage}
                onChange={(e) => setTaskImage(e.target.value)}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 dark:text-gray-300">Environment Variables</Label>
              {envVars.map((env, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Key"
                    value={env.key}
                    onChange={(e) => handleEnvVarChange(index, "key", e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  />
                  <Input
                    placeholder="Value"
                    value={env.value}
                    onChange={(e) => handleEnvVarChange(index, "value", e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeEnvVar(index)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addEnvVar}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Environment Variable
              </Button>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700 dark:text-gray-300">Arguments</Label>
              {args.map((arg, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Argument"
                    value={arg}
                    onChange={(e) => handleArgChange(index, e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeArg(index)}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addArg}
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Argument
              </Button>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}