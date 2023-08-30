import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Cart({token, userInfo, setUserInfo}) {

    const [cartItems, setCartItems] = useState([]);
    const [err, setError] = useState(null)
    const navigate = useNavigate();

    // const {id} = useParams();
    // console.log(id)
    console.log(userInfo)
    console.log(userInfo.id)
    console.log(token)

    useEffect(()=>{
        async function fetchCartData(){
            // console.log("test log", userInfo.id)
            try{
                const response = await fetch (`/api/orders/cart/${userInfo.id}`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`}
                    })
                const cartItems = await response.json()
                setCartItems(cartItems)
                console.log(cartItems)
            }catch(err){
                console.log('error fetching cartItems', err);
            }
        }
        fetchCartData();
    }, []);

    console.log(cartItems)
    console.log(cartItems.orders)

    const displayCartItems = cartItems.orders.map((item) => <div key = {item.product_id}>
        <h3>{item.brand}, {item.name}</h3>
        <img src = {item.image}/>
        {/* <h3>{item.name}</h3> */}
        <h4>${item.price}</h4>
        <h4>Quantity: {item.quantity}</h4>
        <button>Remove</button>
        

    </div>)



    return (
    <>
        <div className = "Cart">Cart Page</div>

        {cartItems.orders && 
        <div>{displayCartItems}</div>}
       
    </>
    )

}