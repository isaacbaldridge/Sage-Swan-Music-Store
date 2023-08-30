import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';

export default function SingleProduct() {
    const [singleProduct, setSingleProduct] = useState ({});
    const {id} = useParams();
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch(`http://localhost:3000/api/products/${id}`)
            const data = await response.json();
            console.log(data)
            setSingleProduct(data)
        }

        fetchData();

    },[])




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
            <Link to ='/Cart'><button>Add To Cart</button></Link>
           
            </div>

        </>)

}