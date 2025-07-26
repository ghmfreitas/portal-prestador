"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CircleNotch, WarningCircle } from "phosphor-react"
import ReCAPTCHA from "react-google-recaptcha"
import Link from "next/link"

export default function AutenticacaoPage() {
  const router = useRouter()
  const [codigo, setCodigo] = useState("")
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  useEffect(() => {
    const tempUser = sessionStorage.getItem("tempUser")
    const user = sessionStorage.getItem("user")
    
    // Se já estiver autenticado, redireciona para dashboard
    if (user) {
      router.push("/dashboard")
      return
    }
    
    // Se não tiver usuário temporário, volta para login
    if (!tempUser) {
      router.push("/")
    }
  }, [router])

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 6) {
      setCodigo(value)
    }
  }

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value)
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!captchaValue) {
      setError("Por favor, confirme que você não é um robô")
      return
    }

    if (codigo.length !== 6) {
      setError("O código deve ter 6 dígitos")
      return
    }

    setIsLoading(true)

    try {
      // Validação do código de teste
      if (codigo === "000000") {
        const tempUser = sessionStorage.getItem("tempUser")
        if (tempUser) {
          const user = JSON.parse(tempUser)
          sessionStorage.setItem("user", tempUser)
          sessionStorage.removeItem("tempUser")
          router.push("/dashboard")
        }
      } else {
        setError("Código de autenticação inválido")
      }
    } catch (error) {
      setError("Erro ao processar autenticação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white relative">
      <div className="flex w-full flex-col justify-center mobile:justify-between px-4 py-12 tablet:px-6 lg:flex-none lg:w-1/2 lg:px-20 wide:px-24 relative min-h-[460px]">
        <div className="mobile:block hidden"></div>
        <div className="mx-auto w-full max-w-sm lg:w-96 mobile:min-h-[460px]">
          <div>
            <Image 
              src="/images/logo-sulamerica.png"
              alt="SulAmérica"
              width={180}
              height={60}
              className="mb-8"
            />
            
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Autentique seu login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Informe o código de autenticação que você recebeu no seu e-mail.
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
                <Label htmlFor="codigo">Código de autenticação</Label>
                <div className="mt-2">
                  <Input
                    id="codigo"
                    name="codigo"
                    type="text"
                    inputMode="numeric"
                    required
                    value={codigo}
                    onChange={handleCodigoChange}
                    placeholder="123456"
                    className="h-[48px] text-base tracking-widest border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4]"
                    maxLength={6}
                    disabled={isLoading}
                  />
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Digite o código de 6 dígitos
                  </p>
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

              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex-1 inline-flex items-center justify-center h-[48px] px-6 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Link>
                <Button 
                  type="submit" 
                  className="flex-1 h-[48px] bg-[#F05223] hover:bg-[#F05223]/90 rounded-full" 
                  disabled={isLoading || !captchaValue || codigo.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar código"
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => alert("Em produção, aqui seria enviado um novo código por e-mail")}
                >
                  Não recebeu o código? <span className="font-medium">Reenviar</span>
                </button>
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