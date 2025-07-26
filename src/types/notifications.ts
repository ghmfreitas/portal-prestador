export type NotificationCategory = 'comunicados' | 'pagamentos' | 'documentos' | 'glosas' | 'relatorios'

export type NotificationStatus = 'unread' | 'read' | 'archived'

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Notification {
  id: string
  title: string
  content: string
  category: NotificationCategory
  status: NotificationStatus
  priority: NotificationPriority
  requiresAction: boolean
  createdAt: Date
  readAt?: Date
  archivedAt?: Date
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
}

export interface NotificationFilter {
  category?: NotificationCategory
  status?: NotificationStatus
  priority?: NotificationPriority
  requiresAction?: boolean
  searchTerm?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface NotificationPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface NotificationResponse {
  notifications: Notification[]
  pagination: NotificationPagination
  unreadCount: number
}

export interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  error: string | null
  pagination: NotificationPagination
  filters: NotificationFilter
  
  // Actions
  fetchNotifications: (filters?: NotificationFilter, page?: number) => Promise<void>
  markAsRead: (notificationId: string) => Promise<void>
  markAsUnread: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  archiveNotification: (notificationId: string) => Promise<void>
  unarchiveNotification: (notificationId: string) => Promise<void>
  deleteNotification: (notificationId: string) => Promise<void>
  setFilters: (filters: NotificationFilter) => void
  clearFilters: () => void
}

export const notificationCategoryLabels: Record<NotificationCategory, string> = {
  comunicados: 'Comunicados',
  pagamentos: 'Pagamentos',
  documentos: 'Documentos',
  glosas: 'Glosas',
  relatorios: 'Relatórios'
}

export const notificationCategoryColors: Record<NotificationCategory, string> = {
  comunicados: 'bg-blue-100 text-blue-800',
  pagamentos: 'bg-green-100 text-green-800',
  documentos: 'bg-purple-100 text-purple-800',
  glosas: 'bg-yellow-100 text-yellow-800',
  relatorios: 'bg-gray-100 text-gray-800'
}

export const notificationPriorityColors: Record<NotificationPriority, string> = {
  low: 'border-l-gray-300',
  medium: 'border-l-blue-400',
  high: 'border-l-orange-400',
  urgent: 'border-l-red-500'
}