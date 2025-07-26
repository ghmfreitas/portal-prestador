'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface OdontogramaProps {
  selectedTeeth: string[]
  onToothToggle: (tooth: string) => void
  showDeciduous?: boolean
}

export default function Odontograma({ selectedTeeth, onToothToggle, showDeciduous = true }: OdontogramaProps) {
  // Dentes permanentes superiores (18-11 e 21-28)
  const upperPermanentRight = ['18', '17', '16', '15', '14', '13', '12', '11']
  const upperPermanentLeft = ['21', '22', '23', '24', '25', '26', '27', '28']
  
  // Dentes permanentes inferiores (48-41 e 31-38)
  const lowerPermanentRight = ['48', '47', '46', '45', '44', '43', '42', '41']
  const lowerPermanentLeft = ['31', '32', '33', '34', '35', '36', '37', '38']

  // Dentes decíduos superiores (55-51 e 61-65)
  const upperDeciduousRight = ['55', '54', '53', '52', '51']
  const upperDeciduousLeft = ['61', '62', '63', '64', '65']
  
  // Dentes decíduos inferiores (85-81 e 71-75)
  const lowerDeciduousRight = ['85', '84', '83', '82', '81']
  const lowerDeciduousLeft = ['71', '72', '73', '74', '75']

  const renderToothCheckbox = (tooth: string, isDeciduous: boolean = false) => (
    <div key={tooth} className="flex flex-col items-center">
      <Label 
        htmlFor={`tooth-${tooth}`} 
        className={`text-xs font-medium mb-1 ${isDeciduous ? 'text-blue-600' : 'text-gray-700'}`}
      >
        {tooth}
      </Label>
      <Checkbox
        id={`tooth-${tooth}`}
        checked={selectedTeeth.includes(tooth)}
        onCheckedChange={() => onToothToggle(tooth)}
        className="h-6 w-6 border-2"
      />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Arcada Superior */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900 text-center">Arcada Superior</h4>
        
        {/* Dentes Permanentes Superiores */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-center items-center gap-2">
            <div className="flex gap-2">
              {upperPermanentRight.map(tooth => renderToothCheckbox(tooth))}
            </div>
            <div className="w-px h-12 bg-gray-300 mx-2" />
            <div className="flex gap-2">
              {upperPermanentLeft.map(tooth => renderToothCheckbox(tooth))}
            </div>
          </div>
        </div>

        {/* Dentes Decíduos Superiores */}
        {showDeciduous && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-blue-700 text-center mb-2">Dentes Decíduos</p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex gap-2">
                {upperDeciduousRight.map(tooth => renderToothCheckbox(tooth, true))}
              </div>
              <div className="w-px h-12 bg-blue-300 mx-2" />
              <div className="flex gap-2">
                {upperDeciduousLeft.map(tooth => renderToothCheckbox(tooth, true))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Linha divisória */}
      <div className="border-t-2 border-gray-300 my-4" />

      {/* Arcada Inferior */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900 text-center">Arcada Inferior</h4>

        {/* Dentes Decíduos Inferiores */}
        {showDeciduous && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-blue-700 text-center mb-2">Dentes Decíduos</p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex gap-2">
                {lowerDeciduousRight.map(tooth => renderToothCheckbox(tooth, true))}
              </div>
              <div className="w-px h-12 bg-blue-300 mx-2" />
              <div className="flex gap-2">
                {lowerDeciduousLeft.map(tooth => renderToothCheckbox(tooth, true))}
              </div>
            </div>
          </div>
        )}
        
        {/* Dentes Permanentes Inferiores */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-center items-center gap-2">
            <div className="flex gap-2">
              {lowerPermanentRight.map(tooth => renderToothCheckbox(tooth))}
            </div>
            <div className="w-px h-12 bg-gray-300 mx-2" />
            <div className="flex gap-2">
              {lowerPermanentLeft.map(tooth => renderToothCheckbox(tooth))}
            </div>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex justify-center gap-6 text-xs mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded" />
          <span className="text-gray-600">Permanentes</span>
        </div>
        {showDeciduous && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border border-blue-300 rounded" />
            <span className="text-blue-600">Decíduos</span>
          </div>
        )}
      </div>

      {/* Contador de dentes selecionados */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Dentes selecionados: <span className="font-semibold text-[#F05223]">{selectedTeeth.length}</span>
        </p>
      </div>
    </div>
  )
}