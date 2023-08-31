import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Cart({token, userInfo, setUserInfo}) {

    // const [productId, setProductId] = useState(0)
    // const [orderId, setOrderId] = useState(0)
    const [quantity, setQuantity] = useState(0)
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
    // setOrderId(cartItems.orders[0].order._id)
    // console.log(orderId)
    


    // async function updateQuantity(productId, orderId) {
    //     try {
    //         const response = await fetch(`/api/order_products/update/${productId}/${orderId}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`},
    //                 body: JSON.stringify ({
    //                     quantity
    //                 })
    //             })
    //             const updateItem = await response.json()
    //         } catch (err) {
    //             throw err
    //         }
    //     }


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

    return (
    <>
        <div className = "Cart">Cart Page</div>

        <h2>Total: {}</h2>

        {cartItems.orders &&
        

        cartItems.orders.map((item) => <div key = {item.product_id}>
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
        {/* <input type = "number"></input> */}

        {/* add an onclick event for select option to change quantity */}
        {/* <select onClick={() => updateQuantity(productId)}>
            <option value = "1">1</option>
            <option value = "2">2</option>
            <option value = "3">3</option>
            <option value = "4">4</option>
            <option value = "5">5</option>
        </select> */}
        <button>Remove</button>
    </div>)
        }
       
    </>
    )

}