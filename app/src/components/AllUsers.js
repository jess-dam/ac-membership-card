import React from 'react';
import CurrentUser from './auth/CurrentUser';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import './AllUsers.scss';

import UserCard from './UserCard';

function AllUsers () {
    const GET_ALL_USERS_PATH = 'http://localhost:3001/user/all';
    const [users, setUsers] = React.useState([]);

    const getUsers = () => {
        axios.get(GET_ALL_USERS_PATH)
            .then(res => {
                setUsers(res.data.allUsers);
                console.log(res.data);
            });
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    return <div className='all-users'>
        <h2 className='all-users_main-header'>Users</h2>
        { users ?
            <div>
                <h5 className='all-users_main-header'>Think anyone's been an especially loyal customer? Give them some points to show your appreciation!</h5>
                { users.map((user) => {
                    return <div className='all-users_user'>
                            <h5 className='all-users_header'>{user.name}</h5>
                            <UserCard user={{...user, isViewingAsAdmin: true }}/>
                    </div>
                }) }
            </div>

            : <h5>No users available</h5>
        }


    </div>

}

export default AllUsers;