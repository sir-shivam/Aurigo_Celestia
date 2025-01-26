"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast";
import axios from "axios";



export default function LoginPage() {
    const [user , setUser] = useState({
        name: "Shivam",
        email: "s@s.com",
        password: "123456",

    })
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", user, {
        withCredentials: true, // Ensures cookies are sent/received
      });
      toast.success(response.data.message);
      router.push("/"); // Redirect to the home page
    } catch (error) {
      toast.error(error.response?.data?.error || "Sign-up failed");
    }
    

    // setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 shadow-neon rounded-lg p-8">
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <Lock className="text-white w-10 h-10" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-6">Contractor Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your email"
                  value={user.name}
                  onChange={(e) =>  setUser({...user , name:e.target.value  } )}
                  className="pl-10 text-white"
                  required
                  autoComplete="usename"

                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={(e) =>  setUser({...user , email:e.target.value  } )}
                  className="pl-10 text-white"
                  required
                  autoComplete="usename"

                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) =>  setUser({...user , password:e.target.value  } )}
                  className="pl-10 pr-10 text-white"
                  required
                  autoComplete="current-password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

