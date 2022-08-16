import React, { useEffect, useState } from 'react'
import OrdersDataService from '../services/orders.service.js'
import { Routes,Route, Link} from 'react-router-dom'
import OrderDetails from './orderdetails.component.js'
import dayjs from "dayjs"
import Products from './products.component.js'

const Orders = (props) => {

    const [catId, setCategoryId] = useState('1')
    const [products,setProducts]=useState([])
    const [categories, setCategories]=useState(null)
    const [orders, setOrders] = useState(null)
    const token=props.token

    useEffect(()=>{
        getOrders()
    },[])

    const getOrders = e => {
        OrdersDataService.getOrders(token)
            .then(res => {
                // console.log(res.data)
                setOrders(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
    }
    
    return (
        <>
        <div className='App'>
            

            { 
            orders ?
            (
                <div className='container'>
                <div className='row px-4 py-4'>
                    { 
                    orders.orders.map(o=>{
                        return (
                            <div className='col-sm py-4'>
                            <div class="card bg-dark px-3">
                                <div className='card-content bg-light'>
                                    <div class="card-body">
                                        <h5 class="card-title text-bold">OrderId : {o.details.id}</h5>
                                        <p class="card-text px-1 py-2">Amount : ₹{o.details.orderAmount}</p>
                                        <p className='card-text px-1 py-2'>Date : {dayjs(o.trackOrder.orderedDate).format('DD/MM/YYYY')}</p>
                                        {/* <div className='inline-img'> */}
                                        <div className='card-text px-1 py-2'>Order status:
                                        {
                                        o.trackOrder.orderDispatched ?
                                        (<img width={80} height={80} title='delivered' className='inline' src='https://media.istockphoto.com/vectors/tick-symbol-in-green-square-checkmark-in-checkbox-vector-icon-vector-id1185238911?k=20&m=1185238911&s=170667a&w=0&h=9Ke1BZmFBEmW8ixXhrOvIc1ShWQdkaVCWrdyWRg769k=' alt='Dispatched'/>)
                                        :
                                        (
                                            <div>
                                            <img width={80} height={80} className='inline' title='on process' src='data:image/jpeg;base64,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'/>
                                            
                                            {/* <Link to='/shoppingcart'><div className='text-italics'>Click to check your shopping cart</div></Link> */}
                                            </div>
                                            
                                            )
                                    }
                                        </div>
                                        {/* </div> */}
                                    <Link className="btn btn-info" to={`/orderdetails/${o.details.id}`}><p strong>Order details</p>
                                    </Link>
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
        </div>
        <div className='container'>
        <Routes>
            <Route path='/orderdetails/:oid' element={<OrderDetails token={token}/>}
            />
            <Route path='/products' element={<Products/>}
            />
        </Routes>
        </div>
        </>
    )
}

export default Orders ;

{/* <button aria-describedby={id} className="btn btn-outline-dark button-right-align" for='chekky' onClick={handleClick}>
                                  To know more
                                </button>
                                <Popper id={id} open={open} anchorEl={anchorEl}>
                                  <Box sx={{ border: 1, p: 1, bgcolor: 'black' , color: 'whitesmoke' }}>
                                    In case of an informed visit (default), the manager of the store will be alerted by mail about your visit. If this box for surprise visit is checked, the mail to the manager will not be generated 
                                  </Box>
                                </Popper> */}