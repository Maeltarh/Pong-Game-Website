"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DM {
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.messages = [];
    }
    getUser1() {
        return (this.user1);
    }
    getUser2() {
        return (this.user2);
    }
    getMessages() {
        return (this.messages);
    }
    addMessage(message) {
        this.messages.push(message);
    }
}
exports.default = DM;
//# sourceMappingURL=DM.js.map