import "./Input.css"
import { useState } from "react"

export function Input({ onChange }) {
  const [search, setSearch] = useState("")

  const handleChange = (event) => {
    const value = event.target.value
    setSearch(value)
    onChange(event.target.value)
  }

  return (
    <input
      placeholder="Type for search..."
      type="text"
      value={search}
      className="input"
      onChange={handleChange}
    ></input>
  )
}
