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
    const PUT_VALIDATE_PATH = 'http://localhost:3001/user/validate';

    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const ERRORS = 'ERRORS';

    const handleSubmit = () => {
        console.log('checking for existing user');
        console.log({ email, password });
        axios.put(PUT_VALIDATE_PATH, { email, password })
                .then((res) => {
                    console.log('signing in user')
                    console.log(res);
                    localStorage.setItem('res', res.status);
                    if (res && res.status === 201) {
                       CurrentUser.updateCurrentUser(res.data.userId);
                       sessionStorage.removeItem(ERRORS);
                    } else {
                        console.log('an error occured, status: ', res.status);
                        sessionStorage.setItem(ERRORS, "Email or password was incorrect");
                    }
                })
                .catch((err) => {
                    if (err.includes('400')) {
                        sessionStorage.setItem(ERRORS, 'Email or password is missing');
                    } else if (err.includes('403')) {
                        sessionStorage.setItem(ERRORS, 'Email or password is incorrect');
                    } else {
                        sessionStorage.setItem(ERRORS, "Sorry, we couldn't sign you in: ", err);
                    }
                });
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
            path="/signin"
            render={() => {
                return CurrentUser.getCurrentUser() ?
                    <Redirect to='/'/> :  <Redirect to='/signin'/>
            }}
        />

        <Card>
            <CardContent>
                <form className='sign-up-form-wrapper'>
                    <h3>Sign In</h3>
                    <TextField label="Email" variant="outlined" type='email' value={email} onChange={handleEmailChange} required/>
                    <TextField label="Password" variant="outlined" value={password} type='password' onChange={handlePasswordChange} required/>
                    <Button type='submit' className='sign-up-form-submit' onClick={handleSubmit}>Submit</Button>
                </form>
                <AuthError error={sessionStorage.getItem(ERRORS)}/>
            </CardContent>
        </Card>
    </>
}

export default SignIn;