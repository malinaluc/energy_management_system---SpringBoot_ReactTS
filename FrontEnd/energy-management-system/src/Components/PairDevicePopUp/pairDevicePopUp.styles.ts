import { makeStyles } from "@mui/styles";
import { themeConstant } from "../../Library/Constants/themeConstants";

export const useStyles = makeStyles({
    root: {
        width: '50vw'
    },
    tableClassName: {
        width: '25vw',
    },
    selectClassName: {
        maxWidth: '20vw !important',
        width: '20vw',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    buttonSaveClassName: {
        marginLeft: '11w !important',
        color: `${themeConstant.palette.secondary.dark} !important`
    },
    buttonCloseClassName: {
        marginLeft: '2vw !important',
        color: `${themeConstant.palette.secondary.dark} !important`
    }
});