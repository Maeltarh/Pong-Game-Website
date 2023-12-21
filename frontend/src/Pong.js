/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Pong.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mhugueno <mhugueno@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/07/31 22:11:56 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/05 19:36:37 by mhugueno         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { clientId } from "./App";
import { socket } from "./App";
import { serverIP } from "./App";
import { Joueur } from "./App";
import { balleColor, padColor } from "./App";

let padColorVs = "rgba(195, 171, 195, 0.989)";

const Pong = () => {
  const [positionBarVer, setpositionBarVer] = useState(((window.innerHeight / 2.5) / window.innerHeight) * 100); // le saint calcule
  let positionBarHor = (((window.innerWidth / 180) / window.innerWidth) * 100);
  const [positionVsBarVer, setpositionVsBarVer] = useState(((window.innerHeight / 2.5) / window.innerHeight) * 100);
  let positionVsBarHor = (((window.innerWidth / 1.014) / window.innerWidth) * 100);
  const [positionVerOfBalle, setPositionVerOfBalle] = useState(((window.innerHeight / 2.09) / window.innerHeight) * 100);
  const [positionHorOfBalle, setPositionHorOfBalle] = useState(((window.innerWidth / 2.09) / window.innerWidth) * 100);

  const handleKeyDown = useCallback((event) => {
    if (document.activeElement === document.getElementById('chatInput')) return;
    let newPosition = positionBarVer;
    switch (event.key) {
      case "w":
        newPosition = Math.max(positionBarVer - 5, 0);
        setpositionBarVer((prevPosition) => Math.max(prevPosition - 5, 0));
        break;
      case "s":
        newPosition = Math.min(positionBarVer + 5, (((window.innerHeight * 0.826) / window.innerHeight) * 100));
        setpositionBarVer((prevPosition) => Math.min(prevPosition + 5, (((window.innerHeight * 0.826) / window.innerHeight) * 100)));
        break;
      case "W":
        newPosition = Math.max(positionBarVer - 5, 0);
        setpositionBarVer((prevPosition) => Math.max(prevPosition - 5, 0));
        break;
      case "S":
        newPosition = Math.min(positionBarVer + 5, (((window.innerHeight * 0.826) / window.innerHeight) * 100));
        setpositionBarVer((prevPosition) => Math.min(prevPosition + 5, (((window.innerHeight * 0.826) / window.innerHeight) * 100)));
        break;
      case "ArrowUp":
        newPosition = Math.max(positionBarVer - 5, 0);
        setpositionBarVer((prevPosition) => Math.max(prevPosition - 5, 0));
        break;
      case "ArrowDown":
        newPosition = Math.min(positionBarVer + 5, (((window.innerHeight * 0.826) / window.innerHeight) * 100));
        setpositionBarVer((prevPosition) => Math.min(prevPosition + 5, (((window.innerHeight * 0.826) / window.innerHeight) * 100)));
        break;
      default:
        return;
    }
    axios.post('http://' + serverIP + ':3001/game/pos', { clientId, newPosition, Joueur })
    .then((response) => {
    })
    .catch((error) => {
      console.error('[Error]: Pos.', error);
    });
  }, [positionBarVer]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const timerId = setInterval(() => {
      let winHeight = window.innerHeight;
      let winWidth = window.innerWidth;
      axios.post('http://' + serverIP + ':3001/game/responsive', { clientId, winHeight, winWidth })
      .then((response) => {
      })
      .catch((error) => {
        console.error('[Error]: Responsive.', error);
      });
    }, 100);
    return () => {
      source.cancel("Error");
      clearInterval(timerId);
    }
  }, []);


  useEffect(() => {
    const handleBarVS = (data) => {
      setpositionVsBarVer(data);
    };
    const handleRestart = (posBar, posBarVs) => {
      setpositionBarVer(posBar);
      setpositionVsBarVer(posBarVs);
    };
    const handleBalle = (posBalleHor, posBalleVer, value) => {
      padColorVs = value;
      setPositionHorOfBalle(posBalleHor);
      setPositionVerOfBalle(posBalleVer);
    };
    const end = () => {
      socket.off('barVS', handleBarVS);
      socket.off('restart', handleRestart);
      socket.off('balle', handleBalle);
      socket.off('end', end);
    };

    socket.on('barVS', handleBarVS);
    socket.on('restart', handleRestart);
    socket.on('balle', handleBalle);
    socket.on('end', end);
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const timerId = setInterval(() => {
        axios.post('http://' + serverIP + ':3001/game/balle', { clientId, padColor })
        .then((response) => {
        })
        .catch((error) => {
          console.error('[Error]: Balle.', error);
        });
    }, 10);

    return () => {
      source.cancel("Error");
      clearInterval(timerId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (<>
            <div className="bar" style={{ top: `${positionBarVer}%`, left: `${positionBarHor}%`, backgroundColor: `${padColor}`}} />
            <div className="vsBar" style={{ top: `${positionVsBarVer}%`, left: `${positionVsBarHor}%`, backgroundColor: `${padColorVs}`}} />
            <div className="balle" style={{ left: `${positionHorOfBalle}%`, top:  `${positionVerOfBalle}%`, backgroundColor: `${balleColor}`}} />
          </>);
};

export default Pong;
