export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
}



export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        [x: string]: any;
        user: User;
        permissions: String[];
        roles: string[];
    };
    roles:string[];
};
