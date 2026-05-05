import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Heart } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const messageSchema = z.object({
  content: z.string().min(1, 'Mesaj boş olamaz').max(500, 'Mesaj çok uzun')
})

type Message = {
  id: string
  content: string
  createdAt: Date
  isLiked: boolean
}

export function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(messageSchema)
  })

  const onSubmit = (data: { content: string }) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: data.content,
      createdAt: new Date(),
      isLiked: false
    }
    setMessages([...messages, newMessage])
    reset()
  }

  const toggleLike = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, isLiked: !msg.isLiked } : msg
    ))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-semibold text-primary-700">Annenize Mesaj Gönderin</h1>

      {/* Message Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-card p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <textarea
          {...register('content')}
          className={`w-full p-4 rounded-lg border ${errors.content ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all`}
          placeholder="Annenize özel bir mesaj yazın..."
          rows={4}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200"
        >
          <Send size={18} />
          <span>Gönder</span>
        </button>
      </motion.form>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="glass-card p-6 text-center">
            <p className="text-gray-500">Henüz mesaj yok. İlk mesajınızı gönderin!</p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              className="glass-card p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-800">{message.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {message.createdAt.toLocaleDateString()}
                </span>
                <button
                  onClick={() => toggleLike(message.id)}
                  className={`p-2 rounded-full transition-all ${message.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <Heart size={20} fill={message.isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}