/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   toggle.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/09 10:52:18 by mhugueno          #+#    #+#             */
/*   Updated: 2023/10/09 10:53:13 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import './toggle.css';

const ToggleSwitch = ({ defaultChecked, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange && onChange(newCheckedState);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
}

const findImage = (image) =>
{
  const imageArray = ["/avatar2.jpg", "/avatar3.jpg", "/avatar4.jpg", "/avatar5.jpg", "/avatar6.jpg", "/avatar7.jpg", "/avatar8.jpg"];
  let i = 0;
  for (i = 0; i < imageArray.length; i++)
  {
    if (image === imageArray[i])
      break;
  }
  if (i < imageArray.length)
    return (i + 2);
  else if (image !== "/defaultAvt.jpg")
    return (1);
  else
    return (null);
}

const findPadColor = (padColor) =>
{
  const padColorArray = ["rgb(18, 52, 189)", "rgb(191, 7, 7)", "rgb(211, 103, 35)", "rgb(16, 214, 188)", "green"];
  let i = 0;
  for (i = 0; i < padColorArray.length; i++)
  {
    if (padColor === padColorArray[i])
      break;
  }
  if (i < padColorArray.length)
    return (i + 1);
  else
    return (null);
}

const findBalleColor = (balleColor) =>
{
  const balleColorArray = ["rgb(18, 52, 189)", "rgb(191, 7, 7)", "rgb(211, 103, 35)", "rgb(16, 214, 188)", "green"];
  let i = 0;
  for (i = 0; i < balleColorArray.length; i++)
  {
    if (balleColor === balleColorArray[i])
      break;
  }
  if (i < balleColorArray.length)
    return (i + 1);
  else
    return (null);
}

export { ToggleSwitch, findImage, findPadColor, findBalleColor };
