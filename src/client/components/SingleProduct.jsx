import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';

export default function SingleProduct({userInfo}) {
    const [singleProduct, setSingleProduct] = useState ({});
    const {id} = useParams();
    console.log(userInfo)
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(`http://localhost:3000/api/products/${id}`)
            const data = await response.json();
            console.log(data)
            setSingleProduct(data)
        }

        fetchData();

    },[])

    async function addProductToCart(product_id) {

        try {
        let response = await fetch ('http://localhost:3000/api/order_products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                    product_id,
                    order_id,
                    quantity: 1
            })
        })
        let result = await response.json()
        console.log('Add Product to cart result', result)


        }
        catch(error){
            console.log(error)
        }
    }




    return(
        <>
        <div className='SingleProduct'>
            <h1>Product Details!</h1>
        
            <div key = {singleProduct.id}>
            <h3>{singleProduct.name}</h3> 
            <p>{singleProduct.description}</p> 
            <p>{singleProduct.price}</p>
            <p><img src={singleProduct.image}/></p>
            </div>
            <Link to ='/'><button>Go Back</button></Link>
            <Link to ='/Cart'><button
            onClick = {() => addProductToCart(singleProduct.id, )}>Add To Cart</button></Link>
           
            </div>

        </>)

}