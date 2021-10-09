import Link from 'next/link'

function Navbar() {
    return (
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <Link href="/">
                    <a className="d-flex align-items-center text-dark text-decoration-none">
                        <span className="fs-4">Game club</span>
                    </a>
                </Link>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <Link href="/">
                        <a className="me-3 py-2 text-dark text-decoration-none">Home</a>
                    </Link>
                    <Link href="/clubs/me">
                        <a className="me-3 py-2 text-dark text-decoration-none" href="#">My clubs</a>
                    </Link>
                    <Link href="/wip">
                        <a className="me-3 py-2 text-dark text-decoration-none">
                            WIP
                        </a>
                    </Link>
                    <Link href="/account">
                        <a className="py-2 text-dark text-decoration-none">Account</a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
