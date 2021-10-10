import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import ClubCard from "../../components/ClubCard";
import Link from "next/link";

function Clubs() {
    const [clubs, setClubs] = useState(null)

    useEffect(() => {
        async function fetchClubs() {
            let {data: clubs, error} =
                await supabase.from('clubs')
                    .select('*')
            if (clubs) {
                setClubs(clubs);
            }
        }

        fetchClubs()

    }, [])

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
            <Link href="./clubs/new">
                <button type="button" className="btn btn-outline-primary">Can't find a club? create your own</button>
            </Link>
        </div>
    </>
}

export default Clubs
