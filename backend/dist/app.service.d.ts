import { Socket } from 'socket.io';
import { UserService } from './user.service';
import { HistoriqueService } from './histo.service';
export declare class AppService {
    private readonly userService;
    private historiqueService;
    constructor(userService: UserService, historiqueService: HistoriqueService);
    getHello(): string;
    handleLogin(socket: Socket, username: string, choixPseudo: string, defaultImage: string, bool: boolean): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
}
