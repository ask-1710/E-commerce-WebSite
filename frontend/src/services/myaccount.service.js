import http from "../http-common";

class MyAccountDataService {    
    
    async getUserData(token) {
        return http.get('/user' , { headers: {"Authorization" : `Bearer ${token}`} })
    }

    async updateUser(token, email,mobile,permanent_addr,city,pincode,state,country) {
        const data = {
            email: email,
            mobile: mobile,
            permanent_addr: permanent_addr,
            city: city,
            pincode:pincode,
            state:state,
            country:country
        }
        // console.log(data)
        return http.patch('/user', data, { headers: {"Authorization" : `Bearer ${token}`} })
    }

    async changePassword(token, oldpassword, newpassword) {
        const data = {
            oldpassword: oldpassword,
            newpassword:newpassword
        }

        return http.patch('/user/changepassword', data, { headers: {"Authorization" : `Bearer ${token}`} })
    }

}

export default new MyAccountDataService()