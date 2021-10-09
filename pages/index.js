import Link from 'next/link'
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
    const [userClubs, setUserClubs] = useState(null)

    useEffect(() => {
        const fetchUserClubs = async () => {
            const { data, error } =
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

    return (
        <div>
            <Link href="./clubs/new">
                Create Club
            </Link>
            <hr/>
            {
                userClubs
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
                    : <div>join to a club</div>
            }
        </div>
    )
}
