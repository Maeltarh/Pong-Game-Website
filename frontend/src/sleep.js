/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sleep.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/03 02:04:11 by mhugueno          #+#    #+#             */
/*   Updated: 2023/10/08 13:11:36 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const reduceImageSize = (file, callback) => {
	const img = new Image();
	img.src = URL.createObjectURL(file);
	img.onload = () => {
	  const canvas = document.createElement('canvas');
	  const ctx = canvas.getContext('2d');
	  // Set your desired max width/height
	  const MAX_WIDTH = 400;
	  const MAX_HEIGHT = 400;
	  let width = img.width;
	  let height = img.height;
  
	  if (width > height) {
		if (width > MAX_WIDTH) {
		  height *= MAX_WIDTH / width;
		  width = MAX_WIDTH;
		}
	  } else {
		if (height > MAX_HEIGHT) {
		  width *= MAX_HEIGHT / height;
		  height = MAX_HEIGHT;
		}
	  }
	  canvas.width = width;
	  canvas.height = height;
	  ctx.drawImage(img, 0, 0, width, height);
  
	  canvas.toBlob((blob) => callback(blob), 'image/jpeg', 0.7); // Reducing quality to 70%
	};
  };

export default reduceImageSize;
