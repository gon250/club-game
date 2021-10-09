import '../styles/globals.css'
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "./account";

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <Layout>
            {!session ? <Auth/> : <Component {...pageProps}/>}
        </Layout>
    )
}

export default MyApp
