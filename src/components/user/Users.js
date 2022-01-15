import React from 'react'
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';


const Users = ({DMS = [], onDMClick}) => {
    // src={`/img/avatar/${Math.floor(Math.random() * 5 + 1)}.png`}

    return (
        <div>
            <ul>
                {
                    DMS ? DMS.map((name, index) => (
                        <li key={index} onClick={onDMClick}>{name}</li>
                    )) : ( <li>No DMS yet!</li>)
                }
            </ul>
            
        </div>
    )
}

export default Users
