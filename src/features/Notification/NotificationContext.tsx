import { type ColorPaletteProp, Snackbar, type SnackbarOrigin, type VariantProp } from "@mui/joy";
import { createContext, useContext, useState, type JSX } from "react";

type NotificationOptions = {
    anchorOrigin?: SnackbarOrigin;
    duration?: number;
    variant?: VariantProp;
    color?: ColorPaletteProp;
}

export interface INotificationContext {
    changeAnchorOrigin: (options: SnackbarOrigin) => void;
    changeDuration: (ms: number) => void;
    changeVariant: (variant: VariantProp) => void;
    changeColor: (color: ColorPaletteProp) => void;
    openSnackbar: (message: string | JSX.Element) => void;
    closeSnackbar: () => void;
}

const defaultValues: Required<NotificationOptions> = {
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    duration: 1000,
    variant: "soft",
    color: "success"
}

const NotificationContext = createContext(null as unknown as INotificationContext);
export const NotificationContextProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [snackbarIsOpen, setSnackbarIsOpen] = useState<boolean>(false);
    const [anchorOrigin, setAnchorOrigin] = useState<SnackbarOrigin>(defaultValues.anchorOrigin);
    const [duration, setDuration] = useState<number>(defaultValues.duration);
    const [message, setMessage] = useState<string | JSX.Element>();
    const [variant, setVariant] = useState<VariantProp>(defaultValues.variant);
    const [color, setColor] = useState<ColorPaletteProp>(defaultValues.color);

    const changeAnchorOrigin = (options: SnackbarOrigin) => {
        setAnchorOrigin(options);
    }

    const changeDuration = (ms: number) => {
        setDuration(ms);
    } 

    const changeVariant = (variant: VariantProp) => {
        setVariant(variant);
    }

    const changeColor = (color: ColorPaletteProp) => {
        setColor(color);
    }

    const resetValues = () => {
        changeAnchorOrigin(defaultValues.anchorOrigin);
        changeDuration(defaultValues.duration);
        changeVariant(defaultValues.variant);
        changeColor(defaultValues.color);
    }

    const openSnackbar = (message: string | JSX.Element, opts?: NotificationOptions) => {
        setMessage(message);
        if (opts?.anchorOrigin) changeAnchorOrigin(opts.anchorOrigin);
        if (opts?.duration) changeDuration(opts.duration);
        if (opts?.variant) changeVariant(opts.variant);
        if (opts?.color) changeColor(opts.color);
        setSnackbarIsOpen(true);
    }

    const closeSnackbar = () => {
        setSnackbarIsOpen(false);
        resetValues();
        setMessage(undefined);
    }

    const context = {
        changeAnchorOrigin,
        changeDuration,
        changeVariant,
        changeColor,
        openSnackbar,
        closeSnackbar
    };

    return (
        <NotificationContext.Provider value={context}>
            {children}
            <Snackbar 
                anchorOrigin={anchorOrigin}
                open={snackbarIsOpen}
                onClose={closeSnackbar}
                autoHideDuration={duration}
                variant={variant}
                color={color}
            >
                {message}
            </Snackbar>
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext);