// shopper icon -> https://cdn.iconscout.com/icon/free/png-256/shopper-2692198-2233963.png
// seller icon -> https://cdn-icons-png.flaticon.com/512/2331/2331639.png

import React, { useState } from "react";
import '../App.css' ;
import LoginDataService from '../services/login.service.js' ;
import SignUp from "./signup.component";
import { Route, Routes, Link  } from 'react-router-dom' ;
import MyAccount from "./myaccount.component.js";
import ChangePassword from "./changepassword.component";


const Login = props => {

  const [status, setStatus] = useState(false);
  const [start,setStart] = useState(true);
  const [mobile, setMobile] = useState(null) 
  const [password, setPassword] = useState(null)
  const [userType, setUserType] = useState(false); // false -> buyer ; true -> seller
  const [accessToken, setAccessToken] = useState('');

  	const onLogin = ( (e) => {
		e.preventDefault();

		setStart(false);

		console.log(mobile)
		console.log(password)
		
		if(userType) {
			LoginDataService.authorizeSeller(mobile, password)
				.then(res => {
					console.log(res.data.access_token) 
					setAccessToken(res.data.access_token) 
					setStatus(true);
					props.login({
						user:{mobile:mobile,password:password},
						accessToken:res.data.access_token
					})
					// props.history.push('/')
				})
				.catch(e=>{
						setStatus(false);
						alert('Unauthorized')
						console.log('error: '+e)
				})
			}
			else {
				LoginDataService.authorizeShopper(mobile, password)
				.then(res => {
					console.log(res.data.access_token) 
					setAccessToken(res.data.access_token) 
					setStatus(true);
					props.login({
						user:{mobile:mobile,password:password},
						accessToken:res.data.access_token
					})
					// props.history.push('/')
				})
				.catch(e=>{
						setStatus(false);
						alert('Unauthorized')
						console.log('error: '+e)
				})
			}
	})

    const onClickChangeUserType = (e => {
        if(userType) {
            setUserType(false);
        }
        else {
            setUserType(true);
        }
    })

	const onChangeSetMobile = e => {
		setMobile(e.target.value);
	}
	
	const onChangeSetPassword = e => {
		setPassword(e.target.value)
	}


  return (
        <div className="App">
            {
                start ? <div>Start true</div>
                :
                (
                    status ? 
					(      
						<div>     
							<div class="alert alert-success" role="success">
								Logged In, To check your account
								go to <Link to='/myaccount'>my account</Link><br/>
								To change your password go to  <Link to='/changepassword'>Change my password</Link>
							</div>
						</div>
                    )
                    :
                    (            
                        <div class="alert alert-danger" role="alert">
                            Invalid Crendentials - Please try again 
                        </div>
                    )
                )
            }
            {
				userType ? 
				(
					<div className="wrapper">
						<div class="logo"> <img src="https://cdn-icons-png.flaticon.com/512/2331/2331639.png" alt="Seller-Icon" onClick={onClickChangeUserType}/> </div>
						<div class="text-center mt-4 name"> Seller </div>
						<form class="p-3 mt-3">
								<div class="form-field d-flex align-items-center">  <input type="text" id="mobile" placeholder="Mobile" onChange={onChangeSetMobile}/> </div>
								<div class="form-field d-flex align-items-center">  <input type="password"  id="pwd" placeholder="Password" onChange={onChangeSetPassword}/> </div> 
								<button class="btn mt-3" type="submit" onClick={onLogin}>Login</button>
						</form>
						<div class="text-center fs-6"> <a href="#">Forget password?</a> or <a href="#">Sign up</a> </div>
					</div>
				)
				:
				(
					<div className="wrapper">
						<div class="logo"> <img src="https://cdn.iconscout.com/icon/free/png-256/shopper-2692198-2233963.png" alt="Shopper-Icon" onClick={onClickChangeUserType}/> </div>
						<div class="text-center mt-4 name"> Buyer </div>
						<form class="p-3 mt-3">
								<div class="form-field d-flex align-items-center">  <input type="text" id="mobile" placeholder="Mobile" onChange={onChangeSetMobile}/> </div>
								<div class="form-field d-flex align-items-center">  <input type="password"  id="pwd" placeholder="Password" onChange={onChangeSetPassword}/> </div> 
								<button class="btn mt-3" type="submit" onClick={onLogin}>Login</button>
						</form>
						<div class="text-center fs-6"> 						
						<Link to="/signup">
							<a>Sign up</a>
						</Link>
						 </div>
					</div>
				)
			}

		<div className="container mt-3">

          <Routes>
            <Route path='/signup' element={<SignUp/>}
            />

			<Route path='/myaccount' element={<MyAccount token={accessToken}/>}
			/>

			<Route path='/changepassword' element={<ChangePassword token={accessToken}/>}
			/>		
		  </Routes>

        </div> 

        </div>
		
  );
};

export default Login;