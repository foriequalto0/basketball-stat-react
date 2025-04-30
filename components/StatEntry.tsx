"use client"

import { Player, StatType } from "../types/basketball"

interface StatEntryProps {
  players: Player[]
  onStatChange: (playerId: string, statType: StatType, value: number) => void
  onRemove: (playerId: string) => void
}

export function StatEntry({ players, onStatChange, onRemove }: StatEntryProps) {
  const statTypes: StatType[] = ['FT', 'FTA', 'FG', 'FGA', '3', '3PA', 'rebounds', 'assists', 'steals', 'blocks', 'turnovers', 'fouls']

  const getDisplayName = (statType: StatType) => {
    switch (statType) {
      case '3': return '3PT'
      case 'FG': return '2PT'
      case 'FGA': return '2PA'
      case 'rebounds': return 'Reb'
      case 'assists': return 'Ast'
      case 'steals': return 'Stl'
      case 'blocks': return 'Blk'
      case 'turnovers': return 'TO'
      default: return statType
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3 border border-[#e0e0e0]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#e0e0e0]">
            <th className="text-left py-2 px-3 text-[#666666] w-32">Player</th>
            {statTypes.map((statType) => (
              <th key={statType} className="text-center py-2 px-3 text-[#666666] w-20">
                {getDisplayName(statType)}
              </th>
            ))}
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-b border-[#e0e0e0] last:border-0">
              <td className="py-2 px-3">
                <div className="flex items-center">
                  <span className="font-medium text-[#191919] text-sm">#{player.number} {player.name}</span>
                </div>
              </td>
              {statTypes.map((statType) => (
                <td key={statType} className="py-2 px-3">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => onStatChange(player.id, statType, 1)}
                      className="text-[#666666] hover:text-[#191919] text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                </td>
              ))}
              <td className="py-2 px-3">
                <button
                  onClick={() => onRemove(player.id)}
                  className="text-[#666666] hover:text-[#191919] text-sm"
                  aria-label="Remove player"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 