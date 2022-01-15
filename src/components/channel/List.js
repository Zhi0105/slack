import React from 'react'


const List = ({userChannel = [], channelOnClick}) => {

    // userChannel.length ? console.log(userChannel) : console.log(`no channel yet!`)
    
    return (
        <div>
            <ul>
                {
                    userChannel.length ? userChannel.map((channel, index) => 
                        <li key={index} id={channel.id} onClick={channelOnClick}>{channel?.name}</li>
                    ) : ( <li>No channel yet!</li>)
                }
            </ul> 
        </div>
    )
}

export default List
