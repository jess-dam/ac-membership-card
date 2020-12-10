import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Redirect, Route } from 'react-router-dom';

import axios from 'axios';
import CurrentUser from './CurrentUser';
import AuthError from './AuthError';

function SignIn() {
    const PUT_SIGN_IN_PATH = 'http://localhost:3001/user/signin';

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ error, setError ] = React.useState('');

    const existingUser = () => {
        setError('User does not exist');
        return false;
    }

    const handleSubmit = () => {
        console.log({ email, password });

        if (existingUser()) {
            axios.post(PUT_SIGN_IN_PATH, { email, password })
                .then((res) => {
                    console.log('signing in user')
                    res && res.status === 200 ?
                        CurrentUser.updateCurrentUser(res.data.userId)
                        : console.log('an error occured, status: ', res.status);
                })
                .catch((err) => {
                    console.log('sign in failed ', err);
                });
        } else {

        }

    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return <>
        <Route
            exact
            path="/signup"
            render={() => {
                return CurrentUser.getCurrentUser() ?
                    <Redirect to='/user'/> :  <Redirect to='/signin'/>
            }}
        />

        <Card>
            <CardContent>
                <form className='sign-up-form-wrapper' onSubmit={handleSubmit}>
                    <h3>Sign In</h3>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' value={email} onChange={handleEmailChange} required/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange} helperText="Make sure this is a good password" required/>
                    <Button type='submit'>Submit</Button>
                </form>
                <AuthError error={error}/>
            </CardContent>
        </Card>
    </>
}

export default SignIn;