/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/04 22:22:19 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/06 17:17:19 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState, useEffect } from 'react';
import { socket } from './App';
import { defaultImage } from './App';

function LoginForm( {onLogin} ) {
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        socket.on('loginResponse', (data) => {
            onLogin(data);
        });
        socket.on('connect_error', (error) => {
            console.error('Erreur lors de la connexion', error);
        });
        return () => {
        };
    }, [onLogin]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const bool = false;
        if (nickname.length > 10)
        {
          alert("Pseudo trop long ! Reste calme s'il te plait.");
          return;
        }
        let username = nickname + "guest";
        let choixPseudo = username;
        socket.emit('login', { username, choixPseudo, defaultImage, bool });
    };

    return (
        <form className='LoginForm' onSubmit={handleSubmit}>
            <div className='Username'>
			    Username :
			</div>
			<input className='username-button'
				type="text"
				value={nickname}
				onChange={(event) => setNickname(event.target.value)}
			/>
            <input className='loginPLogin bouton-anime' type="submit" value="Login" />
        </form>
    );
}

export default LoginForm;
