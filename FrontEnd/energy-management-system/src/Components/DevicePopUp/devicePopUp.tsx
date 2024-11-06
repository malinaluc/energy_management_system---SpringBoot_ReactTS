import { useState } from "react";
import { IDevice } from "../../Library/Models/IDevice";
import { useStyles } from "./devicePopUp.styles";
import { IDevicePopUpProps } from "./devicePopUp.types";
import { ADD, ADD_DEVICE, EMPTY_STRING, LABEL_ADDRESS, LABEL_DESCRIPTION, LABEL_HOURLY_ENERGY_CONSUMPTION, ON_CLOSE_BUTTON, UPDATE, UPDATE_DEVICE, VARIANT_OUTLINED } from "../../Library/Constants/constants";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider } from "@mui/material";
import { themeConstant } from "../../Library/Constants/themeConstants";
import axios from "axios";
import { ERROR_SAVING_DEVICE } from "../../Library/Constants/errorsConstants";

export const DevicePopUp = (props: IDevicePopUpProps): JSX.Element => {
    const styles = useStyles();

    const [device, setDevice] = useState<IDevice>(props.currentDevice ?? {
        id: NaN,
        description: EMPTY_STRING,
        address: EMPTY_STRING,
        hourlyEnergyConsumption: 0,
        user: undefined
    });

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setDevice({ ...device, description: event.target.value });
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setDevice({ ...device, address: event.target.value });
    };

    const handleHourlyEnergyConsumptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setDevice({ ...device, hourlyEnergyConsumption: Number(event.target.value) });
    };

    const handleSaveDevice = async () => {
        try {
            if (props.currentDevice) {
                const response = await axios.put(`http://localhost:8081/api/devices/${device.id}`, device);
                props.loadDevices();
            }
            else {
                const response = await axios.post(`http://localhost:8081/api/devices`, device);
                props.loadDevices();
            }
        } catch (error) {
            console.error(ERROR_SAVING_DEVICE, error);
        }
        props.onClose();
    };

    return (
        <ThemeProvider theme={themeConstant.palette.secondary}>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>
                    {props.currentDevice
                        ? UPDATE_DEVICE
                        : ADD_DEVICE
                    }
                </DialogTitle>
                <DialogContent className={styles.root}>
                    <DialogContentText>
                        <p>Please fill in the required device information.</p>
                    </DialogContentText>
                    <div className={styles.textFieldsClassName}>
                        <TextField
                            variant={VARIANT_OUTLINED}
                            label={LABEL_DESCRIPTION}
                            value={device.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div className={styles.textFieldsClassName}>
                        <TextField
                            variant={VARIANT_OUTLINED}
                            label={LABEL_ADDRESS}
                            value={device.address}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className={styles.textFieldsClassName}>
                        <TextField
                            variant={VARIANT_OUTLINED}
                            label={LABEL_HOURLY_ENERGY_CONSUMPTION}
                            value={
                                props.currentDevice
                                    ? device.hourlyEnergyConsumption
                                    : EMPTY_STRING
                            }
                            onChange={handleHourlyEnergyConsumptionChange}
                        />
                    </div>
                    <div className={styles.buttonsContainerClassName}>
                        <Button
                            className={styles.buttonSaveClassName}
                            variant={VARIANT_OUTLINED}
                            onClick={handleSaveDevice}
                        >
                            {props.currentDevice
                                ? UPDATE
                                : ADD
                            }
                        </Button>
                        <Button
                            className={styles.buttonCloseClassName}
                            variant={VARIANT_OUTLINED}
                            onClick={props.onClose}
                        >
                            {ON_CLOSE_BUTTON}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
};