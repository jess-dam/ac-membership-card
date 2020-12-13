import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './UserCard.scss';

import axios from 'axios';


function UserCard (user) {
    const GET_CARD_PATH = `http://localhost:3001/user/${user.user._id}/card`;
    const POST_CARD_PATH  = GET_CARD_PATH + '/register';
    const PUT_CARD_POINTS_PATH = GET_CARD_PATH + '/points';
    const [ card, setCard ] = React.useState();
    const [ pointsToAdd, setPointsToAdd ] = React.useState('');

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

    React.useEffect(() => {
        getCard();
    },[]);

    const handlePointsChange = (event) => {
        setPointsToAdd(event.target.value);
    }

    const addPoints = () => {
        axios.put(PUT_CARD_POINTS_PATH, { cardId: card._id, pointsToAdd: parseInt(pointsToAdd) })
        .then(() => getCard())
        .then(() => setPointsToAdd(''))
        .catch(err => console.log('Could not update points: ', err));
    }

    return <>
        <Card className='card'>
            { card && user && user.user ?
                <>
                    <CardContent className='card-details'>
                        { !user.user.isViewingAsAdmin ?
                            <>
                                <h4>Leaf Loyalty Card</h4>
                                <h5>{user.user.name}</h5>
                            </>
                            : <></>
                        }
                        <h5><span>{card.points}</span> points</h5>
                    </CardContent>
                    { user.user.isViewingAsAdmin ?
                            <div className='card-points-input'>
                                <TextField label='points to add' value={pointsToAdd} onChange={handlePointsChange}/>
                                <Button onClick={addPoints}>Add Points</Button>
                            </div>
                        : <></>
                    }
                </>
            :
                <>
                    <CardContent className='card-no-details'>
                    <h5>{user.user.isViewingAsAdmin ? (user.user.name + ` doesn't`) : `You don't`} have a card at the moment, would you like to register one?</h5>
                        <Button onClick={registerCard}>Make a card please</Button>
                    </CardContent>
                </>
            }
        </Card>
    </>
}

export default UserCard;