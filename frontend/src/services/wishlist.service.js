import http from "../http-common";

class MyWishListDataService {    
    
    async getWishList(token) {
        return http.get('/mywishlist' , { headers: {"Authorization" : `Bearer ${token}`} })
    }
}

export default new MyWishListDataService() ;