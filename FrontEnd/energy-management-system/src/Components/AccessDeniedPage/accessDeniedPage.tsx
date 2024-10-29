import { ACCESS_DENIED_PAGE_SUBTITLE, ACCESS_DENIED_PAGE_SUBTITLE2, ACCESS_DENIED_PAGE_TITLE } from "../../Library/Constants/constants";
import { useStyles } from "../AccessDeniedPage/accessDeniedPage.styles";

export const AccessDeniedPage = (): JSX.Element => {
    const styles = useStyles();

    return (
        <div className={styles.pageContainerClassName}>
            <h1 className={styles.titleClassName}>{ACCESS_DENIED_PAGE_TITLE}</h1>
            <p className={styles.subtitleClassName}>{ACCESS_DENIED_PAGE_SUBTITLE}</p>
            <p className={styles.subtitle2ClassName}>{ACCESS_DENIED_PAGE_SUBTITLE2}</p>
        </div>
    );
};