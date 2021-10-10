import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { supabase } from "../../utils/supabaseClient";

function Clubs() {
    const router = useRouter()
    const {id} = router.query

    const [club, setClub] = useState(null)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [subscribed, setSubscribed] = useState(false)

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
            user_clubs(*),
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
            setLoading(false)
            setClub(data);
            setSubscribed(data.user_clubs.length > 0)
        }

        if (error) {
            console.log(error)
            alert('There was an error while getting the game club info.')
        }
    };

    const createMessage = async () => {
        const {data, error} = await supabase
            .from('club_pages')
            .insert([
                {id_club: id, id_user: supabase.auth.user().id, message},
            ])
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
                    <h1>
                        {club.name}
                        <small className="ml-2">
                            <button className="btn btn-sm btn-outline-primary"
                                    onClick={toogleSubscription}> {subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
                        </small>
                    </h1>
                    <p className="lead">{club.description}</p>
                    <br/><br/>
                    <h4>Club Messages</h4>
                    <div className="row">
                        {club.club_pages && club.club_pages.map((item, id) => {
                            return <div key={id} className="col-md-12 border border-primary m-2">{item.message} by {item.profiles.username}</div>
                        })}
                    </div>
                    <hr/>
                    <div>
                        <label htmlFor="message" className="form-label">New Message</label>
                        <textarea
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}/>
                        <button onClick={createMessage} className="btn btn-sm btn-primary mt-2">add</button>
                    </div>
                </>
                : <div>loading</div>
        }
    </div>
}

export default Clubs
