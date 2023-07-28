import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OrdersDataService from '../services/orders.service.js'
import { Link } from 'react-router-dom'
import ProductsDataService from '../services/products.service.js'


export default function OrderDetails(props){
    const [orderDetails, setOrderDetails]=useState()
    const [reviewStatus, setReviewStatus]=useState(false)
    const [PID,setPID]=useState()

    let { oid } = useParams()

    const token=props.token

    useEffect(()=>getDetails(),[oid])

    const getDetails = () =>  {

        OrdersDataService.getOrderDetails(oid)
            .then(res => {
                setOrderDetails(res.data)
            })
            .catch(e => {
                console.log(e)
            })
            
    }

    const getReview = () => {
        var review = prompt('Enter your review(less than 50 words)')
        var rating=prompt('Enter your rating (out of 10)')

        console.log(token, PID)
        
        ProductsDataService.addReview(token, review, PID, rating)
            .then(()=>{setReviewStatus(true)})
            .catch(e=>console.log(e))
    }

    const onChangeSetProduct = (e) => {
        if(e.target.value == '') return;
        setReviewStatus(false)
        const pid = e.target.value
        // console.log(pid)
        setPID(pid)
    }

    return (
      <div className='App'>
        {orderDetails?(
        <div>                
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">My Orders</h1>
                </div>
            </div>
            <div className='row'>
                <div className='wrapper left col-4'>
                    <p><strong>Amount : </strong>{orderDetails.details.orderAmount}</p>
                </div>
                <div className='wrapper right col-4'>
                <p><strong>Products{'\n'}</strong></p>
                {
                    orderDetails.details.products.map(pdt=>{
                        return <div><Link to={`/product/${pdt.id}`} className='text-italics'>{pdt.name}</Link>{'\n'}</div>
                    })
                }
                {
                    orderDetails.length==0?'No Orders Found':null
                }
                </div>
                <div className='input-group'>
                <label className='text-italics'>Choose a product to add a review</label>
                <div className='col-1'></div>
                <select className='custom-select px-5 py-1' type='select' placeholder="Products" onChange={onChangeSetProduct}>
                    <option value=''>Select a product</option>
                {
                    orderDetails.details.products.map(pdt=>{
                        return <option value={pdt.id}> {pdt.name} </option>
                    })
                }
                </select>
                <div className='col-1'></div>
                <div className='btn btn-primary' title='Add a Review' onClick={getReview}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>Add a Review</svg></div>
                </div>
                {
                    reviewStatus?<div className='alert'>Added Review!!</div>:null
                }
            </div>
    </div>
    ):null}

    </div>
      

    );
}