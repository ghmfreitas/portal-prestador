'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { 
  Notification, 
  NotificationFilter, 
  NotificationPagination, 
  NotificationContextType,
  NotificationCategory,
  NotificationPriority
} from '@/types/notifications'

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Mock data for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo comunicado da operadora',
    content: 'Atualização nas regras de autorização prévia para procedimentos endodônticos. Consulte os novos critérios no material de apoio.',
    category: 'comunicados',
    status: 'unread',
    priority: 'high',
    requiresAction: true,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    actionUrl: '/material-apoio',
    actionLabel: 'Ver detalhes'
  },
  {
    id: '2',
    title: 'Relatório mensal disponível',
    content: 'Seu relatório de faturamento de outubro está pronto para download. Total de procedimentos: 45, Valor total: R$ 15.420,00',
    category: 'relatorios',
    status: 'unread',
    priority: 'medium',
    requiresAction: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    actionUrl: '/faturamento',
    actionLabel: 'Baixar relatório'
  },
  {
    id: '3',
    title: 'Pagamento confirmado',
    content: 'O valor de R$ 15.420,00 foi creditado em sua conta bancária referente ao faturamento do mês de setembro.',
    category: 'pagamentos',
    status: 'read',
    priority: 'medium',
    requiresAction: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    readAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Prazo para envio de documentos',
    content: 'Você tem documentos pendentes que precisam ser enviados até 15/11/2024 para evitar bloqueios no sistema.',
    category: 'documentos',
    status: 'unread',
    priority: 'urgent',
    requiresAction: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    actionUrl: '/documentos',
    actionLabel: 'Enviar documentos'
  },
  {
    id: '5',
    title: 'Glosa requer atenção',
    content: 'Você tem 3 glosas pendentes que precisam de justificativa. Prazo para contestação: 10 dias.',
    category: 'glosas',
    status: 'unread',
    priority: 'high',
    requiresAction: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    actionUrl: '/glosas',
    actionLabel: 'Ver glosas'
  },
  {
    id: '6',
    title: 'Manutenção programada',
    content: 'O sistema passará por manutenção no dia 20/11/2024 das 02:00 às 06:00. Durante este período, o acesso poderá ficar indisponível.',
    category: 'comunicados',
    status: 'read',
    priority: 'medium',
    requiresAction: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '7',
    title: 'Documento aprovado',
    content: 'Seu documento de credenciamento foi aprovado. Você já pode realizar procedimentos na rede credenciada.',
    category: 'documentos',
    status: 'archived',
    priority: 'low',
    requiresAction: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    readAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    archivedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: '8',
    title: 'Nova versão do aplicativo',
    content: 'Está disponível uma nova versão do aplicativo com melhorias de performance e novas funcionalidades.',
    category: 'comunicados',
    status: 'read',
    priority: 'low',
    requiresAction: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    readAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
  }
]

interface NotificationProviderProps {
  children: React.ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<NotificationFilter>({})
  const [pagination, setPagination] = useState<NotificationPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const unreadCount = notifications.filter(n => n.status === 'unread').length

  const applyFilters = useCallback((notifs: Notification[], filterObj: NotificationFilter) => {
    return notifs.filter(notification => {
      if (filterObj.category && notification.category !== filterObj.category) return false
      if (filterObj.status && notification.status !== filterObj.status) return false
      if (filterObj.priority && notification.priority !== filterObj.priority) return false
      if (filterObj.requiresAction !== undefined && notification.requiresAction !== filterObj.requiresAction) return false
      if (filterObj.searchTerm) {
        const searchTerm = filterObj.searchTerm.toLowerCase()
        if (!notification.title.toLowerCase().includes(searchTerm) && 
            !notification.content.toLowerCase().includes(searchTerm)) return false
      }
      if (filterObj.dateFrom && notification.createdAt < filterObj.dateFrom) return false
      if (filterObj.dateTo && notification.createdAt > filterObj.dateTo) return false
      
      return true
    })
  }, [])

  const fetchNotifications = useCallback(async (filterObj: NotificationFilter = {}, page: number = 1) => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const filteredNotifications = applyFilters(mockNotifications, filterObj)
      const sortedNotifications = filteredNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      
      const startIndex = (page - 1) * pagination.limit
      const endIndex = startIndex + pagination.limit
      const paginatedNotifications = sortedNotifications.slice(startIndex, endIndex)
      
      setNotifications(paginatedNotifications)
      setPagination(prev => ({
        ...prev,
        page,
        total: filteredNotifications.length,
        totalPages: Math.ceil(filteredNotifications.length / prev.limit)
      }))
      setFilters(filterObj)
    } catch (err) {
      setError('Erro ao carregar notificações')
    } finally {
      setLoading(false)
    }
  }, [applyFilters, pagination.limit])

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Update mock data
      const notificationIndex = mockNotifications.findIndex(n => n.id === notificationId)
      if (notificationIndex !== -1) {
        mockNotifications[notificationIndex].status = 'read'
        mockNotifications[notificationIndex].readAt = new Date()
      }
      
      // Refresh notifications
      await fetchNotifications(filters, pagination.page)
    } catch (err) {
      setError('Erro ao marcar notificação como lida')
    }
  }, [fetchNotifications, filters, pagination.page])

  const markAsUnread = useCallback(async (notificationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const notificationIndex = mockNotifications.findIndex(n => n.id === notificationId)
      if (notificationIndex !== -1) {
        mockNotifications[notificationIndex].status = 'unread'
        mockNotifications[notificationIndex].readAt = undefined
      }
      
      await fetchNotifications(filters, pagination.page)
    } catch (err) {
      setError('Erro ao marcar notificação como não lida')
    }
  }, [fetchNotifications, filters, pagination.page])

  const markAllAsRead = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      mockNotifications.forEach(notification => {
        if (notification.status === 'unread') {
          notification.status = 'read'
          notification.readAt = new Date()
        }
      })
      
      await fetchNotifications(filters, pagination.page)
    } catch (err) {
      setError('Erro ao marcar todas as notificações como lidas')
    }
  }, [fetchNotifications, filters, pagination.page])

  const archiveNotification = useCallback(async (notificationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const notificationIndex = mockNotifications.findIndex(n => n.id === notificationId)
      if (notificationIndex !== -1) {
        mockNotifications[notificationIndex].status = 'archived'
        mockNotifications[notificationIndex].archivedAt = new Date()
      }
      
      await fetchNotifications(filters, pagination.page)
    } catch (err) {
      setError('Erro ao arquivar notificação')
    }
  }, [fetchNotifications, filters, pagination.page])

  const unarchiveNotification = useCallback(async (notificationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const notificationIndex = mockNotifications.findIndex(n => n.id === notificationId)
      if (notificationIndex !== -1) {
        mockNotifications[notificationIndex].status = 'read'
        mockNotifications[notificationIndex].archivedAt = undefined
      }
      
      await fetchNotifications(filters, pagination.page)
    } catch (err) {
      setError('Erro ao desarquivar notificação')
    }
  }, [fetchNotifications, filters, pagination.page])

  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const notificationIndex = mockNotifications.findIndex(n => n.id === notificationId)
      if (notificationIndex !== -1) {
        mockNotifications.splice(notificationIndex, 1)
      }
      
      await fetchNotifications(filters, pagination.page)
    } catch (err) {
      setError('Erro ao excluir notificação')
    }
  }, [fetchNotifications, filters, pagination.page])

  const clearFilters = useCallback(() => {
    setFilters({})
    fetchNotifications({}, 1)
  }, [fetchNotifications])

  // Initial load
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const value: NotificationContextType = {
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
    setFilters,
    clearFilters
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}