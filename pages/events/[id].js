import { useRouter } from "next/router";

function Event() {
    const router = useRouter()
    const {id} = router.query

    return (
        <div>Display Event: {id}</div>
    )
}

export default Event
