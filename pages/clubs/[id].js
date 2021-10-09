import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

function Clubs() {
    const router = useRouter()
    const {id} = router.query

    const [club, setClub] = useState(null)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(false);

    useEffect(() => {
        if (id) {
            fetchClub();
        }
    }, [id])

    const fetchClub = async () => {
        setLoading(true)
        const {data, error} = await supabase
            .from('clubs')
            .select(`
            name, 
            description,
            club_pages (
                message,
                profiles (
                    username
                )
            )
            `)
            .eq('id', id)
            .single()

        if (data) {
            console.log(data)
            setLoading(false)
            setClub(data);
        }

        if (error) {
            console.log(error)
            // alert('There was an error while requesting the club.')
        }
    };

    const createMessage = async () => {
        setLoadingMessages(true);
        const {data, error} = await supabase
            .from('club_pages')
            .insert([
                {id_club: id, id_user: supabase.auth.user().id, message},
            ])
        setLoadingMessages(false);
        setMessage('')
        fetchClub()
    }

    return <div>
        {
            (!loading && club)
                ? <>
                    <h1>{club.name}</h1>
                    <p>{club.description}</p>
                    <br/><br/>
                    <h3>Club Messages</h3>
                    {club.club_pages && club.club_pages.map((item, id) => {
                        return <div key={id}>{item.message} by {item.profiles.username}</div>
                    })}
                    <hr/>
                    <div>
                        <label htmlFor="message">New Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}/>
                        <button onClick={createMessage}>+ message</button>
                    </div>
                </>
                : <div>loading</div>
        }
    </div>
}

export default Clubs