import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Plus } from 'lucide-react'

interface Activity {
  id: string
  title: string
  date: Date
  location: string
  description: string
  participants: number
}

export function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [showForm, setShowForm] = useState(false)

  const handleCreateActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newActivity: Activity = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string),
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      participants: 0
    }

    setActivities([...activities, newActivity])
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-semibold text-primary-700">Aktiviteler</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200"
        >
          <Plus size={18} />
          <span>Yeni Aktivite</span>
        </button>
      </div>

      {/* Activity Form */}
      {showForm && (
        <motion.form
          onSubmit={handleCreateActivity}
          className="glass-card p-6 space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input
                type="text"
                name="title"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
              <input
                type="date"
                name="date"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
            <input
              type="text"
              name="location"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              name="description"
              rows={3}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
            >
              Oluştur
            </button>
          </div>
        </motion.form>
      )}

      {/* Activities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length === 0 ? (
          <div className="glass-card p-6 text-center col-span-full">
            <p className="text-gray-500">Henüz aktivite yok. İlk aktivitenizi oluşturun!</p>
          </div>
        ) : (
          activities.map((activity) => (
            <motion.div
              key={activity.id}
              className="glass-card p-6 space-y-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-primary-700 group-hover:text-primary-600 transition-colors">{activity.title}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{activity.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>{activity.location}</span>
              </div>
              <p className="text-gray-700 line-clamp-3">{activity.description}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <Users size={16} />
                <span>{activity.participants} katılımcı</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}