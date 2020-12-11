import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import './UserProfile.scss'
import CurrentUser from './auth/CurrentUser';
import { Route, Redirect } from 'react-router-dom';

const GET_USER_PATH = `http://localhost:3001/user/${CurrentUser.getCurrentUser()}`;

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
        <Route
            exact
            path="/"
            render={() => {
                return CurrentUser.getCurrentUser() ?
                    <Redirect to='/'/> :  <Redirect to='/signin'/>
            }}
        />

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
                {CurrentUser.revokeCurrentUser()}
            </div>
        }
    </div>
}

export default UserProfile;