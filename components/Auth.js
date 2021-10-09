import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email) => {
        try {
            setLoading(true)
            const {error} = await supabase.auth.signIn({email})
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="auth-main">
            <div className="row">
                <div className="col">
                    <h1 className="header">Game Club</h1>
                    <p className="description">Sign in via magic link with your email below</p>
                    <div>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handleLogin(email)
                            }}
                            className="btn btn-primary mt-2"
                            disabled={loading}
                        >
                            <span>{loading ? 'Loading' : 'Send magic link'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
