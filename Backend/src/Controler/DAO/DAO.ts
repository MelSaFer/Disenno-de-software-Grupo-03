/*
Interface DAO

*/

export interface DAO {
    getAll: () => unknown;
    getObject: (code: unknown) => unknown;
    create: (object: unknown) => any;
    update: (object: unknown) => any;
    delete: (object: unknown) => any;
}

