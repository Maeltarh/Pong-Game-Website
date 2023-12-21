/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   textButton.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/09 11:50:09 by mhugueno          #+#    #+#             */
/*   Updated: 2023/10/09 12:05:35 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import './textButton.css';

function TextButton() {
    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        alert(`Vous avez saisi: ${text}`);
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
				className="text-input"
                placeholder="Tapez quelque chose..."
            />
            <button onClick={handleClick}>Envoyer</button>
        </div>
    );
}

export default TextButton;
