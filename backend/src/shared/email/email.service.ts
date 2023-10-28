// email.service.ts
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';
import * as Config from 'config';
@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ismael.dicki18@ethereal.email',
        pass: '5gphWRrjNcU8ZzGTyp',
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  }

  async sendConfirmationEmail(to: string, id: mongoose.Types.ObjectId) {
    //var host = Config.get<string>('server.host');
    //var port = Config.get<string>('server.port');
    //const confirmationLink = 'http://' + host + ':' + port + '/auth?token='
    // + this.generateVerificationToken(id);
    const confirmationLink = 'http://localhost:4200/mailConfirm/' + this.generateVerificationToken(id);


    const mailOptions = {
      from: 'ismael.dicki18@ethereal.email',
      to: to,
      subject: 'Confirmation de l\'e-mail',
      text: 'Veuillez confirmer votre adresse e-mail.',
      html: `<p>Veuillez confirmer votre adresse e-mail en cliquant sur ce lien : <a href="${confirmationLink}">Confirmer l'e-mail</a></p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email options :', mailOptions);
      console.log('E-mail envoyé :', info.response);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
  }
  generateVerificationToken(userId: mongoose.Types.ObjectId): string {
    const userIdString = userId.toString();
    const payload = { userId: userIdString };
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, jwtConstants.secret, options);
  }
}
