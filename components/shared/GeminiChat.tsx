'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react'

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const BORDER = '#E5EAF5'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const SUGGESTIONS = [
  'What free tools do you have?',
  'How much does Pro cost?',
  'Can I generate a contract?',
  'How do I cancel my subscription?',
]

export function GeminiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I\'m the ToolStack assistant. How can I help you today?' }
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

  const send = async (text: string) => {
    const userMsg = text.trim()
    if (!userMsg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages }),
      })
      const data = await res.json()
      const reply = data.reply || 'Sorry, I couldn\'t get a response. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
      if (!open) setUnread(n => n + 1)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: '50%',
          background: B, border: 'none',
          boxShadow: '0 4px 20px rgba(21,94,239,0.35)',
          cursor: 'pointer', zIndex: 9990,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(21,94,239,0.45)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(21,94,239,0.35)'
        }}
      >
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            width: 18, height: 18, borderRadius: '50%',
            background: '#EF4444', color: 'white',
            fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
          }}>{unread}</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 92, right: 24,
          width: 360, maxHeight: 520,
          background: 'white', borderRadius: 20,
          border: `1px solid ${BORDER}`,
          boxShadow: '0 12px 48px rgba(0,0,0,0.14)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9989,
          animation: 'chatAppear 0.25s cubic-bezier(.34,1.56,.64,1)',
        }}>
          <style>{`
            @keyframes chatAppear {
              from { opacity: 0; transform: scale(0.92) translateY(12px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            padding: '16px 20px', borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', gap: 12, borderRadius: '20px 20px 0 0',
            background: 'white',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12, background: B,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Bot size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: DARK, margin: 0 }}>ToolStack Assistant</p>
              <p style={{ fontSize: 11, color: '#22C55E', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                Online
              </p>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, padding: 4 }}>
              <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? B : '#F8FAFF',
                  color: msg.role === 'user' ? 'white' : DARK,
                  fontSize: 13.5, lineHeight: 1.55,
                  border: msg.role === 'assistant' ? `1px solid ${BORDER}` : 'none',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px', borderRadius: '16px 16px 16px 4px',
                  background: '#F8FAFF', border: `1px solid ${BORDER}`,
                  display: 'flex', gap: 4, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: '50%', background: '#C7D7FD',
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only on first message) */}
          {messages.length === 1 && (
            <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  fontSize: 11.5, padding: '5px 10px', borderRadius: 20,
                  background: '#F0F4FF', border: `1px solid ${BORDER}`,
                  color: B, cursor: 'pointer', fontWeight: 500,
                  transition: 'background 0.15s',
                }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px 14px', borderTop: `1px solid ${BORDER}` }}>
            <form onSubmit={e => { e.preventDefault(); send(input) }} style={{ display: 'flex', gap: 8 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything about ToolStack…"
                style={{
                  flex: 1, padding: '9px 14px', borderRadius: 12, fontSize: 13,
                  border: `1.5px solid ${BORDER}`, outline: 'none', color: DARK,
                  background: 'white',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = B }}
                onBlur={e => { e.currentTarget.style.borderColor = BORDER }}
              />
              <button type="submit" disabled={!input.trim() || loading} style={{
                width: 38, height: 38, borderRadius: 10, background: B, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                opacity: input.trim() && !loading ? 1 : 0.5,
                flexShrink: 0,
                transition: 'opacity 0.15s',
              }}>
                <Send size={15} color="white" />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  )
}
