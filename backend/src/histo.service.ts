/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   histo.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/09/30 13:15:25 by mhugueno          #+#    #+#             */
/*   Updated: 2023/10/09 10:30:05 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historique } from './entity';

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectRepository(Historique)
    private historiqueRepository: Repository<Historique>,
  ) {}

  findAll(): Promise<Historique[]>
  {
    return (this.historiqueRepository.find());
  }

  findOne(id: number): Promise<Historique>
  {
    return (this.historiqueRepository.findOne({ where: { id: id } }));
  }

  async updateHistoriqueByIndexAndUsername(index: number, login: string, updatedData: Partial<Historique>): Promise<void>
  {
    await (this.historiqueRepository.update({ index: index, login: login }, updatedData));
  }

  async remove(id: number): Promise<void>
  {
    await (this.historiqueRepository.delete(id));
  }

  async create(data: Partial<Historique>, index: number): Promise<Historique>
  {
    const historique = this.historiqueRepository.create(data);
    historique.index = index;
    await this.historiqueRepository.save(historique);
    return (historique);
  }
}

