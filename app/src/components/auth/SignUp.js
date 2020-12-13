import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Redirect, Route } from 'react-router-dom';

import axios from 'axios';
import CurrentUser from './CurrentUser';

function SignUp() {
    const POST_SIGN_UP_PATH = 'http://localhost:3001/user/signup';

    const [ name, setName ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    const handleSubmit = () => {
        console.log({ name, email, password });

        axios.post(POST_SIGN_UP_PATH, { name, email, password })
            .then((res) => {
                console.log('signing up user')
                CurrentUser.updateCurrentUser(res.data.userId);
            })
            .catch((err) => {
                console.log('registration failed ', err);
            });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
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
                    <Redirect to='/'/> :  <Redirect to='/signup'/>
            }}
        />

        <Card>
            <CardContent>
                <form className='sign-up-form-wrapper' onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange}/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' value={email} onChange={handleEmailChange} required/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={password} onChange={handlePasswordChange} helperText="Make sure this is a good password" required/>
                    <Button type='submit'>Submit</Button>
                </form>
                <span>

                </span>
            </CardContent>
        </Card>
    </>
}

export default SignUp;