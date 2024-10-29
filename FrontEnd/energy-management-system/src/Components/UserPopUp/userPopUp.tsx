import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DEFAULT_PASSWORD, EMPTY_STRING, LABEL_ADDRESS, LABEL_NAME, LABEL_USERNAME, ON_SAVE_BUTTON, ON_UPDATE_BUTTON, VARIANT_OUTLINED } from "../../Library/Constants/constants";
import { themeConstant } from "../../Library/Constants/themeConstants";
import { Role } from "../../Library/Enums/Role";
import { IUser } from "../../Library/Models/IUser";
import { useStyles } from "./userPopUp.styles";
import { IUserPopUpProps } from "./userPopUp.types";

export const UserPopUp = (props: IUserPopUpProps): JSX.Element => {
    const styles = useStyles();

    const [user, setUser] = useState<IUser>(props.currentUser ?? {
        id: NaN,
        name: EMPTY_STRING,
        address: EMPTY_STRING,
        username: EMPTY_STRING,
        password: DEFAULT_PASSWORD,
        role: Role.Client
    });

    const handleClose = () => {
        props.onClose();
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUser({ ...user, name: event.target.value });
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUser({ ...user, address: event.target.value });
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setUser({ ...user, username: event.target.value });
    };

    const handleSaveUser = async (): Promise<void> => {
        if (props.currentUser) {
            const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, user);
            props.loadUsers();
        }
        try {
            const response = await axios.post("http://localhost:8080/api/users", user);
            props.loadUsers();
        } catch (error) {
            console.error("Error saving user:", error);
        }
        handleClose();
    };

    return (
        <ThemeProvider theme={themeConstant.palette.secondary}>
            <Dialog
                open={props.open}
                onClose={handleClose}
            >
                <DialogTitle>{props.currentUser ? "Update User" : "Add User"}</DialogTitle>
                <DialogContent className={styles.root}>
                    <DialogContentText>
                        <p>Please fill in the requierd user information.</p>
                        <p>Take into consideration that the default password will be "1234". And the role will be Client.</p>
                    </DialogContentText>
                    <div className={styles.textFieldsClassName}>
                        <TextField
                            variant={VARIANT_OUTLINED}
                            label={LABEL_USERNAME}
                            value={user.username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className={styles.textFieldsClassName}>
                        <TextField
                            variant={VARIANT_OUTLINED}
                            label={LABEL_NAME}
                            value={user.name}
                            onChange={handleNameChange} />
                    </div>
                    <div className={styles.textFieldsClassName}>
                        <TextField
                            variant={VARIANT_OUTLINED}
                            label={LABEL_ADDRESS}
                            value={user.address}
                            onChange={handleAddressChange} />
                    </div>
                    <div className={styles.buttonsContainerClassName} >
                        <Button
                            className={styles.buttonSaveClassName}
                            variant={VARIANT_OUTLINED}
                            onClick={handleSaveUser}>
                            {props.currentUser
                                ? ON_UPDATE_BUTTON
                                : ON_SAVE_BUTTON
                            }
                        </Button>
                        <Button
                            className={styles.buttonCloseClassName}
                            variant={VARIANT_OUTLINED}
                            onClick={handleClose}>
                            CLOSE
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
};