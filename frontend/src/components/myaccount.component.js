import React, { useEffect, useState } from "react"
import '../App.css' 
import "react-datepicker/dist/react-datepicker.css"
import CountriesService from "../services/countries.service"
import validator from 'validator' 
import MyAccountDataService from '../services/myaccount.service.js'

const MyAccount = (props) => {
	const [countries, setCountries] = useState([{name: ""}])
	const [states, setStates] = useState([{name: ""}])
	const [cities, setCities] = useState([{name: ""}])
	const [mobile, setMobile] = useState('')
	const [fName, setFName] = useState('')
	const [mName, setMName] = useState('')
	const [lName, setLName] = useState('')
	const [DOB, setDOB] = useState(new Date())
	const [gender, setGender] = useState('M')
	const [email, setEmail]=useState('')
	const [password, setPassword] = useState('')
	const [doorno, setDoorNo]=useState(0)
	const [street, setStreet]=useState('')
	const [area,setArea]=useState('')
	const [city,setCity] = useState('')
	const [state, setState]=useState('')
	const [country, setCountry]=useState('')
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
    const [male,setMale] = useState(false)
    const [female,setFemale] = useState(false)
    const [nonB, setnonB] = useState(false)

	useEffect(() => {
        setUserData()
		retrieveCountries()
	  }, []);

    const setUserData = () => {
		console.log(props)
        MyAccountDataService.getUserData(props.token)
            .then(res=> {
                const dataJSON = res.data //JSON.parse(res.data) 
                setMobile(dataJSON.mobile)
                setPincode(dataJSON.pincode)
                setState(dataJSON.state)
                const addr = dataJSON.permanent_addr.split(',')
                setDoorNo(addr[0])
                setStreet(addr[1])
                setArea(addr[2])
                setConvDate(dataJSON.DOB)
                console.log(dataJSON.DOB)
                setEmail(dataJSON.email)
                setFName(dataJSON.firstName)
                setMName(dataJSON.middleName)
                setLName(dataJSON.lastName)
                setCountry(dataJSON.country)
                setCity(dataJSON.city)
                const g = dataJSON.gender
                setGender(g)
                if(g=='M') setMale(true);
                else if(g==='F') setFemale(true)
                else setnonB(true)
            })
            .catch(e => {
                console.log(e)
            })
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
    
	const OnSaving = e => {
		e.preventDefault();
        const permanent_addr=doorno+','+street+','+area
		MyAccountDataService.updateUser(props.token, email,mobile,permanent_addr,city,pincode,state,country)
				.then(res => {
					setSuccess(true);
					setError('User Details Updated !!')
					console.log(res) ;
				})
				.catch(e => {
					setSuccess(false);
					console.log(e)
					setError(e.message) 
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
								<div className="input-group-prepend">
									<label class="col-sm-4">First Name<span class="text-danger">*</span></label>
								</div>
								<div class="col-md-10 col-sm-4">
										<div class="input-group">
												<input type="text" class="form-control" value={fName} id="fname" placeholder="Enter your First name" disabled/>
										</div>
								</div>
							</div>
							
							<div className="col-sm-4">
								<div className="input-group-prepend">
									<label class="col-sm-4">Middle Name</label>
								</div>
								<div class="col-md-10 col-sm-9">
										<div class="input-group">
												<input type="text" class="form-control" value={mName} id="mname" placeholder="Enter your Middle name" onChange={onChangeSetMName}/>
										</div>
								</div>
							</div> 

							<div className="col-sm-4">
								<div className="input-group-prepend">
									<label class="col-sm-4">Last Name</label>
								</div>
								<div class="col-md-10 col-sm-9">
										<div class="input-group">
												<input type="text" class="form-control" value={lName} id="lname" placeholder="Enter your Last name" onChange={onChangeSetLName}/>
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
											<input type="email" class="form-control" value={email} id="emailid" placeholder="Enter your Email ID"  onChange={onChangeSetEmail}/>
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
											<input type="text" class="form-control" value={mobile} id="mobileno" placeholder="Enter your Mobile No." onChange={onChangeSetMobile}/>
									</div>
									{
										mobileError ?
										<div className="warning">Enter a Valid mobile number</div>
										:
										null
									}
							</div>
						</div><br/>
						
						<div class="form-group">
						<label class="control-label col-sm-3">Gender <span class="text-danger">*</span></label>
						<div className="row">
						{
								male ? (
									<div className="col-sm-2">
									<label>
									<input name="gender" type="radio" value="Male" onChange={onChangeSetMale} checked/>
									Male </label></div>
								) : ( 
									<div className="col-sm-2">
									<label>
									<input name="gender" type="radio" value="Male" onChange={onChangeSetMale}/>
									Male </label></div>
								)
						}{
								female ?
								(
								<div className="col-sm-2">
								<label>
								<input name="gender" type="radio" value="Female" onChange={onChangeSetFemale} checked/>
								Female </label></div>
								) : (
								<div className="col-sm-2">
								<label>
								<input name="gender" type="radio" value="Female" onChange={onChangeSetFemale}/>
								Female </label></div>
								) 
						}{
							nonB ?
							(
							<div className="col-sm-2">
							<label>
							<input name="gender" type="radio" value="Non-Binary" onChange={onChangeSetNBinary} checked/>
							Non-Binary </label></div>
							) : (
							<div className="col-sm-2">
							<label>
							<input name="gender" type="radio" value="Non-Binary" onChange={onChangeSetNBinary}/>
							Non-Binary </label></div>
							)
						}
						</div>
						</div><br/>
					
						<div class='form-group'>
							<div className="row">
								<label class='control-label'>Permanant Addr.</label>
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Door No.<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" value={doorno} id="doorno" placeholder="Enter your Door No." onChange={onChangeSetDoorNo}/>
									</div>  
									</div>
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Street.<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="street" value={street} placeholder="Street" onChange={onChangeSetStreet}/>
									</div>  
									</div>
									</div>
									<div className="row">
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Area<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="area" value={area} placeholder="Area" onChange={onChangeSetArea}/>
									</div>  
									</div>
									<div className="col-sm-4">
									<label class='control-label col sm-6'>Pincode<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="text" class="form-control" id="pincode" value={pincode} placeholder="Pincode" onChange={onChangeSetPincode}/>
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
									<select class="form-control" id="country" placeholder="Country" onChange={onChangeSetCountry}>
										{
											countries.map(c=>{
												if(c.name===country) {
													return(
														<option value={c.name} selected> {c.name} </option>
													)
												}
												else{
													return( 
														<option value={c.name}> {c.name} </option>
													)
												}
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
													if(c.name===state) {
														return(
															<option value={c.name} selected> {c.name} </option>
														)
													}
													else{
														return( 
															<option value={c.name}> {c.name} </option>
														)
													}
												})
											}
										</select>
									</div>  
							</div>
							<div className="col-sm-4">
							<label class='control-label col-sm-4'>City<span class='text-danger'></span></label>
									<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<select class="form-control" id="city" selected={city} placeholder="city" onChange={onChangeSetCity}>
											{
												cities.map(c=>{
													if(c.name===city) {
														return(
															<option value={c.name} selected> {c.name} </option>
														)
													}
													else{
														return( 
															<option value={c.name}> {c.name} </option>
														)
													}
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
								<input value="Save Changes" name="Submit" type="submit" class="btn btn-primary" onClick={OnSaving}/>
						</div>
						</div>

                    </form>
                    </section>
				</div>
            </div>
        </div>

  );
};

export default MyAccount