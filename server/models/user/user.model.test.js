const mongoose = require('mongoose');
const UserModel = require('./user.model');

const DEFAULT_USER = {
    name: 'Tim',
    email: 'timnook@bellmail.com',
    password: 'supersecretpassword'
};

describe('User', () => {
    beforeAll( async () => {
        const url = `mongodb://127.0.0.1/ac-membership-test-models`
        await mongoose.connect(url, { useNewUrlParser: true });
    });
    describe('can do basic db operations', () => {
        beforeEach( async (done) => {
            await UserModel.deleteMany({});
            done();
        });

        test('can create a user', async (done) => {
            const user = await UserModel.create(DEFAULT_USER);
            const allUsers = await UserModel.find({});

            done();

            expect(allUsers).toHaveLength(1);
            expect(user.createdAt).toBeDefined();
        });

        test('can create a user with admin access', async (done) => {
            const user = await UserModel.create({...DEFAULT_USER, access: 'ADMIN'});
            const allUsers = await UserModel.find({});

            done();

            expect(allUsers).toHaveLength(1);
            expect(user.access).toBe('ADMIN');
        });
    });
});