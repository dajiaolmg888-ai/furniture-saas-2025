interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isLoading?: boolean
}

export default function MessageBubble({ role, content, isLoading }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-blue-600 text-white rounded-2xl px-4 py-3 max-w-[80%]">
          <p className="text-sm">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
        {isLoading ? (
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  )
}