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
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Features</a>
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Enterprise</a>
                    <a className="me-3 py-2 text-dark text-decoration-none" href="#">Support</a>
                    <Link href="account">
                        <a className="py-2 text-dark text-decoration-none">Account</a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
