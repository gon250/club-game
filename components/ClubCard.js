import Link from 'next/link'

function ClubCard({club, className}) {
    return (
        <div className={`card m-2 ${className}`}>
            <div className="card-body">
                <h5 className="card-title">{club.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                    {club.description}
                </p>
                <Link href={`/clubs/${club.id}`}>
                    <a className="card-link">View game club</a>
                </Link>
            </div>
        </div>
    )
}

export default ClubCard
