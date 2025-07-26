import Link from 'next/link'

const footerSections = [
  {
    title: 'Apps',
    links: [
      { label: 'iOS - Saúde', href: '#' },
      { label: 'Android - Saúde', href: '#' },
      { label: 'iOS - Odonto', href: '#' },
      { label: 'Android - Odonto', href: '#' },
      { label: 'iOS - Investimentos', href: '#' },
      { label: 'Android - Investimentos', href: '#' },
    ]
  },
  {
    title: 'A SulAmérica',
    links: [
      { label: 'Sobre', href: '#' },
      { label: 'Sala de Imprensa', href: '#' },
      { label: 'Sustentabilidade', href: '#' },
      { label: 'Endereços', href: '#' },
      { label: 'Carreiras', href: '#' },
      { label: 'Mapa do site', href: '#' },
      { label: 'Dicionário', href: '#' },
      { label: 'Notícias', href: '#' },
    ]
  },
  {
    title: 'Termos e políticas',
    links: [
      { label: 'Segurança online', href: '#' },
      { label: 'Portal de privacidade', href: '#' },
      { label: 'Política de privacidade', href: '#' },
      { label: 'Termos e condições', href: '#' },
      { label: 'Direitos do consumidor', href: '#' },
      { label: 'Open Insurance', href: '#' },
      { label: 'Investidores', href: '#' },
      { label: 'Demonstrações financeiras', href: '#' },
    ]
  },
  {
    title: 'Atendimento',
    links: [
      { label: 'Canais de atendimento', href: '#' },
      { label: 'Ouvidoria', href: '#' },
      { label: 'WhatsApp', href: '#' },
      { label: 'Canal de denúncias', href: '#' },
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 col-span-full">
      <div className="max-w-7xl mx-auto px-4 tablet:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#F05223] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 tablet:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Copyright © 2009 - 2025 SulAmérica
          </p>
        </div>
      </div>
    </footer>
  )
}