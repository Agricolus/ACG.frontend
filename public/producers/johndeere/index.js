


async function handleEvent(e) {
    if (e.origin != window.location.origin) return;
    if (!e.data) return;
    const messagetype = e.data.type;
    const producerParams = e.data.payload;
    //first authentication step: user loging and app authorization
    if (messagetype == "user-authentication") {
        const authconfigs = await (await fetch(producerParams.wellknownUrl)).json();
        console.debug("JS authconfigs", authconfigs)
        const state = `${window.location.origin}${producerParams.handlerSrc}`;
        //redirection
        window.location.href = `${authconfigs.authorization_endpoint}?response_type=code&scope=${producerParams.scopes}&client_id=${producerParams.clientId}&state=${state}&redirect_uri=${producerParams.redirectUrl}`
    }
    // if (messagetype == "organizations-authorization") {
    //     window.location.href = `${producerParams.organizatinUrl}${producerParams.redirectUrl}`;
    // }
}
window.addEventListener("message", handleEvent, false);

const TOKEN_INFO_PARAMETER = "_token_response";
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has(TOKEN_INFO_PARAMETER)) {
    const tokenifo = JSON.parse(urlParams.get(TOKEN_INFO_PARAMETER));
    window.parent.postMessage({ type: "handler-authenticated", tokenifo }, window.location.origin);
}
else {
    window.parent.postMessage({ type: "handler-loaded" }, window.location.origin);
}
