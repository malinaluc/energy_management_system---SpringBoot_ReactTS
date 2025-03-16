import CastIcon from '@mui/icons-material/Cast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import React, { useEffect, useState } from "react";
import { IDeviceTableData, IUserExpandTableData } from "../../Components/AdminPage/adminPage.types";
import { IDevice } from '../Models/IDevice';
import axios from 'axios';
import { useStyles } from '../../Components/AdminPage/adminPage.styles';

export function Row(props: { row: IUserExpandTableData }) {
    const styles= useStyles();
    const { row } = props;

    const [open, setOpen] = useState(false);
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [openDialog, setDialogOpen] = useState(false);

    useEffect(() => {
        loadDevices();
    },[]);

    const loadDevices = async () => {
        try {
            const devicesResult = await axios.get('http://localhost:8081/api/devices');
            setDevices(devicesResult.data);
        }
        catch {
            console.error("Error while loading devices");
        }
    };

    const devicesRows: IDeviceTableData[] = devices.map((device) => ({
        id: device.id,
        description: device.description,
        address: device.address,
        hourlyEnergyConsumption: device.hourlyEnergyConsumption,
        user: device.user
    }));

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', alignItems: 'center' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" className={styles.tableCell}> {row.id}</TableCell>
                <TableCell className={styles.tableCell}>{row.name}</TableCell>
                <TableCell className={styles.tableCell} >{row.address}</TableCell>
                <TableCell className={styles.tableCell} >{row.username}</TableCell>
                <TableCell>
                    <IconButton aria-label="update">
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="pair">
                        <CastIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Devices
                            </Typography>
                            <Table size="small" aria-label="owners">
                                <TableBody>
                                    {devicesRows.map((row) => (
                                        <TableRow>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.hourlyEnergyConsumption}</TableCell>
                                           
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};