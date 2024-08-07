import { useEffect, useState } from "react"
import "./Info.css"
import toast, { Toaster } from "react-hot-toast"
import { getUserInfo } from "../../api"
import { Loader } from "../uiKit/Loader/Loader.jsx"

export function Info({ user }) {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function init() {
      setLoading(true)

      const data = await getUserInfo(user.id)
      if (!data) {
        toast.error("Something went wrong!")
      } else {
        setUserData(data)
      }
      setLoading(false)
    }

    init()
  }, [])

  return (
    <div className="wrapper">
      {!loading && userData && (
        <div className="info">
          <h4 className="info__header">
            Name: {userData.firstName} {userData.lastName}
          </h4>
          <div className="info__detail">Age: {userData.age}</div>
          <div className="info__detail">
            Address: {userData.address.city}, {userData.address.address}
          </div>
          <div className="info__detail">Height: {userData.height}</div>
          <div className="info__detail">Weight: {userData.weight}</div>
          <div className="info__detail">Phone: {userData.phone}</div>
          <div className="info__detail">Email: {userData.email}</div>
        </div>
      )}

      {loading && <Loader />}

      <Toaster />
    </div>
  )
}

// ФИО, возраст, адрес (город и название улицы), рост, вес, номер телефона и email-адрес.
