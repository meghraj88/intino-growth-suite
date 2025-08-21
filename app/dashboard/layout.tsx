"use client"

import type React from "react"
import { useState, useEffect } from "react" // Import useEffect for theme handling
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Zap,
  LayoutDashboard,
  Package,
  ShoppingCart,
  RefreshCw,
  TrendingUp,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Sun, // Import Sun icon for light mode
  Moon, // Import Moon icon for dark mode
  Store,
  Brain,
  MessageCircle,
  Smartphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Stores", href: "/dashboard/stores", icon: Store },
  { name: "Suppliers", href: "/dashboard/suppliers", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Returns", href: "/dashboard/returns", icon: RefreshCw },
  { name: "Trends", href: "/dashboard/trends", icon: TrendingUp },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "AI Assistant", href: "/dashboard/ai", icon: Brain },
  { name: "Communication", href: "/dashboard/communication", icon: MessageCircle },
  { name: "Mobile App", href: "/mobile", icon: Smartphone },
  { name: "Technical", href: "/dashboard/technical", icon: Settings },
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { name: "Admin", href: "/dashboard/admin", icon: Shield },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "About", href: "/about", icon: User },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // State for theme

  // Effect to check system preference and apply theme on mount
  useEffect(() => {
    const userPreference = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(userPreference);
    document.documentElement.classList.toggle('dark', userPreference === 'dark');
  }, []);

  // Check if user needs onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    
    // If user hasn't completed onboarding and is not already on onboarding page
    if (!hasCompletedOnboarding && !pathname.includes('/onboarding')) {
      window.location.href = '/dashboard/onboarding';
    }
  }, [pathname]);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 text-gray-900 dark:text-gray-100 pattern-bg">
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden transition-all duration-300", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-gray-600/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col glass-card shadow-premium transform transition-transform duration-300 ease-out">
          <div className="flex h-16 items-center justify-between px-4 border-b border-white/20 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Intino</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="hover:bg-white/20 dark:hover:bg-gray-700/50">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 group relative overflow-hidden",
                    isActive 
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-300 shadow-md" 
                      : "text-gray-600 hover:bg-white/60 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-gray-100 interactive-hover",
                  )}
                  onClick={() => setSidebarOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                  )}
                  <item.icon className={cn(
                    "w-5 h-5 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-blue-600 dark:text-blue-400" : ""
                  )} />
                  <span className="truncate relative z-10">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow glass-card border-r border-white/20 dark:border-gray-700/50 shadow-premium">
          <div className="flex h-16 items-center px-4 border-b border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg floating">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Intino</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Growth Suite</span>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100",
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-white/20 glass-card px-4 shadow-premium sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-700/50 backdrop-blur-xl">
          <Button variant="ghost" size="sm" className="lg:hidden hover:bg-white/20 dark:hover:bg-gray-700/50" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Dark Mode Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme} 
                aria-label="Toggle theme"
                className="hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
              >
                {theme === 'light' ? 
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" /> : 
                  <Sun className="h-5 w-5 text-yellow-500" />
                }
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300">
                    <Avatar className="h-10 w-10 ring-2 ring-white/20 dark:ring-gray-700/50 shadow-lg">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card border-white/20 dark:border-gray-700/50 shadow-premium" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-4 sm:py-6 lg:py-8 page-transition">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}