import { Info } from "../Info/Info"
import { useState } from "react"

export function TableRow(props) {
  const { user } = props
  const [showInfo, setShowInfo] = useState(false)

  function clickHandler() {
    const isShow = !showInfo
    setShowInfo(isShow)
  }
  return (
    <tr onClick={clickHandler} style={{ cursor: "pointer" }}>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.age}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      <td>
        {user.address.address}, {user.address.city}
        {showInfo && <Info user={user} />}
      </td>
    </tr>
  )
}
