import { ThemeProvider } from "@emotion/react";
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_USER, EDIT_DEVICES_NAVIGATION_PATH, TYPOGRAPHY_TITLE_ADMIN, VARIANT_OUTLINED } from "../../Library/Constants/constants";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { Row } from "../../Library/Utils/tableUtils";
import { useStyles } from "./adminPage.styles";
import { IDeviceTableData, IUserExpandTableData, IUserTableData } from "./adminPage.types";
import axios from "axios";
import { IDevice } from "../../Library/Models/IDevice";
import { ERROR_WHILE_LOADING_USERS } from "../../Library/Constants/errorsConstants";
import { IUser } from "../../Library/Models/IUser";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CastIcon from '@mui/icons-material/Cast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserPopUp } from "../UserPopUp/userPopUp";
import { PairDevicePopUp } from "../PairDevicePopUp/pairDevicePopUp";

export const AdminPage = (): JSX.Element => {
    const styles = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openPairDialog, setOpenPairDialog] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();

    }, [])

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            loadUsers();
        } catch (error) {
            console.error(`Error while deleting user with id ${id}`);
        }
    };

    const handleUpdate = (user: IUser) => {
        setSelectedUser(user);
        setOpenUserDialog(true);
    };

    const handlePair = (user: IUser) => {
        setOpenPairDialog(true);
    };

    const handleOpenUserDialog = () => {
        setOpenUserDialog(true);
    };

    const handleCloseUserDialog = () => {
        setOpenUserDialog(false);
        setSelectedUser(undefined);
    };

    const handleClosePairDialog = () =>{
        setOpenPairDialog(false);
    };

    const handleNavigateToEditDevices = () => {
        navigate(EDIT_DEVICES_NAVIGATION_PATH);
    };

    const loadUsers = async () => {
        try {
            const usersResult = await axios.get('http://localhost:8080/api/users');
            setUsers(usersResult.data);
        }
        catch {
            console.error(ERROR_WHILE_LOADING_USERS);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 400, display: 'flex', align: 'center', headerAlign: 'center' },
        { field: 'address', headerName: 'Address', width: 400, display: 'flex', align: 'center', headerAlign: 'center' },
        { field: 'username', headerName: 'Username', width: 400, display: 'flex', align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: '',
            width: 150,
            display: 'flex',
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="update" onClick={(event) => handleUpdate(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={(event) => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="pair" onClick={(event) => handlePair(params.row)}>
                        <CastIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const usersRows: IUserExpandTableData[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        address: user.address,
        username: user.username
    }));

    const paginationModel = { page: 0, pageSize: 3 };

    return (
        <ThemeProvider theme={themeConstant}>
            <div className={styles.root}>
                <Fragment>
                    <Typography variant='h4' color={themeConstant.palette.primary.light} align="center">{TYPOGRAPHY_TITLE_ADMIN} </Typography>
                </Fragment>
                <Button
                    className={styles.editUsersButtonClassName}
                    variant={VARIANT_OUTLINED}
                    onClick={handleNavigateToEditDevices}
                >Edit devices</Button>
                <Button
                    className={styles.addDeviceButtonClassName}
                    variant={VARIANT_OUTLINED}
                    onClick={handleOpenUserDialog}
                >
                    {ADD_USER}
                </Button>

                <Paper sx={{ height: 300, width: '100%', alignContent: 'center' }}>
                    <DataGrid
                        className={styles.dataGridClassName}
                        rows={usersRows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection={false}
                        disableMultipleRowSelection={true}
                    />
                </Paper>
                {
                    openUserDialog !== false &&
                    <UserPopUp
                        currentUser={selectedUser}
                        open={openUserDialog}
                        onClose={handleCloseUserDialog}
                        loadUsers={loadUsers}
                    />
                }
                {
                    openPairDialog !== false &&
                    <PairDevicePopUp
                        currentUser={selectedUser}
                        open = {openPairDialog}
                        onClose={handleClosePairDialog}
                    />
                }
            </div>
        </ThemeProvider>
    );
};