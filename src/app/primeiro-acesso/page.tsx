"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WarningCircle, CircleNotch, Eye, EyeSlash, Info } from "phosphor-react"
import ReCAPTCHA from "react-google-recaptcha"

export default function PrimeiroAcessoPage() {
  const router = useRouter()
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false)
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!captchaValue) {
      setError("Por favor, confirme que você não é um robô")
      setIsLoading(false)
      return
    }

    if (novaSenha !== confirmaSenha) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Salvar usuário temporário para o termo de aceite
      const tempUser = {
        id: 1,
        nome: "Gustavo H. M. Freitas",
        email: "gustavo.freitas@exemplo.com",
        codigo_identificacao: "0123456789",
        primeiro_acesso: true
      }
      sessionStorage.setItem("tempUser", JSON.stringify(tempUser))
      
      // Redirecionar para termo de aceite após sucesso
      router.push("/termo-aceite")
    } catch (error) {
      setError("Erro ao processar solicitação")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value)
    if (error) setError("")
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white relative">
      <div className="flex w-full flex-col justify-center mobile:justify-between px-4 py-12 tablet:px-6 lg:flex-none lg:w-1/2 lg:px-20 wide:px-24 relative">
        <div className="mobile:block hidden"></div>
        <div className="mx-auto w-full max-w-sm lg:w-96 mobile:pt-20 mobile:pb-20">
          <div>
            <Image 
              src="/images/logo-sulamerica.png"
              alt="SulAmérica"
              width={180}
              height={60}
              className="mb-8"
            />
            
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Primeiro acesso
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Seja bem-vindo(a), prestador(a)! Para continuar com o seu acesso ao portal, crie sua nova senha abaixo:
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <WarningCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="novaSenha">Nova senha</Label>
                <div className="mt-2 relative">
                  <Input
                    id="novaSenha"
                    name="novaSenha"
                    type={showNovaSenha ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="h-[48px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4] pr-12"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNovaSenha(!showNovaSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showNovaSenha ? (
                      <EyeSlash className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmaSenha">Confirmar nova senha</Label>
                <div className="mt-2 relative">
                  <Input
                    id="confirmaSenha"
                    name="confirmaSenha"
                    type={showConfirmaSenha ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    placeholder="Confirme sua nova senha"
                    className="h-[48px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4] pr-12"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmaSenha(!showConfirmaSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showConfirmaSenha ? (
                      <EyeSlash className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  A senha deve ter no mínimo 8 caracteres
                </div>
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  Precisa ter pelo menos 1 letra maiúscula (A-Z)
                </div>
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  Precisa ter pelo menos 1 letra minúscula (a-z)
                </div>
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  Precisa ter pelo menos 1 número (0-9)
                </div>
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  Precisa ter pelo menos 1 caractere especial (ex.: . ! @ # $ %...)
                </div>
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  Evite padrões fáceis / sequências óbvias (ex.: 1234, abcd)
                </div>
                <div className="bg-white rounded-full py-2 pr-4 pl-0 flex items-center text-sm text-gray-700">
                  <div className="w-5 h-5 bg-[#145ABF] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  Não utilize dados pessoais
                </div>
              </div>

              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                  onChange={handleCaptchaChange}
                  theme="light"
                />
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full h-[48px] bg-[#F05223] hover:bg-[#F05223]/90 rounded-full disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isLoading || !novaSenha || !confirmaSenha || !captchaValue}
                >
                  {isLoading ? (
                    <>
                      <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-4">
          <p className="text-center text-sm text-gray-600">
            Copyright © 2009 - 2025 SulAmérica
          </p>
        </div>
      </div>

      <div className="relative flex-1 w-full lg:w-1/2 min-h-[300px] lg:min-h-0 hidden lg:block">
        <Image 
          src="/images/container.png"
          alt="Portal Prestador Odonto"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}