"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Channel {
    constructor(name, type, owner, password) {
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
    getName() {
        return this.name;
    }
    getMembers() {
        return this.members;
    }
    getMessages() {
        return this.messages;
    }
    getBanned() {
        return this.banned;
    }
    getOwner() {
        return this.owner;
    }
    getPassword() {
        return this.password;
    }
    getAdmins() {
        return this.admins;
    }
    getType() {
        return this.type;
    }
    getMuted() {
        return this.muted;
    }
    getInvited() {
        return this.invited;
    }
    addMember(user) {
        if (!this.members.includes(user) && !this.banned.includes(user))
            this.members.push(user);
    }
    removeMember(user) {
        this.uninviteMember(user);
        this.removeAdmin(user);
        this.unMuteMember(user);
        if (this.members.includes(user))
            this.members.splice(this.members.indexOf(user), 1);
    }
    addMessage(message) {
        this.messages.push(message);
    }
    banMember(user) {
        this.removeMember(user);
        this.banned.push(user);
    }
    setPassword(password) {
        this.password = password;
    }
    addAdmin(user) {
        if (!this.admins.includes(user))
            this.admins.push(user);
    }
    removeAdmin(user) {
        if (this.admins.includes(user))
            this.admins.splice(this.admins.indexOf(user), 1);
    }
    muteMember(user) {
        if (!this.muted.includes(user))
            this.muted.push(user);
    }
    unMuteMember(user) {
        if (this.muted.includes(user))
            this.muted.splice(this.muted.indexOf(user), 1);
    }
    inviteMember(user) {
        if (!this.invited.includes(user))
            this.invited.push(user);
    }
    uninviteMember(user) {
        if (this.invited.includes(user))
            this.invited.splice(this.invited.indexOf(user), 1);
        this.removeAdmin(user);
    }
    setType(type) {
        this.type = type;
    }
}
exports.default = Channel;
//# sourceMappingURL=Channel.js.map