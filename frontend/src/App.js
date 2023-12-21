/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: gsaile <gsaile@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/07/31 21:41:37 by mhugueno          #+#    #+#             */
/*   Updated: 2023/12/21 21:51:43 by gsaile           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import LoginForm from './login';
import Pong from './Pong';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { ProgressBar, GameCountBar } from './ProgressBar';
import io from 'socket.io-client';
import axios from 'axios';
import RechercheAnimation from './recherche';
import { User, Leaderboard } from './user.ts';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import reduceImageSize from './sleep';
import { ToggleSwitch, findBalleColor, findImage, findPadColor } from './toggle';
import Message from './Message';

export const serverIP = process.env.REACT_APP_SERVER_IP;
export const socket = io('http://' + serverIP + ':3002');
export let clientId;
export let Joueur;
export let gagantPerdant = "none";
let winHeight = window.innerHeight;
let winWidth = window.innerWidth;
let userData;
let friendData;
let pseudoToi;
let pseudoLui;
let PPToi;
let PPLui;
let gain;
let result;
let opImage;
export let suptefurge = 0;
let lData = new Leaderboard();
let codeError = 0;
let k = 0;
let pseudoDefi;
let username;
let bool;
export let defaultImage = "/defaultAvt.jpg";
lData = lData.getLadderData();
export let balleColor = "195, 171, 195, 0.989";
export let padColor = "195, 171, 195, 0.989";

function App()
{
  const [muteText, setMuteText] = useState("▶");
  const [buttonText, setButtonText] = useState("Le jeu tryhard le plus chill de 42 !");
  const [buttonProfil, setButtonProfil] = useState("Login");
  const [showProfile, setShowProfileButtons] = useState(false);
  const [showHistorique, setShowHistoriqueButtons] = useState(false);
  const [showLeaderboard, setShowLeaderboardButtons] = useState(false);
  const [showControle, setShowControleButtons] = useState(false);
  const [showCredit, setShowCreditButtons] = useState(false);
  const [showJouer, setShowJouerButtons] = useState(false);
  const [showLogin, setShowLoginButtons] = useState(false);
  const [showHistoriqueProfile, setShowHistoriqueProfileButtons] = useState(false);
  const [showPersonnalisation, setShowPersonnalisationButtons] = useState(false);
  const [showOption, setShowOptionButtons] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  const [showGame, setShowGame] = useState(false);
  const [showLoginP, setShowLoginP] = useState(true);
  const [showLogin42, setShowLogin42] = useState(true);
  const [showIsLog, setShowIsLog] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPong, setShowPong] = useState(false);
  const [walkingPong, setWalkingPong] = useState(false);
  const [scoreJ1, setScoreJ1] = useState(0);
  const [scoreJ2, setScoreJ2] = useState(0);
  const [histo1, sethisto1] = useState(false);
  const [histo2, sethisto2] = useState(false);
  const [histo3, sethisto3] = useState(false);
  const [histo4, sethisto4] = useState(false);
  const [histo5, sethisto5] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [activePad, setActivePad] = useState(null);
  const [activeAvt, setActiveAvt] = useState(null);
  const [imageDL, setImageDL] = useState(null);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [showCodeVerif, setShowCodeVerif] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const [login, setLogin] = useState(null);
  const [image, setImage] = useState(null);
  const [loginCodeVerif, setLoginCodeVerif] = useState(null);
  const [imageCodeVerif, setImageCodeVerif] = useState(null);
  const [userCode, setUserCode] = useState(null);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [codeVerif, setCodeVerif] = useState('');
  const [defaultChecked, setDefaultChecked] = useState(false);

  const [isGuest, setIsGuest] = useState(false);
//  const [pseudoChange, setPseudoChange] = useState('');
  const [choixPseudo, setChoixPseudo] = useState('');
  const [showFriendProfile, setShowFriendProfile] = useState(false);
  const [pansement, setPansement] = useState(false);
  const [showDefi, setShowDefi] = useState(false);
  const [showNameChoice, setShowNameChoice] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showFriendList, setShowFriendList] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(-1);
  const [currentChannelType, setCurrentChannelType] = useState('channel');
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelPassword, setChannelPassword] = useState('');
  const [channelType, setChannelType] = useState('public');
  const [popoverUser, setPopoverUser] = useState('');

  const handleClick = (newText) =>
  {
    if (showIsLog === false && newText !== "Profile !" && newText !== "Le jeu tryhard le plus chill de 42 !")
    {
      alert("Mais enfin ? Connecte toi !");
      return;
    }
    window.history.pushState(null, "", window.location.pathname);
    gagantPerdant = 'none';
    setButtonText(newText);
    TotusFals();
    if (newText === "Profile !")
    {
      if (showIsLog === true)
      {
        setButtonText(newText);
        setShowProfileButtons(!showProfile);
      }
      else
      {
        setButtonText("Login !");
        setShowLoginButtons(!showLogin);
      }
      if (showProfile === true || showLogin === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Historique !")
    {
      setShowHistoriqueButtons(!showHistorique);
      if (userData.getHistoriqueIndex(0).getOppenent() !== "none")
      {
        sethisto1(true);
      }
      if (userData.getHistoriqueIndex(1).getOppenent() !== "none")
      {
        sethisto2(true);
      }
      if (userData.getHistoriqueIndex(2).getOppenent() !== "none")
      {
        sethisto3(true);
      }
      if (userData.getHistoriqueIndex(3).getOppenent() !== "none")
      {
        sethisto4(true);
      }
      if (userData.getHistoriqueIndex(4).getOppenent() !== "none")
      {
        sethisto5(true);
      }
      if (showHistorique === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Leaderboard !")
    {
      axios.post('http://' + serverIP + ':3001/game/ladder', {})
      .then((response) => {
        lData = response.data;
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la position', error);
      });
      if (showLeaderboard === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Contrôles !")
    {
      setShowControleButtons(!showControle);
      if (showControle === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Crédits !")
    {
      setShowCreditButtons(!showCredit);
      if (showCredit === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Jouer !")
    {
      if (walkingPong === false)
      {
        setShowGame(!showGame);
        setShowJouerButtons(!showJouer);
      }
      else
      {
        setShowPong(true);
        setButtonText(scoreJ1 + "  -  " + scoreJ2);
      }
      if (showJouer === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Login !")
    {
      if (showIsLog === true)
      {
        setShowLoginButtons(!showLogin);
      }
      else
      {
        setShowLoginButtons(!showLogin);
      }
      if (showLogin === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Personnalisations !")
    {
      setShowPersonnalisationButtons(!showPersonnalisation)
      if (showPersonnalisation === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
    if (newText === "Options !")
    {
      setShowOptionButtons(!showOption)
      if (showOption === true)
      {
        setButtonText("Le jeu tryhard le plus chill de 42 !");
      }
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setLogin(queryParams.get('login'));
    setImage(queryParams.get('image'));
    setUserCode(queryParams.get('userCode'));
    setLoginCodeVerif(queryParams.get('loginCodeVerif'));
    setImageCodeVerif(queryParams.get('imageCodeVerif'));
}, [location]);

useEffect(() => {
  if (userCode)
  {
    setShowLoginButtons(false);
    setShowCodeVerif(true);
  }
}, [userCode, loginCodeVerif, imageCodeVerif]);

  const handleChoixPseudo = () => {
    axios.post('http://' + serverIP + ':3001/game/isNameTaken', { choixPseudo })
      .then((response) => {
        if (response.data === true)
          socket.emit('login', { username, choixPseudo, defaultImage, bool });
        else
          alert("Pseudo déjà pris !");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion.", error);
      });
  }

useEffect(() => {
    if (login && image)
    {
      username = login;
      defaultImage = image;
      bool = true;
      axios.post('http://' + serverIP + ':3001/game/isFirstLog', { username })
      .then((response) => {
        if (response.data === "")
          setShowNameChoice(true);
        else
        {
          let choixPseudo = response.data;
          socket.emit('login', { username, choixPseudo, defaultImage, bool });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion.", error);
      });
    }
}, [login, image]);

  useEffect(() => {

    const handlePopState = (event) => {
        if ((showJouer === true) || (showPong === true) || (showProfile === true) || (showHistorique === true) || (showLeaderboard === true) || (showPersonnalisation === true) || (showControle === true) || (showCredit === true))
        {
          setButtonText("Le jeu tryhard le plus chill de 42 !");
          TotusFals();
        }
        else if (window.history.length > 1)
        {
          navigate(-1);
        }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showControle, showCredit, showHistorique, showJouer, showLeaderboard, showPersonnalisation, showProfile, showPong, buttonText, navigate]); 

  function addFriendToData(friend, userData)
  {
    axios.post('http://' + serverIP + ':3001/chat/friendImage', { friend })
    .then((response) => {
      let tmp = [friend, response.data[0], response.data[1]];
      userData.addFriend(tmp);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de la liste d'ami.", error);
    });
  }

  useEffect(() =>
  {
    socket.on('dejaco', () =>
    {
      if (suptefurge === 0)
      {
        alert("Mais enfin ? Tu es déjà connecté !");
        suptefurge = 1;
        window.location.reload();
      }
    });
    socket.on('creatUser', (user, userD) =>
    {
      TotusFals();
      if (suptefurge)
        return;
      setShowIsLog(true);
      userData = new User(user);
      userData.setLvl(userD.lvl);
      userData.setPP(userD.PP);
      userData.setProgressBar(userD.progressBar);
      userData.setImage(userD.image);
      userData.setWinRatio(userD.winRatio.w, userD.winRatio.l)
      userData.setGameCount(userD.gameCount);
      for (let i = 0; i < userD.friends.length; i++)
      {
        addFriendToData(userD.friends[i], userData);
      }
      for (let i = 0; i < 5; i++)
      {
        userData.setHistorique(i, userD.historiqueArray[i].score.w, userD.historiqueArray[i].score.l, userD.historiqueArray[i].myPP, userD.historiqueArray[i].oppenent, userD.historiqueArray[i].hisPP, userD.historiqueArray[i].gain, userD.historiqueArray[i].result, userD.historiqueArray[i].oppenentImage);
      }
      setActiveButton(findBalleColor(userD.balleColor));
      setActivePad(findPadColor(userD.padColor));
      setActiveAvt(findImage(userD.image));
      if (findImage(userD.image) === 1)
      {
        setImageDL(userD.image);
      }
      axios.post('http://' + serverIP + ':3001/game/ladder', {})
      .then((response) => {
        lData = response.data.ladderData;
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la position', error);
      });
      setShowFriendList(true);
      setTimeout(() => {
        setShowFriendList(false);
        setPansement(true);
      }, 5);
    });
    socket.on('end', (winner, scoreToi, scoreLui, userD) =>
    {
      if (userD === undefined)
      {
        return;
      }
      if ((userD.historiqueArray.length > 1 && userD.historiqueArray[0].myPP === userD.historiqueArray[1].myPP) || (userD.historiqueArray[0].gain === null) || (userD.historiqueArray[0].gain === 0))
      {
        return;
      }
      setScoreJ1(scoreToi);
      setScoreJ2(scoreLui);
      userData.setLvl(userD.lvl);
      userData.setPP(userD.PP);
      userData.setWinRatio(userD.winRatio.w, userD.winRatio.l)
      userData.setGameCount(userD.gameCount);
      for (let i = 0; i < 5; i++)
      {
        userData.setHistorique(i, userD.historiqueArray[i].score.w, userD.historiqueArray[i].score.l, userD.historiqueArray[i].myPP, userD.historiqueArray[i].oppenent, userD.historiqueArray[i].hisPP, userD.historiqueArray[i].gain, userD.historiqueArray[i].result, userD.historiqueArray[i].oppenentImage);
      }
      Joueur === winner ? gagantPerdant = "Perdu :(" : gagantPerdant = "Gagné :)";
      setScoreJ1(0);
      setScoreJ2(0);
      if (userD.progressBar !== undefined)
        userData.setProgressBar(userD.progressBar);
      setWalkingPong(false);
      TotusFals();
    });
    socket.on('scoreUpdate', (j1, j2) =>
    {
      setScoreJ1(j1);
      setScoreJ2(j2);
    });
    socket.on('socketId', (data) =>
    {
      clientId = data;
    });
    socket.on('matchFound', (data) =>{
      Joueur = data;
      setButtonText("0  -  0");
      setWalkingPong(true);
    });
  }, [activeAvt, activePad, activeButton]);

  useEffect(() => 
  {
    handleClick("Profile !");
    // eslint-disable-next-line
  }, [pansement, setPansement]);

  useEffect(() => 
  {
    if (walkingPong === true)
      setButtonText(scoreJ1 + "  -  " + scoreJ2);
  }, [scoreJ1, scoreJ2, walkingPong]);

  useEffect(() =>
  {
    audioRef.current = new Audio("/Darude.mp3");
    audioRef.current.loop = true;
  
    const handleCanPlayThrough = () =>
    {
      if (isPlayingRef.current)
      {
        audioRef.current.play();
      }
    };
  
    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
  
    return () =>
    {
      audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleMessage = (user, content, channel) => {
      for (let i = 0; i < userData.getChannels().length; i++)
      {
        if (userData.getChannels()[i].name === channel)
        {
          userData.getChannels()[i].messages.push(new Message(user, content));
        }
      }
      if (currentChannel !== -1 && channel === userData.getChannels()[currentChannel].name)
      {
        let newMessages = [...messages, new Message(user, content)]
        setMessages(newMessages);
        setChatInput(chatInput => chatInput);
        const cadre = document.getElementById("cadre-social");
        setTimeout(() => {
          cadre.scrollTop = cadre.scrollHeight;
        }, 5);
      }
    };

    const handleDirectMessage = (user, content) => {
      for (let i = 0; i < userData.getDMs().length; i++)
      {
        if (userData.getDMs()[i].user1 === user || userData.getDMs()[i].user2 === user)
        {
          userData.getDMs()[i].messages.push(new Message(user, content));
        }
      }
      if (currentChannel !== -1 && currentChannelType === "dm" && (user === userData.getDMs()[currentChannel].user1 || user === userData.getDMs()[currentChannel].user2))
      {
        let newMessages = [...messages, new Message(user, content)]
        setMessages(newMessages);
        setChatInput(chatInput => chatInput);
        console.log("newMessages:", newMessages);
        const cadre = document.getElementById("cadre-social");
        setTimeout(() => {
          cadre.scrollTop = cadre.scrollHeight;
        }, 5);
      }
    };

    const handleKick = (channelName) => {
      let change = false;
      if (currentChannel !== -1 && channelName === userData.getChannels()[currentChannel].name)
      {
        change = true;
      }
      userData.removeChannel(channelName);
      if (currentChannel === -1 && !showFriendList)
      {
        setShowFriendList(true);
        setTimeout(() => {
          setShowFriendList(false);
        }, 5);
      }
      if (change === true)
      {
        setCurrentChannel(-1);
        setChatInput('');
      }
    };

    const handleDM = (dm) => {
      userData.addDM(dm);
      if (currentChannel === -1 && !showFriendList)
      {
        setCurrentChannel(-1);
        setShowFriendList(true);
        setTimeout(() => {
          setShowFriendList(false);
        }, 5);
      }
    }

    const handleIsBlocked = (user) => {
      let answer = false;
      if (userData.getBlocked().includes(user))
        answer = true;
      axios.post('http://' + serverIP + ':3001/chat/isBlocked', { answer }).then(() => {}).catch(() => {});
    }

    const handleFriend = (friend) => {
      userData.addFriend(friend);
    }

    const handleUnfriend = (friend) => {
      userData.removeFriend(friend);
    }

    const quitDM = (otherUser) => {
      for (let i = 0; i < userData.DMs.length; i++)
      {
        if (userData.DMs[i].user1 === otherUser || userData.DMs[i].user2 === otherUser)
        {
          userData.DMs.splice(i, 1);
          if (currentChannel === i && currentChannelType === 'dm')
          {
            setCurrentChannel(-1);
          }
          else if (currentChannel === -1 && !showFriendList)
          {
            setShowFriendList(true);
            setTimeout(() => {
              setShowFriendList(false);
            }, 5);
          }
          return ;
        }
      }
    }

    socket.on('dm', handleDM);
    socket.on('directMessage', handleDirectMessage);
    socket.on('message', handleMessage);
    socket.on('kick', handleKick);
    socket.on('isBlocked', handleIsBlocked);
    socket.on('friend', handleFriend);
    socket.on('unfriend', handleUnfriend);
    socket.on('quitDM', quitDM);

    return () => {
      socket.off('message', handleMessage);
      socket.off('directMessage', handleDirectMessage);
      socket.off('kick', handleKick);
      socket.off('dm', handleDM);
      socket.off('isBlocked', handleIsBlocked);
      socket.off('friend', handleFriend)
      socket.off('unfriend', handleUnfriend)
      socket.off('quitDM', quitDM);
    }
    // eslint-disable-next-line
  }, [currentChannel, messages, currentChannelType, showFriendList]);
  
  useEffect(() =>
  {
    if (audioRef.current.readyState >= 3)
    {
      if (isPlaying)
      {
        audioRef.current.play();
      }
      else
      {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const getMot2Color = (valeure) =>
  {
    if (valeure < 40)
    {
      return 'rgb(240, 0, 0)';
    } 
    else if (valeure > 40 && valeure < 60)
    {
      return 'orange';
    }
    else
    {
      return 'rgb(0, 180, 0)';
    }
  }

  const TotusFals = () =>
  {
    setShowProfileButtons(false);
    setShowHistoriqueButtons(false);
    setShowLeaderboardButtons(false);
    setShowControleButtons(false);
    setShowCreditButtons(false);
    setShowPersonnalisationButtons(false);
    setShowOptionButtons(false);
    setShowJouerButtons(false);
    setShowGame(false);
    setShowLoginButtons(false);
    setShowLoginForm(false);
    setShowLoginP(true);
    setShowLogin42(true);
    setShowPong(false);
    setShowCodeVerif(false);
    setShowFriendProfile(false);
    setShowDefi(false);
    setShowNameChoice(false);
  }

  useEffect(() => {
    if (showIsLog === true)
    {
      setButtonProfil("Profile");
    }
    else
    {
      setButtonProfil("Login");
    }
  }, [showIsLog, buttonProfil]);

  const handleHistorique = (index) =>
  {
    pseudoToi = userData.getPseudo();
    pseudoLui = userData.getHistoriqueIndex(index).getOppenent();
    PPToi = userData.getHistoriqueIndex(index).getMyPP();
    PPLui = userData.getHistoriqueIndex(index).getHisPP();
    gain = userData.getHistoriqueIndex(index).getGain();
    result = userData.getHistoriqueIndex(index).getResult();
    opImage = userData.getHistoriqueIndex(index).getOppenentImage();
    if (showHistoriqueProfile === true)
    {
      setShowHistoriqueProfileButtons(!showHistoriqueProfile);
    }
  }

  const handleHistoBis = () =>
  {
    if (showHistoriqueProfile === false)
    {
      setShowHistoriqueProfileButtons(!showHistoriqueProfile);
    }
  }

  const handleLadderBis = () =>
  {
    if (showIsLog === false)
      return;
    setShowLeaderboardButtons(!showLeaderboard);
  }

  const handleSoundClick = () =>
  {
    if (isPlaying)
    {
      audioRef.current.pause();
      setMuteText("▶");
    }
    else
    {
        audioRef.current.play();
        setMuteText("❙ ❙");
    }
    setIsPlaying(!isPlaying);
  }

  async function initiateLogin() {
    try {
        const response = await fetch('http://' + serverIP + ':3001/auth/login42config');
        const config = await response.json();
        const authURL = `${config.baseURL}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&state=${config.state}`;
        window.location.href = authURL;
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la connexion :", error);
    }
}

  const handleLogin = (newText) =>
  {
    if (newText === "LoginP")
    {
      setShowLoginForm(!showLoginForm);
      setShowLoginP(!showLoginP);
      setShowLogin42(!showLogin42);
    }
    if (newText === "Login42")
    {
      initiateLogin();
    }
  }

  const handleLoginResp = (data) =>
  {
    if (suptefurge === 0)
    {
      setShowIsLog(true);
      handleClick("Profile !");
      setIsGuest(true);
    }
  }
  const handleMatching = () =>
  {
    TotusFals();
    setShowPong(true);
    axios.post('http://' + serverIP + ':3001/game/matching', { clientId, winHeight, winWidth })
    .then((response) => {
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour de la position', error);
    });
  }
  
  const handleBallePersoButton = (value) =>
  {
    if (value === activeButton)
    {
      setActiveButton(null);
      balleColor = "rgba(195, 171, 195, 0.989)";
      return;
    }
    setActiveButton(value);
    if (value === 1)
    {
      balleColor = "rgb(18, 52, 189)";
    }
    else if (value === 2)
    {
      balleColor = "rgb(191, 7, 7)";
    }
    else if (value === 3)
    {
      balleColor = "rgb(211, 103, 35)";
    }
    else if (value === 4)
    {
      balleColor = "rgb(16, 214, 188)";
    }
    else if (value === 5)
    {
      balleColor = "green";
    }
    axios.post('http://' + serverIP + ':3001/game/balleColor', { clientId, balleColor })
    .then((response) => {
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'image", error);
    });
  }

  const handlePadPersoButton = (value) =>
  {
    if (value === activePad)
    {
      setActivePad(null);
      padColor = "rgba(195, 171, 195, 0.989)";
      return;
    }
    setActivePad(value);
    if (value === 1)
    {
      padColor = "rgb(18, 52, 189)";
    }
    else if (value === 2)
    {
      padColor = "rgb(191, 7, 7)";
    }
    else if (value === 3)
    {
      padColor = "rgb(211, 103, 35)";
    }
    else if (value === 4)
    {
      padColor = "rgb(16, 214, 188)";
    }
    else if (value === 5)
    {
      padColor = "green";
    }
    axios.post('http://' + serverIP + ':3001/game/padColor', { clientId, padColor })
    .then((response) => {
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'image", error);
    });
  }

  const handleAvtPersoButton = (value) =>
  {
    if (value === activeAvt && value !== 1)
    {
      setActiveAvt(null);
      userData.setImage(defaultImage);
      return;
    }
    setActiveAvt(value);
    if (value === 1)
    {
      userData.setImage(imageDL);
    }
    else if (value === 2)
    {
      userData.setImage("/avatar2.jpg");
    }
    else if (value === 3)
    {
      userData.setImage("/avatar3.jpg");
    }
    else if (value === 4)
    {
      userData.setImage("/avatar4.jpg");
    }
    else if (value === 5)
    {
      userData.setImage("/avatar5.jpg");
    }
    else if (value === 6)
    {
      userData.setImage("/avatar6.png");
    }
    else if (value === 7)
    {
      userData.setImage("/avatar7.png");
    }
    else if (value === 8)
    {
      userData.setImage("/avatar8.png");
    }
    let valueImage = userData.getImage();
    axios.post('http://' + serverIP + ':3001/game/image', { clientId, valueImage })
      .then((response) => {
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'image", error);
      });
  }

  const handleDeco = () =>
  {
    socket.emit('deco');
    setShowIsLog(false);
    setWalkingPong(false);
    TotusFals(false);
    setShowLoginButtons(true);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      reduceImageSize(file, (reducedFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageDL(reader.result);
        };
        reader.readAsDataURL(reducedFile);
      });
    }
  };  

  useEffect(() => {
    if (showIsLog === true && imageDL != null)
    {
      userData.setImage(imageDL);
      let valueImage = userData.getImage();
      axios.post('http://' + serverIP + ':3001/game/image', { clientId, valueImage })
        .then((response) => {
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de l'image", error);
        });
    }
}, [imageDL, showIsLog]);

    const handleToggleChange = (isChecked) => {
      setShowEmailConfirm(isChecked);
      setIsEmail(false);
      setEmail('');
      if (isChecked === false)
      {
        socket.emit("doubleFapOff", { clientId });
      }
    };

    const handleEmailConfirm = () =>
    {
      if (email !== '' && isEmail === false)
      {
        axios.post('http://' + serverIP + ':3001/game/codeGen', { email })
        .then((response) => {
          alert("Un code de verification vous a été envoyé par email !");
          setIsEmail(true);
        })
        .catch((error) => {
          console.error("Erreur lors de la verification de l'email", error);
        });
      }
      else if (code !== '' && isEmail === true)
      {
        axios.post('http://' + serverIP + ':3001/game/codeVerif', { clientId, code, email })
        .then((response) => {
          if (response.data === true)
          {
            alert("Vous vous êtes double fap.")
            setIsEmail(false);
          }
          else if (response.data === false)
          {
            alert("Erreur de saisie du code.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la verification de l'eamil", error);
        });
      }
    }

    const handleCodeVerif = () =>
    {
      if (codeVerif === userCode)
      {
        const username = loginCodeVerif;
        defaultImage = imageCodeVerif;
        const bool = true;
        TotusFals();
        setDefaultChecked(true);
        setShowEmailConfirm(true);
        socket.emit('login', { username, defaultImage, bool });
      }
      else if (codeVerif !== userCode && codeError < 2)
      {
        alert("Erreur du code.");
        codeError += 1;
      }
      else if (codeVerif !== userCode && codeError >= 2)
      {
        alert("Alerte de sécurité les enfants");
        TotusFals();
      }
    }

/*    const handleChangePseudo = () =>
    {
      const verif = pseudoChange.slice(-5);
      if (pseudoChange.length > 10)
      {
        alert("Pseudo trop long ! Reste calme s'il te plait.");
        return;
      }
      else if (verif === "guest")
      {
        alert("Tu ne peux pas avoir 'guest' à la fin de ton pseudo. Oui, c'est une régle.");
        return;
      }
      axios.post('http://' + serverIP + ':3001/game/pseudoChange', {  clientId, pseudoChange })
      .then((response) => {
        alert(response.data);
        if (response.data === "Pseudo déjà prit ! Choisis autre chose.")
          return;
        userData.setPseudo(pseudoChange);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la position', error);
      });
    }
*/
const submitMessage = (user, content, channelName, sendToEmitter = true) => {
  axios.post('http://' + serverIP + ':3001/chat/submit', { clientId, user, content, channelName })
    .then((response) => {
      if (response.data[0] === true)
      {
        if (sendToEmitter === true)
        {
          let newMessage = new Message(user, content);
          let newMessages = [...messages, newMessage];
          userData.getChannels()[currentChannel].messages.push(newMessage);
          setMessages(newMessages);
        }
        setChatInput('');
        let cadre = document.getElementById("cadre-social");
        setTimeout(() => {
          cadre.scrollTop = cadre.scrollHeight;
        }, 5);
      }
      else
      {
        if (response.data[1] === true)
          alert("Mute")
        setChatInput('');
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi du message", error);
    })
}

const kick = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/kick', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre kick: " + response.data[1], channelName)
    else
      submitMessage(user, "A été kick", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors du kick de " + user, channelName);
  });
};

const ban = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/ban', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre banni: " + response.data[1], channelName)
    else
      submitMessage(user, "A été banni", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors du ban de " + user, channelName);
  });
};

const admin = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/admin', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre ajouté aux admins: " + response.data[1], channelName)
    else
      submitMessage(user, "A été ajouté aux admins", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de l'ajout de " + user + " aux admins", channelName);
  });
};

const unAdmin = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/unadmin', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas été enlevé des admins: " + response.data[1], channelName)
    else
      submitMessage(user, "A été enlevé des admins", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de l'enlevage de " + user + " des admins", channelName);
  });
};

const mute = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/mute', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre muté: " + response.data[1], channelName)
    else
      submitMessage(user, "A été mute", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de la mise en sourdine de " + user, channelName);
  });
};

const unMute = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/unmute', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre unmute: " + response.data[1], channelName)
    else
      submitMessage(user, "A été unmute", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de l'unmute de " + user, channelName);
  });
};

const pass = (channelName, password) => {
  axios.post('http://' + serverIP + ':3001/chat/pass', { clientId, channelName, password })
  .then((response) => {
    if (response.data[0] === false)
    {
      submitMessage(channelName, "Le mot de passe n'a pas pu être changé: " + response.data[1], channelName);
      return ;
    }
    submitMessage(channelName, "Mot de passe changé", channelName)
    for (let i = 0; i < userData.getChannels().length; i++)
    {
      if (userData.getChannels()[i].name === channelName)
      {
        userData.getChannels()[i].password = password;
        userData.getChannels()[i].type = 'protected';
      }
    }
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors du changement de mot de passe", channelName)
  });
};

const rmPass = (channelName, password) => {
  axios.post('http://' + serverIP + ':3001/chat/rmpass', { clientId, channelName })
  .then((response) => {
    if (response.data[0] === false)
    {
      submitMessage(channelName, "Le mot de passe n'a pas pu être enlevé: " + response.data[1], channelName);
      return ;
    }
    submitMessage(channelName, "Mot de passe enlevé", channelName)
    for (let i = 0; i < userData.getChannels().length; i++)
    {
      if (userData.getChannels()[i].name === channelName)
      {
        userData.getChannels()[i].password = "";
        userData.getChannels()[i].type = 'public';
      }
    }
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de l'enlevage du mot de passe", channelName)
  });
};

const help = (channelName) => {
  submitMessage(channelName, "Commandes: !help, !quit, !kick, !ban, !admin, !unadmin, !mute, !unmute, !invite, !uninvite, !pass, !rmpass", channelName);
}

const quit = (channelName) => {
  axios.post('http://' + serverIP + ':3001/chat/quit', { clientId, channelName })
  .then((response) => {
    submitMessage(userData.pseudo, " A quitté " + channelName, channelName, false);
    userData.getChannels().splice(currentChannel, 1);
    setCurrentChannel(-1);
  })
  .catch((error) => {
    alert("Erreur lors de la sortie du channel");
  });
};

const invite = (channelName, user) =>
{
  console.log(channelName, user);
  axios.post('http://' + serverIP + ':3001/chat/invite', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre invité: " + response.data[1], channelName)
    else
      submitMessage(user, "A été invité", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de l'invitation de " + user, channelName);
  });
};

const uninvite = (channelName, user) => {
  axios.post('http://' + serverIP + ':3001/chat/uninvite', { clientId, channelName, user })
  .then((response) => {
    if (response.data[0] === false)
      submitMessage(user, "N'a pas pu etre désinvité: " + response.data[1], channelName)
    else
      submitMessage(user, "A été désinvité", channelName);
  })
  .catch((error) => {
    submitMessage(channelName, "Erreur lors de la désinvitation de " + user, channelName);
  });
};

const submitDM = (user, content) => {
  let otherUser;
  if (userData.getDMs()[currentChannel].user1 === user)
    otherUser = userData.getDMs()[currentChannel].user2;
  else
    otherUser = userData.getDMs()[currentChannel].user1;
  console.log(user, content, otherUser);
  axios.post('http://' + serverIP + ':3001/chat/submitDM', { clientId, user, content, otherUser })
  {
    let newMessage = new Message(user, content);
    let newMessages = [...messages, newMessage];
    userData.getDMs()[currentChannel].messages.push(newMessage);
    setMessages(newMessages);
    setChatInput('');
    let cadre = document.getElementById("cadre-social");
    setTimeout(() => {
      cadre.scrollTop = cadre.scrollHeight;
    }, 5);
  }
}

const submitMessageEvent = (e) => {
  e.preventDefault();
  let cmd = undefined;
  if (chatInput === '') return;
  if (userData === undefined)
  {
    alert("Mais enfin ? Connecte toi !");
    return;
  }
  let user = userData.pseudo;
  if (currentChannelType === "dm")
  {
    submitDM(user, chatInput);
    return ;
  }
  if (chatInput[0] === '!')
  {
    cmd = chatInput.split(' ');
  }
  let channelName = userData.getChannels()[currentChannel].name;
  submitMessage(user, chatInput, channelName);
  if (cmd !== undefined)
  {
    let cmdName = cmd[0].substring(1).toLowerCase();
    if (cmdName !== "help" && cmdName !== "kick" && cmdName !== "ban" && cmdName !== "admin" && cmdName !== "mute" && cmdName !== "unmute" && cmdName !== "pass" && cmdName !== "unadmin" && cmdName !== "rmpass" && cmdName !== "quit" && cmdName !== "invite" && cmdName !== "uninvite")
    {
      submitMessage(channelName, "Unknown command", channelName);
      return ;
    }
    else if (cmd.length !== 2 && cmdName !== "help" && cmdName !== "rmpass" && cmdName !== "quit")
    {
      submitMessage(channelName, "Command takes one argument", channelName);
      return ;
    }
    if (cmdName === "kick")
      kick(channelName, cmd[1]);
    else if (cmdName === "ban")
      ban(channelName, cmd[1]);
    else if (cmdName === "admin")
      admin(channelName, cmd[1]);
    else if (cmdName === "unadmin")
      unAdmin(channelName, cmd[1]);
    else if (cmdName === "mute")
      mute(channelName, cmd[1]);
    else if (cmdName === "unmute")
      unMute(channelName, cmd[1]);
    else if (cmdName === "pass")
      pass(channelName, cmd[1]);
    else if (cmdName === "rmpass")
      rmPass(channelName, cmd[1]);
    else if (cmdName === "help")
      help(channelName);
    else if (cmdName === "quit")
      quit(channelName);
    else if (cmdName === "invite")
      invite(channelName, cmd[1]);
    else if (cmdName === "uninvite")
      uninvite(channelName, cmd[1]);
  }
}

const handleTyping = (e) => {
  if (showFriendList || currentChannel === -1)
  {
    setChatInput('');
    return;
  }
  setChatInput(e.target.value);
}

const updateImages = () => {
  userData.friends.forEach((friend) => {
    axios.post('http://' + serverIP + ':3001/chat/getImage', { user: friend[0] })
    .then((response) => {
      friend[1] = response.data[0];
      friend[2] = response.data[1];
    }).catch((error) => { console.error("Erreur lors de la récupération de l'image", error); });
  });
}

const handleClickFriendList = () => {
  if (!showIsLog) {
    alert("Mais enfin ? Connecte toi !");
    return;
  }
  updateImages();
  let cadre = document.getElementById("cadre-social");
  if (!showFriendList)
    cadre.scrollTop = 0;
  else
    cadre.scrollTop = cadre.scrollHeight;
  setChatInput('');
  setTimeout(() => {
    setShowFriendList(!showFriendList);
  }, 50);
}

const newChannel = (e) => {
  e.preventDefault();
  if (channelName === null || channelName === '') 
  {
    alert("Nom invalide");
    return ;
  }
  for (let i = 0; i < userData.getChannels().length; i++)
  {
    if (userData.getChannels()[i].name === channelName)
    {
      alert("Vous êtes déjà dans ce channel");
      setShowCreateChannel(false);
      return ;
    }
  }
  let user = userData.pseudo;
  axios.post('http://' + serverIP + ':3001/chat/channel', { channelName, user, channelPassword, channelType })
  .then((response) => {
    if (response.data[0] === false)
    {
      alert(response.data[1]);
      setChannelName('');
      setChannelType('public');
      setChannelPassword('');
      setShowCreateChannel(false);
      return ;
    }
    userData.addChannel(response.data[1]);
    setCurrentChannelType('channel')
    setCurrentChannel(userData.channels.length - 1);
    submitMessage(user, "A rejoint " + channelName, channelName, false);
  })
  .catch((error) => {
    console.error("Erreur lors de la création du channel", error);
  });
  setChannelName('');
  setChannelType('public');
  setChannelPassword('');
  setShowCreateChannel(false);
}

const newDM = (e) => {
  e.preventDefault();
  for (let i = 0; i < userData.getDMs().length; i++)
  {
    if (userData.getDMs()[i].user1 === popoverUser || userData.getDMs()[i].user2 === popoverUser)
    {
      setCurrentChannelType("dm");
      setCurrentChannel(i);
      return ;
    }
  }
  if (userData.getBlocked().includes(popoverUser))
  {
    let unblock = window.confirm("Tu as bloqué " + popoverUser + ", veux-tu le débloquer ?");
    if (unblock)
      userData.unblockUser(popoverUser);
    else
      return ;
  }
  let user = userData.pseudo;
  axios.post('http://' + serverIP + ':3001/chat/isBlocked', { user, other: popoverUser })
  .then((response) => {
    if (response.data === true)
    {
      alert("Mais enfin ? Tu es bloqué !");
      return ;
    }
    axios.post('http://' + serverIP + ':3001/chat/dm', { user, other: popoverUser })
    .then((response) => {
      let dm = response.data;
      userData.addDM(dm);
      setCurrentChannelType('dm');
      setCurrentChannel(userData.DMs.length - 1);
    })
    .catch((error) => {
      console.error("Erreur lors de la création du channel", error);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la vérification du blocage", error);
  });
}


const print_messages = () => {
  let n = 0;
  let d = 0;
  if (userData === undefined)
    return ;
  if ((userData.channels.length === 0 && userData.DMs.length === 0) || currentChannel === -1)
  {
    const enterChannel = (e) => {
      if (e.target.dataset.type === "channel")
      {
        setCurrentChannelType("channel");
        setCurrentChannel(e.target.dataset.id);
      }
      else
      {
        setCurrentChannelType("dm");
        setCurrentChannel(e.target.dataset.id);
      }
      const cadre = document.getElementById("cadre-social");
      setTimeout(() => {
        cadre.scrollTop = cadre.scrollHeight;
      }, 1);
    }
    return (<div className="buttons">
      <button className="button bouton-anime" onClick={() => setShowCreateChannel(true)}>+</button>
      {userData.channels.length > 0 && <h1>Channels</h1>}
      {userData.channels.map((channel) => (<button className='button bouton-anime' data-id={n} data-type="channel" key={n++} onClick={enterChannel}>{channel.name}</button>))}
      {userData.DMs.length > 0 && <h1>DMs</h1>}
      {userData.DMs.map((dm) => (<button className='button bouton-anime' data-id={d} data-type="dm" key={d++} onClick={enterChannel}>{dm.user1 === userData.pseudo ? dm.user2 : dm.user1}</button>))}
    </div>)
  }
  n = 0;
  let currentChannelIn;
  if (currentChannelType === "channel")
    currentChannelIn = userData.getChannels()[currentChannel];
  else
    currentChannelIn = userData.getDMs()[currentChannel];
  const exitChannel = () => {
    setCurrentChannel(-1);
    const cadre = document.getElementById("cadre-social");
    cadre.scrollTop = 0;
  }
  return (
  <div className='channel'>
    <div className="topBar">
        <button className="button button-back bouton-anime" onClick={exitChannel}><svg viewBox="0 0 46 40"><path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path></svg></button>
        <h1>{currentChannelType === "channel" ? currentChannelIn.name : (currentChannelIn.user1 === userData.pseudo) ? currentChannelIn.user2 : currentChannelIn.user1}</h1>
    </div>
    <div className='messages'>
    {currentChannelIn.messages.map((message) => {
      console.log("currentChannelIn =", currentChannelIn, userData.getDMs()[currentChannel]);
      console.log("message=", message);
      if (!userData.blocked.includes(message.user))
      {
        return (<div className="message" key={n++}>
          <h1 onClick={(e) => {togglePopover(e.target.innerText)}} style={{cursor: message.user === userData.getPseudo() ? 'auto' : 'pointer'}}>{message.user}</h1>
          <p>{message.content}</p>
        </div>)
      }
      else
        return <div className="message" key={n++}>
          <h1 onClick={(e) => {togglePopover(e.target.innerText)}} style={{cursor: message.user === userData.getPseudo() ? 'auto' : 'pointer'}}>{message.user}</h1>
          <p>Message bloqué</p>
        </div>
    })}
    </div>
  </div>)
}

const printFriends = () => {
  return (<div>
    {userData.friends.map((friend) => (<div className='friend' key={k++} onClick={(e) => {togglePopover(friend[0])}} style={{cursor: friend[0] === userData.getPseudo() ? 'auto' : 'pointer'}}><img src={friend[1]} alt={"Ici trone l'avatar de " + friend[0]}/><h1>{friend[0]} ({friend[2]})</h1></div>))}
  </div>)
}

const togglePopover = (userName) => {
  if (userName === userData.getPseudo())
    return ;
  let popover = document.getElementById('popover');
  setPopoverUser(userName);
  if (popover.style.display === 'block' && userName === '')
  {
    popover.style.display = 'none';
  }
  else
    popover.style.display = 'block';
}

useEffect(() =>
{
  socket.on('friendFetch', (user, userD) =>
  {
    friendData = new User(user);
    friendData.setLvl(userD.lvl);
    friendData.setPP(userD.PP);
    friendData.setProgressBar(userD.progressBar);
    friendData.setImage(userD.image);
    friendData.setWinRatio(userD.winRatio.w, userD.winRatio.l);
    friendData.setGameCount(userD.gameCount);
    if (friendData.getPseudo() !== "")
    {
      setButtonText( user + " profile !");
      setShowFriendProfile(true);
    }
  });
});

const cancelCreateChannel = () => {
  setShowCreateChannel(false);
  setChannelName('');
  setChannelPassword('');
  setChannelType('public');
}

const seeProfile = () => {
  TotusFals();
  axios.post('http://' + serverIP + ':3001/chat/fetchFriendData', { popoverUser, clientId })
  .then((response) => {
  })
  .catch((error) => {
    console.error("Erreur lors de l'affichage du profile de l'ami.", error);
  });
  togglePopover('');
}

const dmUser = (e) => {
  axios.post('http://' + serverIP + ':3001/chat/isLogged', { user: popoverUser })
  .then((response) => {
    if (response.data === true)
    {
      newDM(e);
      togglePopover('');
      if (showFriendList)
        setShowFriendList(false);
    }
    else
    {
      togglePopover('');
      alert("L'utilisateur est pas log");
    }
  })
  .catch(() => {});
}

const block = () => {
  if (userData.getBlocked().includes(popoverUser))
  {
    axios.post('http://' + serverIP + ':3001/chat/unblock', { clientId, user: popoverUser }).then(() => {}).catch(() => {})
    userData.unblockUser(popoverUser);
  }
  else
  {
    axios.post('http://' + serverIP + ':3001/chat/block', { clientId, user: popoverUser }).then(() => {}).catch(() => {})
    userData.blockUser(popoverUser);
  }
  togglePopover('');
}

const friend = () => {
  if (userData.getBlocked().includes(popoverUser))
  {
    let unblock = window.confirm("Tu as bloqué " + popoverUser + ", veux-tu le débloquer ?");
    if (unblock)
      userData.unblockUser(popoverUser);
    else
      return ;
  }
  let user = userData.pseudo;
  axios.post('http://' + serverIP + ':3001/chat/isBlocked', { user, other: popoverUser })
  .then((response) => {
    if (response.data === true)
    {
      alert("Mais enfin ? Tu es bloqué !");
      return ;
    }
    if (userData.friendsNames.includes(popoverUser))
    {
      axios.post('http://' + serverIP + ':3001/chat/unfriend', { clientId, user: popoverUser }).then(() => {}).catch(() => {})
      userData.removeFriend(popoverUser);
      if (showFriendList)
      {
        setShowFriendList(false);
        setTimeout(() => {
          setShowFriendList(true);
        }, 5);
      }
    }
    else
    {
      axios.post('http://' + serverIP + ':3001/chat/friend', { clientId, user: popoverUser }).then(() => {}).catch(() => {})
      axios.post('http://' + serverIP + ':3001/chat/getImage', { user: popoverUser }).then((response) => {
        userData.addFriend([popoverUser, response.data]);
      }).catch(() => {});
    }
  }).catch(() => {});
  togglePopover('');
}

    useEffect(() => {
      const handleDemande = (user) => {
        TotusFals();
        setShowDefi(true);
        setButtonText("Le jeu tryhard le plus chill de 42 !");
        pseudoDefi = user;
        gagantPerdant = "none";
      }

      const handleNo = (user) => {
        alert(pseudoDefi + " a refusé ton defis !");
        return;
      }

      const handleYes = (user) => {
        TotusFals();
        setShowPong(true);
        return;
      }

      const handlePseudoUpdate = (oldPseudo, newPseudo) => {
        for (let i = 0; userData.getFriends().length; i++)
        {
          if (oldPseudo === userData.getFriends()[i][0])
          {
            userData.removeFriend(oldPseudo);
            userData.addFriend(newPseudo);
          }
        }
        return;
      }

      socket.on('demandeDefi', handleDemande);
      socket.on('defisRefusé', handleNo);
      socket.on('defisAccepté', handleYes);
      socket.on('pseudoUpdate', handlePseudoUpdate);

      return () => {
        socket.off('demandeDefi', handleDemande);
        socket.off('defisRefusé', handleNo);
        socket.off('defisAccepté', handleYes);
        socket.off('pseudoUpdate', handlePseudoUpdate);
      }
    });

    const handleYesDefi = () => {
      TotusFals();
      axios.post('http://' + serverIP + ':3001/game/yesDefi', { clientId, pseudoDefi, winHeight, winWidth })
      .then((response) => {
        if (response.data === false)
        {
          alert("Mais il est deconnecté bon dieu !");
          return;
        }
      })
      .catch(() => {
        console.log("erreur lors de la demande de défi.");
      })
    }

    const handleNoDefi = () => {
      TotusFals();
      axios.post('http://' + serverIP + ':3001/game/noDefi', { clientId, pseudoDefi })
      .then((response) => {
        if (response.data === false)
        {
          alert("Mais il est deconnecté bon dieu !");
          return;
        }
      })
      .catch(() => {
        console.log("erreur lors de la demande de défi.");
      })
    }

    const handleDefi = () => {
      togglePopover('');
      gagantPerdant = "none";
      axios.post('http://' + serverIP + ':3001/game/defi', { clientId, user: popoverUser })
      .then((response) => {
        if (response.data === false)
        {
          alert("Mais il est deconnecté bon dieu !");
          return;
        }
        pseudoDefi = popoverUser;
      })
      .catch(() => {
        console.log("erreur lors de la demande de défi.");
      })
    }

  return (
      <section>
        <button style={{display: (gagantPerdant === 'none') ? 'none' : 'block'}} className='GagnantPerdant'>
          {gagantPerdant}
        </button >
        <div className="wall">
        </div>
        <button className="title bouton-anime" onClick={() => handleClick("Le jeu tryhard le plus chill de 42 !")}>
          Peachill Pong™
        </button>
        <button className="mute-button bouton-anime" onClick={handleSoundClick}>
          {muteText}
        </button>
        <div className="cadre-sup">
          {buttonText}
        </div>
        <div className="cadre-game">
          {showLogin && !showNameChoice &&(
            <div>
              {showLoginP &&(
                <button className='loginP bouton-anime' onClick={() => handleLogin("LoginP")}>
                  Peachill guest
                </button>
              )}
              {showLoginForm &&(
                < LoginForm onLogin={handleLoginResp} />
              )}
              {showLogin42 &&(
                <button className='login42 bouton-anime' onClick={() => handleLogin("Login42")}>
                  Login with 42
                </button>
              )}
            </div>
          )}
          {showGame &&(
            <div>
              <button className='Lancer-Partie bouton-anime' onClick={() => handleMatching()}>
                Lancer une partie !
              </button>
            </div>
          )}
          {walkingPong &&(
            <div>
              <div style={{display: showPong ? 'block' : 'none'}}>
                <div className='pointille-game'>
                </div>
                <Pong style={{display: showPong ? 'block' : 'none'}}/>
              </div>
            </div>
          )}
        </div>
        <button className="cadre-friendList bouton-anime" onClick={handleClickFriendList}>
          Liste d'amis
        </button>
        <form onSubmit={(e) => {submitMessageEvent(e)}}>
          <input type="text" id="chatInput" className="cadre-chat" value={chatInput} onChange={handleTyping} />
        </form>
        <button className={"jouer-button bouton-anime"} onClick={() => handleClick("Jouer !")}>
          {(!walkingPong && showPong) ? <RechercheAnimation /> : 'Jouer'}
        </button>
        <button className={"profile-button bouton-anime"} onClick={() => handleClick("Profile !")}>
          {buttonProfil}
        </button>
        <button className={"historique-button bouton-anime"} onClick={() => handleClick("Historique !")}>
          Historique
        </button>
        <button className={"leaderboard-button bouton-anime"} onMouseDown={() => handleClick("Leaderboard !")} onMouseUp={handleLadderBis}>
          Leaderboard
        </button>
        <button className={"personnalisation-button bouton-anime"} onClick={() => handleClick("Personnalisations !")}>
          Personnalisations
        </button>
        <button className={"controle-button bouton-anime"} onClick={() => handleClick("Contrôles !")}>
          Contrôles
        </button>
        <button className={"option-button bouton-anime"} onClick={() => handleClick("Options !")}>
          Options
        </button>
        <button className={"credit-button bouton-anime"} onClick={() => handleClick("Crédits !")}>
          Crédits
        </button>
        {showProfile &&(
          <div>
            <button className={"deco-button bouton-anime"} onClick={() => handleDeco()}>
              Deconnexion
            </button>
            <div className="elo-button">
              {userData.getPP()} PP
            </div>
            <div className="image-button">
              <img src={userData.getImage()} alt="Ici trône ton avatar" className='avatar-css'/>
            </div>
            <div className="nom-button">
              {userData.getPseudo()}
            </div>
            <div className="lvl-button">
              LvL : {userData.getLvl()}
            </div>
            <div className="pourcent-button">
              {userData.getProgressBar()}%
            </div>
            <div className="xp-button">
              <ProgressBar progress={userData.getProgressBar()} />
            </div>
            <div className="winrate-button">
              <span className="mot1">{userData.getWinRatio().getW()} </span>
              <span style={{ color: getMot2Color((userData.getWinRatio().getW() / (userData.getWinRatio().getW() + userData.getWinRatio().getL()) * 100))}} className="color2">{Math.round(userData.getWinRatio().getW() / (userData.getWinRatio().getW() + userData.getWinRatio().getL()) * 100)}% </span>
              <span className="mot3">{userData.getWinRatio().getL()} </span>
            </div>
            <div className='gameCount-text'>
                Nombre de partie
            </div>
            <div className="succes-button">
              <GameCountBar progress={userData.getGameCount()} />
            </div>
            <div className='gameCount'>
              {userData.getGameCount()}/100
            </div>
          </div>
        )}
        {showFriendProfile && friendData !== undefined && (
          <div>
            <div className="elo-button">
              {friendData.getPP()} PP
            </div>
            <div className="image-button">
              <img src={friendData.getImage()} alt="Ici trône ton avatar" className='avatar-css'/>
            </div>
            <div className="nom-button">
              {friendData.getPseudo()}
            </div>
            <div className="lvl-button">
              LvL : {friendData.getLvl()}
            </div>
            <div className="pourcent-button">
              {friendData.getProgressBar()}%
            </div>
            <div className="xp-button">
              <ProgressBar progress={friendData.getProgressBar()} />
            </div>
            <div className="winrate-button">
              <span className="mot1">{friendData.getWinRatio().getW()} </span>
              <span style={{ color: getMot2Color((friendData.getWinRatio().getW() / (friendData.getWinRatio().getW() + friendData.getWinRatio().getL()) * 100))}} className="color2">{Math.round(friendData.getWinRatio().getW() / (friendData.getWinRatio().getW() + friendData.getWinRatio().getL()) * 100)}% </span>
              <span className="mot3">{friendData.getWinRatio().getL()} </span>
            </div>
            <div className='gameCount-text'>
              Nombre de partie
            </div>
            <div className="succes-button">
              <GameCountBar progress={friendData.getGameCount()} />
            </div>
            <div className='gameCount'>
              {friendData.getGameCount()}/100
            </div>
          </div>
        )}
        {showHistorique &&(
          <div>
            <div className="listOfGame-button">
              {histo1 &&(
                <button className="userInList1-button bouton-anime" onMouseDown={() => handleHistorique(0)} onMouseUp={handleHistoBis}>
                  {userData.getHistoriqueIndex(0).getOppenent()}
                  <br />
                  {userData.getHistoriqueIndex(0).getScore().getW()} : {userData.getHistoriqueIndex(0).getScore().getL()}
                </button>
              )}
              {histo2 &&(
                <button className="userInList2-button bouton-anime" onMouseDown={() => handleHistorique(1)} onMouseUp={handleHistoBis}>
                  {userData.getHistoriqueIndex(1).getOppenent()}
                  <br />
                  {userData.getHistoriqueIndex(1).getScore().getW()} : {userData.getHistoriqueIndex(1).getScore().getL()}
                </button>
              )}
              {histo3 &&(
                <button className="userInList3-button bouton-anime" onMouseDown={() => handleHistorique(2)} onMouseUp={handleHistoBis}>
                  {userData.getHistoriqueIndex(2).getOppenent()}
                  <br />
                  {userData.getHistoriqueIndex(2).getScore().getW()} : {userData.getHistoriqueIndex(2).getScore().getL()}
                </button>
              )}
              {histo4 &&(
                <button className="userInList4-button bouton-anime" onMouseDown={() => handleHistorique(3)} onMouseUp={handleHistoBis}>
                  {userData.getHistoriqueIndex(3).getOppenent()}
                  <br />
                  {userData.getHistoriqueIndex(3).getScore().getW()} : {userData.getHistoriqueIndex(3).getScore().getL()}
                </button>
              )}
              {histo5 &&(
                <button className="userInList5-button bouton-anime" onMouseDown={() => handleHistorique(4)} onMouseUp={handleHistoBis}>
                  {userData.getHistoriqueIndex(4).getOppenent()}
                  <br />
                  {userData.getHistoriqueIndex(4).getScore().getW()} : {userData.getHistoriqueIndex(4).getScore().getL()}
                </button>
              )}
            </div>
            <div className="cadrePartie-button">
              {showHistoriqueProfile &&(
                <div>
                  <img src={userData.getImage()} alt="Ici trône ton avatar" className='toimage-button'/>
                  <div className="user1-button">
                    {pseudoToi}
                  </div>
                  <div className="vs-button">
                    vs
                  </div>
                  <div className="user2-button">
                    {pseudoLui}
                  </div>
                  <img src={opImage} alt="Ici trône ton avatar" className='ennemimage-button'/>
                  <div className="eloToi-button">
                    {PPToi} PP
                  </div>
                  <div className="eloEnnemie-button">
                    {PPLui} PP
                  </div>
                  <div className="eloResultat-button">
                    {gain} PP
                  </div>
                  <div className="score-button">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {showLeaderboard &&(
          <div>
            <img src={lData[0].image} alt="Ici trône ton avatar" className='firstImage-button'/>
            <div className="firstLadder-button">
              {lData[0].username} - {lData[0].PP} PP
            </div>
            <img src={lData[1].image} alt="Ici trône ton avatar" className='secondImage-button'/>
            <div className="secondLadder-button">
              {lData[1].username} - {lData[1].PP} PP
            </div>
            <img src={lData[2].image} alt="Ici trône ton avatar" className='thirdImage-button'/>
            <div className="thirdLadder-button">
              {lData[2].username} - {lData[2].PP} PP
            </div>
            <div className="loserLadder-button">
              {lData[3].username}
              <br />
              {lData[4].username}
              <br />
              {lData[5].username}
              <br />
              {lData[6].username}
              <br />
              {lData[7].username}
              <br />
              {lData[8].username}
              <br />
              {lData[9].username}
              <br />
              {lData[10].username}
              <br />
              {lData[11].username}
            </div>
            <div className="loserLadderElo-button">
              {lData[3].PP}
              <br />
              {lData[4].PP}
              <br />
              {lData[5].PP}
              <br />
              {lData[6].PP}
              <br />
              {lData[7].PP}
              <br />
              {lData[8].PP}
              <br />
              {lData[9].PP}
              <br />
              {lData[10].PP}
              <br />
              {lData[11].PP}
            </div>
            <div className="toiCadreLadder-button">
              {userData.getPseudo()} - {userData.getPP()} PP
            </div>
          </div>
        )}
        {showControle &&(
          <div>
            <div className="W-button">
              W
            </div>
            <div className="S-button">
              S
            </div>
            <div className="flecheHaut-button">
              ⬆
            </div>
            <div className="flecheBas-button">
              ⬇
            </div>
            <div className="texteHaut-button">
              Monter !
            </div>
            <div className="texteBas-button">
              Descendre !
            </div>
          </div>
        )}
        {showCredit &&(
          <div>
            <img src="/mhugueno.png" alt="Ici trône Maeltar" className='mhugueno-css'/>
            <div className="texteMhu-button">
              Ici trône Maeltar
            </div>
            <img src="/mmetzger.jpg" alt="Ici trône Venddos" className='mmetzger-css'/>
            <div className="texteMme-button">
              Ici trône Venddos
            </div>
            <img src="/gsaile.jpg" alt="Ici trône Gusali" className='gsaile-css'/>
            <div className="texteGsa-button">
              Ici trône Gusali
            </div>
          </div>
        )}
        {showPersonnalisation &&(
          <div>
            <button className='couleurB-button'>
              Couleurs de balle
            </button>
            <div className='openB-bouton1'> 
              <button className={`balleB balleB1 ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleBallePersoButton(1)}></button>
              <button className={`balleB balleB2 ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleBallePersoButton(2)}></button>
              <button className={`balleB balleB3 ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleBallePersoButton(3)}></button>
              <button className={`balleB balleB4 ${activeButton === 4 ? 'active' : ''}`} onClick={() => handleBallePersoButton(4)}></button>
              <button className={`balleB balleB5 ${activeButton === 5 ? 'active' : ''}`} onClick={() => handleBallePersoButton(5)}></button>
            </div>
            <button className='couleurP-button'>
              Couleurs du pad
            </button>
            <div className='openP-bouton1'> 
              <button className={`padP padP1 ${activePad === 1 ? 'active' : ''}`} onClick={() => handlePadPersoButton(1)}></button>
              <button className={`padP padP2 ${activePad === 2 ? 'active' : ''}`} onClick={() => handlePadPersoButton(2)}></button>
              <button className={`padP padP3 ${activePad === 3 ? 'active' : ''}`} onClick={() => handlePadPersoButton(3)}></button>
              <button className={`padP padP4 ${activePad === 4 ? 'active' : ''}`} onClick={() => handlePadPersoButton(4)}></button>
              <button className={`padP padP5 ${activePad === 5 ? 'active' : ''}`} onClick={() => handlePadPersoButton(5)}></button>
            </div>
            <button className='avatarP-button'>
              Avatar
            </button>
            <div className='openA-bouton1'>
            <button className={`avtP avtP1 ${activeAvt === 1 ? 'active' : ''}`} style={{ position: 'relative' }} onClick={() => handleAvtPersoButton(1)}>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    style={{ 
                        opacity: 0, 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        cursor: 'pointer',
                        zIndex: 10 
                    }}
                  />
              <img src={imageDL} alt="Import" className='avtP-css'/>
              </button>
              <button className={`avtP avtP2 ${activeAvt === 2 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(2)}>
                <img src="/avatar2.jpg" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
              <button className={`avtP avtP3 ${activeAvt === 3 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(3)}>
                <img src="/avatar3.jpg" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
              <button className={`avtP avtP4 ${activeAvt === 4 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(4)}>
                <img src="/avatar4.jpg" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
              <button className={`avtP avtP5 ${activeAvt === 5 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(5)}>
                <img src="/avatar5.jpg" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
              <button className={`avtP avtP6 ${activeAvt === 6 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(6)}>
                <img src="/avatar6.png" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
              <button className={`avtP avtP7 ${activeAvt === 7 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(7)}>
                <img src="/avatar7.png" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
              <button className={`avtP avtP8 ${activeAvt === 8 ? 'active' : ''}`} onClick={() => handleAvtPersoButton(8)}>
                <img src="/avatar8.png" alt="Ici trône ton avatar" className='avtP-css'/>
              </button>
            </div>
          </div>
        )}
        {showOption && !isGuest && (
          <div>
            {/*<button className='changePseudo-button bouton-anime' onClick={() => handleChangePseudo()}>
              Change ton pseudo !
            </button>
            <input className='pseudoText-button' type="text" value={pseudoChange} onChange={(event) => setPseudoChange(event.target.value)}/>*/}
            <button className='fap-button'>
              Double Fap 😏
            </button>
            <div className='toggle-fap'>
              <ToggleSwitch defaultChecked={defaultChecked} onChange={handleToggleChange} />
            </div>
            {showEmailConfirm &&(
              <div>
                <input className='emailText-button' type="text" value={isEmail === true ? code : email} onChange={isEmail === true ? (event) => setCode(event.target.value) : (event) => setEmail(event.target.value)}/>
                <button className='confirm-button bouton-anime' onClick={() => handleEmailConfirm()}>
                  Confirmer
                </button>
                <div className='email-div'>
                  {isEmail === true ? 'Code de verification :' : 'Email :'}
                </div>
              </div>
            )}
          </div>
        )}
        {showCodeVerif &&(
          <div>
            <div className='texteCodeVerif'>
              Code de vérification
            </div>
            <input className='inputCodeVerif' type="text" value={codeVerif} onChange={(event) => setCodeVerif(event.target.value)}/>
            <button className='bouttonCodeVerif bouton-anime' onClick={() => handleCodeVerif()} >
              Confirmer
            </button>
          </div>
        )}
        <div className="cadre-social" id="cadre-social">
          {!isGuest && showIsLog && (
            <div>
              {showIsLog && userData !== undefined && (
                <div id="popover" className='popover' style={{'display': 'none'}}>
                  <h1>{popoverUser}</h1>
                  <button onClick={seeProfile} className='button button-anime'>Voir le profile</button>
                  <button onClick={dmUser} className='button button-anime'>Envoyer un message</button>
                  <button onClick={block} className='button button-anime'>{userData.blocked.includes(popoverUser) ? 'Débloquer' : 'Bloquer'}</button>
                  <button onClick={friend} className='button button-anime'>{userData.friendsNames.includes(popoverUser) ? 'Retirer des amis' : 'Ajouter en ami'}</button>
                  <button onClick={handleDefi} className='button button-anime'>Défier</button>
                  <button onClick={() => togglePopover('')} className='button button-anime'>Fermer</button>
                </div>)}
                {showIsLog && !showFriendList && !showCreateChannel && print_messages()}
                {!showFriendList && showCreateChannel &&(
				<div>
					<form className='new-channel' onSubmit={newChannel}>
					  <input type="text" className='button channel-name' placeholder="Nom du channel" value={channelName} onChange={(e) => setChannelName(e.target.value)} autoFocus required maxLength={10} />
					  <select className="button channel-type" value={channelType} onChange={(e) => setChannelType(e.target.value)}>
						<option value="public">Public</option>
						<option value="private">Privé</option>
						<option value="protected">Protégé par MDP</option>
					  </select>
					  {channelType === "protected" && (<input className="button channel-password" type="password" placeholder="Mot de passe" value={channelPassword} onChange={(e) => setChannelPassword(e.target.value)} required />)}
					  <input className="button create-channel" type="submit" value="Créer/Rejoindre" />
					</form>
					<button className='button button-anime' onClick={cancelCreateChannel}>Annuler</button>
				</div>
              )}
              {showFriendList && printFriends()}
            </div>
          )}
        </div>
        {showDefi &&(
          <div>
            <div className='pseudoDefi'>
              {pseudoDefi} vous défi !
            </div>
            <button className='yesDefi bouton-anime' onClick={() => handleYesDefi()} >
              Accepter
            </button>
            <button className='noDefi bouton-anime' onClick={() => handleNoDefi()} >
              Refuser
            </button>
          </div>
        )}
        {showNameChoice &&(
          <div>
            <div className='choixPseudo-button'>
              Choisis ton pseudo !
            </div>
            <button className='confirmPseudo-button bouton-anime' onClick={() => handleChoixPseudo()}>
              Confirmer
            </button>
            <input className='choixPseudoText-button' type="text" value={choixPseudo} maxLength={16} onChange={(event) => setChoixPseudo(event.target.value)}/>
          </div>
        )}
      </section>
  );
}

export default App;
