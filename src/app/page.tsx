"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { WarningCircle, CircleNotch, Eye, EyeSlash } from "phosphor-react"
import { authenticateUser } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(false)
  const [codigo, setCodigo] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await authenticateUser(codigo, senha)
      
      if (result.success && result.usuario) {
        if (rememberMe) {
          localStorage.setItem("userCode", codigo)
        }
        
        sessionStorage.setItem("tempUser", JSON.stringify(result.usuario))
        router.push("/autenticacao")
      } else {
        setError(result.error || "Erro ao fazer login")
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <div className="flex w-full flex-col px-4 py-12 tablet:px-6 lg:px-20 wide:px-24 min-h-screen lg:justify-between">
        <div></div>
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image 
              src="/images/logo-sulamerica.png"
              alt="SulAmérica"
              width={180}
              height={60}
              className="mb-8"
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Entre em sua conta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Acesse o portal do prestador odontológico
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
                  <Label htmlFor="codigo">Código de identificação</Label>
                  <div className="mt-2">
                    <Input
                      id="codigo"
                      name="codigo"
                      type="text"
                      autoComplete="username"
                      required
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      placeholder="Digite seu código"
                      className="h-[48px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4]"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="senha">Senha</Label>
                  <div className="mt-2 relative">
                    <Input
                      id="senha"
                      name="senha"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Digite sua senha"
                      className="h-[48px] text-base border border-[#EAE7EC] focus:border-[#EAE7EC] focus:ring-[#1355B4] pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeSlash className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lembrar"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                      disabled={isLoading}
                    />
                    <Label
                      htmlFor="lembrar"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Lembrar-me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/esqueci-senha"
                      className="font-medium text-primary hover:text-primary/90"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>
                </div>

                <div>
                  <Button 
                    type="submit" 
                    className="w-full h-[48px] bg-[#F05223] hover:bg-[#F05223]/90 rounded-full disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={isLoading || !codigo.trim() || !senha.trim()}
                  >
                    {isLoading ? (
                      <>
                        <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
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

      <div className="relative hidden lg:block">
        <Image 
          src="/images/container.png"
          alt="Portal Prestador Odonto"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  )
}