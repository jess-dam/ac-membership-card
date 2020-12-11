import React from 'react';
import CurrentUser from './auth/CurrentUser';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

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

    return <>
        <h2>Users</h2>
        { users ?
            <>
                <h5>Think anyone's been an especially loyal customer? Give them some points to show your appreciation!</h5>
                { users.map((user) => {
                    return <Card>
                        <CardContent>
                            <p>{user.name}</p>
                            <UserCard user={user} isAdmin={true}/>
                        </CardContent>
                    </Card>
                }) }
            </>

            : <h5>No users available</h5>
        }


    </>

}

export default AllUsers;