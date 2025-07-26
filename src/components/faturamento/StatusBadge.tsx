import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PaymentStatus, GTOStatus } from '@/types/faturamento';

interface StatusBadgeProps {
  status: PaymentStatus | GTOStatus;
  className?: string;
}

const statusConfig = {
  // Status de Procedimentos
  "aguardando_pagamento": { 
    bg: "bg-yellow-100", 
    text: "text-yellow-800",
    label: "Aguardando Pagamento"
  },
  "pagamento_realizado": { 
    bg: "bg-green-100", 
    text: "text-green-800",
    label: "Pagamento Realizado"
  },
  "glosado": { 
    bg: "bg-red-100", 
    text: "text-red-800",
    label: "Glosado"
  },
  "auditado": { 
    bg: "bg-blue-100", 
    text: "text-blue-800",
    label: "Auditado"
  },
  "recursado_1x": { 
    bg: "bg-purple-100", 
    text: "text-purple-800",
    label: "Recursado (1x)"
  },
  "recursado_2x": { 
    bg: "bg-purple-100", 
    text: "text-purple-800",
    label: "Recursado (2x)"
  },
  "prazo_expirado": { 
    bg: "bg-gray-100", 
    text: "text-gray-800",
    label: "Prazo Expirado"
  },
  "cancelado": { 
    bg: "bg-gray-100", 
    text: "text-gray-800",
    label: "Cancelado"
  },
  "aguardando_analise_pagamento": { 
    bg: "bg-orange-100", 
    text: "text-orange-800",
    label: "Em Análise"
  },
  
  // Status de GTOs
  "paga_totalmente": { 
    bg: "bg-green-100", 
    text: "text-green-800",
    label: "Paga Totalmente"
  },
  "parcialmente_paga": { 
    bg: "bg-orange-100", 
    text: "text-orange-800",
    label: "Parcialmente Paga"
  },
  "glosada": { 
    bg: "bg-red-100", 
    text: "text-red-800",
    label: "Glosada"
  },
  "em_analise": { 
    bg: "bg-blue-100", 
    text: "text-blue-800",
    label: "Em Análise"
  },
  "autorizada": { 
    bg: "bg-emerald-100", 
    text: "text-emerald-800",
    label: "Autorizada"
  },
  
  // Status antigos (compatibilidade)
  "aprovada": { 
    bg: "bg-green-100", 
    text: "text-green-800",
    label: "Aprovada"
  },
  "pago_totalmente": { 
    bg: "bg-green-100", 
    text: "text-green-800",
    label: "Pago Totalmente"
  },
  "pago_parcial": { 
    bg: "bg-yellow-100", 
    text: "text-yellow-800",
    label: "Pago Parcial"
  },
  "negada": { 
    bg: "bg-red-100", 
    text: "text-red-800",
    label: "Negada"
  },
  "pendente": { 
    bg: "bg-gray-100", 
    text: "text-gray-800",
    label: "Pendente"
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["pendente"];
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text} ${className}`}>
      {config.label}
    </span>
  );
};

export const getStatusConfig = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig] || statusConfig["pendente"];
};