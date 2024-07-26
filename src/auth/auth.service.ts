import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocumenet } from './model/users';
import { CreateUserDto } from './dto/createuser.dto';
import * as nodemailer from 'nodemailer';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UsersDocumenet>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const name = await this.userModel.findOne({ username: username }).exec();
    const email = await this.userModel.findOne({ email: username }).exec();
    const user = name || email;
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "we didn't find this user",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { ...result } = user;
      return { ...result };
    }
    return null;
  }

  async login(user: any) {
    if (user) {
      const payload = {
        username: user.username,
        roles: user.roles,
        id: user._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async register(createUserDto: CreateUserDto) {
    const username = await this.userModel.findOne({
      username: createUserDto.username,
    });
    const email = await this.userModel.findOne({
      username: createUserDto.email,
    });
    if (username || email) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user already exist with same username or email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 12;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const createdUser = new this.userModel({
        username: createUserDto.username,
        roles: createUserDto.roles,
        email: createUserDto.email,
        password: hashedPassword,
        telephone: createUserDto.telephone,
        city: createUserDto.city,
        address: createUserDto.address,
      });
      await createdUser.save();
      const tokenPayload = {
        username: createdUser.username,
        roles: createdUser.roles,
        email: createdUser.email,
        id: createdUser._id,
      };
      return {
        access_token: this.jwtService.sign(tokenPayload),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'some thing went wrong please try again later',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUserByUser(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedUser;
  }

  async deleteUserByAdmin(id: string): Promise<User> {
    const user = await this.getUserById(id);
    await this.userModel.findByIdAndDelete(id).exec();
    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Generate reset token
    const resetToken = this.jwtService.sign({ email }, { expiresIn: '1h' });
    // Send reset password email
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '4c8e0428acf957',
        pass: '2bc167bb28f502',
      },
    });
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `Please use the following link to reset your password: ${resetToken}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const decodedToken = this.jwtService.verify(token);
    if (!decodedToken) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const email = decodedToken.email;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const saltOrRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
    user.password = hashedPassword;
    await user.save();
  }
  async registerNormalUser(createUserDto: CreateUserDto) {
    const username = await this.userModel.findOne({
      username: createUserDto.username,
    });
    const email = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (username || email) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user already exist with same username or email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 12;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const createdUser = new this.userModel({
        username: createUserDto.username,
        roles: 'user',
        email: createUserDto.email,
        password: hashedPassword,
        telephone: createUserDto.telephone,
        city: createUserDto.city,
        address: createUserDto.address,
      });
      await createdUser.save();
      const tokenPayload = {
        username: createdUser.username,
        roles: createdUser.roles,
        email: createdUser.email,
        id: createdUser._id,
      };
      return {
        access_token: this.jwtService.sign(tokenPayload),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'some thing went wrong please try again later',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ id }).exec();
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
    user.password = hashedPassword;
    await user.save();
    return user;
  }
}
