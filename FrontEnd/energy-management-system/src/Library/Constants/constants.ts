//#region General
export const EMPTY_STRING = "";
//#endregion General

// #region LogIn
export const LOG_IN = "Log In";
export const DONT_HAVE_ACCOUNT = "Dont you have an account?";
export const SIGN_UP = "Sign Up";
export const WRONG_USERNAME_OR_PASSWORD = "Please check your username and password !";
export const ALERT_TITLE_ERROR = "Error";

export const TYPOGRAPHY_VARIANT_H4 = "h4";
export const TYPOGRAPHY_VARIANT_H5 = "h5";
export const TYPOGRAPHY_VARIANT_CAPTION = "caption"
export const ALIGN_CENTER = "center";
export const MARGIN_TOP_4VH = '4vh';
export const MARGIN_TOP_1VH = '4vh';

export const ID_USERNAME_TEXTFIELD = "username";
export const LABEL_USERNAME = "Username";
export const VARIANT_FILLED = "filled";
export const MARGIN_NORMAL = "normal";
export const SIZE_SMALL = "small";

export const ID_PASSWORD_TEXTFIELD = "filled-adornment-password";
export const AUTO_COMPLETE_CURRENT_PASSWORD = 'current-password';
export const ARIA_LABEL_TOGGLE_PASS_VISIBILITY = "toggle password visibility";
export const LABEL_PASSWORD = "Password";
export const ANDORNMENT_POSITION_END = "end";
export const ANDORNMENT_EDGE_END = "end";

export const VARIANT_OUTLINED = "outlined";
export const BUTTON_VARIANT_TEXT = "text";

export const SEVERITY_ERROR = "error";
export const AUTOHIDE_DURATION = 3000;

//#endregion LogIn 

//#region ClientPage
export const TYPOGRAPHY_TITLE_CLIENT: string = " Welcome back, client ! You can see your devices below."
//#endregion ClientPage

//#region AdminPage
export const TYPOGRAPHY_TITLE_ADMIN: string = " Welcome back, admin !"
export const EDIT_DEVICES: string = "Edit Devices";
export const PAIR_USER_DEVICE: string = "Pair user with device";
export const DELETE_USER: string = "Delete user";
export const EDIT_USER: string ="Edit user";
export const ARIA_LABEL_UPDATE: string = "update";
export const ARIA_LABEL_DELETE: string = "delete";
export const ARIA_LABEL_PAIR: string = "pair";
//#endregion AdminPage

//#region RoutingPaths
export const ADMIN_NAVIGATION_PATH: string = "/adminPage";
export const CLIENT_NAVIGATION_PATH: string = "/clientPage";
export const EDIT_DEVICES_NAVIGATION_PATH: string = "/editDevicesPage";
export const ACCESS_DENIED_NAVIGATION_PATH: string = '/accessDeniedPage';
//#endregion RoutingPaths

//#region EditUsersPage
export const DATA_GRID_ID_COLUMN: string = 'ID';
export const DATA_GRID_NAME_COLUMN: string = 'Name';
export const DATA_GRID_ADDRESS_COLUMN: string = 'Address';
export const DATA_GRID_ROLE_COLUMN: string = 'Role';
export const DATA_GRID_USERNAME_COLUMN: string = 'Username';
export const DATA_GRID_PASSWORD_COLUMN: string = 'Password';

export const ICON_BUTTON_UPDATE_ARIA_LABEL: string = 'update';
export const ICON_BUTTON_DELETE_ARIA_LABEL: string = 'delete';

export const PAGE_SIZE_OPTIONS: number[] = [5, 10];

export const SEE_DEVICES_BELOW = "You can see below the devices of the system.";
export const ADD_USER = "Add User";
//#endregion EditUsersPage

//#region UserPopUp
export const ON_SAVE_BUTTON = "Save";
export const ON_UPDATE_BUTTON = "Update";
export const ON_CLOSE_BUTTON = "Close";

export const DEFAULT_PASSWORD = "1234";

export const LABEL_NAME = "Name";
export const LABEL_ADDRESS = "Address";
//#endregion UserPopUp

//#region DevicePopUp
export const UPDATE_DEVICE: string = "Update Device";
export const ADD_DEVICE: string = "Add Device";

export const UPDATE: string = "Update";
export const ADD: string = "Add";

export const LABEL_DESCRIPTION = "Description";
export const LABEL_HOURLY_ENERGY_CONSUMPTION = "Hourlt energy consumption";
//#endregion DevicePopUp

//#region PairDevicePopUp
export const DIALOG_TITLE: string = "You can see below the devices linked for the user selected. Please select one at the time (pair / unpair).";
export const DIALOG_CONTENT_TEXT: string = "From the dropdown select the devices you want to link to the selected user."
export const LABEL_ID: string = "demo-multiple-checkbox-label";
export const ID_MULTIPLE_CHECKBOX: string = "demo-multiple-checkbox";
export const LABEL_TAG : React.ReactNode = "Tag";
export const COMMA_SEPARATOR: string = ", ";
//#endregion PairDevicePopUp

//#region AccessDeniedPage
export const ACCES_DENIED_ERROR_CODE: number = 403;
export const ACCESS_DENIED_PAGE_TITLE: string = "Access Denied";
export const ACCESS_DENIED_PAGE_SUBTITLE: string = "It looks like you don't have the necessary permissions to access this page.";
export const ACCESS_DENIED_PAGE_SUBTITLE2: string = "Please check your credentials and try again, or contact your system administrator if you believe this is an error.";
//#endregion AccessDeniedPage