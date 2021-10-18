import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Auth from "../components/Auth";

import '../styles/globals.css'

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <>
            {!session
                ? <Auth/>
                : <Layout><Component {...pageProps}/></Layout>
            }
        </>
    )
}

export default MyApp
