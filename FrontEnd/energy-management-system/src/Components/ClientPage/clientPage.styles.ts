import { makeStyles } from "@mui/styles";
import { themeConstant } from "../../Library/Constants/themeConstants";

export const useStyles = makeStyles({
    root: {
        backgroundColor: themeConstant.palette.background.default,
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'grid',
        ///justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden'
    },
    cell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addDeviceButtonClassName: {
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