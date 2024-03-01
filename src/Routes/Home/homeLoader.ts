import { LoaderFunctionArgs } from "react-router-dom"
import { getSessionDataFromGlobal } from "../../Utils/getSessionDataFromGlobal";

interface HomeType {
    status: 'ok';
    homeData: {
        title: string;
        description: string;
        content: string;
    }
}

export const homeLoaderData: ({ params }: LoaderFunctionArgs) => Promise<
    HomeType | {
        status: 'error';
        error: {
            status: number;
        }
    }
> = async () => {

    const windowSession = await getSessionDataFromGlobal()

    if (!windowSession) {
        return {
            status: 'error',
            error: {
                status: 401
            }
        }
    }
    const data = {
        title: "Home",
        description: "This is the home page",
        content: "This is the home page content",
    }
    return { status: 'ok', homeData: data };

}

type PromiseType<T> = T extends Promise<infer U> ? U : never;

export type homeLoaderData = PromiseType<ReturnType<typeof homeLoaderData>>;