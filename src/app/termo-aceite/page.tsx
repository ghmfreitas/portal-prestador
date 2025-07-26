"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowSquareOut } from "phosphor-react"

export default function TermoAceitePage() {
  const router = useRouter()
  const [termoAceito, setTermoAceito] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfLoaded, setPdfLoaded] = useState(false)

  useEffect(() => {
    // Verificar se veio da página correta (primeiro-acesso)
    const tempUser = sessionStorage.getItem("tempUser")
    if (!tempUser) {
      router.push("/")
    }
  }, [router])


  const handleContinuar = async () => {
    setIsLoading(true)
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salvar usuário completo na área logada
      const usuarioCompleto = {
        id: 1,
        nome: "Gustavo H. M. Freitas",
        email: "gustavo.freitas@exemplo.com",
        codigo_identificacao: "0123456789",
        cpf_cnpj: "123.456.789-00",
        tipo_documento: "CPF",
        telefone: "(11) 99999-9999",
        especialidade: "Ortodontia",
        cro: "SP-12345",
        endereco: {
          rua: "Rua das Flores, 123",
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-567"
        },
        data_cadastro: "2024-01-15",
        ativo: true,
        primeiro_acesso: false
      }
      
      sessionStorage.setItem("user", JSON.stringify(usuarioCompleto))
      sessionStorage.removeItem("tempUser")
      
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro ao processar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 mobile:px-6 tablet:px-20 wide:px-24">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <Image 
            src="/images/logo-sulamerica.png"
            alt="SulAmérica"
            width={180}
            height={60}
            className="mx-auto mb-8"
          />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Termo de Aceite
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Para continuar com seu acesso ao portal, é necessário ler completamente 
            o contrato abaixo e aceitar os termos de uso.
          </p>
        </div>


        {/* Container do PDF */}
        <div className="mb-6">
          <div className="border border-[#EAE7EC] rounded-xl overflow-hidden bg-gray-50">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">
                  Contrato de Credenciamento
                </h3>
                <div className="flex items-center gap-4">
                  {pdfLoaded && (
                    <span className="text-xs text-green-600">
                      ✓ PDF carregado
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="h-[900px] bg-white">
              <embed
                src="/termo-aceite/pdf-termo/contrato_credenciamento.pdf"
                type="application/pdf"
                className="w-full h-full"
                onLoad={() => {
                  setPdfLoaded(true)
                  console.log('PDF carregado via embed')
                }}
              />
            </div>
          </div>
        </div>

        {/* Link para Tabela de Serviços */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Consulte também a{" "}
            <Link 
              href="/tabela-servicos" 
              target="_blank"
              className="text-[#F05223] hover:text-[#D94820] font-medium inline-flex items-center gap-1"
            >
              tabela de serviços
              <ArrowSquareOut className="w-4 h-4" />
            </Link>
            {" "}para mais informações
          </p>
        </div>

        {/* Checkbox de Aceite */}
        <div className="mb-8">
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <Checkbox
              id="aceite-termos"
              checked={termoAceito}
              onCheckedChange={(checked) => setTermoAceito(!!checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <label 
                htmlFor="aceite-termos" 
                className="text-sm font-medium cursor-pointer block text-gray-900"
              >
                Li e aceito os termos de aceite
              </label>
            </div>
          </div>
        </div>

        {/* Botão Continuar */}
        <div className="text-center">
          <Button
            onClick={handleContinuar}
            disabled={!termoAceito || isLoading}
            className="h-[44px] px-8 bg-[#F05223] hover:bg-[#F05223]/90 rounded-full disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isLoading ? "Processando..." : "Continuar"}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Copyright © 2009 - 2025 SulAmérica
          </p>
        </div>
      </div>
    </div>
  )
}