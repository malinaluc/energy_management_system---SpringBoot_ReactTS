import { ThemeProvider } from "@emotion/react";
import CastIcon from '@mui/icons-material/Cast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { Fragment, useState } from "react";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { useStyles } from "../ClientPage/clientPage.styles";
import { ITableData } from "./clientPage.types";
import { VARIANT_OUTLINED } from "../../Library/Constants/constants";

export const ClientPage = (): JSX.Element => {
    const styles = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleUpdate = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handlePair = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

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

    const rows: ITableData[] = [
        { id: 1, description: 'Smart Thermostat', address: '101 Climate Ave', hourlyEnergyConsumption: 8 },
        { id: 2, description: 'Security Camera', address: '202 Watchtower Blvd', hourlyEnergyConsumption: 4 },
        { id: 3, description: 'Smart Light Bulb', address: '303 Bright St', hourlyEnergyConsumption: 12 },
        { id: 4, description: 'Smart Refrigerator', address: '404 Chilly Rd', hourlyEnergyConsumption: 24 },
        { id: 5, description: 'Smart Speaker', address: '505 Soundwave Ct', hourlyEnergyConsumption: 10 }
    ];

    const paginationModel = { page: 0, pageSize: 3 };

    return (
        <ThemeProvider theme={themeConstant}>
            <div className={styles.root}>
                <Fragment>
                    <Typography variant='h4' color={themeConstant.palette.primary.light} align="center"> Welcome back ! You can see your devices below. </Typography>
                </Fragment>

                <Paper sx={{ height: 300, width: '100%', alignContent: 'center' }}>
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