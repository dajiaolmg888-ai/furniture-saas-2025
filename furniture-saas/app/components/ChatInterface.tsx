'use client'
import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatInterfaceProps {
  selectedStyle: string
  conversation: Message[]
  setConversation: (conversation: Message[]) => void
}

export default function ChatInterface({
  selectedStyle,
  conversation,
  setConversation
}: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedStyle) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)

    const newConversation = [...conversation, { role: 'user', content: userMessage }]
    setConversation(newConversation)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          style: selectedStyle,
          conversation: newConversation,
        }),
      })

      const data = await response.json()
      
      if (data.reply) {
        setConversation([...newConversation, { role: 'assistant', content: data.reply }])
      }
    } catch (error) {
      console.error('发送消息失败:', error)
      setConversation([...newConversation, { 
        role: 'assistant', 
        content: '抱歉，生成文案时出现错误，请稍后重试。' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-lg">请先选择文案风格，然后描述您的家具产品</p>
            <p className="text-sm mt-2">例如："帮我写一款真皮沙发的抖音文案"</p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))
        )}
        {isLoading && (
          <MessageBubble
            role="assistant"
            content="正在为您生成文案..."
            isLoading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              selectedStyle 
                ? "描述您的家具产品..." 
                : "请先选择文案风格"
            }
            disabled={!selectedStyle || isLoading}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!selectedStyle || !inputMessage.trim() || isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  )
}