import { makeStyles } from "@mui/styles";
import { themeConstant } from "../../Library/Constants/themeConstants";

export const useStyles = makeStyles({
    root: {
        overflow: 'hidden !important'
    },
    textFieldsClassName: {
        margin: '2vh 8vw',
        width: '50%'
    },
    buttonSaveClassName: {
        marginLeft: '11w !important',
        color: `${themeConstant.palette.secondary.dark} !important`
    },
    buttonCloseClassName: {
        marginLeft: '2vw !important',
        color: `${themeConstant.palette.secondary.dark} !important`
    },
    buttonsContainerClassName: {
        marginLeft: '9vw'
    }
});