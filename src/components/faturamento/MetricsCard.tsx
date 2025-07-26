import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendUp, TrendDown, Minus } from 'phosphor-react'

interface MetricsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  valueClassName?: string
}

export function MetricsCard({
  title,
  value,
  description,
  icon,
  trend,
  className = '',
  valueClassName = ''
}: MetricsCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null
    
    if (trend.value === 0) {
      return <Minus className="h-4 w-4 text-gray-500" />
    }
    
    return trend.isPositive ? (
      <TrendUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendDown className="h-4 w-4 text-red-600" />
    )
  }

  const getTrendColor = () => {
    if (!trend || trend.value === 0) return 'text-gray-600'
    return trend.isPositive ? 'text-green-600' : 'text-red-600'
  }

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      // Se for um valor monetário (assumindo valores acima de 100)
      if (val > 100) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(val)
      }
      // Se for uma porcentagem (valores até 100)
      if (val <= 100 && val.toString().includes('.')) {
        return `${val.toFixed(1)}%`
      }
      // Outros números
      return val.toLocaleString('pt-BR')
    }
    return val
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-gray-500">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueClassName || 'text-gray-900'}`}>
          {formatValue(value)}
        </div>
        
        {(description || trend) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {trend && (
              <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="font-medium">
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </span>
              </div>
            )}
            
            {description && (
              <p className="text-gray-500">
                {description}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Componente de conveniência para grid de métricas
interface MetricsGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function MetricsGrid({ 
  children, 
  columns = 4,
  className = '' 
}: MetricsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {children}
    </div>
  )
}