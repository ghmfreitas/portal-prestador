"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { WarningCircle } from "phosphor-react"

interface ConfirmacaoSaidaProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title?: string
  description?: string
}

export function ConfirmacaoSaida({
  open,
  onOpenChange,
  onConfirm,
  title = "Sair do formulário",
  description = "Deseja sair do formulário de ortodontia? Os dados preenchidos serão perdidos."
}: ConfirmacaoSaidaProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <WarningCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-gray-900">{title}</DialogTitle>
              <DialogDescription className="mt-1 text-gray-600">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <DialogFooter className="gap-3 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-[#F05223] hover:bg-[#D94820] text-white"
          >
            Sair do formulário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}