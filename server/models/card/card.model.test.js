const mongoose = require('mongoose');
const CardModel = require('./card.model');
const UserModel = require('../user/user.model');

describe('Card', () => {
    beforeAll(async (done) => {
        const url = `mongodb://127.0.0.1/ac-membership-test-models`;
        await mongoose.connect(url, { useNewUrlParser: true });
        done();
    });

    describe('can do basic db operations', () => {
        beforeEach(async (done) => {
            await CardModel.deleteMany({});
            await UserModel.deleteMany({});
            done();
        });

        test('can create a card', async (done) => {
            // When
            await CardModel.create({});

            // Then ...the card is persisted
            const allCards = await CardModel.find({});
            expect(allCards).toHaveLength(1);

            done();
        });

        test('can create a card for a specfic user', async (done) => {
            // Given ... a valid user
            const user = await UserModel.create({
                name: 'isabelle',
                email: 'isabelle@leafmail.com',
                password: 'isabelle<3'
            })

            // When
            const card = await CardModel.create({});
            const updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, { cardId: card._id }, { new: true });


            // Then ...we can find the card using the user reference
            expect(updatedUser.cardId).toEqual(card._id);
            expect(await CardModel.findById(updatedUser.cardId)).toBeDefined();

            done();
        });
    });


});