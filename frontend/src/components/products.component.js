import React, { useEffect, useState } from 'react'
import ProductsDataService from '../services/products.service.js'
import { Routes,Route, Link} from 'react-router-dom'
import ProductDetails from './productdetails.component.js'
import CartService from '../services/cart.service.js'

const Products = (props) => {

    const [catId, setCategoryId] = useState('1')
    const [products,setProducts]=useState([])
    const [categories, setCategories]=useState(null)
    const token=props.token

    useEffect(()=>{
        getCategories()
    },[])

    const getCategories = e => {
        ProductsDataService.getCategories()
            .then(res => {
                setCategories(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
    }
    
    const getProductsByCategory = () => {
        ProductsDataService.getProductsByCategory(catId)
            .then(res=>{
                console.log('got data')
                console.log(res.data)
                const products=res.data
                setProducts(products)
            })
            .catch(e=>{
                console.log(e)
            })
    }

    const onChangeSetCategory = e => {
        setCategoryId(e.target.value)
    }

    const setFilters = () => {
        getProductsByCategory(catId)
    }

    return (
        <>
        <div className='App'>
            <div>
                {categories!=null?
                (
                    <div className='input-group'>
                        <span className='input-prepend px-4 py-2'>Category</span>
                        <select className='custom-select' type='select' placeholder="Country" onChange={onChangeSetCategory}>
                        {
                            categories.map(cat=>{
                                return <option value={cat.categoryID}> {cat.categoryName} </option>
                            })
                        }
                        </select>
                        <div className='input-group-append'><button className='btn btn-bgdark py-2' onClick={setFilters}>Set Filters</button></div>
                    </div>
                ): null
            }
            </div>

            {
            products ?
            (
                <div className='container'>
                <div className='row px-4 py-4'>
                { 
                products.map(p=>{
                    return (
                        <div className='col-sm py-4'>
                        <div class="card bg-light px-3">
                            <div className='card-content card-back'>
                            <div class="card-body">
                                <h5 class="card-title text-bold">{p.name}</h5>
                                <p class="card-text description">{p.description}</p>
                                <p className='card-text'><strong>Price:{' '} ₹</strong>{p.price}</p>{
                                }
                                <Link className="btn btn-info" to={`/product/${p.id}`}><p strong>More details</p></Link>
                                <button className='btn btn-warning' onClick={()=>CartService.addCartService(p.id)}>Add to Card</button>
                            </div>
                            </div>
                            <div className='card-content card-front'>
                            <div class="card-body">
                                <h5 class="card-title text-bold">{p.name}</h5>
                            </div>
                            </div>
                        </div>
                        </div>
                    )
                })
                }
                </div>
                </div>
            ): null
            }
            <Routes>
            <Route path='/product/:pid' element={<ProductDetails token={token}/>}
            />
            </Routes>
        </div>
        </>
    )
}

export default Products ;