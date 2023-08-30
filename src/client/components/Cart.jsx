import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [err, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchCartData(){
            try{
                const response = await fetch ("http://localhost:3000/api/orders/cart")
                const cartItems = await response.json()

                console.log(cartItems)
                setProducts(cartItems)
            }catch(err){
                console.log('error fetching cartItems', err);
            }
        }
        fetchCartData();
    }, []);

    return(
        <div className = "Cart">Cart Page</div>
    )

}