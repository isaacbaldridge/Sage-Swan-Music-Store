import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Admin({token}) {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [category,setCategory]=useState('');
    const [brand,setBrand]=useState('');
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState('');
    const [image,setImage]=useState('');
    const [singleProduct, setSingleProduct] = useState([]);
    
    const navigate = useNavigate();
    

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch ("http://localhost:3000/api/users")
                const users = await response.json()

                console.log(users)
                setUsers(users)
            }catch(err){
                console.log('error fetching products', err);
            }
        }
        fetchData();
    }, []);

    useEffect(()=>{
        async function fetchProducts(){
            try{
                const response = await fetch ("http://localhost:3000/api/products")
                const products = await response.json()

                console.log(products)
                setProducts(products)
            }catch(err){
                console.log('error fetching products', err);
            }
        }
        fetchProducts();
    }, []);



    async function deleteProduct(id){
        console.log(token);
        const response = await fetch(`http://localhost:3000/api/products/${id}`,{
        method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }})
        const result = await response.json();
    }


//Add Product function
    async function handleSubmit(e) {
        e.preventDefault();
        try {
        let response = await fetch ('http://localhost:3000/api/products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                    category,brand,name,description,price,image
            })
        })
        let result = await response.json()
        console.log('Add Product result', result)
         setCategory('');
         setBrand("");
         setName("");
         setDescription("");
        setPrice("");
        setImage("");

        }
        catch(error){console.log(error)
            setError(error.message);
                console.log('Did Not Add!')
        }
    }


    //Edit function
   
    async function handleChange(id) {
        const updateProduct = async()=>{
        console.log('id:' ,id);

        try {
        let response = await fetch (`http://localhost:3000/api/products/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                    category,brand,name,description,price,image
            })
        })
        let result = await response.json()
        console.log('Edit Product result', result)
        setSingleProduct(result);
        
         
        
        }
        catch(error){console.log(error)
            setError(error.message);
                console.log('Did Not Edit!')
        }
    }
    updateProduct();
    setCategory('');
         setBrand("");
         setName("");
         setDescription("");
        setPrice("");
        setImage("");
    } 


    
    
        return(<>
        
            <div className = "Admin">
            <details>
               <summary><h3>Users</h3></summary>
                {users.map((user)=>(
                    <div key = {user.id}>
                       <h3>Name : {user.name}</h3> 
                       <p>Username : {user.username}</p>
                       <p>Email : {user.email}</p>
                    <p>Address : {user.address}</p>
                    </div>
                ))}
                </details>
            <details>
               <summary><h3>Products</h3></summary>
                {products.map((product)=>(
            <div key = {product.id}>
            <h3>{product.name}</h3> 
            <p>{product.description}</p> 
            <p>{product.price}$</p>
            <p><img src={product.image}/></p> 
            <details>
                <summary><h3>Edit Product</h3></summary>
                <form className='form' onSubmit={()=>handleChange(product.id)}>

                <label>Category</label>
                <input value = {category} type='text'onChange={(e) => setCategory(e.target.value)}/> <br/>
                <label>Brand</label>
                <input value = {brand} type='text' required onChange={(e) => setBrand(e.target.value)}/> <br/>
                <label>Name</label>
                <input value = {name} type='text' required onChange={(e) => setName(e.target.value)}/> <br/>
                <label>Description</label>
                <input value = {description} type='text' required onChange={(e) => setDescription(e.target.value)}/> <br/>
                <label>Price</label>
                <input value = {price} type='decimal'onChange={(e) => setPrice(e.target.value)}/> <br/>
                <label>Image</label>
                <input value = {image} type='text'onChange={(e) => setImage(e.target.value)}/> <br/>
                <button >EDIT PRODUCT</button>
            </form>
              
            </details>
            
            <button onClick={()=>deleteProduct(product.id)}>DELETE </button>

            </div>
        ))}
        </details>
        <details>
            <summary><h3>Add New Products</h3></summary>
            <form className='form' onSubmit={handleSubmit}>

                <label>Category</label>
                <input value = {category} type='text'onChange={(e) => setCategory(e.target.value)}/> <br/>
                <label>Brand</label>
                <input value = {brand} type='text' required onChange={(e) => setBrand(e.target.value)}/> <br/>
                <label>Name</label>
                <input value = {name} type='text' required onChange={(e) => setName(e.target.value)}/> <br/>
                <label>Description</label>
                <input value = {description} type='text' required onChange={(e) => setDescription(e.target.value)}/> <br/>
                <label>Price</label>
                <input value = {price} type='decimal'onChange={(e) => setPrice(e.target.value)}/> <br/>
                <label>Image</label>
                <input value = {image} type='text'onChange={(e) => setImage(e.target.value)}/> <br/>
                <button>ADD PRODUCT</button>
            </form>
            
        </details>

        
            </div>
            </>
        )
    
    }