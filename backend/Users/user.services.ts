const { UserSchema, UserInterface } = require('./user.schema')
require('dotenv').config();

export class UserServices {

    async findUserByEmail (email: string) : Promise<typeof UserInterface> {
        return await UserSchema.findOne({ email: email });
    }

    async findUserById (id: number) : Promise<typeof UserInterface> {
        return await UserSchema.findOne({ _id: id });
    }
    
    async createOneUser (data: typeof UserInterface) : Promise<typeof UserInterface> {
        return await UserSchema.create(data)
    }

    async updateUser(id: number, data: typeof UserInterface) : Promise<typeof UserInterface> {
        return await UserSchema.findByIdAndUpdate(id, data);
    }
    
}