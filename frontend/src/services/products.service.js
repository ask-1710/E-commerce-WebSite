import http from "../http-common";

class ProductsDataService {    
    
    async getProducts() {
        return http.get('/products')
    }

    async getProductsByCategory(id) {
        return http.get(`/category/${id}/`)
    }

    async getCategories() {
        return http.get('/categories')
    }

    async getSellerDetailsByPID(id) {
        return http.get(`/product/${id}/seller`)
    }

    async getProductByID(id) {
        return http.get(`/product/${id}`)
    }

    async getReviewsByID(id) {
        return http.get(`/product/${id}/reviews`)
    }

    async addReview(accessToken, review, pid, rating) {
        return http.post(`/product/${pid}/reviews`, {description: review, rating: rating}, { headers: {"Authorization" : `Bearer ${accessToken}`} })
    }

}

export default new ProductsDataService()