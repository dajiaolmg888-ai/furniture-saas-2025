import './globals.css'

export const metadata = {
  title: '家具大师文案官 - AI营销文案生成',
  description: '专为家具商家打造的AI文案生成SaaS平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}