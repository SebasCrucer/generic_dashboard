import { useContext, useEffect } from "react";
import { useRouteError } from "react-router-dom";
import errorRobotLight from "./assets/error-robot.light.svg";
import errorRobotDark from "./assets/error-robot.dark.svg";
import { ThemeContext } from "./contexts/Theme.context";

export const ErrorPage = () => {
    const { theme } = useContext(ThemeContext)!;

    const error = useRouteError() as {
        statusText: string;
        message: string;
    };

    useEffect(() => {
        console.error(error);
    }, [error])


    return (
        <section id="ErrorPage">
            <h1>¡Uy!</h1>
            <p>
                Lo sentimos, ha ocurrido un error inesperado.
            </p>
            <p>
                <code>{error.statusText || error.message}</code>
            </p>
            <img src={
                theme === 'light' ?
                    errorRobotLight :
                    errorRobotDark
            } alt="error" />
        </section>
    )
}