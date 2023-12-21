import { HttpService } from '@nestjs/axios';
export declare class Api42Service {
    private httpService;
    private readonly BASE_URL;
    constructor(httpService: HttpService);
    getAccessTokenFromCode(code: string): Promise<string>;
    getUserInfo(token: string): Promise<any>;
}
