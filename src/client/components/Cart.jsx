import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Cart({token, userInfo, setUserInfo}) {

    const [quantity, setQuantity] = useState(0)
    const [fulfilled, setFulfilled] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [err, setError] = useState(null)
    const navigate = useNavigate();


    // console.log(userInfo)
    console.log(userInfo.id)
    // console.log(token)

    useEffect(()=>{
        async function fetchCartData(){
            try{
                const response = await fetch (`/api/orders/cart/${userInfo.id}`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`}
                    })
                const cartItems = await response.json()
                setCartItems(cartItems)
                // console.log(cartItems)
            }catch(err){
                console.log('error fetching cartItems', err);
            }
        }
        fetchCartData();
    }, []);

    // console.log(cartItems)
    // console.log(cartItems.orders)

    // quantity DOES get updated, but also returns an error cannot get /api/orders/cart/undefined. Solved with local storage?
    async function handleQtyUpdate(product_id, order_id) {
        const updateQuantity = async () => {
            console.log("testing...")
            console.log(product_id)
            console.log(order_id)
    
            try {
                const response = await fetch(`/api/order_products/update/${product_id}/${order_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`},
                    body: JSON.stringify ({
                        quantity
                    })
                    })
                    const updateOrderProduct = await response.json()
                    console.log("edited quantity: ", updateOrderProduct)
    
            } catch (err) {
                throw err
            }
        }
        updateQuantity()
    }

    async function deleteCartItem(product_id, order_id){
        // console.log(token);
        const response = await fetch(`/api/order_products/byBothIds/${product_id}/${order_id}`,{
        method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }})
        const result = await response.json();
        // navigate("/cart")
    }

    async function clearCart(order_id) {
        const response = await fetch(`/api/order_products/byOrderId/${order_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }})
            await response.json()
    }

    async function checkoutCart(order_id) {
        // setFulfilled(true)
        // console.log("fulfilled status: ", fulfilled)
        async function updateFulfilled() {

            try {
                const response = await fetch(`/api/orders/${order_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify ({
                        fulfilled: true
                    })
                })
                    const result = await response.json()
                    navigate("/Confirm")
                    // console.log("updated fulfilled status: ", result)
                    // console.log(cartItems.orders)
            } catch (err) {
                throw err
            }        
        }
        updateFulfilled()

    }

    if(cartItems.orders) {
        const result = cartItems.orders.map((item) => item.price * item.quantity)
        // console.log(result)
        const initialValue = 0
        const sumWithInitial = result.reduce((accumulator, currentValue) => 
        accumulator + currentValue, initialValue)

        return (
            <>
                <div className = "Cart">Cart Page</div>
        
    
                
                <section>
                    
                    <h2>Total: {sumWithInitial}</h2>
                    
                    <button onClick={() => 
                        {
                            // setFulfilled(true)
                            checkoutCart(cartItems.orders[0].order_id)
                            navigate("/")
                        }
                        }>Checkout</button>
                    <button onClick={() => 
                        {clearCart(cartItems.orders[0].order_id)
                        navigate("/")}

                        }>Clear cart</button>
        
        
                    {cartItems.orders.map((item) => <div key = {item.product_id}>
                        <h2>Order ID: {item.order_id}</h2>
                        <h3>{item.brand}, {item.name}</h3>
                        <img src = {item.image}/>
                        <h3>{item.name}</h3>
                        <h4>Price: ${item.price}</h4>
                        <h4>Quantity: {item.quantity}</h4>
                        <form onSubmit = {() => 
                            {handleQtyUpdate(item.product_id, item.order_id)
                            navigate("/")

                        }
                            }>
                            <label htmlFor="quantity">Change Quantity</label>
                            <input
                            type="number"
                            id="quantity"
                            name = "quantity"
                            min="1"
                            value = {quantity}
                            onChange = {(e) => setQuantity(e.target.value)}></input>
                            <button>Update Qty</button>
                        </form>
                        <button onClick={() => {
                            deleteCartItem(item.product_id, item.order_id)
                            navigate("/")} }>Remove</button>
                        </div>)}
        
                </section>
            </>
            )
        
        }
        else {
            return (
                <>
                    <div className = "Cart">Cart Page</div>
                    <h3>Your Cart is Empty! </h3>
                       <h4> Go Back and Add Products to your cart</h4>
</>)
        }

    }