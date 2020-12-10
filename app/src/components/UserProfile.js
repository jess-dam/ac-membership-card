import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import './UserProfile.scss'

const GET_USER_PATH = 'http://localhost:3001/user/5fd1dfafba75a08186b7d15a';

function UserProfile() {
    const [user, setUser] = React.useState();

    const getUser = () => {
        axios.get(GET_USER_PATH)
        .then((res) => {
            console.log(res.data.user);
            setUser(res.data.user);
        });
    }

    React.useEffect(() => {
        getUser();
    }, []);

    return <div id='profile-wrapper'>
        { user ?
            <>
                <div className='user-details'>
                    <h1>User Profile</h1>

                            <h4>Name </h4><p>{user.name}</p>
                            <h4>Email </h4><p>{user.email}</p>
                            <h4>Member Since </h4><p>{user.createdAt}</p>
                </div>
                <UserCard className='card' user={user}/>
            </>
            :
            <div className='user-details'>
                <h1>User Profile</h1>
                <h4>No user details available!</h4>
            </div>
        }
    </div>
}

export default UserProfile;