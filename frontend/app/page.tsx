"use client";
import Link from 'next/link'
import { useAuth, useClerk, useUser } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import UserProfileShow from '@/components/UserProfile'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, UserCog, Plus, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const { userId, isSignedIn, signOut } = useAuth();
  const data = useUser();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

        <main className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Task Management Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your workers, tasks, and docker configurations from a central dashboard
          </p>
        </motion.div>

        { !isSignedIn && <>
            <SignInButton mode="modal">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In with Google
              </button>
            </SignInButton>
        </>}

        {isSignedIn && <>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          <motion.div variants={item}>
            <Link href="/worker" className="block group">
              <Card className="h-full p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-0 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                      <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-purple-600 transition-colors">
                      Worker Dashboard
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Monitor worker status, view metrics, and manage task distribution
                    </p>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-purple-500" />
                        Real-time worker status monitoring
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-purple-500" />
                        Performance metrics tracking
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-purple-500" />
                        Task distribution management
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                      Open Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Link href="/manager" className="block group">
              <Card className="h-full p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-0 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="relative p-6">
                    <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6">
                      <UserCog className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-pink-600 transition-colors">
                      Manager Console
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Manage tasks, configure workers, and monitor system performance
                    </p>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-pink-500" />
                        Task assignment and management
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-pink-500" />
                        Docker configuration control
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-pink-500" />
                        System administration tools
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-lg">
                      Open Console
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/tasks/new">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Task
            </Button>
          </Link>
        </motion.div>
        </>}
      </main>
    </div>
  )
}