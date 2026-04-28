import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET_TOKEN'),
        signOptions: { expiresIn: '15m' },
      }),
    }),

    ClientsModule.register([
      {
        name: 'FLEET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], 
          queue: 'fleet_queue',
          queueOptions: {
            durable: true
          },
        },
      },

      {
        name: 'SHIPMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], 
          queue: 'shipment_queue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),



    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'sachinthakeshan345@gmail.com',
          pass: 'xlve qnyb nbis czlk',  
        },
      },
      defaults: {
        from: '"Smart Cargo Admin" <no-reply@smartcargo.com>',
      },
    }),
  ],


  controllers: [
    AuthController,
    UsersController
  ],

  providers: [
    AuthService,
    UsersService, 
    UserRepository
  ],

  exports: [
    UsersService,
    AuthService
  ],
})


export class UsersModule {}