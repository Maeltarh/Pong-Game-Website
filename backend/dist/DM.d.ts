import Message from "./Message";
export default class DM {
    private user1;
    private user2;
    private messages;
    constructor(user1: string, user2: string);
    getUser1(): string;
    getUser2(): string;
    getMessages(): Message[];
    addMessage(message: Message): void;
}
