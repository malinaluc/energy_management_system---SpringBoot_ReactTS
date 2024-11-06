import { ThemeProvider } from "@emotion/react";
import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { COMMA_SEPARATOR, DIALOG_TITLE, ID_MULTIPLE_CHECKBOX, LABEL_ID, LABEL_TAG, ON_CLOSE_BUTTON, ON_SAVE_BUTTON } from "../../Library/Constants/constants";
import { ERROR_USER_UNDEFINED, ERROR_WHILE_FETCHING_DEVICES, ERROR_WHILE_FETCHING_DEVICES_FOR_USER, ERROR_WHILE_PAIRING_UNPAIRING } from "../../Library/Constants/errorsConstants";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { IDevice } from "../../Library/Models/IDevice";
import { IPairDevice } from "../../Library/Models/IPairDevice";
import { useStyles } from "./pairDevicePopUp.styles";
import { IPairDevicePopUpProps } from "./pairDevicePopUp.types";

export const PairDevicePopUp = (props: IPairDevicePopUpProps): JSX.Element => {
    const styles = useStyles();

    const [devices, setDevices] = useState<IDevice[]>([]);
    const [selectedUserDevices, setSelectedUserDevices] = useState<IDevice[]>([]);
    const [initialSelectedUserDevices, setInitialSelectedUserDevices] = useState<IDevice[]>([]);
    const [deviceDescription, setDeviceDescription] = useState<string[]>([]);

    useEffect(() => {
        loadDevices();
        loadDevicesOfUser();
    }, []);

    useEffect(() => {
        const deviceDescriptions = selectedUserDevices.map(device => device.description);
        setDeviceDescription(deviceDescriptions);
    }, [selectedUserDevices]);

    const loadDevices = async () => {
        try {
            const devicesResult = await axios.get(`http://localhost:8081/api/devices/noUserDevices/${props.currentUser!.username}`);
            setDevices(devicesResult.data);
        } catch {
            console.error({ ERROR_WHILE_FETCHING_DEVICES });
        };
    };

    const loadDevicesOfUser = async () => {
        const userUsername = props.currentUser?.username;

        if (!userUsername) {
            console.error({ ERROR_USER_UNDEFINED });
            return;
        };

        try {
            const devicesResult = await axios.get(`http://localhost:8081/api/devices/forUserEmail/${userUsername}`);
            setSelectedUserDevices(devicesResult.data);
            setInitialSelectedUserDevices(devicesResult.data);
        } catch {
            console.error({ ERROR_WHILE_FETCHING_DEVICES_FOR_USER });
        }
    };

    const handleSave = async () => {
        const initialDeviceIds = initialSelectedUserDevices.map(device => device.id);
        const updatedDeviceIds = selectedUserDevices.map(device => device.id);

        const addedDevices = devices.filter(
            device => !initialDeviceIds.includes(device.id) && updatedDeviceIds.includes(device.id)
        );

        const removedDevices = devices.filter(
            device => initialDeviceIds.includes(device.id) && !updatedDeviceIds.includes(device.id)
        );

        try {
            if (addedDevices.length === 1) {
                const userDevicePair: IPairDevice = { deviceId: addedDevices[0].id, username: props.currentUser!.username };
                const response = await axios.post(`http://localhost:8081/api/devices/pairDeviceWithUser`, userDevicePair);
            };

            if (removedDevices.length === 1) {
                const userDeviceUnpair: IPairDevice = { deviceId: removedDevices[0].id, username: props.currentUser!.username };
                const response = await axios.post(`http://localhost:8081/api/devices/unpairDeviceForUser`, userDeviceUnpair);
            };

        } catch (error) {
            console.error(ERROR_WHILE_PAIRING_UNPAIRING, error);
        };
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        props.onClose();
        setSelectedUserDevices([]);
    };

    const handleChange = (event: SelectChangeEvent<typeof deviceDescription>) => {
        const {
            target: { value },
        } = event;

        const selectedDescriptions = typeof value === 'string' ? value.split(COMMA_SEPARATOR) : value;

        setDeviceDescription(selectedDescriptions);

        const updatedSelectedDevices = devices.filter(device =>
            selectedDescriptions.includes(device.description)
        );

        setSelectedUserDevices(updatedSelectedDevices);
    };

    return (
        <ThemeProvider theme={themeConstant}>
            <Fragment>
                <Dialog
                    open={props.open}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>{DIALOG_TITLE}</DialogTitle>
                    <DialogContent>
                        <Select
                            className={styles.selectClassName}
                            labelId={LABEL_ID}
                            id={ID_MULTIPLE_CHECKBOX}
                            multiple
                            value={deviceDescription}
                            onChange={handleChange}
                            input={<OutlinedInput label={LABEL_TAG} />}
                            renderValue={(selectedUserDevices) => selectedUserDevices.join(COMMA_SEPARATOR)}
                        >
                            {devices.map((device) => (
                                <MenuItem key={device.id} value={device.description}>
                                    <Checkbox checked={deviceDescription.includes(device.description)} />
                                    <ListItemText primary={device.description} />
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className={styles.buttonSaveClassName}
                            onClick={handleSave}>
                            {ON_SAVE_BUTTON}
                        </Button>
                        <Button
                            className={styles.buttonCloseClassName}
                            onClick={handleCloseDialog}>
                            {ON_CLOSE_BUTTON}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </ThemeProvider>
    );
};