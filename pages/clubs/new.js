import { useState } from "react";
import { useRouter } from 'next/router'

import { supabase } from "../../lib/supabaseClient";

function NewClub() {
    const router = useRouter()

    const [clubName, setClubName] = useState(null)
    const [description, setDescription] = useState(null)

    async function createNewClub() {
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
            alert(error.message)
        }
        if (data) {
            await router.push('/')
        }
    }

    return <div>
        <h3>New Club</h3>
        <div>
            <div>
                <label htmlFor="clubName" className="form-label">Club Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={clubName || ''}
                    onChange={(e) => setClubName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mt-2" onClick={createNewClub}>Create</button>
        </div>
    </div>
}

export default NewClub
