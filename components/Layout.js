import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({children}) {
    return (
        <div className="container py-3">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
