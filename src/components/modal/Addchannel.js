import React, {useState} from 'react'
import { TextField, Button } from '@mui/material'
import toastr from 'toastr'

//FETCH
// import userheader from '../../api/responseheader'
import {createchannel} from '../../API/fetch'


const Addchannel = ({onClose, userChannel = []}) => {
        const [channelName, setChannelName] = useState('')
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-center",
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

        const handleAddChannel = async() => {

            let userheader = {
                "access-token" : localStorage.getItem(`access-token`),
                expiry : localStorage.getItem(`expiry`),
                uid : localStorage.getItem(`uid`),
                client : localStorage.getItem(`client`)
            }

        
            const isChannelExist = userChannel.filter(i => {
                if(i.name === channelName){
                    return true
                } else {
                    return false 
                }
            })
            if(isChannelExist.length === 0){
                const [error] = await createchannel(channelName, userheader)
                    if(error.length){
                        toastr['error'](error[0])
                    }
                        else {
                            
                            toastr['success'](`Channel successfully created`)
                            window.location.reload()

                        }
            }
            if(isChannelExist.length > 0){
                toastr['error'](`Channel name already taken!`)
            }
        }
        
    return (
        <div className='addchannel'>
            <div className='addchannel-container'>
                <div className='header'>
                    <span>&nbsp;</span>
                    <h1>Add Channel</h1>
                    <span className='close' onClick={() => onClose()}>&times;</span>
                </div>
                <div className='lines'><br /> <hr /> <br /></div>
                <div className='section'>
                    <TextField className="channelName" label="name" variant="standard" autoComplete='off' value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
                    <Button className="button" variant="contained" color="success" onClick={handleAddChannel}>Submit</Button>
                            
                </div>
            </div>
        </div>
    )
}

export default Addchannel
