'use client'
import { useState } from 'react'

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState('')
  const [productDesc, setProductDesc] = useState('')
  const [generatedCopy, setGeneratedCopy] = useState('')

  const masterStyles = [
    { id: 'jin-qiang', name: '金枪大叔 · 哲学势能', description: '打造品牌高度，说出格局与哲学' },
    { id: 'li-beika', name: '黎贝卡 · 闺蜜种草', description: '真实分享，像闺蜜一样真诚推荐' },
    { id: 'wang-shenshuai', name: '王申帅 · 抖音爆款', description: '高转化短视频脚本，品效合一' },
    { id: 'xia-masong', name: '小马宋 · 逻辑说服', description: '清晰逻辑展示产品价值' }
  ]

  const generateCopywriting = () => {
    if (!selectedStyle || !productDesc) return
    
    const examples = {
      'jin-qiang': `这不是一件家具，而是安放都市灵魂的「精神方舟」。\n\n在喧嚣的日常之外，它为疲惫的身心开辟一处宁静的「思想飞地」。`,
      'li-beika': `姐妹们！我必须跟你们分享我家这个新宝贝！\n\n上周入手了这个${productDesc}，现在全家人都抢着用！质感真的绝了～`,
      'wang-shenshuai': `（镜头快速切换）还在花大几千买家具？你钱多啊！\n\n（手持产品）看看这个${productDesc}！同样的品质，价格只要三分之一！`,
      'xia-masong': `选择这款${productDesc}，是基于三个核心考量：\n\n第一，因为...所以...\n第二，由于...因此...\n第三，基于...于是...`
    }
    
    setGeneratedCopy(examples[selectedStyle] || '请选择文案风格')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 头部 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 家具大师文案官
          </h1>
          <p className="text-xl text-gray-600">
            专为家具商家赋能的AI营销专家，十大流派文案风格任您选择
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="space-y-6">
            {/* 风格选择 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">选择文案风格</h2>
              <div className="space-y-3">
                {masterStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedStyle === style.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{style.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 产品描述 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">描述您的产品</h2>
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="例如：一款真皮沙发，坐感舒适，适合现代客厅..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={generateCopywriting}
                disabled={!selectedStyle || !productDesc}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                生成文案
              </button>
            </div>
          </div>

          {/* 右侧：输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">生成的文案</h2>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
              {generatedCopy ? (
                <pre className="whitespace-pre-wrap text-gray-800">{generatedCopy}</pre>
              ) : (
                <p className="text-gray-500 text-center py-16">
                  选择风格并描述产品后，AI将为您生成专业文案
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
