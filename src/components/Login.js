import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import LoginSharpIcon from '@mui/icons-material/LoginSharp'
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp'

import toastr from 'toastr'


import {
    TextField,
    Button,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    IconButton,
    FormControl,

} from '@mui/material'
import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material'

import {loginuser} from '../API/fetch'

const Login = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "500",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    

    const navigateRegister = () => {
        navigate(`/create-user`)
    }

        //HANDLES PASSWORD SHOW/NOT SHOW START
        const [values, setValues] = useState({
            showPassword: false,
        });
        const handleChange = (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
            setPassword(event.target.value)
        }
        const handleClickShowPassword = () => {
            setValues({
            ...values,
            showPassword: !values.showPassword,
            });
        };
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        //HANDLES PASSWORD SHOW/NOT SHOW END
        
        // FUNCTION HANDLE LOGIN
        const handleLogin = () => {

            let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            let validateEmail = username.trim()
        
            !username || !password ? toastr["error"](`Please type username or password!`)
                : !validateEmail.match(mailformat) ?  toastr['error'](`Email is not valid!`)
                : 
                
            (async() => {
                
                const [res, error] = await loginuser(username, password)

                    if(error.length){
                        // alert(error[0])
                        toastr['error'](error[0])
                    } else {

                        
                        localStorage.setItem(`access-token`, res.headers['access-token'])
                        localStorage.setItem(`client`, res.headers.client)
                        localStorage.setItem(`expiry`, res.headers.expiry)
                        localStorage.setItem(`uid`, res.headers.uid)
                        localStorage.setItem(`user`, res.headers.uid)                        
                        navigate(`/user-panel`)
                        toastr["success"]('Login success')
                        
                        
                        
                    }

            })()
        }

        useEffect(()=> {
            let session = localStorage.getItem(`user`)
                session ? navigate('/user-panel') : navigate('/') 
        }, [navigate])
        

    return (
        <div className='login-main'>
            <div className='container'>
                <div className="login-form">
                    <form>
                        <div className='login-form-header'><span>Slack</span></div>
                        <div className='login-form-content'>
                            <TextField className="textfield" label="Email" variant="outlined" autoComplete='off' onChange={(e)=> setUsername(e.target.value)} value={username}/>
                            {/* <TextField className="textfield" label="Password" type="password"  autoComplete="current-password" variant="standard" /> */}
                            <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput className="textfield"
                                autoComplete='off'
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
                                value={password}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            </FormControl>
                            <Button className="button" variant="contained" onClick={handleLogin}>login <LoginSharpIcon /></Button>
                            <Button className="button" variant="contained" onClick={navigateRegister}>Sign up<AppRegistrationSharpIcon /></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
