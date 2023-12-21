/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   api42.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/09/30 10:28:06 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/06 15:57:12 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as querystring from 'querystring';
import { serverIP, CLIENT_ID, CLIENT_SECRET } from './main';

@Injectable()
export class Api42Service {
	private readonly BASE_URL = 'https://api.intra.42.fr';
  
	constructor(private httpService: HttpService) {
	  this.httpService = new HttpService();
	}
  
	async getAccessTokenFromCode(code: string): Promise<string> {
		const REDIRECT_URI = 'http://'+ serverIP + ':3001/auth/callback';
	
		try {
			// Convertir les données en format x-www-form-urlencoded
			const data = querystring.stringify({
				grant_type: 'authorization_code',
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code: code,
				redirect_uri: REDIRECT_URI,  // Ajoutez cette ligne
			});
	
			// Assurez-vous d'envoyer le bon en-tête Content-Type
			const response = await firstValueFrom(
				this.httpService.post(`${this.BASE_URL}/oauth/token`, data, {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
			);

			return response.data.access_token;
		} catch (error) {
			console.error("Erreur lors de la demande d'obtention du token :", error.response ? error.response.data : error.message);
			throw new Error("Erreur lors de la demande d'obtention du token");
		}
	}
	
	async getUserInfo(token: string) {
		const headers = {
			'Authorization': `Bearer ${token}`
		};
  
		const response = await firstValueFrom(
		  this.httpService.get(`${this.BASE_URL}/v2/me`, { headers })
		);
  
		return response.data;
	}
  }
