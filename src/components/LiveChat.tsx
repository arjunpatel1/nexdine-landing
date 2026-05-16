'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
}

const quickReplies = [
  'Pricing details',
  'Book a demo',
  'Free trial',
  'Talk to sales',
]

const botResponses: Record<string, string> = {
  'pricing details':
    'Our plans start at ₹3,999/month for the Starter plan. Professional is ₹9,999/month and Enterprise is custom-priced. You can view all details on our Pricing page.',
  'book a demo':
    'I can help with that! Click the "Book a Demo" button on our site or tell me your preferred time and our team will reach out.',
  'free trial':
    'Yes! Every plan includes a 14-day free trial with full feature access. No credit card required. Would you like me to connect you with the team to get started?',
  'talk to sales':
    'Our sales team is available. You can reach them directly on WhatsApp using the green chat button, or leave your email and we will contact you within 24 hours.',
  default:
    'Thanks for reaching out! For detailed assistance, please use the WhatsApp button or email us at support@myteknoland.com. Our team typically responds within a few hours.',
}

function getBotReply(text: string): string {
  const lower = text.toLowerCase()
  for (const key of Object.keys(botResponses)) {
    if (key === 'default') continue
    if (lower.includes(key) || key.includes(lower)) {
      return botResponses[key]
    }
  }
  return botResponses.default
}

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi there! Welcome to NexDine. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: Message = { id: Date.now(), text, sender: 'user', time: now }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: getBotReply(text),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, reply])
      setTyping(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-6 z-50 w-[340px] max-w-[calc(100vw-48px)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-card/90 backdrop-blur-sm px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">NexDine Assistant</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                    <span className="block text-[10px] opacity-60 mt-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
