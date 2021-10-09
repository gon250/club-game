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
    const [profile, setProfile] = useState(null)
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        if (id) {
            if (!profile) {
                fetchProfile()
            }
            fetchClub();
        }
    }, [id])

    const fetchProfile = async () => {
        let {data, error, status} = await supabase
            .from('profiles')
            .select(`
                id,
                user_clubs(*)
            `)
            .eq('id', supabase.auth.user().id)
            .single()
        if (data) {
            setProfile(data)
            const isSubscribed = data.user_clubs.find(club => club.club_id === id);
            setSubscribed(!!(isSubscribed && isSubscribed.length > 0))
        }
    }

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

    const toogleSubscription = async () => {
        if (subscribed) {
            await supabase
                .from('user_clubs')
                .delete()
                .eq('user_id', supabase.auth.user().id)
                .eq('club_id', id)
        } else {
            await supabase
                .from('user_clubs')
                .insert([{user_id: supabase.auth.user().id, club_id: id}])
        }
        setSubscribed(!subscribed)
    }

    return <div>
        {
            (!loading && club)
                ? <>
                    <h1>{club.name}</h1>
                    <button onClick={toogleSubscription}> {subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
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
