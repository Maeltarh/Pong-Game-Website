import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { userArray } from './main';
import { user } from './user';

@WebSocketGateway(3002, { cors: { origin: "*", methods: ["GET", "POST"] } })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public clients = new Map<string, Socket>();

  constructor(private appService: AppService) {}

  afterInit(server: Server) {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[])
  {
    console.log(`Client connected: ${client.id}`);
    this.clients.set(client.id, client);
    client.emit('socketId', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.appService.handleDisconnect(client);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('login')
  login(client: Socket, data: { choixPseudo: string, username: string, defaultImage: string, bool: boolean }): void {
    const { username } = data;
    const result = this.appService.handleLogin(client, data.username, data.choixPseudo, data.defaultImage, data.bool);
    client.emit('loginResponse', result);
  }

  @SubscribeMessage('deco')
  deco(client: Socket, data: { username: string, password: string }): void {
    console.log(`Client disconnected: ${client.id}`);
    this.appService.handleDisconnect(client);
    this.clients.delete(client.id);
  }

  @SubscribeMessage('doubleFapOff')
  doubleFapOff(client: Socket): void {
    console.log(`doubleFapOff: ${client.id}`);
    let i = 0;
    for (i = 0; i < userArray.length; i++)
    {
      if (userArray[i].socket === client)
      {
        userArray[i].getDataUser().setDeuxFap(false);
      }
    }
  }
}

export default EventsGateway
