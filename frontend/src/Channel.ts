import Message from './Message';
import { User } from './user';

export default class Channel {
    private name: string;
    private members: User[];
    private messages: Message[];
    private banned: User[];
    private owner: User;
    private password: string;
    private admins: User[];
    private type: string;

    constructor(name: string, type: string, owner: User, password: string) {
        this.name = name;
        this.members = [];
        this.members.push(owner);
        this.messages = [];
        this.banned = [];
        this.owner = owner;
        this.password = password;
        this.admins = [];
        this.admins.push(owner);
        this.type = type;
    }

    // Getters
    getName(): string {
        return this.name;
    }
    getMembers(): User[] {
        return this.members;
    }
    getMessages(): Message[] {
        return this.messages;
    }
    getBanned(): User[] {
        return this.banned;
    }
    getOwner(): User {
        return this.owner;
    }
    getPassword(): string {
        return this.password;
    }
    getAdmins(): User[] {
        return this.admins;
    }
    getType(): string {
        return this.type;
    }

    // Setters
    addMember(user: User) {
        if (!this.members.includes(user) && !this.banned.includes(user))
            this.members.push(user);
    }
    removeMember(user: User) {
        if (this.members.includes(user))
            this.members.splice(this.members.indexOf(user), 1);
    }
    addMessage(message: Message) {
        this.messages.push(message);
    }
    banMember(user: User) {
        this.removeMember(user);
        this.banned.push(user);
    }
    setPassword(password: string) {
        this.password = password;
    }
    addAdmin(user: User) {
        if (!this.admins.includes(user))
            this.admins.push(user);
    }
}