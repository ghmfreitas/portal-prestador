'use client'

import { House, FileText, Clock, Receipt, BookOpen } from 'phosphor-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    id: 'home',
    label: 'Painel de Controle',
    icon: House,
    href: '/dashboard'
  },
  {
    id: 'solicitar',
    label: 'Solicitar',
    icon: FileText,
    href: '/solicitar'
  },
  {
    id: 'acompanhar',
    label: 'Acompanhar',
    icon: Clock,
    href: '/acompanhar'
  },
  {
    id: 'faturamento',
    label: 'Faturamento',
    icon: Receipt,
    href: '/faturamento'
  },
  {
    id: 'material-apoio',
    label: 'Material de apoio',
    icon: BookOpen,
    href: '/material-apoio'
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-white border-r border-gray-200 row-start-2 row-end-3 overflow-y-auto hidden lg:block lg:overflow-y-auto">
      <nav className="p-4 h-full flex flex-col">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-orange-50 text-[#F05223] font-medium' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#F05223]' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="flex-1 min-h-8"></div>
      </nav>
    </aside>
  )
}