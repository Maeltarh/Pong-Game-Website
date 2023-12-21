import Message from "./Message";

export default class DM {
    private user1: string;
    private user2: string;
    private messages: Message[];
    constructor(user1: string, user2: string)
    {
        this.user1 = user1;
        this.user2 = user2;
        this.messages = [];
    }
    getUser1()
    {
        return (this.user1);
    }
    getUser2()
    {
        return (this.user2);
    }
    getMessages()
    {
        return (this.messages);
    }
    addMessage(message: Message)
    {
        this.messages.push(message);
    }
}