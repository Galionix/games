export declare class User {
    id: number;
    uid: string;
    inventory: {
        id: number;
        name: string;
        description: string;
        price: number;
        quantity: number;
    }[];
    player: {
        experience: number;
        name: string;
        character: string;
        level: number;
        hp: number;
        mana: number;
    };
    stats: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    location: {
        x: number;
        y: number;
        map: string;
        entry: string;
    };
}
