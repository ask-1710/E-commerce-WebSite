import { useEffect, useState } from 'react';
import cart from './global/shopping-cart'
import ProductDataService from '../services/products.service'

const Cart = () => {

    const [displayCart, setDisplayCart] = useState([])
    const [quantity, setQuantity] = useState([])
    const [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts() ;
    },[])

    const getCartItems = () => {
        var items = []
        var quantity = []

        for (const [key, value] of Object.entries(cart)) {
            // console.log(key, value);
            items.push(key)
            quantity.push(value)
        }          

        setDisplayCart(items)
        setQuantity(quantity)

        return [items, quantity]
    }
    
    const getProducts = () => {  // to be checked

        const [items, quantity] = getCartItems()
        let list = []
        let i ;

        for(i=0;i!=items.length;i++) { 
            ProductDataService.getProductByID(items[i])
            .then(res=>{
                const p = res.data
                list.push(p)    
            })
            .catch(e=>{console.log(e);})
        }

        console.log('list next')
        setProducts(list)
        setQuantity(quantity)
        console.log(list)
        console.log(products)
        console.log(quantity)
    }

    return(
        <div className='wishlist-wrapper'>
            <div className='name'>Your Cart</div>
            <div className='wrapper'>
            {
                products && quantity?
                (   
                    <div className='container'>
                    <div className='row'>
                    <div>{
                        products.map(p=> {
                            return (
                                <div className='col'>
                                    <div>{p.name}</div>
                                </div>
                            )
                            }) 
                    }</div>
                    <div>{
                        quantity.map(q=> {
                            return (
                                <div className='col'>
                                    <div>{q}</div>
                                </div> 
                            )
                        })
                    }</div>
                    </div>
                    </div>
                )
                :
                'No products'
            }
            </div>
        </div>
    )
}

export default Cart;