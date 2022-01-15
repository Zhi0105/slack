import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Search = ({onClose, allUsers = [], setSearchValue = '', setUserID=null}) => {
    const [search, setSearchKeyword] = useState('')
    const [filteredUser, setFilteredUser] = useState([])
    
    const handleSearch = (e) => {
        setSearchKeyword(e.target.value)
        const filtered = allUsers.filter(i => {
            return i.uid.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredUser(filtered)
        
        
    }

    useEffect( () => {

        for(let i = 0; i < allUsers.length; i+=1){
            if(search === allUsers[i].uid){
                setSearchValue(search)
                onClose()
                setSearchKeyword('')
                
            }
        }

    }, [search, allUsers, setSearchValue, onClose])
    // console.log(allUsers)

    
    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='header'>
                    <input type="search" className='search' placeholder="search member ? 🔎" value={search} onChange={handleSearch}/>
                    <span className='close' onClick={() => onClose()}>&times;</span>
                </div>
                <div className='lines'>
                    <br /><hr /><br />
                </div>
                <div className='section'>
                    <ul className='user-details'>
                        {
                            !search ? (
                                allUsers.length ? allUsers.map((user, index) => (
                                    <li key={index} onClick={()=> {setSearchKeyword(user.uid); setUserID(user.id)}}>
                                        <Stack direction="row" spacing={2}>
                                            
                                            <Avatar alt="JD" src='' />&nbsp;&nbsp;{user?.uid}
                                        </Stack>
                                    </li>  
                                )) : (<li>No Record found!</li>)
                            ):(
                                filteredUser.length ? filteredUser.map((user, index) => (
                                    <li key={index} onClick={()=> {setSearchKeyword(user.uid); setUserID(user.id)}}>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt="JD" src='' />&nbsp;&nbsp;{user?.uid}
                                        </Stack>
                                    </li>  
                                )) : (<li>No Record found!</li>)
                            )
                        }
                        
                    </ul> 
                </div>
            </div>
        </div>
    )
}

export default Search
