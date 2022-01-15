import React, { useState } from 'react'
import { sendMessageChannel, sendMessageUser} from '../../API/fetch'
import toastr from 'toastr'

// import ReactQuill from 'react-quill'


//CSS
// import 'react-quill/dist/quill.snow.css'


const Footer = ({status = '', receiver = '', allUsers=[], userChannel = []}) => {
    const [value, setValue] = useState('');
    
    const handleSend = () => {
        if(!status){
            toastr['error']('unable to send message')
        }

        if(status === 'channel'){
            if(value === ''){
                toastr['error']('unable to send message')
            } else {
                let filteredChannel = userChannel.filter(i => i.name === receiver)
                    if(filteredChannel.length){
                        (async() => {
                            const [error] = await sendMessageChannel({
                                "access-token" : localStorage.getItem(`access-token`),
                                expiry : localStorage.getItem(`expiry`),
                                uid : localStorage.getItem(`uid`),
                                client : localStorage.getItem(`client`)
                            }, value, filteredChannel[0].id)
                            
                                if(error.length){
                                    toastr['error'](error[0])
                                } else {
                                    window.location.reload()
                                }
                        })()
                    }
            }
        }
        if(status === 'DMS'){
            if(value === ''){
                toastr['error']('unable to send message')
            } else {
                let filteredUser = allUsers.filter(i => i.uid === receiver)
                    if(filteredUser.length){
                        (async() => {
                            const [error] = await sendMessageUser({
                                "access-token" : localStorage.getItem(`access-token`),
                                expiry : localStorage.getItem(`expiry`),
                                uid : localStorage.getItem(`uid`),
                                client : localStorage.getItem(`client`)
                            }, value, filteredUser[0].id)
                            
                                if(error.length){
                                    toastr['error'](error[0])
                                } else {
                                    window.location.reload()
                                }
                        })()
                    }
            }
        }
        
    }

    return (
        <>
            <div className="editor-header">
                <img src="/img/send.png" alt="send-icon"  onClick={handleSend}/>
            </div>
            <div className="editor-container">
                {/* <ReactQuill theme="snow" value={value} onChange={setValue}/ > */}
                <textarea placeholder='Say something ?' value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
        </>
    )
}

export default Footer
