import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Avatar from "../components/Avatar";

export default function Account() {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [bio, setBio] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let {data, error, status} = await supabase
                .from('profiles')
                .select(`username, bio, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setBio(data.bio)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({username, bio, avatar_url}) {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                username,
                bio,
                avatar_url,
                updated_at: new Date(),
            }

            let {error} = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({username, bio, avatar_url: url})
                }}
            />
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={supabase.auth.user().email} disabled/>
            </div>
            <div>
                <label htmlFor="username">Name</label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="bio">bio</label>
                <input
                    id="bio"
                    type="bio"
                    value={bio || ''}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button block primary"
                    onClick={() => updateProfile({username, bio, avatar_url})}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button className="button block" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}
