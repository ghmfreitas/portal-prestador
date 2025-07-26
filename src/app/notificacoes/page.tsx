'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Bell, 
  MagnifyingGlass, 
  Funnel, 
  DotsThreeVertical, 
  Eye, 
  EyeSlash, 
  Archive, 
  ArchiveBox, 
  Trash, 
  CheckCircle, 
  Circle, 
  CaretLeft, 
  CaretRight,
  ChatCircle,
  CreditCard,
  FileText,
  Warning,
  ChartBar,
  ArrowSquareOut,
  X,
  ArrowsClockwise,
  House,
  Clock,
  Receipt,
  BookOpen
} from 'phosphor-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { useNotifications } from '@/contexts/NotificationContext'
import { 
  NotificationCategory, 
  NotificationStatus,
  notificationCategoryLabels,
  notificationCategoryColors,
  Notification
} from '@/types/notifications'

interface User {
  id: string
  nome: string
  email: string
  cpf_cnpj: string
  codigo_identificacao: string
  tipo_documento: 'CPF' | 'CNPJ' | null
}

const mobileMenuItems = [
  { id: 'home', label: 'Painel', icon: House, href: '/dashboard' },
  { id: 'solicitar', label: 'Solicitar', icon: FileText, href: '/solicitar' },
  { id: 'historico', label: 'Histórico', icon: Clock, href: '/historico' },
  { id: 'faturamento', label: 'Faturamento', icon: Receipt, href: '/faturamento' },
  { id: 'material-apoio', label: 'Material', icon: BookOpen, href: '/material-apoio' },
  { id: 'notificacoes', label: 'Notificações', icon: Bell, href: '/notificacoes' }
]

// Componente checkbox personalizado com estilo do DS
const DSCheckbox = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: () => void }) => (
  <div 
    className="relative h-7 w-7 cursor-pointer"
    onClick={onCheckedChange}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {}}
      className="sr-only"
    />
    <div className={`
      h-7 w-7 rounded-sm border-2 flex items-center justify-center transition-all
      ${checked 
        ? 'bg-[#F05223] border-[#F05223] text-white' 
        : 'bg-white border-gray-300 hover:border-[#F05223]'
      }
      focus-within:ring-2 focus-within:ring-[#F05223] focus-within:ring-offset-2
    `}>
      {checked && (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.2l-3.5-3.5c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.2z"/>
        </svg>
      )}
    </div>
  </div>
)

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

export default function NotificationsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const {
    notifications,
    unreadCount,
    loading,
    error,
    pagination,
    filters,
    fetchNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    archiveNotification,
    unarchiveNotification,
    deleteNotification,
    setFilters
  } = useNotifications()

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<NotificationStatus | ''>('')
  const [requiresAction, setRequiresAction] = useState<boolean | undefined>(undefined)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null)

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  useEffect(() => {
    // Sync local state with filters
    setSearchTerm(filters.searchTerm || '')
    setSelectedCategory(filters.category || '')
    setSelectedStatus(filters.status || '')
    setRequiresAction(filters.requiresAction)
  }, [filters])

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      searchTerm: searchTerm || undefined,
      category: selectedCategory || undefined,
      status: selectedStatus || undefined,
      requiresAction
    }
    setFilters(newFilters)
    fetchNotifications(newFilters, 1)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedStatus('')
    setRequiresAction(undefined)
    setFilters({})
    fetchNotifications({}, 1)
  }

  const handlePageChange = (page: number) => {
    fetchNotifications(filters, page)
  }

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(notifications.map(n => n.id))
    }
  }

  const handleBulkAction = async (action: 'read' | 'unread' | 'archive' | 'delete') => {
    for (const notificationId of selectedNotifications) {
      switch (action) {
        case 'read':
          await markAsRead(notificationId)
          break
        case 'unread':
          await markAsUnread(notificationId)
          break
        case 'archive':
          await archiveNotification(notificationId)
          break
        case 'delete':
          await deleteNotification(notificationId)
          break
      }
    }
    setSelectedNotifications([])
  }

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const IconComponent = categoryIcons[notification.category]
    const isSelected = selectedNotifications.includes(notification.id)

    return (
      <div className={`border-l-4 border-gray-300 bg-white rounded-lg transition-all ${
        isSelected ? 'ring-2 ring-[#1355B4] ring-opacity-50' : ''
      } ${notification.status === 'unread' ? 'bg-blue-50' : ''}`}>
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex items-center">
              <DSCheckbox
                checked={isSelected}
                onCheckedChange={() => toggleNotificationSelection(notification.id)}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className={`text-lg font-semibold ${
                    notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {notification.title}
                  </h3>
                  {notification.status === 'unread' && (
                    <div className="w-2 h-2 bg-[#F05223] rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.createdAt)}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowActionMenu(showActionMenu === notification.id ? null : notification.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <DotsThreeVertical className="h-4 w-4" />
                    </button>
                    
                    {showActionMenu === notification.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              notification.status === 'unread' ? markAsRead(notification.id) : markAsUnread(notification.id)
                              setShowActionMenu(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            {notification.status === 'unread' ? <Eye className="h-4 w-4 mr-2" /> : <EyeSlash className="h-4 w-4 mr-2" />}
                            Marcar como {notification.status === 'unread' ? 'lida' : 'não lida'}
                          </button>
                          <button
                            onClick={() => {
                              notification.status === 'archived' ? unarchiveNotification(notification.id) : archiveNotification(notification.id)
                              setShowActionMenu(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            {notification.status === 'archived' ? <ArchiveBox className="h-4 w-4 mr-2" /> : <Archive className="h-4 w-4 mr-2" />}
                            {notification.status === 'archived' ? 'Desarquivar' : 'Arquivar'}
                          </button>
                          <button
                            onClick={() => {
                              deleteNotification(notification.id)
                              setShowActionMenu(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Excluir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {notification.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    notificationCategoryColors[notification.category]
                  }`}>
                    {notificationCategoryLabels[notification.category]}
                  </span>
                  
                  
                  {notification.requiresAction && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Warning className="h-3 w-3 mr-1" />
                      Requer ação
                    </span>
                  )}
                  
                  {notification.status === 'archived' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      <Archive className="h-3 w-3 mr-1" />
                      Arquivada
                    </span>
                  )}
                </div>
                
                {notification.actionUrl && notification.actionLabel && (
                  <Link
                    href={notification.actionUrl}
                    className="inline-flex items-center text-sm text-[#F05223] hover:text-[#D94820] font-medium"
                  >
                    {notification.actionLabel}
                    <ArrowSquareOut className="h-3 w-3 ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-white grid grid-rows-[77px_auto_1fr_auto] lg:grid-rows-[77px_1fr_auto] lg:grid-cols-[256px_1fr]">
      <Header />
      
      {/* Mobile Navigation */}
      <nav className="bg-white border-b border-gray-200 p-2 lg:hidden col-span-full">
        <div className="flex space-x-1 overflow-x-auto">
          {mobileMenuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex flex-col items-center min-w-0 px-3 py-2 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-orange-50 text-[#F05223]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#F05223]' : 'text-gray-500'}`} />
                <span className="text-xs mt-1 truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      
      <Sidebar />
      
      <main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
        <div className="max-w-7xl mx-auto">
          {/* Header da página */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-[#F05223] mb-1">Painel de Controle</h4>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
                <p className="mt-2 text-gray-600">
                  Gerencie suas notificações e mantenha-se atualizado
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="bg-white border border-[#F05223] text-[#F05223] font-bold h-[44px] px-4 rounded-[300px] hover:bg-[#F05223] hover:text-white transition-colors"
                  >
                    Marcar todas como lidas
                  </button>
                )}
                <button
                  onClick={() => fetchNotifications(filters, pagination.page)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowsClockwise className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="bg-white rounded-lg shadow-sm py-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 h-[44px] bg-[#F4F4F4] border border-[#EAE7EC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1355B4] focus:border-[#EAE7EC] text-gray-500 placeholder:text-gray-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 h-[44px] border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Funnel className="h-4 w-4 mr-2" />
                Filtros
              </button>
              <button
                onClick={handleSearch}
                className="bg-[#F05223] text-white px-6 h-[44px] rounded-full hover:bg-[#D94820] transition-colors"
              >
                Buscar
              </button>
            </div>

            {showFilters && (
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as NotificationCategory | '')}
                      className="w-full h-[44px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1355B4]"
                    >
                      <option value="">Todas as categorias</option>
                      {Object.entries(notificationCategoryLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as NotificationStatus | '')}
                      className="w-full h-[44px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1355B4]"
                    >
                      <option value="">Todos os status</option>
                      <option value="unread">Não lidas</option>
                      <option value="read">Lidas</option>
                      <option value="archived">Arquivadas</option>
                    </select>
                  </div>
                  
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requer ação</label>
                    <select
                      value={requiresAction === undefined ? '' : requiresAction.toString()}
                      onChange={(e) => setRequiresAction(e.target.value === '' ? undefined : e.target.value === 'true')}
                      className="w-full h-[44px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1355B4]"
                    >
                      <option value="">Todas</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleClearFilters}
                    className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ações em lote */}
          {selectedNotifications.length > 0 && (
            <div className="bg-[#F4F4F4] text-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {selectedNotifications.length} {selectedNotifications.length === 1 ? 'notificação selecionada' : 'notificações selecionadas'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction('read')}
                    className="bg-white bg-opacity-50 hover:bg-opacity-70 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Marcar como {selectedNotifications.length === 1 ? 'lida' : 'lidas'}
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="bg-white bg-opacity-50 hover:bg-opacity-70 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Arquivar
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors text-white"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => setSelectedNotifications([])}
                    className="bg-white bg-opacity-50 hover:bg-opacity-70 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lista de notificações */}
          <div className="space-y-4 mb-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F05223] mx-auto mb-4"></div>
                <p className="text-gray-500">Carregando notificações...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => fetchNotifications(filters, pagination.page)}
                  className="bg-[#F05223] text-white px-4 py-2 rounded-lg hover:bg-[#D94820] transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : notifications.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleSelectAll}
                      className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                    >
                      {selectedNotifications.length === notifications.length ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-[#F05223]" />
                      ) : (
                        <Circle className="h-4 w-4 mr-2" />
                      )}
                      {selectedNotifications.length === notifications.length ? 'Desmarcar todas' : 'Selecionar todas'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {pagination.total} notificação(ões) encontrada(s)
                  </p>
                </div>
                
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notificação encontrada</h3>
                <p className="text-gray-500 mb-4">
                  {Object.keys(filters).length > 0 
                    ? 'Tente ajustar os filtros para encontrar mais notificações.'
                    : 'Você não tem notificações no momento.'
                  }
                </p>
                {Object.keys(filters).length > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[#F05223] hover:text-[#D94820] font-medium"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 mb-20">
              <div className="flex items-center text-sm text-gray-500">
                Página {pagination.page} de {pagination.totalPages} ({pagination.total} total)
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <CaretLeft className="h-4 w-4 mr-1" />
                  Anterior
                </button>
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(pagination.page - 2 + i, pagination.totalPages - 4 + i))
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 border rounded-lg transition-colors ${
                        pageNum === pagination.page
                          ? 'bg-[#F05223] text-white border-[#F05223]'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima
                  <CaretRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}