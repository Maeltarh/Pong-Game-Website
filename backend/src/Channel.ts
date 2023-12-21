import Message from "./Message";

export default class Channel {
    private name: string;
    private members: string[];
    private messages: Message[];
    private banned: string[];
    private owner: string;
    private password: string;
    private admins: string[];
    private type: string;
    private muted: string[];
    private invited: string[];

    constructor(name: string, type: string, owner: string, password: string) {
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
        this.muted = [];
        this.invited = [];
        this.invited.push(owner);
    }

    // Getters
    getName(): string {
        return this.name;
    }
    getMembers(): string[] {
        return this.members;
    }
    getMessages(): Message[] {
        return this.messages;
    }
    getBanned(): string[] {
        return this.banned;
    }
    getOwner(): string {
        return this.owner;
    }
    getPassword(): string {
        return this.password;
    }
    getAdmins(): string[] {
        return this.admins;
    }
    getType(): string {
        return this.type;
    }
    getMuted(): string[] {
        return this.muted;
    }
    getInvited(): string[] {
        return this.invited;
    }

    // Setters
    addMember(user: string) {
        if (!this.members.includes(user) && !this.banned.includes(user))
            this.members.push(user);
    }
    removeMember(user: string) {
        this.uninviteMember(user);
        this.removeAdmin(user);
        this.unMuteMember(user);
        if (this.members.includes(user))
            this.members.splice(this.members.indexOf(user), 1);
    }
    addMessage(message: Message) {
        this.messages.push(message);
    }
    banMember(user: string) {
        this.removeMember(user);
        this.banned.push(user);
    }
    setPassword(password: string) {
        this.password = password;
    }
    addAdmin(user: string) {
        if (!this.admins.includes(user))
            this.admins.push(user);
    }
    removeAdmin(user: string) {
        if (this.admins.includes(user))
            this.admins.splice(this.admins.indexOf(user), 1);
    }
    muteMember(user: string) {
        if (!this.muted.includes(user))
            this.muted.push(user);
    }
    unMuteMember(user: string) {
        if (this.muted.includes(user))
            this.muted.splice(this.muted.indexOf(user), 1);
    }
    inviteMember(user: string) {
        if (!this.invited.includes(user))
            this.invited.push(user);
    }
    uninviteMember(user: string) {
        if (this.invited.includes(user))
            this.invited.splice(this.invited.indexOf(user), 1);
        this.removeAdmin(user);
    }
    setType(type: string) {
        this.type = type;
    }
}