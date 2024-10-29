import { IUser } from "../../Library/Models/IUser";

export interface IUserPopUpProps {
    currentUser?: IUser,
    open: boolean,
    onClose(): void,
    loadUsers(): void
};