import React, { useEffect, useState } from "react"
import '../App.css' 
import "react-datepicker/dist/react-datepicker.css"
import MyAccountDataService from '../services/myaccount.service.js'
import { Link  } from 'react-router-dom' ;

const ChangePassword = (props) => {
    const [oldpassword,setOldPassword]=useState("")
    const [newpassword, setNewPassword]=useState("")
    const [success,setSuccess] = useState(null)
    const [status, setStatus] = useState(null)

	const OnSave = e => {
		e.preventDefault()
		MyAccountDataService.changePassword(props.token, oldpassword, newpassword)
				.then(res => {
					setSuccess(true)
					setStatus('Password Changed !!')
					console.log(res)
				})
				.catch(e => {
					setSuccess(false)
					console.log(e)
					setStatus(e.message)
				})
	}
    
    const onChangeSetCurrentPassword = e => {
        setOldPassword(e.target.value)
    }

    const onChangeSetNewPassword = e => {
        setNewPassword(e.target.value)
    }

  return (
        <div className="sign-up">
            <div class="container">
                    <div class="col-md-10">
					{
						success!=null ?
							<div class="alert alert-warning" role="alert">
								{status}
							</div>
							:
							null
					}

                    <div className="wrapper">  
                    <div class="text-center mt-4 name"> Change Password </div>        
                    <form class="p-3 mt-3">
                            <div class="form-field d-flex align-items-center">  <input type="password" id="current" placeholder="Current Password" onChange={onChangeSetCurrentPassword}/> </div>
                            <div class="form-field d-flex align-items-center">  <input type="password"  id="new" placeholder="New Password" onChange={onChangeSetNewPassword}/> </div> 
                            <button class="btn mt-3" type="submit" onClick={OnSave}>Save Changes</button>
                    </form>
					</div>
				</div>
            </div>
        </div>

  );
};

export default ChangePassword