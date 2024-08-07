import { useEffect, useState } from "react"
import { apiUsers } from "../../api.js"
import { Loader } from "../uiKit/Loader/Loader.jsx"
import { TableRow } from "../TableRow/TableRow.jsx"
import { TableHeader } from "../TableHeader/TableHeader.jsx"
import { Input } from "../uiKit/Input/Input.jsx"
import { debounce } from "../../helpers.js"
import toast, { Toaster } from "react-hot-toast"
import "./Table.css"

export function Table() {
  const [loading, setLoading] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)
  const [users, setUsers] = useState([])
  const [count, setCount] = useState([])
  const [page, setPage] = useState(1)
  const [headers] = useState([
    { id: "lastName", name: "Full name" },
    { id: "age", name: "Age" },
    { id: "gender", name: "Gender" },
    { id: "phone", name: "Phone number" },
    { id: "address", name: "Address" },
  ])
  const limit = 30
  const pagStyle = (el) => {
    return `pagination__item ${page === el ? "item_active" : ""}`
  }

  useEffect(() => {
    async function init() {
      setLoading(true)

      const data = await apiUsers.getUsers()
      if (!data) {
        toast.error("Something went wrong!")
      } else {
        const pagesCount = Math.ceil(data.total / limit)
        let pages = []
        for (let i = 0; i < pagesCount; i++) {
          pages.push(i + 1)
        }

        setCount(pages)
        setUsers(data.users)
      }

      setLoading(false)
    }

    init()
  }, [])

  async function load() {
    setLoadingTable(true)

    setUsers([])

    const data = await apiUsers.getUsers()
    setUsers(data.users)

    setLoadingTable(false)
  }

  const debouncedLoad = debounce(load, 1000)

  const handleChange = (value) => {
    apiUsers.search = value
    apiUsers.sort.field = ""
    apiUsers.sort.direction = ""
    apiUsers.skip = 0
    setPage(1)
    debouncedLoad()
  }

  function changePage(val) {
    setPage(val)
    apiUsers.skip = (val - 1) * limit
    apiUsers.search = ""
    debouncedLoad()
  }

  if (loading) {
    return <Loader />
  } else {
    return (
      <>
        <Input onChange={handleChange} />

        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <TableHeader key={header.id} header={header} onClick={load} />
              ))}
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map((user) => (
              <TableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>

        {count.length > 1 && !loadingTable && (
          <ul className="pagination">
            {count.map((page) => (
              <li
                onClick={() => {
                  changePage(page)
                }}
                key={page}
                className={pagStyle(page)}
              >
                {page}
              </li>
            ))}
          </ul>
        )}

        {loadingTable && <Loader />}

        <Toaster />
      </>
    )
  }
}
