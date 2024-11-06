import { ThemeProvider } from "@emotion/react";
import CastIcon from '@mui/icons-material/Cast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { IDevice } from "../../Library/Models/IDevice";
import { useStyles } from "../ClientPage/clientPage.styles";
import { ITableData } from "./clientPage.types";

export const ClientPage = (): JSX.Element => {
    const styles = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [devices, setDevices] = useState<IDevice[]>([]);

    useEffect(() => {
        loadDevicesOfClient();
    }, []);

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleUpdate = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handlePair = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const loadDevicesOfClient = async () => {
        const username = sessionStorage.getItem("userUsername");
        if (!username) {
            console.error("User username not found in session storage");
            return;
        }

        try {
            const devicesResult = await axios.get(`http://localhost/api/devices/forUserEmail/${username}`);
            setDevices(devicesResult.data);
        } catch {
            console.error("Error while loading devices based on user id");
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'description', headerName: 'Description', width: 400, display: 'flex', align: 'center', headerAlign: 'center' },
        { field: 'address', headerName: 'Address', width: 400, display: 'flex', align: 'center', headerAlign: 'center' },
        { field: 'maxHourConsum', headerName: 'Maximum hourly energy consumption', type: 'number', width: 400, display: 'flex', align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: '',
            width: 150,
            display: 'flex',
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <>
                    <IconButton aria-label="update" onClick={(event) => handleUpdate(event)} disabled={true}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={(event) => handleDelete(event)} disabled={true}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="pair" onClick={(event) => handlePair(event)} disabled={true}>
                        <CastIcon />
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
                    <Typography variant='h4' color={themeConstant.palette.primary.light} align="center"> Welcome back ! You can see your devices below. </Typography>
                </Fragment>

                <Paper className ={styles.paperOfDataGridClassName}>
                    <DataGrid
                        className={styles.dataGridClassName}
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection={false}
                    />
                </Paper>
            </div>
        </ThemeProvider>
    );
};