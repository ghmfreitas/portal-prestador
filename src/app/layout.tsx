import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NotificationProvider } from "@/contexts/NotificationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal Prestador Odonto",
  description: "Portal de acesso para prestadores odontológicos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  )
}