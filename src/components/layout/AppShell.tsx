import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, MessageSquare, Camera, Calendar, User, Menu, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', icon: Home, label: 'Ana Sayfa' },
  { to: '/messages', icon: MessageSquare, label: 'Mesajlar' },
  { to: '/memories', icon: Camera, label: 'Anılar' },
  { to: '/activities', icon: Calendar, label: 'Aktiviteler' },
  { to: '/profile', icon: User, label: 'Profil' }
]

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-full bg-white/80 backdrop-blur-glass shadow-glass"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-glass shadow-glass md:relative md:translate-x-0 md:bg-transparent md:shadow-none`}
      >
        <div className="h-full p-6 flex flex-col">
          <h1 className="text-2xl font-display font-semibold text-primary-700 mb-12">Annenin Günü</h1>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                      ${isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}