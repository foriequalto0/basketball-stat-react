"use client"

import { useState } from "react"
import { StatLog as StatLogType } from "../types/basketball"

interface StatLogProps {
  logs: StatLogType[]
  onDelete: (logId: string) => void
}

export function StatLog({ logs, onDelete }: StatLogProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleLogs = showAll ? logs : logs.slice(0, 20)

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-3 text-[#191919]">Recent Activity</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#e0e0e0]">
            <th className="text-left py-2 px-3 text-[#666666] w-32">Player</th>
            <th className="text-left py-2 px-3 text-[#666666] w-24">Stat</th>
            <th className="text-left py-2 px-3 text-[#666666] w-24">Time</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {visibleLogs.map((log) => (
            <tr key={log.id} className="border-b border-[#e0e0e0] last:border-0">
              <td className="py-2 px-3">
                <span className="text-[#191919] text-sm">#{log.playerName}</span>
              </td>
              <td className="py-2 px-3">
                <span className="text-[#191919] text-sm">{log.statType} {log.value > 0 ? '+' : ''}{log.value}</span>
              </td>
              <td className="py-2 px-3">
                <span className="text-[#666666] text-sm">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </td>
              <td className="py-2 px-3">
                <button
                  onClick={() => onDelete(log.id)}
                  className="text-[#666666] hover:text-[#191919] text-sm"
                  aria-label="Delete log"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {logs.length > 20 && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#0a66c2] hover:text-[#004182] text-sm font-medium"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  )
} 