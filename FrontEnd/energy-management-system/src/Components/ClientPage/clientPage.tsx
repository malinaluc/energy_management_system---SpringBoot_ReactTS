import { ThemeProvider } from "@emotion/react";
import CastIcon from '@mui/icons-material/Cast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { ALIGN_CENTER, ARIA_LABEL_DELETE, ARIA_LABEL_PAIR, ARIA_LABEL_UPDATE, TYPOGRAPHY_TITLE_CLIENT, TYPOGRAPHY_VARIANT_H4 } from "../../Library/Constants/constants";
import { ERROR_LOADING_DEVICES, ERROR_USERNAME_NOT_FOUND } from "../../Library/Constants/errorsConstants";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { IDevice } from "../../Library/Models/IDevice";
import { useStyles } from "../ClientPage/clientPage.styles";
import { ITableData } from "./clientPage.types";

export const ClientPage = (): JSX.Element => {
    const styles = useStyles();
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
            console.error(ERROR_USERNAME_NOT_FOUND);
            return;
        }

        try {
            const devicesResult = await axios.get(`http://localhost/api/devices/forUserEmail/${username}`);
            setDevices(devicesResult.data);
        } catch {
            console.error(ERROR_LOADING_DEVICES);
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
                    <IconButton aria-label={ARIA_LABEL_UPDATE} onClick={(event) => handleUpdate(event)} disabled={true}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label={ARIA_LABEL_DELETE} onClick={(event) => handleDelete(event)} disabled={true}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label={ARIA_LABEL_PAIR} onClick={(event) => handlePair(event)} disabled={true}>
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
                    <Typography variant={TYPOGRAPHY_VARIANT_H4} color={themeConstant.palette.primary.light} align={ALIGN_CENTER}>{TYPOGRAPHY_TITLE_CLIENT}</Typography>
                </Fragment>

                <Paper className={styles.paperOfDataGridClassName}>
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