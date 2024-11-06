import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Paper, ThemeProvider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { ALIGN_CENTER, DATA_GRID_ADDRESS_COLUMN, DATA_GRID_ID_COLUMN, ICON_BUTTON_DELETE_ARIA_LABEL, ICON_BUTTON_UPDATE_ARIA_LABEL, PAGE_SIZE_OPTIONS, SEE_DEVICES_BELOW, TYPOGRAPHY_VARIANT_H4 } from "../../Library/Constants/constants";
import { ERROR_WHILE_LOADING_USERS } from '../../Library/Constants/errorsConstants';
import { themeConstant } from "../../Library/Constants/themeConstants";
import { IDevice } from '../../Library/Models/IDevice';
import { IUser } from "../../Library/Models/IUser";
import { DevicePopUp } from '../DevicePopUp/devicePopUp';
import { useStyles } from "./editDevicesPage.styles";
import { ITableData } from "./editDevicesPage.types";

export const EditDevicesPage = (): JSX.Element => {
    const styles = useStyles();

    const [users, setUsers] = useState<IUser[]>([]);
    const [openDeviceDialog, setOpenDeviceDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<IDevice | undefined>(undefined);

    useEffect(() => {
        loadDevices();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8081/api/devices/${id}`);
            setDevices((prevDevices) => prevDevices.filter((device) => device.id !== id));
            loadDevices();
        } catch (error) {
            console.error(`Error while deleting device with id ${id}`);
        }
    };

    const handleUpdate = (device: IDevice) => {
        setSelectedDevice(device);
        setOpenDeviceDialog(true);
    };

    const handleOpenDialog = (event: React.MouseEvent) => {
        setOpenDeviceDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDeviceDialog(false);
        setSelectedDevice(undefined);
    };

    const handlePair = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const loadDevices = async () => {
        try {
            const devicesResult = await axios.get('http://localhost:8081/api/devices');
            setDevices(devicesResult.data);
        }
        catch {
            console.error("Error while loading devices");
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: DATA_GRID_ID_COLUMN, width: 20 },
        { field: 'description', headerName: "Description", width: 300, display: 'flex', align: ALIGN_CENTER, headerAlign: ALIGN_CENTER },
        { field: 'address', headerName: DATA_GRID_ADDRESS_COLUMN, width: 300, display: 'flex', align: ALIGN_CENTER, headerAlign: ALIGN_CENTER },
        { field: 'hourlyEnergyConsumption', headerName: "Maximum hours consumption", type: 'number', width: 300, display: 'flex', align: ALIGN_CENTER, headerAlign: ALIGN_CENTER },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            display: 'flex',
            align: 'center',
            headerAlign: ALIGN_CENTER,
            renderCell: (params) => (
                <>
                    <IconButton aria-label={ICON_BUTTON_UPDATE_ARIA_LABEL} onClick={() => handleUpdate(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label={ICON_BUTTON_DELETE_ARIA_LABEL} onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const rows: ITableData[] = devices.map((device) => ({
        id: device.id,
        description: device.description,
        address: device.address,
        hourlyEnergyConsumption: device.hourlyEnergyConsumption
    }));

    const paginationModel = { page: 0, pageSize: 3 };

    return (
        <ThemeProvider theme={themeConstant}>
            <div className={styles.root}>
                <Fragment>
                    <Typography className={styles.typography} variant={TYPOGRAPHY_VARIANT_H4} color={themeConstant.palette.primary.light}> {SEE_DEVICES_BELOW} </Typography>
                </Fragment>
                <Button className={styles.addUSerButton} onClick={handleOpenDialog}>Add Device</Button>
                <Paper className={styles.paper}>
                    <DataGrid
                        className={styles.dataGrid}
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        disableRowSelectionOnClick={true}
                    />
                </Paper>
                {
                    openDeviceDialog !== false &&
                    <DevicePopUp
                        currentDevice={selectedDevice}
                        open={openDeviceDialog}
                        onClose={handleCloseDialog}
                        loadDevices={loadDevices}
                    />
                }
            </div>
        </ThemeProvider>
    )
};