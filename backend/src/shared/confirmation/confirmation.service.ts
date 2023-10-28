// confirmation.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';
import { UserService } from 'src/user/user.service';
import { throwError } from 'rxjs';

@Injectable()
export class ConfirmationService {
  constructor(private readonly _userService: UserService) {}

  async verifyToken(token: string): Promise<string | null> {
    try {
      const decodedToken = jwt.verify(token, jwtConstants.secret);

      const userId = decodedToken['userId'];

      console.log("'userId' du token :", userId);

      return userId;
    } catch (error) {
      console.error('Erreur lors de la vérification du token :', error);
    }
  }

  async confirmUserEmail(userId: string) {
    try {
      await this._userService.confirmUserEmail(userId);
    } catch (error) {
      console.error("Erreur lors de la confirmation de l'e-mail :", error);
      throwError(
        () => new NotFoundException(`Lien de Confirmation Expiré ou Invalide`),
      );
    }
  }
}
