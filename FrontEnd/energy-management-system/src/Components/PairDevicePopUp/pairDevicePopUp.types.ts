import { IUser } from "../../Library/Models/IUser";

export interface IPairDevicePopUpProps  {
    currentUser?: IUser,
    open: boolean,
    onClose():void
};