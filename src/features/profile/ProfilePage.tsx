import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Camera, Save } from 'lucide-react'
import { useAuth } from '../auth/AuthProvider'

interface ProfileData {
  name: string
  email: string
  phone: string
  bio: string
  avatar: string
}

export function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    avatar: 'https://i.pravatar.cc/150'
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      setProfile(prev => ({ ...prev, avatar: event.target?.result as string }))
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Burada API çağrısı yapılabilir
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-semibold text-primary-700">Profiliniz</h1>

      <div className="glass-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Profil resmi"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary-600 p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                <Camera size={18} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
                  >
                    <Save size={18} />
                    <span>Kaydet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    İptal
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Mail size={16} />
                    <span>{profile.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
                >
                  Profili Düzenle
                </button>
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Hakkında</h3>
              {profile.bio ? (
                <p className="text-gray-600">{profile.bio}</p>
              ) : (
                <p className="text-gray-400 italic">Hakkında bilgisi yok</p>
              )}
            </div>
            {profile.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}