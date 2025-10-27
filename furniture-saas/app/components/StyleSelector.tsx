interface Style {
  id: string
  name: string
  description: string
  icon: string
}

interface StyleSelectorProps {
  styles: Style[]
  selectedStyle: string
  onStyleSelect: (styleId: string) => void
}

export default function StyleSelector({ 
  styles, 
  selectedStyle, 
  onStyleSelect 
}: StyleSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">选择文案风格</h2>
      <div className="space-y-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
              selectedStyle === style.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{style.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800">{style.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{style.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedStyle && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 text-sm">
            ✅ 已选择 <strong>{styles.find(s => s.id === selectedStyle)?.name}</strong>
          </p>
          <p className="text-green-700 text-xs mt-1">
            现在可以在右侧聊天框描述您的产品需求
          </p>
        </div>
      )}
    </div>
  )
}