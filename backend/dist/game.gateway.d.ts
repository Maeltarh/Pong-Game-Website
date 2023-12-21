import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private appService;
    clients: Map<string, Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>>;
    constructor(appService: AppService);
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    login(client: Socket, data: {
        choixPseudo: string;
        username: string;
        defaultImage: string;
        bool: boolean;
    }): void;
    deco(client: Socket, data: {
        username: string;
        password: string;
    }): void;
    doubleFapOff(client: Socket): void;
}
export default EventsGateway;
