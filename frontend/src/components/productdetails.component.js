import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductsDataService from '../services/products.service.js'
import { Link } from 'react-router-dom'


export default function ProductDetails(props){
    
    const [sellerDetails, setSellerDetails]=useState()
    const [product, setProduct]=useState()
    const [reviews, setReviews]=useState()
    const [myReview, setMyReview]=useState()
    const [addedReview, setReviewStatus] = useState(false)

    let { pid } = useParams()

    const token=props.token

    useEffect(()=>getDetails(),[pid,addedReview])

    const getDetails = () =>  {

        ProductsDataService.getSellerDetailsByPID(pid)
            .then(res => {
                setSellerDetails(res.data)
            })
            .catch(e => {
                console.log(e)
            })
        
        ProductsDataService.getProductByID(pid)
            .then(res=>{setProduct(res.data)})
            .catch(e=>console.log(e))
    
        ProductsDataService.getReviewsByID(pid)
            .then(res=>setReviews(res.data))
            .catch(e=>console.log(e))
            
    }

    const getReview = () => {
        var review = prompt('Enter your review(less than 50 words)')
        var rating=prompt('Enter your rating (out of 10)')
        ProductsDataService.addReview(token, review, product.id, rating)
            .then(()=>{setReviewStatus(true)})
            .catch(e=>console.log(e))
    }

    return (
      <div className='App'>
        {product&&sellerDetails&&reviews?(
        <div>                
            <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">{product.name}</h1>
                    </div>
                </div>
            <div className='container'>
            <div className='row py-4 px-2'>
                <div className='wrapper left col-4'>
                    {sellerDetails.pickupPincode?
                    (<div><p><strong>Address : </strong>{sellerDetails.pickupAddr}, {sellerDetails.pickupCity}, {sellerDetails.pickupState}, {sellerDetails.pickupCountry}</p>
                    <p><strong>Pincode : </strong>{sellerDetails.pickupPincode}</p></div>)
                : (<div className='alert'>Currently, no data about this product exists</div>)
                }
                </div>
                <div className='wrapper right col-4'>
                <p><strong>More from this seller{'\n'}</strong></p>
                {
                    sellerDetails.products.map(pdt=>{
                        return <div><Link to={`/product/${pdt.id}`} className='text-italics'>{pdt.name}</Link>{'\n'}</div>
                    })
                }
                {
                    sellerDetails.length==0?'No data':null
                }
                </div>
            </div>
            </div>
            <div className='reviews-wrapper' align='left'>
                <div className='name'>Reviews
                    <div className='btn px-1 py-1' title='Add a Review' onClick={getReview}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>Add a Review</svg></div>
                </div>  
                <div>
                { 
                reviews.map(rev=>{
                        return <div className='form-field'>{rev.description}</div>
                    })
                }
                </div>
            </div>   
            <div className='row'></div>        
    </div>
    ):null}

    </div>
      

    );
}