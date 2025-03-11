import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '@schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>, private jwtService: JwtService) {}

    async signIn(email: string, password: string){
        const user = await this.UserModel.findOne({email});

        if(user?.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, id: user._id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
        // const user = await this.UserModel.findOne(username);

        // if(user?.password !== password) {
        //     throw new UnauthorizedException();
        // }

        // const payload = { username: user.username, sub: user.userId };
        // return {
        //     access_token: await this.UserModel.signAsync(payload),
        // };
    }
}
