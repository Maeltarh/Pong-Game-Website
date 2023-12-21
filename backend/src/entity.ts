/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   entity.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/09/28 12:34:36 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/05 13:00:53 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  username: string;

  @Column()
  padColor: string;

  @Column()
  balleColor: string;

  @Column()
  email: string;

  @Column()
  doubleFap: boolean;

  @Column()
  image: string;

  @Column()
  lvl: number;

  @Column()
  progressBar: number;

  @Column()
  winRatioW: number;

  @Column()
  winRatioL: number;

  @Column()
  PP: number;

  @Column()
  gameCount: number;

  @Column({ type: "json", nullable: true })
  friends: string[];

  @Column({ type: "json", nullable: true })
  blocked: string[];
}

@Entity()
export class Historique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  username: string;

  @Column()
  index: number;

  @Column()
  scoreToi: number;

  @Column()
  scoreLui: number;

  @Column()
  myPP: number;

  @Column()
  oppenent: string;

  @Column()
  oppenentImage: string;

  @Column()
  hisPP: number;

  @Column()
  gain: number;

  @Column()
  result: string;
}

