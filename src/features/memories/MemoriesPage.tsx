import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, Video } from 'lucide-react'

interface Memory {
  id: string
  type: 'image' | 'video'
  url: string
  caption: string
  createdAt: Date
}

export function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setIsUploading(true)
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const newMemory: Memory = {
        id: Date.now().toString(),
        type: file.type.startsWith('image') ? 'image' : 'video',
        url: event.target?.result as string,
        caption: '',
        createdAt: new Date()
      }
      setMemories([...memories, newMemory])
      setIsUploading(false)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-semibold text-primary-700">Anılarınızı Paylaşın</h1>

      {/* Upload Button */}
      <motion.div
        className="glass-card p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            className="hidden"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center gap-4">
            {isUploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            ) : (
              <div className="p-4 bg-primary-100 rounded-full">
                <Upload size={24} className="text-primary-600" />
              </div>
            )}
            <p className="text-gray-600">
              {isUploading ? 'Yükleniyor...' : 'Fotoğraf veya video yükleyin'}
            </p>
          </div>
        </label>
      </motion.div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            className="glass-card overflow-hidden group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {memory.type === 'image' ? (
              <img
                src={memory.url}
                alt={memory.caption}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <video
                src={memory.url}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                controls
              />
            )}
            <div className="p-4">
              <p className="text-gray-800">{memory.caption || 'Anı'}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {memory.createdAt.toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1 text-gray-500">
                  {memory.type === 'image' ? (
                    <ImageIcon size={16} />
                  ) : (
                    <Video size={16} />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}