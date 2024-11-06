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
        margin : '0px !important'
    },
    cell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableHeader: {
        marginLeft: '10vw !important'
    },
    typography: {
        marginLeft: '30vw !important',
        marginBottom: '0 !important',
        marginTop: '0 !important'
    },
    dataGrid: {
        border: '0px !important'
    },
    paper: {
        height: '300px',
        width: '90%',
        margin: '20px auto'
    },
    addUSerButton:{
        justifyContent : 'center',
        marginLeft: '45vw !important',
        marginTop: '0 !important',
        marginBottom: '0 !important',
        width : '10vw !important'
    },
    backButtonClassName:{
        marginLeft :'0vw !important',
        marginTop: '0vh !important'
    }
});