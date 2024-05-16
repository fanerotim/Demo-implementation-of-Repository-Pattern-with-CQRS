// Sample Database
export interface Model {
    id: string,
    email: string
}

export interface IUser extends Model {
    username: string
}

export interface IOwner extends Model {
    workouts: string[]
}

export interface IDatabase {
    users: IUser[],
    owners: IOwner[],
}

export class Database {
    private database: IDatabase = {
        users: [
            {
                id: '1',
                email: 'some@gmail.com',
                username: 'Peter Pan'
            }
        ],
        owners: [
            {
                id: '2',
                email: 'owner@abv.bg',
                workouts: ['get-fit', 'lose-weight']
            }
        ]
    }

    create<T>(item: T) {
        //uses db table to find the correct database table and then creates a new entry ot type T
        return item;
    }

    getAll() {
        //uses dbTable to find the correct table and return all entries
    }

    getOne(id: string) {
        //returns a specific entry
    }

    update<T>(item: T, id: string) {
        // uses dbTable to find the correct table, checks for id and updated data
        return item;
    }

    delete(id: string) {
        //uses dbTable variable to find the correct table and deletes the entry of the provided
    }
}