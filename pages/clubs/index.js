import { useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "../../lib/supabaseClient";
import ClubCard from "../../components/ClubCard";

function Clubs() {
    const [clubs, setClubs] = useState(null)
    const [clubsError, setClubsError] = useState(null)

    useEffect(() => {
        async function fetchClubs() {
            let {data: clubs, error} =
                await supabase.from('clubs').select('*')
            if (clubs) {
                setClubs(clubs)
            }
            if (error) {
                setClubsError(error)
            }
        }

        fetchClubs()
    }, [])

    if (clubsError) {
        return <div>There was an error while requesting the list of clubs, please try again.</div>
    }

    return <>
        <div className="row">
            <div className="alert alert-primary" role="alert">
                🕹 Join a video-game club and start discussing and commenting on the games you like the most
            </div>
        </div>
        <div className="row">
            {clubs && clubs.map((item) => <ClubCard key={item.id} club={item} className="col-md-4"/>)}
        </div>
        <div className="row">
            <Link href="./clubs/new" passHref>
                <button type="button" className="btn btn-outline-primary m-2">
                    {`Can't find a club? create your own`}
                </button>
            </Link>
        </div>
    </>
}

export default Clubs
