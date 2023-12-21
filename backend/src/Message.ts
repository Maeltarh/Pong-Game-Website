export default class Message {
    private user: string;
    private content: string;

    constructor(user: string, content: string) {
        this.user = user;
        this.content = content;
    }

    getUser() {
        return this.user;
    }
    getContent() {
        return this.content;
    }
}