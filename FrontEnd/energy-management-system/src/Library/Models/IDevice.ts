import { IUser } from "./IUser";

export interface IDevice {
    id: number,
    description: string,
    address: string,
    hourlyEnergyConsumption: number,
    user?: IUser
};