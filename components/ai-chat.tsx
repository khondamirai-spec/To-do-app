'use client'

import { useState, useRef, useEffect } from 'react'

/**
 * Message type for chat
 */
type Message = {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

/**
 * Task type for AI context
 */
type Task = {
  id: string
  title: string
  description?: string | null
  priority?: string
  badge?: string
  date: string
  completed?: boolean
}

/**
 * Chat Component
 * 
 * A right-side panel chat interface UI with OpenAI integration
 */
export function AIChat({ 
  onClose, 
  tasks = [] 
}: { 
  onClose: () => void
  tasks?: Task[]
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message to chat
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      // Call AI API
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          tasks: tasks,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Add AI response to chat
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: data.response || 'Kechirasiz, javob olishda xatolik yuz berdi.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('Failed to get AI response:', error)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles quick suggestion clicks
   */
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Auto-submit after a short delay
    setTimeout(() => {
      const form = inputRef.current?.form
      if (form) {
        form.requestSubmit()
      }
    }, 100)
  }

  return (
    <aside className="card soft-border w-[360px] shrink-0 p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-1 mb-4">
        <div>
          <div className="font-semibold">AI Assist 🤖</div>
          <div className="text-xs text-[--color-muted]">
            Ask me anything about your tasks
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn-ghost size-8 rounded-full grid place-items-center hover:bg-gray-100 transition-colors"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-1 mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="card soft-border p-6 text-center">
            <div className="space-y-6">
              <div className="text-sm text-[--color-muted]">Salom! Sizga qanday yordam bera olaman?</div>
              <div className="space-y-3">
                {[
                  'Bugungi vazifalarim nima?',
                  'Vazifalarimni prioritetlashga yordam bering',
                  'Birinchi qaysi vazifani bajarish kerak?',
                  'Vazifalarimni qisqa umumlashtiring',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="btn-ghost rounded-full px-4 py-2 soft-border bg-white w-full text-sm shadow-sm hover:bg-gray-50 transition-colors text-left"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'ai' && (
                  <div className="size-8 rounded-full bg-blue-100 grid place-items-center text-blue-600 shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="size-8 rounded-full bg-blue-500 grid place-items-center text-white shrink-0">
                    You
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="size-8 rounded-full bg-blue-100 grid place-items-center text-blue-600 shrink-0">
                  🤖
                </div>
                <div className="bg-gray-100 rounded-xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-1">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Savol yuboring..."
          disabled={isLoading}
          className="flex-1 soft-border rounded-xl bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="btn btn-primary rounded-full size-10 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          aria-label="Send message"
        >
          →
        </button>
      </form>
    </aside>
  )
}

