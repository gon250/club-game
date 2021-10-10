import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { supabase } from "../../utils/supabaseClient";

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
        }

        if (data) {
            setEvent(data)
        }

        fetchEvent()
    }, [])

    return <>
        <div>Display Event: {id}</div>
    </>
}

export default Event
