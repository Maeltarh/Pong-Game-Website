import { Repository } from 'typeorm';
import { Historique } from './entity';
export declare class HistoriqueService {
    private historiqueRepository;
    constructor(historiqueRepository: Repository<Historique>);
    findAll(): Promise<Historique[]>;
    findOne(id: number): Promise<Historique>;
    updateHistoriqueByIndexAndUsername(index: number, login: string, updatedData: Partial<Historique>): Promise<void>;
    remove(id: number): Promise<void>;
    create(data: Partial<Historique>, index: number): Promise<Historique>;
}
