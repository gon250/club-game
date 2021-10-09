function Footer() {
    return (
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
            <div className="row">
                <div className="col-12 col-md">
                    <small className="d-block mb-3 text-muted">&copy; 2022</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Build</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-1">
                            <a className="link-secondary text-decoration-none" href="#">
                                supabase
                            </a>
                        </li>
                        <li className="mb-1">
                            <a className="link-secondary text-decoration-none" href="#">
                                Nextjs
                            </a>
                        </li>
                        <li className="mb-1">
                            <a className="link-secondary text-decoration-none" href="#">
                                bootstrap
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>WIP</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-1">
                            <a className="link-secondary text-decoration-none" href="#">
                                Coming
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>About</h5>
                    <ul className="list-unstyled text-small">
                        <li className="mb-1">
                            <a className="link-secondary text-decoration-none" href="#">
                                gonzalobarba.me
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
