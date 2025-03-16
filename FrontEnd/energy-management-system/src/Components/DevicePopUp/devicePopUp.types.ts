import { IDevice } from "../../Library/Models/IDevice";

export interface IDevicePopUpProps {
    currentDevice?: IDevice,
    open: boolean,
    onClose(): void,
    loadDevices(): void
};