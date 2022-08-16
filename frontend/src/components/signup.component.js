import React, { useEffect, useState } from "react";
import '../App.css' ;
import dayjs from 'dayjs'
import PasswordStrengthBar from 'react-password-strength-bar';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import CountriesService from "../services/countries.service";
import SignUpDataService from "../services/signup.service";
// import Moment from 'react-moment';
// import moment from "moment";
import validator from 'validator' 
// import 'moment-timezone';

const SignUp = props => {
	const [countries, setCountries] = useState([{name: ""}])
	const [states, setStates] = useState([{name: ""}])
	const [cities, setCities] = useState([{name: ""}])
	const [mobile, setMobile] = useState('')
	const [fName, setFName] = useState('')
	const [mName, setMName] = useState('')
	const [lName, setLName] = useState('')
	const [DOB, setDOB] = useState(new Date())
	const [gender, setGender] = useState(0)
	const [email, setEmail]=useState('')
	const [password, setPassword] = useState('')
	const [doorno, setDoorNo]=useState(0)
	const [street, setStreet]=useState('')
	const [area,setArea]=useState('')
	const [city,setCity] = useState('')
	const [state, setState]=useState('')
	const [country, setCountry]=useState('India')
	const [validPassword, setValidPassword] = useState(false)
	const [repassword, setReconfirmPassword] = useState(null)
	const [countryIso2, setCountryISO2] = useState('IN')
	const [stateIso2, setStateISO2] = useState('TN')
	const [error,setError] = useState(null) 
	const [convDate, setConvDate] = useState(new Date())
	const [pincode, setPincode] = useState("")
	const [success, setSuccess] = useState(null)
	const [mobileError, setMobileError] = useState(null)
	const [emailError, setEmailError] = useState(null)

	useEffect(() => {
		retrieveCountries()
	  }, []);

	const retrieveCountries = () => {
		CountriesService.getCountries()
				.then(res => {
					res.text().then(r=>{ 
						console.log(typeof JSON.parse(r))
						setCountries(JSON.parse(r))
					})
				})
				.catch(e=>{
					console.log(e)
				})
	}
	
	const retrieveStates = (country) => {
		let iso2
		countries.map(c=>{
			if(c.name===country) {
				setCountryISO2(c.iso2)
				iso2=c.iso2
			}
		})
		CountriesService.getStates(iso2)
			.then(res => {
				res.text().then(r=>{ 
					var temp = JSON.parse(r)
					if(temp.length>0) {
						setStates(temp)
					}
					else {
						console.log('empty list of states')
					}
				})
			})
			.catch(e=>{
				console.log(e)
			})
	}
	
	const retrieveCities = (state) => {
		let stateiso2 
		states.map(c=>{
			if(c.name===state) {
				setStateISO2(c.iso2)
				stateiso2=c.iso2;

			}
		})
		CountriesService.getCities(countryIso2, stateiso2)
			.then(res => {
				res.text().then(r=>{ 
					var temp = JSON.parse(r)
					if(temp.length>0) {
						setCities(temp)
					}
					else {
						setCities([{name:""}])
						console.log('empty list of states')
					}
				})
			})
			.catch(e=>{
				console.log(e)
			})
	}

	const validatePhoneNumber = (number) => {
		const isValidPhoneNumber = validator.isMobilePhone(number)
		return (isValidPhoneNumber)
   }
   
	const OnSignUp = e => {
		e.preventDefault();
		var g;
		if(gender==0) {
			g = 'M'
		}
		else if(gender==1) {
			g='F'
		}
		else{
			g='NB'
		}
		SignUpDataService.addUser(fName,mName,lName,convDate,g,email,password,mobile,doorno,street,area,city,state,country,pincode)
				.then(res => {
					setSuccess(true);
					setError('User Added !!')
					console.log(res) ;
				})
				.catch(e => {
					setSuccess(false);
					console.log(e)
					setError(e.message) 
					// setError('Error while creating user')
				})
	}

	const onChangeSetFName = e => {
		setFName(e.target.value);
	}

	const onChangeSetLName = e => {
		setLName(e.target.value)
	}

	const onChangeSetMName = e => {
		setMName(e.target.value)
	}
	
	const onChangeDOB = e => {
		setDOB(e)
		const date = dayjs(e.toISOString()).format('DD/MM/YYYY')
		setConvDate(date)
	}

	const onChangeSetMale = e => {
		if(e.target.checked)
			setGender(0);
	}

	const onChangeSetFemale = e => {
		if(e.target.checked)
			setGender(1) 
	}

	const onChangeSetNBinary = e => {
		if(e.target.checked)
			setGender(2)
	}

	const onChangeSetEmail = e => {
		const email=e.target.value
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if ( re.test(email) ) {
			setEmailError(false)
			setEmail(email)
		}
		else {
			// invalid email, maybe show an error to the user.
			setEmailError(true)
		}
	}

	const onChangeSetPassword = e => {
			setPassword(e.target.value)
	}

	const onChangeSetReconfirmPassword = e => {
		setReconfirmPassword(e.target.value)
		if(e.target.value === password) {
			setValidPassword(true)
		}
		else {
			setValidPassword(false)
		}
	}

	const onChangeSetMobile = e => {
		const mobile = e.target.value
		if(validatePhoneNumber(mobile)){
			setMobile(mobile)
			setMobileError(false)}
		else 
			setMobileError(true);
	}

	const onChangeSetDoorNo = e => {
		setDoorNo(e.target.value) 
	}

	const onChangeSetStreet = e => {
		setStreet(e.target.value)
	}

	const onChangeSetArea = e => {
		setArea(e.target.value)
	}
	
	const onChangeSetCity = e => {
		setCity(e.target.value)
	}

	const onChangeSetState = e => {
		setState(e.target.value)
		retrieveCities(e.target.value)
	}

	const onChangeSetCountry = e => {
		setCountry(e.target.value)
		retrieveStates(e.target.value)
	}

	const onChangeSetPincode = e => {
		setPincode(e.target.value)
	}

  return (
        <div className="sign-up">
            <div class="container">
                    <div class="col-md-10">
					{
						success!=null ?
							<div class="alert alert-warning" role="alert">
								{error}
							</div>
							:
							null
					}
                    <section>
						<form class="form-horizontal" name="signup" id="signup" >

						<div class='form-group'>
							<div className="row">
							<div className="col-sm-4">
							<div class="form-group">
								<div className="input-group-prepend">
									<label class="col-sm-4">First Name<span class="text-danger">*</span></label>
								</div>
								<div class="col-md-10 col-sm-4">
										<div class="input-group">
												<input type="text" class="form-control" id="fname" placeholder="Enter your First name" onChange={onChangeSetFName}/>
										</div>
								</div>
							</div> 
							</div>
							
							<div className="col-sm-4">
							<div class="form-group">
								<div className="input-group-prepend">
									<label class="col-sm-4">Middle Name</label>
								</div>
								<div class="col-md-10 col-sm-9">
										<div class="input-group">
												<input type="text" class="form-control" id="mname" placeholder="Enter your Middle name" onChange={onChangeSetMName}/>
										</div>
								</div>
							</div> 
							</div>

							<div className="col-sm-4">
							<div class="form-group">
								<div className="input-group-prepend">
									<label class="col-sm-4">Last Name</label>
								</div>
								<div class="col-md-10 col-sm-9">
										<div class="input-group">
												<input type="text" class="form-control" id="lname" placeholder="Enter your Last name" onChange={onChangeSetLName}/>
										</div>
								</div>
							</div> 
							</div>
							</div>
						</div><br/>

						<div class="form-group">
							<div className="input-group-prepend">
							<label class="col-sm-4">Email ID<span class="text-danger">*</span></label>
							</div>
							<div class="col-md-10 col-sm-9">
									<div class="input-group">
											<input type="email" class="form-control" id="emailid" placeholder="Enter your Email ID"  onChange={onChangeSetEmail}/>
									</div>
									{
										emailError ?
											<div className="warning">Enter a valid email id</div>
											:
											null
									}
							</div>
						</div><br/>

						<div class="form-group">
							<div className="input-group-prepend">
							<label class="col-sm-3">Mobile No.<span class="text-danger">*</span></label>
							</div>
							<div class="col-md-10 col-sm-9">
									<div class="input-group">
											<input type="text" class="form-control" id="mobileno" placeholder="Enter your Mobile No." onChange={onChangeSetMobile}/>
									</div>
									{
										mobileError ?
										<div className="warning">Enter a Valid mobile number</div>
										:
										null
									}
							</div>
						</div><br/>

						<div class='form-group'>
							<div className="input-group-prepend">
							<label class="col-sm-3">DOB<span class="text-danger">*</span></label>
							</div>
							<div class="input-group">
							<DatePicker
								id="dob"
								onChange={onChangeDOB}
								selected={DOB}
							/>			
							</div>
						</div> <br/>
						
						<div class="form-group">
						<label class="control-label col-sm-3">Gender <span class="text-danger">*</span></label>
						<div class="row">
								<div className="col-sm-2">
								<label>
								<input name="gender" type="radio" value="Male" onChange={onChangeSetMale}/>
								Male </label></div>
								<div className="col-sm-2">
								<label>
								<input name="gender" type="radio" value="Female" onChange={onChangeSetFemale}/>
								Female </label></div>
								<div className="col-sm-2">
								<label>
								<input name="gender" type="radio" value="Non-Binary" onChange={onChangeSetNBinary}/>
								Non-Binary </label></div>
						</div>
						</div> <br/>

						<div class="form-group">
						<label class="control-label col-sm-3">Set Password <span class="text-danger">*</span></label>
								<div class="col-md-5 col-sm-8">
										<div class="input-group">
										<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
										<input type="password" class="form-control" name="password" id="password" placeholder="Choose password (5-15 chars)" onChange={onChangeSetPassword}/>
										</div>   
										<PasswordStrengthBar password={password}/>
								</div>
						</div> <br/>

						<div class="form-group">
						<label class="control-label col-sm-3">Confirm Password <span class="text-danger">*</span></label>
						<div class="col-md-5 col-sm-8">
								<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
								<input type="password" class="form-control" id="cpassword" placeholder="Confirm your password" onChange={onChangeSetReconfirmPassword}/>
								</div>  
								{
									(validPassword && repassword!=null)
									?
										null
									:
										<div className='warning'>Passwords do not match!!</div>
								}
						</div>
						</div> <br/>

						<div class='form-group'>
							<div className="row">
								<label class='control-label'>Permanant Addr.</label>
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Door No.<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="doorno" placeholder="Enter your Door No." onChange={onChangeSetDoorNo}/>
									</div>  
									</div>
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Street.<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="street" placeholder="Street" onChange={onChangeSetStreet}/>
									</div>  
									</div>
									</div>
									<div className="row">
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Area<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="area" placeholder="Area" onChange={onChangeSetArea}/>
									</div>  
									</div>
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Pincode<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="pincode" placeholder="Pincode" onChange={onChangeSetPincode}/>
									</div>  
									</div>
							</div>
						</div> <br/>

						<div class='form-group'>
						<div className="row">
							<div className="col-sm-4">
							<label class='control-label col-sm-4'>Country<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<select class="form-control" id="doorno" placeholder="Country" onChange={onChangeSetCountry}>
										{
											countries.map(c=>{
												return( 
												<option value={c.name}> {c.name} </option>
												)
											})
										}
									</select>
									</div>  
							</div>
							<div className="col-sm-4">
							<label class='control-label col-sm-4'>State<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<select class="form-control" id="state" placeholder="State" onChange={onChangeSetState}>
											{
												states.map(c=>{
													return( 
													<option value={c.name}> {c.name} </option>
													)
												})
											}
										</select>
									</div>  
							</div>
							<div className="col-sm-4">
							<label class='control-label col-sm-4'>City<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<select class="form-control" id="city" placeholder="city" onChange={onChangeSetCity}>
											{
												cities.map(c=>{
													return( 
													<option value={c.name}> {c.name} </option>
													)
												})
											}
										</select>
									</div>  
							</div>
						</div>
						</div> <br/> 

						<div class="form-group">
						<div class="col-xs-offset-3 col-md-8 col-sm-9"><span class="text-muted"><span class="label label-danger">Note:-</span> By clicking Sign Up, you agree to our <a href="#">Terms</a> and that you have read our <a href="#">Policy</a>, including our <a href="#">Cookie Use</a>.</span> </div>
						</div> <br/> 

						<div class="form-group">
						<div class="col-xs-offset-3 col-xs-10">
								<input value="Sign Up" name="Submit" type="submit" class="btn btn-primary" onClick={OnSignUp}/>
						</div>
						</div>

                    </form>
                    </section>
				</div>
            </div>
        </div>

  );
};

export default SignUp

/*

Avatars - least P

API to get states and cities
find an API to get iso2 for s country

connect to server backend

Add cardId, pincode

Check mobile check, email check

*/
