const { User } = require('../../../models/user');
const auth = require('../../../middlewares/auth');
const mongoose = require('mongoose');

describe('auth middleware' , () =>{
    it('should populate req.user with the payload f a valid JWT' , () =>{
        const user = { _id: mongoose.Types.ObjectId().toHexString() , isAdmin: true  };
        const token = User(user).generateAuthToken();

        const req = {
            header: jest.fn().mockReturnValue(token)
        };

        const res = {};
        const next = jest.fn();

        auth(req , res , next);

        expect(req.user).toMatchObject(user);
    });
});