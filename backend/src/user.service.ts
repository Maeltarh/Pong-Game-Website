/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: gsaile <gsaile@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/09/30 10:27:04 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/21 21:36:16 by gsaile           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]>
  {
    return (this.userRepository.find());
  }

  findOne(username: string): Promise<User>
  {
    return (this.userRepository.findOne({ where: { username: username } }));
  }

  findOneByLogin(login: string): Promise<User>
  {
    return (this.userRepository.findOne({ where: { login: login } }));
  }

  async addFriend(username: string, friend: string): Promise<User>
  {
    const user = await this.userRepository.findOne({ where: { username: username } });
    if (!user)
    {
      throw new Error('Utilisateur non trouvé');
    }
    if (!user.friends)
    {
      user.friends = [];
    }
    if (!user.friends.includes(friend))
    {
      user.friends.push(friend);
    }
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(login: string, updatedData: Partial<User>): Promise<void> {
    await this.userRepository.update({ login: login }, updatedData);
}

  async remove(id: string): Promise<void>
  {
    await (this.userRepository.delete(id));
  }

  async create(data: Partial<User>): Promise<User>
  {
    const user = this.userRepository.create(data);
    await (this.userRepository.save(user));
    return (user);
  }
}
