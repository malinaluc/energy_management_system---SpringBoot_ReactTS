import { makeStyles } from "@mui/styles";
import { themeConstant } from "../../Library/Constants/themeConstants";

export const useStyles = makeStyles({
    root: {
        backgroundColor: themeConstant.palette.background.default,
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'grid',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        overflow: 'hidden'
    },
    cell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableHeader: {
        '& th': {
            width: '10%',
            textAlign: 'center',
            padding: '8px !important'
        },
    },
    tableCell: {
        width: '10%',
        textAlign: 'center',
        padding: '8px !important'
    },
    addDeviceButtonClassName: {
        margin: '5px auto !important',
        width: '200px !important'
    },
    editUsersButtonClassName: {
        margin: '5px auto !important',
        width: '200px !important'
    },
    dataGridClassName: {
        border: '0'
    },
    paperOfDataGridClassName: {
        height: '300px',
        width: '90%',
        margin: '20px auto'
    }
});