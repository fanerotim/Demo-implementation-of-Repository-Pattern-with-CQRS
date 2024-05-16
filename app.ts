import { Database, Model } from "./database";

interface IGenericRepository<T> {
    create(item: T): Promise<string>;
    update(id: string, item: T): Promise<string>;
    delete(id: string): Promise<string>;
    find(id: string | null): Promise<T[] | T>;
}

//CRUD Repository - it will be responsible for all db queries and data handling
export class GenericRepository<T extends Model> implements IGenericRepository<T> {
    private commands = new Commands();
    private queries = new Queries();

    //this method will add/insert a new user in the db
    async create<T>(item: T): Promise<string> {
        return this.commands.create(item)
    }

    //this method will rertieve all users from db
    async find<T>(id: string | null): Promise<T[] | T> {
        let result;

        if (id) {
            result = this.queries.findOne(id);
        } else {
            result = this.queries.find();
        }

        return result;
    }

    //update
    async update<T>(id: string, item: T) {
       return this.commands.update(item, id)
    }

    //delete
    async delete<T>(id: string): Promise<string> {
        return this.commands.delete(id)
    }
}


//Commands
export class Commands<T> {
    // for performance reasons the db could be different to the one used by queries, but that way complexity increases
    private db = new Database();

    async create<T>(item: T) {
        this.db.create(item);
        return 'Item created successfully'
    }

    async update<T>(item: T, id: string) {
        this.db.update(item, id);
        return 'Item updated successfully'
    }

    async delete<T>(id: string) {
        this.db.delete(id);
        return 'Item deleted successfully'
    }
}

//Queries
export class Queries<T> {
    //for performance reasons this could be a separate db to the one used for commands, but would increase complexity
    private db = new Database();
    
    async find() {
        // currently I do not specify which exact table we need all entries from as I do not know what the db configuration will be, this is just a theoretical example
        return this.db.getAll();
    }

    async findOne(id: string) {
        return this.db.getOne(id);
    }
}

//CRUD controller - it is not a Express example else we would've be getting user data from req.body
class GenericController<T> {
    constructor(
        private commands: Commands<T>,
        private queries: Queries<T>) {}

    async create<T>(item: T) {
        try {
            this.commands.create(item);
            return 'user created successfully'
        } catch {
            throw new Error('user creation failed')
        }   
    }

    async getAll<T>(entity: T) {
        try {
            return this.queries.find();
        } catch {
            throw new Error('Something went wrong')
        }
    }

    async getOne<T>(id: string) {
        try {
            return this.queries.findOne(id)
        } catch {
            throw new Error('Cannot find item with such id')
        }
    }

    async update<T>(item: T, id: string) {
        try {
            this.commands.update(item, id)
            return 'data modified successfully'
        } catch {
            throw new Error('Update failed')
        }
    }

    async delete(id: string) {
        try {
            this.commands.delete(id);
            return 'item deleted successfully'
        } catch {
            throw new Error('Something went wrong. Please try again')
        }
    }
}

