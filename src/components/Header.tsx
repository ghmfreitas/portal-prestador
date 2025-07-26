'use client'

import { useState, useEffect } from 'react'
import { Bell, CaretDown, User, SignOut, Gear, ChatCircle, CreditCard, FileText, Warning, ChartBar, Eye, Archive, ArrowSquareOut } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useNotifications } from '@/contexts/NotificationContext'
import { notificationCategoryColors } from '@/types/notifications'

const categoryIcons = {
  comunicados: ChatCircle,
  pagamentos: CreditCard,
  documentos: FileText,
  glosas: Warning,
  relatorios: ChartBar,
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Agora mesmo'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min atrás`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d atrás`
  return `${Math.floor(diffInSeconds / 604800)}sem atrás`
}

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [user, setUser] = useState({ nome: 'Usuário', email: 'email@exemplo.com' })
  const router = useRouter()
  const { notifications, unreadCount, markAsRead, loading } = useNotifications()

  useEffect(() => {
    const userData = sessionStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    router.push('/')
  }

  const handleNotificationClick = async (notificationId: string) => {
    await markAsRead(notificationId)
  }

  // Get recent notifications for dropdown (max 5)
  const recentNotifications = notifications.slice(0, 5)

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 h-[77px] flex items-center z-50 col-span-full">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative h-[50px] w-[160px]">
            <Image
              src="/images/logo-sulamerica.png"
              alt="SulAmérica"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Área de Notificações e Perfil */}
        <div className="flex items-center space-x-4">
          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-11 h-11 bg-[#F4F4F4] rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-[#E8E8E8] transition-colors"
            >
              <Bell className="h-5 w-5" />
              {/* Badge Counter */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#F05223] text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[600px] overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Notificações</h3>
                  {unreadCount > 0 && (
                    <span className="text-sm text-gray-500">
                      {unreadCount} não lida{unreadCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F05223] mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">Carregando...</p>
                    </div>
                  ) : recentNotifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {recentNotifications.map((notification) => {
                        const IconComponent = categoryIcons[notification.category]
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                              notification.status === 'unread' ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <div className="flex items-start">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`text-sm font-medium truncate ${
                                    notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  {notification.status === 'unread' && (
                                    <div className="w-2 h-2 bg-[#F05223] rounded-full flex-shrink-0 ml-2"></div>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                  {notification.content}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    notificationCategoryColors[notification.category]
                                  }`}>
                                    {notification.category}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {formatTimeAgo(notification.createdAt)}
                                  </span>
                                </div>
                                {notification.requiresAction && (
                                  <div className="mt-2 flex items-center text-xs text-[#F05223]">
                                    <Warning className="h-3 w-3 mr-1" />
                                    Requer ação
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">Nenhuma notificação</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <Link
                    href="/notificacoes"
                    className="block w-full text-center bg-[#F05223] text-white h-[44px] px-[24px] rounded-full hover:bg-[#D94820] transition-colors text-base font-semibold flex items-center justify-center"
                    onClick={() => setShowNotifications(false)}
                  >
                    Ver todas as notificações
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Perfil */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-[#F4F4F4] rounded-full flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <span className="font-medium text-sm">{user.nome || 'Usuário'}</span>
              <CaretDown className="h-4 w-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-medium text-gray-800">{user.nome || 'Usuário'}</p>
                  <p className="text-sm text-gray-500">{user.email || 'email@exemplo.com'}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      console.log('Navegando para /configuracoes')
                      setShowProfileMenu(false)
                      router.push('/configuracoes')
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Gear className="h-4 w-4" />
                    <span>Configurações</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <SignOut className="h-4 w-4" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}