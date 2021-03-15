

async function handleEvent(e) {
  if (e.origin != window.location.origin) return;
  if (!e.data) return;
  const messagetype = e.data.type;
  const containerParams = e.data.payload;
  if (messagetype == "check-user-token") {
    const tokenchek = await (await fetch(`${containerParams.checkTokenUrl}/${containerParams.userId}`)).json();
    window.parent.postMessage({ type: "handler-user-token-check", tokenValid: tokenchek }, window.location.origin);
  }
  //first authentication step: user loging and app authorization
  if (messagetype == "user-authentication") {
    const authconfigs = await (await fetch(containerParams.wellknownUrl)).json();
    console.debug("JS authconfigs", authconfigs)
    const state = `${window.location.origin}${containerParams.handlerSrc}`;
    //redirection
    window.location.href = `${authconfigs.authorization_endpoint}?response_type=code&scope=${containerParams.scopes}&client_id=${containerParams.clientId}&state=${state}&redirect_uri=${containerParams.redirectUrl}`
  }
  if (messagetype == "register-user") {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        userid: containerParams.userid,
        accessToken: containerParams.accessToken,
        refreshToken: containerParams.refreshToken,
        expiresIn: containerParams.expiresIn
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const resgistrationResponse = await fetch(containerParams.registerUserUrl, options);
    window.parent.postMessage({ type: "handler-user-registered", registered: resgistrationResponse.ok }, window.location.origin);
  }
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
