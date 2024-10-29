import { IUser } from "../../Library/Models/IUser"
import { IUserDevice } from "../../Library/Models/IUserDevice"
import { IUserPopUpProps } from "../UserPopUp/userPopUp.types"

export interface IUserTableData {
    id: number,
    name: string,
    address: string,
    role: number,
    username: string,
    password: string
};

export interface IAdminTableData {
    id: number,
    description: string,
    address: string,
    hourlyEnergyConsumption: number,
    user: IUser[]
};

export interface IDeviceTableData {
    id: number,
    description: string,
    address: string,
    hourlyEnergyConsumption: number,
    user?: IUserDevice
};

export interface IUserExpandTableData {
    id: number,
    name: string,
    address: string,
    username: string
};