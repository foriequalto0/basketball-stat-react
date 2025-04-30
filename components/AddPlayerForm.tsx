"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface AddPlayerFormProps {
  onAddPlayer: (player: { id: string; name: string; number: string }) => void
}

export function AddPlayerForm({ onAddPlayer }: AddPlayerFormProps) {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Player name is required")
      return
    }

    if (!number.trim()) {
      setError("Jersey number is required")
      return
    }

    const num = parseInt(number)
    if (isNaN(num) || num <= 0) {
      setError("Jersey number must be a positive number")
      return
    }

    onAddPlayer({
      id: uuidv4(),
      name: name.trim(),
      number: number.trim(),
    })

    setName("")
    setNumber("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-[5px]">
      <div className="flex items-center gap-[5px]">
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Player Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-40 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Enter name"
        />
      </div>
      <div className="flex items-center gap-[5px]">
        <label htmlFor="number" className="text-sm font-medium text-slate-700">
          Jersey #
        </label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-16 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="#"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        Add Player
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  )
} 