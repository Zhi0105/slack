import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const Channelmember = ({onClose, chMemberID=[], allUsers=[]}) => {
    // console.log(chMemberID)
    // console.log(allUsers)

    return (
        <div className="chmember">
            <div className='chmember-container'>
                <div className='header'>
                    <span>&nbsp;</span><h2>Member list</h2>
                    <span className='close' onClick={() => onClose()}>&times;</span>
                </div>
                <div className='lines'>
                    <br /><hr /><br />
                </div>
                <div className='section'>
                    <ul>
                        {
                        chMemberID.length ? chMemberID.map((member, index) => {
                            let i = allUsers.filter((names) => names.id === member)
                            // return <li key={index}>{i[0]?.uid}</li>
                            return (
                                <li key={index}>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar alt="JD" src=''  sx={{ width: 24, height: 24 }} />&nbsp;&nbsp;{i[0]?.uid}
                                    </Stack>
                                </li>
                            )

                        }):(<li>no record found!</li>)
                        }
                    </ul>
                </div>
            </div> 
            
        </div>
    )
}

export default Channelmember
