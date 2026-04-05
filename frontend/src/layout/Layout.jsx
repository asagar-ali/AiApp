import "react"
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react"
import {Outlet, Link, Navigate, useLocation} from "react-router-dom"

export function Layout() {
    const location = useLocation()

    return <div className="app-layout">
        <header className="app-header">
            <div className="header-content">
                <h1>Code Challenge Generator</h1>
                <nav>
                    <SignedIn>
                        <Link
                            to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Generate Challenge
                        </Link>
                        <Link
                            to="/history"
                            className={location.pathname === '/history' ? 'active' : ''}
                        >
                            History
                        </Link>
                        <UserButton afterSignOutUrl="/sign-in" />
                    </SignedIn>
                </nav>
            </div>
        </header>

        <main className="app-main">
            <SignedOut>
                <Navigate to="/sign-in" replace/>
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </main>
    </div>
}