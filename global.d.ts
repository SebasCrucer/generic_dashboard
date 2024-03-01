export interface WindowSession {
    id: string | null;
    sessionLoading: boolean;
}

declare global {
    interface Window {
        session: WindowSession | undefined;
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'box-icon': unknown;
        }
    }
}