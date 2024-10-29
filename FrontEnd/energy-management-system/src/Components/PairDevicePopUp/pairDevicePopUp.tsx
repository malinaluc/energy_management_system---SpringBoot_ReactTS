import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { DIALOG_CONTENT_TEXT, DIALOG_TITLE } from "../../Library/Constants/constants";
import { IPairDevicePopUpProps } from "./pairDevicePopUp.types";
import { DataGrid } from "@mui/x-data-grid";

export const PairDevicePopUp = (props : IPairDevicePopUpProps): JSX.Element => {


    return (
        <ThemeProvider theme={themeConstant}>
            <Fragment>
                <Dialog
                    open={props.open}
                    onClose={props.onClose}
                >
                    <DialogTitle>{DIALOG_TITLE}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {DIALOG_CONTENT_TEXT}
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Close</Button>
                        <Button>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </ThemeProvider>
    );
}