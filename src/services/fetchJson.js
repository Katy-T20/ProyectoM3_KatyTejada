//Fetch wrapper q vaida respose.ok
export async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
        err.status = response.status;

        try {
            err.body = await response.json();
        } catch {
            err.body = null;
        }
        
        throw err;
    }
    return response.json();
}