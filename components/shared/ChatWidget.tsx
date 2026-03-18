'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, Loader2, ChevronDown } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const BORDER = '#E5EAF5'

const SUGGESTED = [
  'What tools are free?',
  'How much does Pro cost?',
  'How do I create an invoice?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m the ToolStack assistant. I can help you with our tools, pricing, and features. What would you like to know?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text?: string) {
    const userText = (text || input).trim()
    if (!userText || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const reply = data.reply || 'Sorry, something went wrong. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      if (!open) setUnread(u => u + 1)
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 88,
            right: 20,
            width: 360,
            maxHeight: 520,
            background: 'white',
            borderRadius: 20,
            border: `1px solid ${BORDER}`,
            boxShadow: '0 8px 40px rgba(21,94,239,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, #1047C8 0%, ${B} 100%)`,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: 0 }}>ToolStack Assistant</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', margin: 0 }}>Powered by Gemini AI</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: 8,
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
              }}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minHeight: 0,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 8,
                  alignItems: 'flex-start',
                }}
              >
                {msg.role === 'assistant' && (
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: '#EEF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Bot size={14} color={B} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '75%',
                    padding: '9px 13px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.role === 'user' ? B : '#F8FAFF',
                    color: msg.role === 'user' ? 'white' : DARK,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    border: msg.role === 'user' ? 'none' : `1px solid ${BORDER}`,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 26, height: 26, borderRadius: 8, background: '#EEF4FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                  }}
                >
                  <Bot size={14} color={B} />
                </div>
                <div
                  style={{
                    padding: '10px 14px', borderRadius: '14px 14px 14px 4px',
                    background: '#F8FAFF', border: `1px solid ${BORDER}`,
                    display: 'flex', gap: 4, alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map(j => (
                    <span
                      key={j}
                      style={{
                        width: 6, height: 6, borderRadius: '50%', background: B,
                        opacity: 0.4,
                        animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions (only when fresh) */}
            {messages.length === 1 && !loading && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    style={{
                      padding: '6px 12px', borderRadius: 999,
                      background: '#EEF4FF', border: `1px solid #C7D7FD`,
                      color: B, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: `1px solid ${BORDER}`,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              background: 'white',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about ToolStack…"
              disabled={loading}
              style={{
                flex: 1,
                padding: '9px 13px',
                borderRadius: 10,
                border: `1px solid ${BORDER}`,
                fontSize: 13.5,
                outline: 'none',
                background: loading ? '#F8FAFF' : 'white',
                color: DARK,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: !input.trim() || loading ? '#E5EAF5' : B,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'background 0.15s ease',
              }}
            >
              {loading ? (
                <Loader2 size={15} color={MUTED} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Send size={15} color={!input.trim() ? MUTED : 'white'} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: open ? '#0D1117' : `linear-gradient(135deg, #1047C8 0%, ${B} 100%)`,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(21,94,239,0.35)',
          zIndex: 9999,
          transition: 'background 0.2s ease, transform 0.15s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
        {!open && unread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#EF4444',
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
            }}
          >
            {unread}
          </span>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
