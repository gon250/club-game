import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { supabase } from "../../lib/supabaseClient";

function Event() {
    const router = useRouter()
    const {id} = router.query

    const [event, setEvent] = useState(null)

    useEffect(() => {
        async function fetchEvent() {
            const {data, error} = await supabase
                .from('clubs')
                .select(`*`)
                .eq('id', id)
                .single()

            if (data) {
                setEvent(data)
            }

            if (error) {
                alert('There was an error while getting the event.')
            }
        }

        fetchEvent()
    }, [])

    return <>
        <div>Display Event: {id}</div>
    </>
}

export default Event
