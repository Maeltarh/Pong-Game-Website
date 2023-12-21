/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/04 20:56:49 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/06 18:29:37 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { AppChatController, AppController } from './app.controller';
import { AppPosController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './game.gateway';
import { ConfigModule } from '@nestjs/config';
import { Api42Service } from './api42.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historique, User } from './entity';
import { UserService } from './user.service';
import { HistoriqueService } from './histo.service';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'mhugueno',
    password: 'test',
    database: 'transBase',
    entities: [__dirname + '/**/*entity{.ts,.js}'],
    synchronize: true,
  }), TypeOrmModule.forFeature([User, Historique])],
  controllers: [AppController, AppPosController, AppChatController],
  providers: [AppService, EventsGateway, Api42Service, UserService, HistoriqueService, MailService], 
  exports: [UserService, HistoriqueService],
})
export class AppModule {}
