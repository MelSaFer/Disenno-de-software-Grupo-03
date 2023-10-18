/*
Interface DAO

*/

export interface DAO {
    getAll: () => unknown;
    getObject: (code: unknown) => unknown;
    create: (object: unknown) => any;
    update: (object: unknown) => Boolean;
    delete: (object: unknown) => Boolean;
}

