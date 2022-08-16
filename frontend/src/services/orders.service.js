import http from "../http-common";

class OrdersDataService {    
    
    async getOrders(token) {
        return http.get('/myorders',  { headers: {"Authorization" : `Bearer ${token}`} })
    }

    async getOrderDetails(oid) {
        return http.get(`/order/${oid}`)
    }

}

export default new OrdersDataService()