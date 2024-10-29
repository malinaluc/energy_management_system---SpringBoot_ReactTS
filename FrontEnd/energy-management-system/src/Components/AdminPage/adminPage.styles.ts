import { makeStyles } from "@mui/styles";
import { themeConstant } from "../../Library/Constants/themeConstants";

export const useStyles = makeStyles({
    root: { 
        backgroundColor: themeConstant.palette.background.default,
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'grid',
        alignItems: 'center',
        height: '100vh'
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
        padding : '8px !important'
    },
    addDeviceButtonClassName: {
        justifyContent: 'center',
        marginLeft: '45vw !important',
        marginTop: '0 !important',
        marginBottom: '0 !important',
        width: '10vw !important'
    },
    editUsersButtonClassName: {
        justifyContent: 'center',
        marginLeft: '45vw !important',
        marginTop: '0 !important',
        marginBottom: '0 !important',
        width: '10vw !important'
    },
    dataGridClassName: {
        border: '0'
    }
});