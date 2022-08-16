import http from "../http-common";

class SignUpDataService {
    
    async addUser(fName,mName,lName,dob,gender,email,password,mobile,doorno,street,area,city,state,country,pincode) {
        const data = {
            firstName: fName,
            middleName: mName,
            lastName: lName,
            DOB: dob,
            email: email,
            password: password,
            mobile: mobile,
            permanent_addr: doorno+','+street+','+area,
            city:city,
            state: state,
            country: country,
            cardId: "SAFE213",
            gender: gender,
            pincode: pincode
        }
        console.log(data) ;
        return http.post('/user', data) 
    }
}

export default new SignUpDataService();