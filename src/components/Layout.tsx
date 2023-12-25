import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App" style={{ width: '100%', flexGrow: 1, padding:'0px' }}>
            <Outlet />
        </main>
    )
}

export default Layout
