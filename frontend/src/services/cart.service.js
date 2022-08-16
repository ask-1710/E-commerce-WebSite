import cart from '../components/global/shopping-cart';

class ProductsDataService {    
    addCartService(pdtId) {
    
        if(cart[pdtId]!=undefined) {
            cart[pdtId]+=1;
        }
        else{
            cart[pdtId]=1;
        }
        console.log("CART : ") ;
        console.log(cart) ;
    }

    emptyCart() {    
        console.log("CART : ") ;
        console.log(cart) ;
    }
}

export default new ProductsDataService ;

