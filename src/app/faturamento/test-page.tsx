"use client"

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Faturamento</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <p>Se você está vendo esta mensagem, o roteamento está funcionando.</p>
        </div>
        <div className="p-4 border rounded bg-green-50">
          <p className="text-green-800">✓ Componente básico renderizado com sucesso</p>
        </div>
      </div>
    </div>
  )
}