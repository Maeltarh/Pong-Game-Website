export default class Message {
    private user;
    private content;
    constructor(user: string, content: string);
    getUser(): string;
    getContent(): string;
}
