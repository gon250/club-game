import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useEffect, useState } from "react";

import { supabase } from "../utils/supabaseClient";

function ClubTabs({clubId, owner}) {
    const [events, setEvents] = useState(null)
    const [activeEvent, setActiveEvent] = useState(false)
    const [createEventMode, setCreateEventMode] = useState(false)

    // Create Event form
    const [game, setGame] = useState(null)
    const [gameUrl, setGameUrl] = useState('')
    const [gameDescription, setGameDescription] = useState('')

    useEffect(() => {
        fetchEvents()
    }, [])

    async function fetchEvents() {
        // TODO: Get game as well
        const {data, error} = await supabase
            .from('events')
            .select(`*`)
            .eq('id_club', clubId)
        if (data) {
            setEvents(events)
            setActiveEvent(data.find((event) => event.active === true))
        }
    }

    const createEvent = async () => {
        const {data, error} = await supabase
            .from('events')
            .insert([
                {
                    created_by: supabase.auth.user().id,
                    id_club: clubId,
                    game: game,
                    game_url: gameUrl,
                    description: gameDescription,
                    from: new Date(),
                    active: true
                }
            ])

        if (data) {
            fetchEvents()
            setCreateEventMode(false)
        }

        if (error) {
            console.log(error)
        }
    }

    function CurrentEvent() {
        if (activeEvent) {
            return <div>display active event</div>
        }

        if (owner) {
            if (createEventMode) {
                return <></>
            }

            return <div>
                You are the owner of this group and there is not event. <br/>
                <button
                    onClick={() => {
                        setCreateEventMode(!createEventMode)
                    }}
                    className="btn btn-sm btn-outline-primary mt-2">Create event
                </button>
            </div>
        }

        return <p>
            The owner of the event has to choose a game.
            <small>We are currently working on a voting system.</small>
        </p>
    }

    function PastEvents() {
        if (events && events.length > 0) {
            return <ul>
                {events.map((event) => <li key={event.id}>{event.name}</li>)}
            </ul>
        }
        return <p className="lead">No existing events.</p>
    }

    return <Tabs>
        <TabList className="nav nav-pills">
            <Tab className="nav-item">
                <a className="nav-link">Current Event</a>
            </Tab>
            <Tab className="nav-item">
                <a className="nav-link">Past events</a>
            </Tab>
            <Tab className="nav-item">
                <a className="nav-link">Members</a>
            </Tab>
        </TabList>
        <div className="row">
            <div className="col-md-12 m-3">
                <TabPanel>
                    <CurrentEvent/>

                    {
                        createEventMode
                            ? <div>
                                <div className="alert alert-primary" role="alert">
                                    👩🏽‍🔧 Currently working on a game API, for now you have to type game name.
                                </div>
                                <div>
                                    <label htmlFor="game-name" className="form-label">Game Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={game || ''}
                                        onChange={(e) => setGame(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="game-url" className="form-label">Useful url</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={gameUrl}
                                        onChange={(e) => setGameUrl(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="game-description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        value={gameDescription}
                                        onChange={(e) => setGameDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={createEvent}
                                        className="btn btn-sm btn-primary m-1">Create Event</button>
                                    <button
                                        onClick={() => {
                                            setCreateEventMode(false)
                                        }}
                                        className="btn btn-sm btn-primary">Cancel
                                    </button>
                                </div>
                            </div>
                            : <></>
                    }

                </TabPanel>
                <TabPanel>
                    <PastEvents/>
                </TabPanel>
                <TabPanel>
                    <p className="lead">
                        Currently working on this..
                    </p>
                </TabPanel>
            </div>
        </div>
    </Tabs>
}

export default ClubTabs
