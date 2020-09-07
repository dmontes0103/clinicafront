export interface IPatient {
    $id: string;
    id: number;
    name: string;
    lastname: string;
    phone: number;
    sex: string;
    password: string;
    admin: boolean;
    $ref: string;
}