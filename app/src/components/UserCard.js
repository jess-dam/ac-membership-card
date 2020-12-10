import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './UserCard.scss';

import axios from 'axios';


function UserCard (user) {
    const GET_CARD_PATH = `http://localhost:3001/user/${user.user._id}/card`;
    const POST_CARD_PATH  = GET_CARD_PATH + '/register';
    const [ card, setCard ] = React.useState();

    const getCard = () => {
        axios.get(GET_CARD_PATH)
        .then((res) => {
            setCard(res.data.card);
        });
    }

    const registerCard = () => {
        console.log('registering card');
        axios.post(POST_CARD_PATH)
        .then(getCard())
        .catch(err => console.log('failed to register card ' + err));
    }

    return <>
        <Card className='card'>
            {getCard()}
            { card && user && user.user ?
                <>
                    <CardContent className='card-details'>
                        <h4>Leaf Loyalty Card</h4>
                        <h5>{user.user.name}</h5>
                        <h5><span>{card.points}</span> points</h5>
                    </CardContent>
                </>
            :
                <>
                    <CardContent className='card-no-details'>
                        <h5>You don't have a card at the moment, would you like to register one?</h5>
                        <Button onClick={registerCard}>Make me a card please</Button>
                    </CardContent>
                </>
    }
        </Card>
    </>
}

export default UserCard;