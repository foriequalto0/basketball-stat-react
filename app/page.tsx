"use client"

import { useState } from "react"
import { Player, StatLog as StatLogType, StatType } from "../types/basketball"
import { StatLog } from "../components/StatLog"
import { AddPlayerForm } from "../components/AddPlayerForm"
import { PlayerTotals } from "../components/PlayerTotals"
import { StatEntry } from "../components/StatEntry"
import { v4 as uuidv4 } from "uuid"

const initialPlayers: Player[] = []

export default function Home() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [statLogs, setStatLogs] = useState<StatLogType[]>([])

  const handleStatChange = (playerId: string, statType: StatType, value: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === playerId) {
          const newStats = { ...player.stats }
          
          // Update the main stat
          newStats[statType] = Math.max(0, newStats[statType] + value)
          
          // Update corresponding attempt stats
          if (statType === 'FT') {
            newStats.FTA = Math.max(0, newStats.FTA + value)
          } else if (statType === 'FG') {
            newStats.FGA = Math.max(0, newStats.FGA + value)
          } else if (statType === '3') {
            newStats['3PA'] = Math.max(0, newStats['3PA'] + value)
          }
          
          return {
            ...player,
            stats: newStats,
          }
        }
        return player
      })
    )

    const player = players.find((p) => p.id === playerId)
    if (player) {
      const newLog: StatLogType = {
        id: uuidv4(),
        playerId,
        playerName: player.name,
        statType,
        value,
        timestamp: new Date(),
      }
      setStatLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 5))
    }
  }

  const handleDeleteLog = (logId: string) => {
    const logToDelete = statLogs.find((log) => log.id === logId)
    if (logToDelete) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.id === logToDelete.playerId) {
            return {
              ...player,
              stats: {
                ...player.stats,
                [logToDelete.statType]: Math.max(0, player.stats[logToDelete.statType] - logToDelete.value),
              },
            }
          }
          return player
        })
      )
      setStatLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId))
    }
  }

  const handleAddPlayer = (newPlayer: { id: string; name: string; number: string }) => {
    const playerWithStats: Player = {
      ...newPlayer,
      stats: {
        FT: 0,
        FTA: 0,
        FG: 0,
        FGA: 0,
        '3': 0,
        '3PA': 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        fouls: 0,
      },
    }
    setPlayers((prevPlayers) => [...prevPlayers, playerWithStats])
  }

  const handleRemovePlayer = (playerId: string) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId))
  }

  return (
    <main className="min-h-screen bg-[#f3f2ef] p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#0a66c2]">Basketball Stat Tracker</h1>
        <div className="flex flex-col gap-6">
          {/* Stat Entry Components */}
          <div className="grid grid-cols-1 gap-4">
            <StatEntry
              players={players}
              onStatChange={handleStatChange}
              onRemove={handleRemovePlayer}
            />
          </div>

          {/* Player Totals */}
          <PlayerTotals players={players} />

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-3 border border-[#e0e0e0]">
            <StatLog logs={statLogs} onDelete={handleDeleteLog} />
          </div>

          {/* Add Player Form */}
          <div className="bg-white rounded-lg shadow-md p-3 border border-[#e0e0e0]">
            <AddPlayerForm onAddPlayer={handleAddPlayer} />
          </div>
        </div>
      </div>
    </main>
  )
} 