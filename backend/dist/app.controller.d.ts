import { Request, Response } from 'express';
import { EventsGateway } from './game.gateway';
import { Api42Service } from './api42.service';
import { UserService } from './user.service';
import { MailService } from './mail.service';
export declare let code: string;
export declare class AppPosController {
    private eventsGateway;
    private readonly userService;
    private readonly mailService;
    constructor(eventsGateway: EventsGateway, userService: UserService, mailService: MailService);
    noDefi(req: Request, res: Response): void;
    yesDefi(req: Request, res: Response): void;
    defi(req: Request, res: Response): void;
    pos(req: Request, res: Response): Promise<void>;
    matching(req: Request, res: Response): void;
    balle(req: Request, res: Response): Promise<void>;
    responsive(req: Request, res: Response): void;
    ladder(req: Request, res: Response): void;
    image(req: Request, res: Response): void;
    padColor(req: Request, res: Response): void;
    balleColor(req: Request, res: Response): void;
    codeGen(req: Request, res: Response): Promise<void>;
    codeVerif(req: Request, res: Response): void;
    pseudoChange(req: Request, res: Response): Promise<void>;
    isFirstLog(req: Request, res: Response): Promise<void>;
    isNameTaken(req: Request, res: Response): Promise<void>;
}
export declare class AppController {
    private eventsGateway;
    private readonly userService;
    private readonly mailService;
    private readonly api42Service;
    constructor(eventsGateway: EventsGateway, userService: UserService, mailService: MailService, api42Service: Api42Service);
    login42config(session: any): {
        baseURL: string;
        clientId: string;
        redirectUri: string;
    };
    handleCallback(code: string, response: Response): Promise<void>;
}
export declare class AppChatController {
    private eventsGateway;
    private readonly userService;
    private readonly mailService;
    constructor(eventsGateway: EventsGateway, userService: UserService, mailService: MailService);
    blocked: boolean;
    fetchFriendData(req: Request, res: Response): Promise<void>;
    friendImage(req: Request, res: Response): Promise<void>;
    submitMessage(req: Request, res: Response): void;
    submitDM(req: Request, res: Response): void;
    channel(req: Request, res: Response): void;
    dm(req: Request, res: Response): void;
    kick(req: Request, res: Response): void;
    ban(req: Request, res: Response): void;
    admin(req: Request, res: Response): void;
    unadmin(req: Request, res: Response): void;
    mute(req: Request, res: Response): void;
    unmute(req: Request, res: Response): void;
    pass(req: Request, res: Response): void;
    rmpass(req: Request, res: Response): void;
    quit(req: Request, res: Response): void;
    invite(req: Request, res: Response): void;
    uninvite(req: Request, res: Response): void;
    unblock(req: Request, res: Response): void;
    block(req: Request, res: Response): void;
    unfriend(req: Request, res: Response): void;
    friend(req: Request, res: Response): Promise<void>;
    isBlocked(req: Request, res: Response): Promise<void>;
    getImage(req: Request, res: Response): Promise<void>;
}
