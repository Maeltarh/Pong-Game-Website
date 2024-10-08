# Pong Game Website
This project is a web-based Pong game platform that can be launched locally and accessed over a network. It is built using React, CSS, NestJS, and PostgreSQL, all within a Docker architecture. The site offers various features, including matchmaking, a ladder system, player profiles, and social interaction.

## Features
- Pong Gameplay: Play against other users in matchmaking mode.
- Ladder System: Track your progress on the leaderboard as you compete with other players.
- Player Profile: Each user has a profile displaying their match history, username, profile picture, and other customizations.
- Customization Options: Players can personalize their ball and paddle colors.
- MMR System: Matches contribute to a player’s Matchmaking Rating (MMR), determining point gain or loss based on performance.
- Social System: Connect with friends and engage in chat channels, similar to a basic IRC.
## Technologies Used
### Frontend:
- React
- CSS
### Backend:
- NestJS
- PostgreSQL
### Containerization:
- Docker, ensuring easy deployment and scalability.
## Installation
To get started, clone the repository and make sure you have Docker installed. Run the following commands to build and launch the app:
```
git clone git@github.com:Maeltarh/pong-game-website.git
cd pong-game-website
docker-compose up --build
```
## Usage
After running the Docker containers, the application will be accessible locally and across your network. You can start playing Pong, check out your profile, customize your settings, and interact with other players through the chat channels.
#
*This project is inspired by the "Trenscendance" assignment from my curriculum at 42 School.*
