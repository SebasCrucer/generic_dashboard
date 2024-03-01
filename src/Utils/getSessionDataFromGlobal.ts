export const getSessionDataFromGlobal = async () => {

    let sessionId: string | null = null

    const waitSessionId = () => new Promise<string | null>((resolve) => {
        const interval = setInterval(() => {
            if (window.session) {
                if (!window.session.id) {
                    if (!window.session.sessionLoading) {
                        resolve(null);
                        clearInterval(interval);
                    }
                } else {
                    resolve(window.session.id);
                    clearInterval(interval);
                }
            }
        }, 100);
    });

    sessionId = await waitSessionId();

    return sessionId

}