"use client"

import { useState } from "react"
import { ArrowLeft, User, Copy, Check, Terminal, GitBranch, Rocket, FileText, FolderOpen, Code, Warning, Shield, Lock } from "phosphor-react"
import Link from "next/link"

export default function DocDevPage() {
  const [copiedCommand, setCopiedCommand] = useState<string>("")
  const [activeTab, setActiveTab] = useState<'conceitos' | 'workflow' | 'comandos' | 'github' | 'troubleshooting'>('conceitos')

  const copyToClipboard = async (text: string, commandId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(commandId)
      setTimeout(() => setCopiedCommand(""), 2000)
    } catch (err) {
      console.error('Falha ao copiar:', err)
    }
  }

  const CommandBox = ({ id, command, description }: { id: string, command: string, description: string }) => (
    <div className="bg-gray-900 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{description}</span>
        <button
          onClick={() => copyToClipboard(command, id)}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
        >
          {copiedCommand === id ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <code className="text-green-400 font-mono text-sm block">{command}</code>
    </div>
  )

  const ProfileCard = ({ name, role, branch, port, avatar }: { 
    name: string, 
    role: string, 
    branch: string, 
    port: string,
    avatar: string 
  }) => (
    <div className="bg-white border border-[#EAE7EC] rounded-xl p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-[#F05223] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">{avatar}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <GitBranch className="w-4 h-4 text-[#F05223]" />
          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{branch}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-[#F05223]" />
          <span className="text-sm">Porta: <code className="bg-gray-100 px-1 rounded">{port}</code></span>
        </div>
      </div>
    </div>
  )

  const TabButton = ({ id, label, icon: Icon, active }: { id: string, label: string, icon: any, active: boolean }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        active 
          ? 'bg-[#F05223] text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  )

  return (
    <main className="p-4 lg:p-8 overflow-auto lg:col-start-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-[#F05223] hover:text-[#D94820] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Link>
          <h4 className="text-lg font-medium text-[#F05223] mb-1">
            Documentação Interna
          </h4>
          <h1 className="text-3xl font-bold text-gray-900">
            Workflow Colaborativo - Portal Prestador
          </h1>
          <p className="text-gray-600 mt-2">
            Guia completo para desenvolvimento colaborativo entre Gustavo e Karine
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <TabButton 
            id="conceitos" 
            label="Conceitos Básicos" 
            icon={FileText} 
            active={activeTab === 'conceitos'} 
          />
          <TabButton 
            id="workflow" 
            label="Workflow Diário" 
            icon={GitBranch} 
            active={activeTab === 'workflow'} 
          />
          <TabButton 
            id="comandos" 
            label="Comandos Rápidos" 
            icon={Terminal} 
            active={activeTab === 'comandos'} 
          />
          <TabButton 
            id="github" 
            label="Config GitHub" 
            icon={Shield} 
            active={activeTab === 'github'} 
          />
          <TabButton 
            id="troubleshooting" 
            label="Resolução de Problemas" 
            icon={Warning} 
            active={activeTab === 'troubleshooting'} 
          />
        </div>

        <div className="mb-20">
          {/* Tab: Conceitos Básicos */}
          {activeTab === 'conceitos' && (
            <div className="space-y-8">
              {/* Perfis da Equipe */}
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <User className="w-5 h-5 text-[#F05223]" />
                  <h2 className="text-xl font-semibold text-gray-900">Equipe de Design</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <ProfileCard
                    name="Gustavo"
                    role="Product Designer"
                    branch="dev-gustavo"
                    port="3001"
                    avatar="G"
                  />
                  <ProfileCard
                    name="Karine"
                    role="Product Designer"
                    branch="dev-karine"
                    port="3002"
                    avatar="K"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>💡 Importante:</strong> Como designers de produto, vocês trabalham no código para criar e testar 
                    interfaces, componentes e experiências do usuário. Este workflow permite que ambos trabalhem 
                    simultaneamente sem conflitos.
                  </p>
                </div>
              </section>

              {/* O que é Git */}
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <GitBranch className="w-5 h-5 text-[#F05223]" />
                  <h2 className="text-xl font-semibold text-gray-900">Entendendo o Git</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">🔄 O que é o Git?</h3>
                    <p className="text-gray-700 mb-4">
                      Pense no Git como um <strong>"histórico de versões"</strong> do seu projeto, igual ao histórico de versões do Figma, mas para código:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                      <div className="text-gray-600">Versão 1: Layout inicial da homepage</div>
                      <div className="text-gray-600">Versão 2: Adiciona formulário de login</div>
                      <div className="text-gray-600">Versão 3: Melhora cores e espaçamentos</div>
                      <div className="text-gray-600">Versão 4: Corrige bug no botão</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">🌿 Branches (Galhos)</h3>
                    <p className="text-gray-700 mb-4">
                      Imaginem que o projeto é uma <strong>árvore</strong>:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-3">
                        <code className="text-green-600 font-mono">main</code>
                        <span className="text-gray-600">= Tronco principal (site em produção)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <code className="text-blue-600 font-mono">dev-gustavo</code>
                        <span className="text-gray-600">= Seu galho pessoal para trabalhar</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <code className="text-purple-600 font-mono">dev-karine</code>
                        <span className="text-gray-600">= Galho da Karine para trabalhar</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">💾 Commits (Salvamentos)</h3>
                    <p className="text-gray-700 mb-4">
                      É como <strong>"salvar versão"</strong> no Figma, mas com uma descrição do que mudou:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400 font-mono text-sm">
                        git commit -m "design: melhora layout da página de login"
                      </code>
                    </div>
                  </div>
                </div>
              </section>

              {/* Ambientes */}
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Code className="w-5 h-5 text-[#F05223]" />
                  <h2 className="text-xl font-semibold text-gray-900">Ambientes de Trabalho</h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">🏠 Analogia com Design</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-2">Figma</h4>
                      <p className="text-sm text-purple-600">Onde vocês criam/editam designs</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Ambiente Dev</h4>
                      <p className="text-sm text-blue-600">Onde vocês criam/editam interfaces no código</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">Site Produção</h4>
                      <p className="text-sm text-green-600">Onde usuários finais veem o resultado</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">🌐 URLs de Acesso</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">Produção</h4>
                      <a 
                        href="https://odonto.mnd-system.cloud" 
                        target="_blank"
                        className="text-sm text-green-600 hover:underline break-all"
                      >
                        https://odonto.mnd-system.cloud
                      </a>
                      <p className="text-xs text-green-600 mt-1">Site oficial dos usuários</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Gustavo (Dev)</h4>
                      <p className="text-sm text-blue-600 break-all">http://173.212.232.9:3001</p>
                      <p className="text-xs text-blue-600 mt-1">Seu ambiente de desenvolvimento</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-2">Karine (Dev)</h4>
                      <p className="text-sm text-purple-600 break-all">http://173.212.232.9:3002</p>
                      <p className="text-xs text-purple-600 mt-1">Ambiente de desenvolvimento da Karine</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Estrutura de Arquivos */}
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FolderOpen className="w-5 h-5 text-[#F05223]" />
                  <h2 className="text-xl font-semibold text-gray-900">Estrutura de Arquivos</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-mono text-sm text-gray-700 mb-2">scripts/</h4>
                    <ul className="space-y-1 text-sm text-gray-600 ml-4">
                      <li>• <code>dev-server.sh</code> - Script para iniciar ambiente de desenvolvimento</li>
                      <li>• <code>deploy-to-production.sh</code> - Script para publicar em produção</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-mono text-sm text-gray-700 mb-2">src/app/</h4>
                    <ul className="space-y-1 text-sm text-gray-600 ml-4">
                      <li>• <code>page.tsx</code> - Página de login</li>
                      <li>• <code>dashboard/</code> - Painel principal</li>
                      <li>• <code>doc-dev/</code> - Esta documentação</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-mono text-sm text-gray-700 mb-2">.md/</h4>
                    <ul className="space-y-1 text-sm text-gray-600 ml-4">
                      <li>• <code>workflow-colaborativo.md</code> - Documentação técnica do workflow</li>
                      <li>• <code>contexto-vps.md</code> - Histórico de configuração da VPS</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Tab: Workflow Diário */}
          {activeTab === 'workflow' && (
            <div className="space-y-8">
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">📝 Workflow Passo a Passo</h2>
                
                <div className="space-y-6">
                  {/* Início do Dia */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">1. Começar o Dia</h3>
                    <p className="text-gray-600 mb-4">Prepare seu ambiente de trabalho:</p>
                    <div className="space-y-2">
                      <CommandBox
                        id="workflow-1"
                        command="git checkout dev-gustavo"
                        description="Passo 1: Ir para sua branch pessoal"
                      />
                      <CommandBox
                        id="workflow-2"
                        command="git pull origin main"
                        description="Passo 2: Pegar últimas atualizações"
                      />
                      <CommandBox
                        id="workflow-3"
                        command="./scripts/dev-server.sh gustavo 3001"
                        description="Passo 3: Iniciar seu ambiente"
                      />
                    </div>
                  </div>

                  {/* Durante o Trabalho */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">2. Durante o Trabalho</h3>
                    <p className="text-gray-600 mb-4">Salve seu progresso regularmente:</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 text-sm">
                        <strong>💡 Dica:</strong> Faça commits pequenos e frequentes. É melhor ter muitos commits pequenos 
                        do que um commit gigante no final do dia.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <CommandBox
                        id="workflow-4"
                        command="git add ."
                        description="Selecionar todos os arquivos modificados"
                      />
                      <CommandBox
                        id="workflow-5"
                        command='git commit -m "design: melhora layout do header"'
                        description="Salvar versão com descrição"
                      />
                      <CommandBox
                        id="workflow-6"
                        command="git push origin dev-gustavo"
                        description="Enviar para o servidor (backup)"
                      />
                    </div>
                  </div>

                  {/* Finalizar Feature */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">3. Finalizar Feature</h3>
                    <p className="text-gray-600 mb-4">Quando sua funcionalidade estiver pronta:</p>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <p className="text-orange-800 text-sm">
                        <strong>⚠️ Importante:</strong> Sempre teste antes de publicar! O comando <code>npm run build</code> 
                        verifica se há erros no código.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <CommandBox
                        id="workflow-7"
                        command="npm run build"
                        description="Testar se não há erros"
                      />
                      <CommandBox
                        id="workflow-8"
                        command="git checkout main"
                        description="Ir para branch principal"
                      />
                      <CommandBox
                        id="workflow-9"
                        command="git merge dev-gustavo"
                        description="Juntar seu trabalho"
                      />
                      <CommandBox
                        id="workflow-10"
                        command="./scripts/deploy-to-production.sh"
                        description="Publicar no site oficial"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Cenários Práticos */}
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">🎨 Cenários Práticos para Designers</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Cenário 1: Mudar cores de um botão</h3>
                    <ol className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">1.</span>
                        <span>Ir para seu ambiente: <code className="bg-white px-1 rounded">git checkout dev-gustavo</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">2.</span>
                        <span>Iniciar servidor: <code className="bg-white px-1 rounded">./scripts/dev-server.sh gustavo 3001</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">3.</span>
                        <span>Editar arquivo CSS/componente</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">4.</span>
                        <span>Ver resultado em <code className="bg-white px-1 rounded">localhost:3001</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">5.</span>
                        <span>Salvar: <code className="bg-white px-1 rounded">git add . && git commit -m "style: muda cor do botão para laranja"</code></span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Cenário 2: Trabalho simultâneo com Karine</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Gustavo (porta 3001)</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Mexendo no header</li>
                          <li>• Testando cores</li>
                          <li>• Salvando: "design: novo header"</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-medium text-purple-800 mb-2">Karine (porta 3002)</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Mexendo no formulário</li>
                          <li>• Testando layout</li>
                          <li>• Salvando: "ui: melhora formulário"</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      ✅ Depois, ambos podem juntar seus trabalhos na main sem conflitos!
                    </p>
                  </div>
                </div>
              </section>

              {/* Mensagens de Commit */}
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">📝 Exemplos de Mensagens de Commit</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Para Design/Interface:</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        <span className="text-blue-600">design:</span> melhora layout da página de login
                      </div>
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        <span className="text-blue-600">ui:</span> adiciona novos componentes de formulário
                      </div>
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        <span className="text-blue-600">style:</span> ajusta cores e espaçamentos do dashboard
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Para Funcionalidades:</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        <span className="text-green-600">feat:</span> adiciona validação no formulário
                      </div>
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        <span className="text-orange-600">fix:</span> corrige erro na navegação
                      </div>
                      <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                        <span className="text-purple-600">wip:</span> progresso na página de configurações
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">📐 Estrutura da mensagem:</h4>
                  <code className="text-sm text-gray-700">[tipo]: [descrição clara do que foi feito]</code>
                </div>
              </section>
            </div>
          )}

          {/* Tab: Comandos Rápidos */}
          {activeTab === 'comandos' && (
            <div className="space-y-8">
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Terminal className="w-5 h-5 text-[#F05223]" />
                  <h2 className="text-xl font-semibold text-gray-900">Comandos Personalizados</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Para Gustavo:</h3>
                    <CommandBox
                      id="gustavo-quick-1"
                      command="./scripts/dev-server.sh gustavo 3001"
                      description="Iniciar seu ambiente"
                    />
                    <CommandBox
                      id="gustavo-quick-2"
                      command="git checkout dev-gustavo"
                      description="Ir para sua branch"
                    />
                    <CommandBox
                      id="gustavo-quick-3"
                      command='git add . && git commit -m "design: [descrição]"'
                      description="Salvar mudanças"
                    />
                    <CommandBox
                      id="gustavo-quick-4"
                      command="git push origin dev-gustavo"
                      description="Enviar para servidor"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Para Karine:</h3>
                    <CommandBox
                      id="karine-quick-1"
                      command="./scripts/dev-server.sh karine 3002"
                      description="Iniciar ambiente dela"
                    />
                    <CommandBox
                      id="karine-quick-2"
                      command="git checkout dev-karine"
                      description="Ir para branch dela"
                    />
                    <CommandBox
                      id="karine-quick-3"
                      command='git add . && git commit -m "ui: [descrição]"'
                      description="Salvar mudanças"
                    />
                    <CommandBox
                      id="karine-quick-4"
                      command="git push origin dev-karine"
                      description="Enviar para servidor"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">⚡ Comandos Git Essenciais</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Status e Navegação:</h3>
                    <CommandBox
                      id="git-status"
                      command="git status"
                      description="Ver o que mudou nos arquivos"
                    />
                    <CommandBox
                      id="git-branch"
                      command="git branch"
                      description="Ver em qual branch você está"
                    />
                    <CommandBox
                      id="git-log"
                      command="git log --oneline -5"
                      description="Ver últimos 5 commits"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Salvamento e Sincronização:</h3>
                    <CommandBox
                      id="git-add"
                      command="git add ."
                      description="Selecionar todos os arquivos modificados"
                    />
                    <CommandBox
                      id="git-commit"
                      command='git commit -m "tipo: descrição"'
                      description="Salvar versão com mensagem"
                    />
                    <CommandBox
                      id="git-push"
                      command="git push origin [sua-branch]"
                      description="Enviar para o servidor"
                    />
                    <CommandBox
                      id="git-pull"
                      command="git pull origin main"
                      description="Pegar atualizações da main"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">🚀 Comandos de Deploy</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800 text-sm">
                    <strong>⚠️ Atenção:</strong> Deploy deve ser feito apenas após testes e coordenação com a equipe!
                  </p>
                </div>

                <CommandBox
                  id="deploy-1"
                  command="npm run build"
                  description="Testar se o código está sem erros"
                />
                <CommandBox
                  id="deploy-2"
                  command="git checkout main"
                  description="Ir para branch principal"
                />
                <CommandBox
                  id="deploy-3"
                  command="git merge dev-[seu-nome]"
                  description="Juntar seu trabalho na main"
                />
                <CommandBox
                  id="deploy-4"
                  command="./scripts/deploy-to-production.sh"
                  description="Publicar no site oficial"
                />
              </section>
            </div>
          )}

          {/* Tab: GitHub Configuration */}
          {activeTab === 'github' && (
            <div className="space-y-8">
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Shield className="w-5 h-5 text-[#F05223]" />
                  <h2 className="text-xl font-semibold text-gray-900">Configuração GitHub Privado</h2>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-medium text-yellow-800">Status Atual</h3>
                  </div>
                  <p className="text-yellow-700 text-sm mb-2">
                    <strong>Repositório:</strong> https://github.com/ghmfreitas/portal-prestador.git
                  </p>
                  <p className="text-yellow-700 text-sm">
                    <strong>Configuração:</strong> SSH configurada, mas necessita de Personal Access Token para repositório privado
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🔒 Passo 1: Tornar Repositório Privado</h3>
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">1.</span>
                        <span>Acesse: <a href="https://github.com/ghmfreitas/portal-prestador" target="_blank" className="text-blue-600 hover:underline">https://github.com/ghmfreitas/portal-prestador</a></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">2.</span>
                        <span>Clique em <strong>Settings</strong> (Configurações)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">3.</span>
                        <span>Role até o final da página, seção <strong>Danger Zone</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">4.</span>
                        <span>Clique em <strong>Change repository visibility</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">5.</span>
                        <span>Selecione <strong>Make private</strong> e confirme</span>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🔑 Passo 2: Criar Personal Access Token</h3>
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">1.</span>
                        <span>Acesse: <a href="https://github.com/settings/tokens" target="_blank" className="text-blue-600 hover:underline">https://github.com/settings/tokens</a></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">2.</span>
                        <span>Clique em <strong>Generate new token</strong> → <strong>Classic</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">3.</span>
                        <span>Nome: "VPS Portal Prestador"</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">4.</span>
                        <span>Prazo: 1 ano (ou sua preferência)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">5.</span>
                        <span>Permissões: marque <strong>repo</strong> (acesso total aos repositórios)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">6.</span>
                        <span>Clique em <strong>Generate token</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#F05223] font-bold mr-2">⚠️</span>
                        <span className="text-red-600"><strong>IMPORTANTE:</strong> Copie o token agora (não aparecerá novamente)</span>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">⚙️ Passo 3: Configurar na VPS</h3>
                    <div className="space-y-3">
                      <CommandBox
                        id="github-config-1"
                        command='git config --global user.name "Seu Nome Completo"'
                        description="Configurar nome do usuário Git"
                      />
                      <CommandBox
                        id="github-config-2"
                        command='git config --global user.email "seu.email@exemplo.com"'
                        description="Configurar email do usuário Git"
                      />
                      <CommandBox
                        id="github-config-3"
                        command="git remote set-url origin https://SEU_TOKEN@github.com/ghmfreitas/portal-prestador.git"
                        description="Configurar URL com token (substitua SEU_TOKEN)"
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-blue-800 text-sm">
                        <strong>💡 Importante:</strong> No comando acima, substitua "SEU_TOKEN" pelo token que você copiou do GitHub.
                        O comando final ficará algo como:
                      </p>
                      <code className="block mt-2 text-xs bg-white p-2 rounded">
                        git remote set-url origin https://ghp_xxxxxxxxxxxx@github.com/ghmfreitas/portal-prestador.git
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">🧪 Passo 4: Testar Configuração</h3>
                    <div className="space-y-3">
                      <CommandBox
                        id="github-test-1"
                        command="git status"
                        description="Verificar status do repositório"
                      />
                      <CommandBox
                        id="github-test-2"
                        command="git pull origin main"
                        description="Testar conexão puxando atualizações"
                      />
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <p className="text-green-800 text-sm">
                        <strong>✅ Sucesso:</strong> Se os comandos acima funcionarem sem pedir senha, 
                        a configuração está correta e o repositório privado está funcionando!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">📋 Status da Configuração</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">✅ Já Configurado:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>SSH Key gerada na VPS</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Repositório conectado via SSH</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Git configurado para usar SSH</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">⏳ Pendente:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Tornar repositório privado</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Gerar Personal Access Token</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Configurar URL com token</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Testar conectividade</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">🔧 Informações Técnicas:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p><strong>SSH Key:</strong> ssh-ed25519 (já configurada)</p>
                      <p><strong>Email Git:</strong> ghmfreitas@gmail.com</p>
                    </div>
                    <div>
                      <p><strong>Método recomendado:</strong> HTTPS + Token</p>
                      <p><strong>URL atual:</strong> SSH (git@github.com:...)</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">🛡️ Segurança e Boas Práticas</h2>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-800 mb-2">⚠️ Importante sobre Tokens</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• O token é como uma senha - mantenha-o seguro</li>
                      <li>• Nunca compartilhe o token em mensagens ou logs</li>
                      <li>• Se comprometido, revogue imediatamente no GitHub</li>
                      <li>• Configure prazo de expiração adequado</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">💡 Alternativa SSH</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Se preferir usar SSH (mais seguro), adicione a chave SSH pública no GitHub:
                    </p>
                    <div className="bg-white rounded p-2 font-mono text-xs break-all">
                      ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILwfuk6gUyqeUtm3sE5fbbHUzd//OvpNQPJdKOjFT/Go ghmfreitas@gmail.com
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      Cole esta chave em: GitHub → Settings → SSH and GPG keys → New SSH key
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Tab: Troubleshooting */}
          {activeTab === 'troubleshooting' && (
            <div className="space-y-8">
              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">🔧 Problemas Comuns e Soluções</h2>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-medium text-yellow-800 mb-2">Erro: "Port already in use"</h3>
                    <p className="text-sm text-yellow-700 mb-3">A porta que você está tentando usar já está ocupada.</p>
                    <CommandBox
                      id="fix-port"
                      command="./scripts/dev-server.sh gustavo 3003"
                      description="Solução: Use uma porta diferente (3003, 3004, etc)"
                    />
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-800 mb-2">Erro: "Build failed"</h3>
                    <p className="text-sm text-red-700 mb-3">Há erros no código que impedem a compilação.</p>
                    <CommandBox
                      id="fix-build"
                      command="npm run build"
                      description="Solução: Rode este comando para ver os erros detalhados"
                    />
                    <p className="text-xs text-red-600 mt-2">
                      💡 Leia as mensagens de erro com atenção, elas indicam exatamente onde está o problema.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Perdido no Git?</h3>
                    <p className="text-sm text-blue-700 mb-3">Não sabe em que branch está ou o que mudou?</p>
                    <div className="space-y-2">
                      <CommandBox
                        id="fix-git-1"
                        command="git status"
                        description="Ver arquivos modificados"
                      />
                      <CommandBox
                        id="fix-git-2"
                        command="git branch"
                        description="Ver em qual branch está"
                      />
                      <CommandBox
                        id="fix-git-3"
                        command="git diff"
                        description="Ver exatamente o que mudou"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-medium text-purple-800 mb-2">Conflito de Merge</h3>
                    <p className="text-sm text-purple-700 mb-3">Quando você e Karine editaram o mesmo arquivo.</p>
                    <ol className="text-sm text-purple-700 space-y-1">
                      <li>1. Abra o arquivo com conflito</li>
                      <li>2. Procure por <code className="bg-white px-1">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code></li>
                      <li>3. Escolha qual versão manter</li>
                      <li>4. Remova as marcações de conflito</li>
                      <li>5. Salve e faça commit</li>
                    </ol>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">💡 Dicas de Segurança</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">✅ Boas Práticas:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Sempre trabalhar em sua branch pessoal</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Fazer commits frequentes (backup)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Testar antes de fazer merge</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Comunicar com a equipe antes do deploy</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">❌ O que Evitar:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Trabalhar direto na branch main</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Deploy sem testar com npm run build</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Ignorar mensagens de erro</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Usar a porta 3000 (reservada)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-[#EAE7EC] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">🆘 Precisa de Ajuda?</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Com o Claude (eu!):</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Sempre me identifique no início da conversa:
                    </p>
                    <div className="bg-white rounded p-3 font-mono text-sm">
                      "Oi Claude, sou o Gustavo" ou "Olá, aqui é a Karine"
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Assim eu posso dar comandos específicos para sua configuração!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Documentação de Referência:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• <code>.md/workflow-colaborativo.md</code> - Detalhes técnicos do workflow</li>
                      <li>• <code>.md/contexto-vps.md</code> - Histórico de configuração</li>
                      <li>• <code>CLAUDE.md</code> - Minhas instruções e memória</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Footer */}
          <section className="bg-[#F05223] rounded-xl p-6 text-white mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Resumo Rápido do Workflow</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Para Gustavo:</h3>
                <ol className="space-y-2 text-sm">
                  <li>1. <code className="bg-white/20 px-1 rounded">git checkout dev-gustavo</code></li>
                  <li>2. <code className="bg-white/20 px-1 rounded">./scripts/dev-server.sh gustavo 3001</code></li>
                  <li>3. Trabalhar e ver mudanças em localhost:3001</li>
                  <li>4. <code className="bg-white/20 px-1 rounded">git commit -m "design: [mudança]"</code></li>
                  <li>5. Quando pronto: merge e deploy</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Para Karine:</h3>
                <ol className="space-y-2 text-sm">
                  <li>1. <code className="bg-white/20 px-1 rounded">git checkout dev-karine</code></li>
                  <li>2. <code className="bg-white/20 px-1 rounded">./scripts/dev-server.sh karine 3002</code></li>
                  <li>3. Trabalhar e ver mudanças em localhost:3002</li>
                  <li>4. <code className="bg-white/20 px-1 rounded">git commit -m "ui: [mudança]"</code></li>
                  <li>5. Quando pronto: merge e deploy</li>
                </ol>
              </div>
            </div>
            
            <p className="text-sm opacity-90 mt-4">
              <strong>Lembrete:</strong> Este workflow permite trabalho simultâneo sem conflitos! 
              Sempre testem antes de publicar. 🚀
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}