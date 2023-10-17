/*
Interface DAO

*/

export interface DAO {
    getAll: () => unknown;
    getObject: (object: unknown) => unknown;
    create: (object: unknown) => any;
    update: (object: unknown) => Boolean;
    delete: (object: unknown) => Boolean;
}

