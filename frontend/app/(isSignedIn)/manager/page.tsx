"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Activity, Box, Cpu, Database, Settings, Terminal, Layers, BarChart } from "lucide-react"

export default function ManagerPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const stats = [
    { label: "Active Workers", value: "24", icon: Activity, color: "from-green-500 to-emerald-500" },
    { label: "Running Tasks", value: "156", icon: Layers, color: "from-blue-500 to-cyan-500" },
    { label: "CPU Usage", value: "78%", icon: Cpu, color: "from-purple-500 to-pink-500" },
    { label: "Memory Usage", value: "6.2GB", icon: Database, color: "from-orange-500 to-red-500" },
  ]

  const actions = [
    { title: "System Settings", description: "Configure system-wide parameters", icon: Settings },
    { title: "Docker Control", description: "Manage containers and images", icon: Box },
    { title: "Terminal Access", description: "Direct system command access", icon: Terminal },
    { title: "Performance", description: "Monitor system metrics", icon: BarChart },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Manager Console
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Complete control over your system's operations</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-0 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {actions.map((action, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group cursor-pointer p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <action.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{action.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

