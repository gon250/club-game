import Link from 'next/link'

export default function Home() {
    return (
        <div className="container" style={{padding: '50px 0 100px 0'}}>
            <h1>Index</h1>
            <hr/>
            <Link href="./clubs/new">
                <a>Create Club</a>
            </Link>
        </div>
    )
}
