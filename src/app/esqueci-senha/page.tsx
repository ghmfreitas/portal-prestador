"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "phosphor-react"
import ReCAPTCHA from "react-google-recaptcha"
import { formatCpfCnpj, validateCpfCnpj } from "@/lib/formatters"

export default function EsqueciSenhaPage() {
  const [documento, setDocumento] = useState("")
  const [enviado, setEnviado] = useState(false)
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ documento?: string; captcha?: string }>({})
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpfCnpj(e.target.value)
    setDocumento(formatted)
    
    if (errors.documento) {
      setErrors(prev => ({ ...prev, documento: undefined }))
    }
  }

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value)
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { documento?: string; captcha?: string } = {}

    if (!validateCpfCnpj(documento)) {
      newErrors.documento = "CPF ou CNPJ inválido"
    }

    if (!captchaValue) {
      newErrors.captcha = "Por favor, confirme que você não é um robô"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setEnviado(true)
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
              Esqueceu sua senha?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Informe o CPF ou CNPJ cadastrado para receber as instruções de recuperação de senha.
            </p>
          </div>

          <div className="mt-8">
            {!enviado ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="documento">CPF ou CNPJ</Label>
                  <div className="mt-2">
                    <Input
                      id="documento"
                      name="documento"
                      type="text"
                      required
                      value={documento}
                      onChange={handleDocumentoChange}
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      maxLength={18}
                      className={`h-[48px] text-base border focus:border-[#EAE7EC] focus:ring-[#1355B4] ${errors.documento ? "border-red-500" : "border-[#EAE7EC]"}`}
                    />
                    {errors.documento && (
                      <p className="mt-1 text-sm text-red-600">{errors.documento}</p>
                    )}
                  </div>
                </div>

                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                    onChange={handleCaptchaChange}
                    theme="light"
                  />
                  {errors.captcha && (
                    <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
                  )}
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
                    className="flex-1 h-[48px] bg-[#F05223] hover:bg-[#F05223]/90 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!documento || !captchaValue}
                  >
                    Enviar instruções
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Email enviado com sucesso!
                  </h3>
                  <div className="mt-2 text-base text-gray-600">
                    <p>
                      Enviamos as instruções de recuperação de senha para o email cadastrado. 
                      Por favor, verifique sua caixa de entrada.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1"></div>
                  <Link
                    href="/"
                    className="flex-1 inline-flex items-center justify-center h-[48px] px-6 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Link>
                </div>
              </div>
            )}
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