import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    TextField,
    Button,
} from '@mui/material'

// COMPONENT
import { createuser } from '../API/fetch'

import toastr from 'toastr'


const Register = () => {
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [contact, setContact] = useState('')
    const [validate, setValidate] = useState(false)
    
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "500",
        "timeOut": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    
    const handleSubmit = () => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let nameformat = /^[a-zA-Z ]*$/
        let validateEmail = email.trim()
        
        !email || !firstname || !lastname || !email || !password || !ConfirmPassword || !contact ? toastr['error'](`Kindly fill up all fields!`)
            : !firstname.match(nameformat) || !lastname.match(nameformat) ?  toastr['error'](`Name is not valid!`)
                : !validateEmail.match(mailformat) ?  toastr['error'](`Email is not valid!`)
                    : password !== ConfirmPassword ? toastr['error'](`Password should be matched!`)
                        : contact.length !== 11 ? toastr['error'](`contact should be 11 digit!`)
                            :setValidate(true)

    } 
    
    useEffect(() => {

        if(validate === true){
            (async () => {
        
                    const [res, error] = await createuser(
                        firstname,
                        lastname,
                        email,
                        password,
                        ConfirmPassword,
                        contact
                    )
                    if(error.length > 0){
                        toastr['error'](error[0])
                    } else {

                        localStorage.setItem(`access-token`, res.headers['access-token'])
                        localStorage.setItem(`client`, res.headers.client)
                        localStorage.setItem(`expiry`, res.headers.expiry)
                        localStorage.setItem(`uid`, res.headers.uid)
                        navigate(`/`)
                        toastr['success'](`Account successfully created!`)
                        
                    }
            })()

        }  
        
    }, [validate, navigate, firstname, lastname, email, password, ConfirmPassword, contact])


    return (
        <div className="register-main">
            <div className='form-container'>
                <form>
                    <div className="register-form-header"><h1>Sign up</h1></div>
                        <div className="register-form-content">
                            <span>Name:</span>
                            <div className="name">
                                <TextField type="text" label="firstname" variant="outlined" onChange={(e) => setFirstname(e.target.value)} value={firstname} autoComplete='off'/>
                                <TextField type="text" label="surname" variant="outlined" onChange={(e) => setLastname(e.target.value)} value={lastname} autoComplete='off'/>    
                            </div>
                            <span>Email:</span>
                            <TextField type="emaii" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete='off'/>
                            <span>Password:</span>
                            <TextField type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete='off'/>
                            <TextField type="password" label="Retype-password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} value={ConfirmPassword} autoComplete='off'/>
                            <span>Contact:</span>
                            <TextField type="number" label="Contact number" variant="outlined" onChange={(e) => setContact(e.target.value)} value={contact} autoComplete='off'/>
                            
                        </div>
                        <div className="register-form-footer">
                            <Button className="button" color="success" variant="contained" onClick={handleSubmit}>Submit</Button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register
