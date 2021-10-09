import Link from 'next/link'
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
    const [userClubs, setUserClubs] = useState(null)

    useEffect(() => {
        const fetchUserClubs = async () => {
            const {data, error} =
                await supabase.from('user_clubs')
                    .select(`*, clubs(*)`)
                    .eq('user_id', supabase.auth.user().id)
            if (data) {
                console.log(data)
                setUserClubs(data);
            }
        }
        fetchUserClubs()
    }, [])

    function NoClubBox() {
        return (
            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">No game club yet 😱</h1>
                <p className="fs-5 text-muted">
                    You are not part of a video game club yet? Look for the club that best identifies you,
                    where your friends are or create one yourself!!
                </p>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Link href="./clubs/new">
                        <button type="button" className="btn btn-outline-primary">Create</button>
                    </Link>
                    <Link href="./clubs">
                        <button type="button" className="btn btn-outline-primary">Search</button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                userClubs && userClubs.length > 0
                    ? <div>
                        {userClubs.map((item) => {
                            return (
                                <div key={item.club_id}>
                                    Club Name: {item.clubs.name}
                                    <br/>
                                    Club Description: {item.clubs.description}
                                </div>
                            )
                        })}
                    </div>
                    : <NoClubBox/>
            }
        </div>
    )
}
