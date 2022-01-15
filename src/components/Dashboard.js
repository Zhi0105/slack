import React, {useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'


//COMPONENTS
import Footer from './user/Footer'
import Search from './modal/Search'
import List from './channel/List'
import Channelmember from './modal/Channelmember'
import Addchannel from './modal/Addchannel'
import Users from './user/Users'
import Channel from './chat/Channel'
import DMS from './chat/DMS'
import toastr from 'toastr'


//FETCH
import { getAllUser, getUserChannel, addToChannel, getChannelDetail, getMessageUser } from '../API/fetch'
// import userheader from '../api/responseheader'


//MUI
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//MODAL REDUCER
const modalReducer = (state, action) => {
    switch (action.type){
        case 'openSearchModal' :
            return{
                ...state,
                isSearchOpenModal : true
            }
        case 'closeSearchModal' :
            return{
                ...state,
                isSearchOpenModal : false
            }

            case 'openAddChannelModal' :
                return{
                    ...state,
                    isAddChannelOpenModal : true
                }
            case 'closeAddChannelModal' :
                return{
                    ...state,
                    isAddChannelOpenModal : false
                }
            case 'openChannelMemList' : 
                return{
                    ...state,
                    isChannelMemListOpenModal : true
                }
            case 'closeChannelMemList' : 
                return{
                    ...state,
                    isChannelMemListOpenModal : false
                }
            
        default :
            return state
    }
}

//DROPDOWN REDUCER
const dropdownReducer = (state, action) => {
    switch (action.method){
        case 'openChannelList' :
            return{
                ...state,
                isChannelListOpen : true
            }
        case 'closeChannelList' : 
            return{
                ...state,
                isChannelListOpen : false
            }

            case 'openDMList' :
                return{
                    ...state,
                    isDMSListOpen : true
                }
            case 'closeDMList' : 
                return{
                    ...state,
                    isDMSListOpen : false
                }
        default :
            return state
    }
}

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
        backgroundColor: purple[700],
        },
    }));

//DASHBOARD COMPONENT
const Dashboard = () => {

    //HANDLE OPEN SEARCH MODAL
    const handleOpenSearchModal = () => {
        modalDispatch({type : 'openSearchModal'})
    }

    //HANDLE CLOSE SEARCH MODAL
    const handleCloseSearchModal = () => {
        modalDispatch({type : 'closeSearchModal'})
    }

    //HANDLE OPEN ADD CHANNEL MODAL
    const handleOpenAddChannelModal = () => {
        modalDispatch({type : 'openAddChannelModal'})
    }   
    
    //HANDLE CLOSE ADD CHANNEL MODAL
    const handleClosenAddChannelModal = () => {
        modalDispatch({type : 'closeAddChannelModal'})
    }

    //HANDLE OPEN MEMBER LIST ON A CHANNEL
    const openChannelMemList = () => {
        modalDispatch({type : 'openChannelMemList'})
    }

    //HANDLE CLOSE MEMBER LIST ON A CHANNEL
    const closeChannelMemList = () => {
        modalDispatch({type : 'closeChannelMemList'})
    }

    //HANDLE CHANNEL DROPDOWN
    const handleDropDownChannelToggle = () => {
        if(isDropDown === false){
            dropdownDispatch({method : 'openChannelList'})
            setIsDropDown(true)
        } else {
            dropdownDispatch({method : 'closeChannelList'})
            setIsDropDown(false)
        }
    }
    //HANDLE DM DROPDOWN
    const handleDropDownDMToggle = () => {
        if(isDMDropDown === false){
            dropdownDispatch({method : 'openDMList'})
            setIsDMDropDown(true)
        } else {
            dropdownDispatch({method : 'closeDMList'})
            setIsDMDropDown(false)
        }
    }

const navigate = useNavigate()
const [user] = useState(localStorage.getItem(`uid`))
const [allUsers, setAllUsers] = useState([])
const [userChannel, setUserChannel] = useState([])
const [userID, setUserID] = useState(null)
const [DMList, setDMList] = useState([])

const [userDMS, setUserDMS] = useState('')

const [status, setStatus] = useState(null)
const [channel, setChannel] = useState('')
const [channelMemCount, setMemCount] = useState(null)
const [chMemberID, setChMemberID] = useState([])

const [searchValue, setSearchValue] = useState('')
const [modalState, modalDispatch] = useReducer(modalReducer, {
    isSearchOpenModal : false,
    isAddChannelOpenModal: false,
    isChannelMemListOpenModal: false
})
const [isDropDown, setIsDropDown] = useState(false)
const [isDMDropDown, setIsDMDropDown] = useState(false)
const [dropdownState, dropdownDispatch] = useReducer(dropdownReducer, {
    isChannelListOpen : false,
    isDMSListOpen : false
})

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
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

    //LOGOUT
    const handleLogout = () => {
        localStorage.removeItem(`user`)
        localStorage.removeItem(`${user}`)
        navigate(`/`)
    }
    //USER SESSION
    useEffect(() => {
        let session = localStorage.getItem(`user`)
            !session ? navigate(`/`) : navigate(`/user-panel`)
    }, [navigate])


    //RETREVING ALL USER
    useEffect(() => {

        (async () => {
            const [res, error] = await getAllUser(
                {
                    "access-token" : localStorage.getItem(`access-token`),
                    expiry : localStorage.getItem(`expiry`),
                    uid : localStorage.getItem(`uid`),
                    client : localStorage.getItem(`client`)
                }
            )
                if(error.length){
                    toastr['error'](error[0])
                }
                    else {
                        setAllUsers(res.data.data)
                    }
        })()
        
    }, [])

    //RETREIVING ALL USER CHANNEL
    useEffect(() => {
            (async() => {
                const [res, error] = await getUserChannel({
                    "access-token" : localStorage.getItem(`access-token`),
                    expiry : localStorage.getItem(`expiry`),
                    uid : localStorage.getItem(`uid`),
                    client : localStorage.getItem(`client`)
                })
                    if(error.length){
                        toastr['error'](error[0])
                    }
                        else {
                            setUserChannel(res.data.data)
                            
                        }
            })()
    }, [])

    //RETREIVING ALL DIRECT MESSAGE FROM OTHER USER
    useEffect(() => {
        for(let i = 0; i < allUsers.length; i+=1){
            (async() => {
                const [res, error] = await getMessageUser({
                    "access-token" : localStorage.getItem(`access-token`),
                    expiry : localStorage.getItem(`expiry`),
                    uid : localStorage.getItem(`uid`),
                    client : localStorage.getItem(`client`)
                }, 'User', allUsers[i].id)
                
                    if(error.length){
                        toastr['error'](error[0])
                    } else {
                        if(res.data.data.length){
                            let user = localStorage.getItem(`user`)
                            let userDM = JSON.parse(localStorage.getItem(`${user}`))
                        
                            if(!userDM){
                                DMList.push(res.data.data[0].sender.uid)
                                setDMList(DMList)
                                localStorage.setItem(`${localStorage.getItem(`uid`)}`, JSON.stringify(DMList))
                            } else {
                                let isExist = userDM.filter(names => res.data.data[0].sender.uid === names)
                                    if(!isExist.length){
                                        DMList.push(res.data.data[0].sender.uid)
                                        setDMList(DMList)
                                        localStorage.setItem(`${localStorage.getItem(`uid`)}`, JSON.stringify(DMList))
                                    }
                            }
                        }
                    }
            })()
        }
    }, [allUsers, DMList])
    

    //FUNCTION HANDLE TO ADD MEMBER ON THE CHANNEL
    const addMemberToChannel = async(channel_id, user_id, channel) => {
        const [error] = await addToChannel({
            "access-token" : localStorage.getItem(`access-token`),
            expiry : localStorage.getItem(`expiry`),
            uid : localStorage.getItem(`uid`),
            client : localStorage.getItem(`client`)
        }, channel_id, user_id)

            if(error.length){
                toastr['error'](error[0])
            } else {
                toastr['success'](`${searchValue} successfully added to ${channel} channel!`)
                window.location.reload() 
            }

    }
    
    //RETREIVING CHANNEL DETAIL FROM THE SERVER
    const channelDetail= async(e) => {
        const [res, error] = await getChannelDetail({
            "access-token" : localStorage.getItem(`access-token`),
            expiry : localStorage.getItem(`expiry`),
            uid : localStorage.getItem(`uid`),
            client : localStorage.getItem(`client`)
        }, e.target.id)

        if(error.length){
            toastr['error'](error[0])
        } else {
            let memblist = res.data.data.channel_members
            
            setStatus('channel')
            setChannel(res.data.data.name)
            setMemCount(memblist.length)
            
            setChMemberID(chMemberID.length = 0)
            memblist.length ? memblist.map((member, index) => chMemberID.push(member.user_id)) : (console.log(`no data found`))
            setChMemberID(chMemberID)
        
        }
    }

    //HANDLE ADD TO DMS
    const handleAddDMS = () => {
        let user = localStorage.getItem(`user`)
        let userDM = JSON.parse(localStorage.getItem(`${user}`))
        // let toDMed = JSON.parse(localStorage.getItem(`${searchValue}`))


        //INITIALIZING USER ADDING A NEW DMS 
        //  SENDER
        if(!userDM){
            localStorage.setItem(`${user}`, JSON.stringify([searchValue]))
            window.location.reload()

        } else {
            let isExist = userDM.filter(names => searchValue === names)
                if(isExist.length){
                    toastr['error'](`User already exist on your DM List`)
                } else {
                    userDM.push(searchValue)
                    localStorage.setItem(`${user}`, JSON.stringify(userDM))
                    window.location.reload()
                }
                
        }

    }

    const handleDMCLick = (e) => {
        setUserDMS(e.target.textContent)
        setStatus('DMS')
    }
    
    return (
        
        <div className='dashboard-main'>
            <div className="dashboard-sidebar">
                <span>🟢{localStorage.getItem(`uid`)}</span>
                <ColorButton variant="contained" onClick={handleOpenAddChannelModal}>➕ Add Channel</ColorButton>
                {modalState.isAddChannelOpenModal &&
                    <Addchannel onClose={handleClosenAddChannelModal} userChannel={userChannel}/>
                }
                <button className="dropdown-btn" onClick={handleDropDownChannelToggle}>{!isDropDown ? <span>➤</span> : <span>▼</span>} Channels 
                </button>
                <div className="dropdown-container">
                    {dropdownState.isChannelListOpen &&
                        <List userChannel={userChannel} channelOnClick={channelDetail}/>
                    }
                </div>

                <button className="dropdown-btn" onClick={handleDropDownDMToggle}>{!isDMDropDown ? <span>➤</span> : <span>▼</span>} Direct messages 
                </button>
                <div className="dropdown-container">
                    {dropdownState.isDMSListOpen &&
                        <Users DMS={JSON.parse(localStorage.getItem(user))} onDMClick={handleDMCLick}/>
                    }
                </div>
                
            </div>
            <div className="dashboard-container">
                <header>
                    <img src="/img/logout.png" alt="signout logo" onClick={handleLogout}/>
                    <input type="search" placeholder='search 🔎' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onClick={handleOpenSearchModal}/>
                    {/*ADD TO DROPDOWN */}
                    <div className="dropdown" >
                        <Button className="dropdown-btn" variant="contained" sx={searchValue === '' ? {display : 'none'} : {display : 'block'}}>add to 🡇</Button>
                        <div className="dropdown-content">
                            <span>
                                <Button className="DMS" variant="contained" onClick={handleAddDMS}>Direct msg</Button>
                            </span>
                            <span>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <h4>Channel</h4>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul>
                                            {
                                                !userChannel ? <li>No channel yet</li> : 
                                                    userChannel.length ? userChannel.map( (channel, index) => 
                                                        <li key={index} onClick={() => {addMemberToChannel(channel.id, userID, channel.name)}}>{channel?.name}</li>
                                                    ) : ( <li>no channel yet!</li>)
                                            }
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </span>
                        </div>
                    </div>
                    
                        {modalState.isSearchOpenModal &&
                            < Search onClose={handleCloseSearchModal} allUsers={allUsers} setSearchValue={setSearchValue} setUserID={setUserID}/>
                        }
                </header>
                <section>
                    <div className="section-header">
                        {status === 'channel' ? <span>{channel}</span> : 
                            status === 'DMS' ? <span>{userDMS}</span> :
                                <span>&nbsp;</span>
                        }
                        <span style={{ display: 'none' }}>{status}</span>
                        <button style={status === 'channel' ? {display : 'block'} : {display: 'none'}} onClick={openChannelMemList}>
                            👥 members: <strong>{channelMemCount}</strong>
                        </button>
                            {modalState.isChannelMemListOpenModal &&
                                <Channelmember onClose={closeChannelMemList} chMemberID={chMemberID} allUsers={allUsers}/>
                            }
                    </div>
                    <div className="section-chat">
                        {
                            status === 'channel' ? < Channel channel={channel} userChannel={userChannel}/>
                                : status === 'DMS' ? <DMS userDMS={userDMS} allUsers={allUsers} />
                                : <p>No chat to load</p>
                        }
                    </div>
                </section>
                <footer>
                    < Footer status={status}
                        receiver={
                        status === 'channel' ? channel :
                            status === 'DMS' ? userDMS :
                            ''
                } allUsers={allUsers} userChannel={userChannel}/>
                </footer>
            </div>
        </div>
    )
}

export default Dashboard
