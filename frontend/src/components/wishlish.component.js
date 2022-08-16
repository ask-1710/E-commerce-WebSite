import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MyWishListDataService from '../services/wishlist.service.js'
import { Link } from 'react-router-dom' ;
import CartService  from '../services/cart.service.js'


export default function MyWishList(props){
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const [products, setProducts]=useState(null)
    const token=props.token

    useEffect(()=>getWishList(),[])

    const getWishList = () =>  {

        MyWishListDataService.getWishList(token)
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className='App'>
            {
                products?<>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">My Wishlist</h1>
                    </div>
                </div>
                <div className="centre-card">
                <div className='wishlist-wrapper'>
                {
                    products.map(pdt=>{
                    return (
                    <div className='form-field'>
                        <Link to={`/product/${pdt.id}`} className='fas px-3'>{pdt.name}</Link>
                        <button className='btn btn-info' title='Add to cart' alt='Add to shopping cart' onClick={()=>CartService.addCartService(pdt.id)}>Add to cart</button>             
                    </div> 
                    )
                    })
                }
                {
                    products.length==0?'Empty Wishlist':null
                }
                </div>
                </div>
                </>
                : 'Data not loaded yet'
            }
        </div>
    );
}