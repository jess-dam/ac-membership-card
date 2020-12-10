import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useLocation, Redirect, Route } from 'react-router-dom';

import axios from 'axios';

function SignUp() {
    const POST_SIGN_UP_PATH = 'http://localhost:3001/user/signup';
    const [ name, setName ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    // const location = useLocation();

    const redirectUser = () => {
        console.log('redirecting to profile page...');
        return <Route render={() => {
            <Redirect
                to={{
                  pathname: "/",
                  state: { from: '/signup' }
                }}
            />
        }}/>
    }

    const handleSubmit = () => {
        console.log({ name, email, password });

        axios.post(POST_SIGN_UP_PATH, { name, email, password })
            .then((res) => {
                res && res.status == 201 ?
                    redirectUser()
                    : console.log('an error occured, status: ', res.status);
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
        <Card>
            <CardContent>
                <form className='sign-up-form-wrapper' onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange}/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' value={email} onChange={handleEmailChange} required/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange} helperText="Make sure this is a good password" required/>
                    <Button onClick={handleSubmit}>Submit</Button>
                </form>
                <span>

                </span>
            </CardContent>
        </Card>
    </>
}

export default SignUp;