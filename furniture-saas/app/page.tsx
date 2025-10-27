'use client'
import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import StyleSelector from './components/StyleSelector'

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState('')
  const [conversation, setConversation] = useState<Array<{
    role: string
    content: string
  }>>([])

  const masterStyles = [
    {
      id: 'jin-qiang',
      name: '金枪大叔 · 哲学势能',
      description: '打造品牌高度，说出格局与哲学',
      icon: '🚀'
    },
    {
      id: 'li-beika',
      name: '黎贝卡 · 闺蜜种草',
      description: '真实分享，像闺蜜一样真诚推荐',
      icon: '👭'
    },
    {
      id: 'wang-shenshuai',
      name: '王申帅 · 抖音爆款',
      description: '高转化短视频脚本，品效合一',
      icon: '🎬'
    },
    {
      id: 'xia-masong',
      name: '小马宋 · 逻辑说服',
      description: '清晰逻辑展示产品价值',
      icon: '🎯'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            家具大师文案官
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            专为家具商家赋能的AI营销专家，十大流派文案风格任您选择
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <StyleSelector
              styles={masterStyles}
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
            />
          </div>

          <div className="lg:col-span-2">
            <ChatInterface
              selectedStyle={selectedStyle}
              conversation={conversation}
              setConversation={setConversation}
            />
          </div>
        </div>
      </div>
    </div>
  )
}