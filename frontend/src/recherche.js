/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   recherche.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/28 16:37:03 by mhugueno          #+#    #+#             */
/*   Updated: 2023/08/28 17:19:54 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react';

function RechercheAnimation() {
  const [points, setPoints] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        switch (prev) {
          case '.':
            return '..';
          case '..':
            return '...';
          case '...':
            return '.';
          default:
            return '.';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (<>Matching< br />{points}</>);
}

export default RechercheAnimation;
