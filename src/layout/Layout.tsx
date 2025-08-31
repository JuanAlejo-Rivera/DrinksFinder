import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"


export default function Layout() {

    //si se trabaja con persist esta linea no es necesaria 
    const loadFromStorage = useAppStore((state) => state.loadFromStorage)

    useEffect(() => {
        loadFromStorage()
    }, [])

    return (
        <>
            <Header />
            <main className="mx-auto py-16 bg-gray-800 min-h-screen px-4">
                <Outlet />
            </main>
            <Modal />
            <Notification />
        </>

    )
}
