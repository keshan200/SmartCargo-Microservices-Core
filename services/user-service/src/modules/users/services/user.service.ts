import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('FLEET_SERVICE') private client: ClientProxy,
    @Inject('SHIPMENT_SERVICE') private shipmentClient: ClientProxy,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData: any) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
        throw new BadRequestException('Email already exists!');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUsertoSave = {
        ...userData,
        email: userData.email.toLowerCase(),
        password_hash: hashedPassword,
    };
    delete newUsertoSave.password; 
    
    const newUser = await this.userRepository.create(newUsertoSave);


    const payLoad = {
        userId: newUser._id.toString(),
        role: newUser.role,
        email: newUser.email,
    };

 
    if (['DRIVER', 'DISPATCHER', 'ADMIN'].includes(newUser.role)) {
        this.client.emit('user_created', payLoad);
        console.log('Staff created event emitted:', payLoad);
    }

  
    if (newUser.role === 'CUSTOMER') {
        this.shipmentClient.emit('customer_registered', payLoad); 
        console.log('Customer registered event emitted:', payLoad);
    }

    const result = newUser.toObject();
    delete result.password_hash;
    return result;
}


  async findByEmailForAuth(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async sendEmployeeInvite(email: string, userId: string) {
    const token = this.jwtService.sign({ sub: userId }, { expiresIn: '48h' });
    const inviteLink = `http://localhost:3000/setup-profile?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Smart Cargo - Complete Your Profile',
      html: `
        <h3>Welcome to the Team!</h3>
        <p>Admin has registered you as an employee. Please click the link below to set up your account and password:</p>
        <a href="${inviteLink}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Set Up My Account</a>
        <p>This link will expire in 48 hours.</p>
      `,
    });

    return { message: 'Invitation email sent successfully' };
  }
}
