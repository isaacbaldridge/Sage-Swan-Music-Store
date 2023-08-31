import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Cart({token, userInfo, setUserInfo}) {

    const [quantity, setQuantity] = useState(0)
    const [fulfilled, setFulfilled] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [err, setError] = useState(null)
    const navigate = useNavigate();


    console.log(userInfo)
    console.log(userInfo.id)
    console.log(token)

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
                console.log(cartItems)
            }catch(err){
                console.log('error fetching cartItems', err);
            }
        }
        fetchCartData();
    }, []);

    console.log(cartItems)
    console.log(cartItems.orders)

    // quantity DOES get updated, but also returns an error cannot get /api/orders/cart/undefined. Solved with local storage?
    async function handleQtyUpdate(product_id, order_id) {
        const updateQuantity = async () => {
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
        console.log(token);
        const response = await fetch(`/api/order_products/byBothIds/${product_id}/${order_id}`,{
        method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }})
        const result = await response.json();
    }

    async function clearCart(order_id) {
        const response = await fetch(`/api/order_products/byOrderId/${order_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }})
            const result = await response.json()
    }

    async function checkoutCart(order_id) {
        setFulfilled(true)
        // console.log(fulfilled)
        async function updateFulfilled() {

            try {
                const response = await fetch(`/api/orders/${order_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        body: JSON.stringify ({
                            fulfilled
                        })
                    }})
                    const result = await response.json()
                    console.log("updated fulfilled status: ", result)
            } catch (err) {
                throw err
            }        
        }
        updateFulfilled()

    }

    if(cartItems.orders) {
        const result = cartItems.orders.map((item) => item.price * item.quantity)
        console.log(result)
        const initialValue = 0
        const sumWithInitial = result.reduce((accumulator, currentValue) => 
        accumulator + currentValue, initialValue)

        return (
            <>
                <div className = "Cart">Cart Page</div>
        
    
                
                <section>
                    
                    <h2>Total: {sumWithInitial}</h2>
                    
                    <button onClick={() => checkoutCart(cartItems.orders[0].order_id)}>Checkout</button>
                    <button onClick={() => clearCart(cartItems.orders[0].order_id)}>Clear cart</button>
        
        
                    {cartItems.orders.map((item) => <div key = {item.product_id}>
                        <h3>{item.brand}, {item.name}</h3>
                        <img src = {item.image}/>
                        <h3>{item.name}</h3>
                        <h4>Price: ${item.price}</h4>
                        <h4>Quantity: {item.quantity}</h4>
                        <form onSubmit = {() => handleQtyUpdate(item.product_id, item.order_id)}>
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
                        <button onClick={() => deleteCartItem(item.product_id, item.order_id)}>Remove</button>
                        </div>)}
        
                </section>
            </>
            )
        
        }

    }