import { useState } from "react";
import { useRouter } from 'next/router'
import { supabase } from "../../utils/supabaseClient";

function NewClub() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [clubName, setClubName] = useState(null)
    const [description, setDescription] = useState(null)

    async function createNewClub() {
        setLoading(true)
        const {data, error} = await supabase
            .from('clubs')
            .insert([
                {
                    profile_id: supabase.auth.user().id,
                    name: clubName,
                    description: description,
                    updated_at: new Date()
                }
            ])
        if (error) {
            setLoading(true)
            alert(error.message)
        }
        if (data) {
            // TODO: Create club-page
            await router.push('/')
        }
    }

    return <div>
        <h3>New Club</h3>
        <div>
            <div>
                <label htmlFor="clubName">Club Name</label>
                <input
                    type="text"
                    value={clubName || ''}
                    onChange={(e) => setClubName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button onClick={createNewClub}>Create</button>
        </div>
    </div>
}

export default NewClub
