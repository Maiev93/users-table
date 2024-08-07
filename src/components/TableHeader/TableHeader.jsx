import { useState } from "react"
import { apiUsers } from "../../api.js"
import "./TableHeader.css"

export function TableHeader({ onClick, header }) {
  const [sort, setSort] = useState("")
  const sortClasses = `table__sort ${sort ? "active" : ""}`

  function toggleSorting(id) {
    let sorting = sort
    switch (sort) {
      case "asc":
        sorting = "desc"
        setSort("desc")
        break
      case "desc":
        sorting = ""
        setSort("")
        break

      default:
        sorting = "asc"
        setSort("asc")
        break
    }

    apiUsers.sort.field = id
    apiUsers.sort.direction = sorting
    apiUsers.search = ""

    onClick()
  }

  return (
    <th key={header.id}>
      {header.name}
      {(sort === "asc" || !sort) && (
        <span className={sortClasses} onClick={() => toggleSorting(header.id)}>
          &#8642;
        </span>
      )}
      {sort === "desc" && (
        <span className={sortClasses} onClick={() => toggleSorting(header.id)}>
          &#8638;
        </span>
      )}
    </th>
  )
}
