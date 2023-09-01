import { useState, useEffect } from "react"
import { Link} from "react-router-dom"

export default function Home() {


    return( <><h2>Your order is confirmed!</h2><div className="confirm">
    <Link to="/">Continue shopping</Link> </div>
        </>)
}
