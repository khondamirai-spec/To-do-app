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
 * Chat Component
 * 
 * A right-side panel chat interface UI
 */
export function AIChat({ onClose }: { onClose: () => void }) {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Functionality removed - UI only
  }

  /**
   * Handles quick suggestion clicks
   */
  const handleSuggestionClick = (suggestion: string) => {
    // Functionality removed - UI only
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
              <div className="text-sm text-[--color-muted]">Hi! How can I help you?</div>
              <div className="space-y-3">
                {[
                  'What tasks do I have today?',
                  'Help me prioritize my tasks',
                  'What should I focus on first?',
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
          placeholder="Ask me anything..."
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

