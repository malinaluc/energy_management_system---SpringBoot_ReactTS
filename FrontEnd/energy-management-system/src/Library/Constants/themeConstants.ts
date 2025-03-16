import { createTheme } from '@mui/material/styles';

export const themeConstant = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5A0B6D',
            light: '#813596',
            dark: '#3D044F',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#FF00FF',
            light: '#FF66FF',
            dark: '#CC00CC',
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#0B0B0F',
            paper: '#181820'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#FF66FF',
            disabled: '#707070'
        },
        divider: '#5A0B6D',
        action: {
            active: '#FFFFFF',
            hover: '#813596',
            selected: '#FF00FF',
            disabled: '#707070',
            disabledBackground: '#181820'
        }
    }
});