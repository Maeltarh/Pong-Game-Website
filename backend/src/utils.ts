/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/31 18:28:16 by mhugueno          #+#    #+#             */
/*   Updated: 2023/09/18 11:06:21 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

