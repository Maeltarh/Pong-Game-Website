import { Repository } from 'typeorm';
import { User } from './entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<User>;
    addFriend(username: string, friend: string): Promise<User>;
    updateUser(login: string, updatedData: Partial<User>): Promise<void>;
    remove(id: string): Promise<void>;
    create(data: Partial<User>): Promise<User>;
}
