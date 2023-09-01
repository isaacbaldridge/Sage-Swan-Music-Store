import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Home() {
    const [products, setProducts] = useState([]);
    const [err, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch ("http://localhost:3000/api/products")
                const products = await response.json()

                // console.log(products)
                setProducts(products)
            }catch(err){
                console.log('error fetching products', err);
            }
        }
        fetchData();
    }, []);




    return( <>
    <hr></hr>
    
        <div className='homePage'>
         <img className ="logo" src = "https://i.ibb.co/jypnmy0/Screen-Shot-2023-09-01-at-11-19-29-AM-fotor-bg-remover-2023090111579.png"></img> 
          <h1>WELCOME TO SAGE SWAN</h1>   
        </div>
        <div className = "products">
        {products.map((product)=>(
            <div key = {product.id}
            onClick={()=>navigate(`/${product.id}`)}>
            <h3>{product.name}</h3> 
            {/* <p>{product.description}</p>  */}
            <p>${product.price}</p>
            <p><img src={product.image}/></p>
            </div>
            
        ))}</div>
        </>)
}
