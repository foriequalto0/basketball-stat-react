"use client"

import { Player, StatType } from "../types/basketball"

interface PlayerTotalsProps {
  players: Player[]
}

export function PlayerTotals({ players }: PlayerTotalsProps) {
  const calculatePoints = (player: Player) => {
    return player.stats.FT + (player.stats.FG * 2) + (player.stats['3'] * 3)
  }

  const calculatePercentage = (made: number, attempted: number) => {
    if (attempted === 0) return '0%'
    return `${Math.round((made / attempted) * 100)}%`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3 border border-[#e0e0e0] inline-block">
      <table className="table-fixed">
        <thead>
          <tr className="border-b border-[#e0e0e0]">
            <th className="text-left py-2 px-3 text-[#666666] w-32">Player</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">PTS</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">FT</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">FTA</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">FT%</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">2PT</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">2PA</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">2PT%</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">3PT</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">3PA</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">3PT%</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">Reb</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">Ast</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">Stl</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">Blk</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">TO</th>
            <th className="text-center py-2 px-3 text-[#666666] w-20">fouls</th>
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
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{calculatePoints(player)}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.FT}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.FTA}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">
                    {calculatePercentage(player.stats.FT, player.stats.FTA)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.FG}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.FGA}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">
                    {calculatePercentage(player.stats.FG, player.stats.FGA)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats['3']}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats['3PA']}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">
                    {calculatePercentage(player.stats['3'], player.stats['3PA'])}
                  </span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.rebounds}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.assists}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.steals}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.blocks}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.turnovers}</span>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="flex flex-col items-center">
                  <span className="text-[#191919] font-medium text-base">{player.stats.fouls}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 