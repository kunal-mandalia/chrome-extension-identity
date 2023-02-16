function writeOutput(input) {
    const str = typeof input === "string" ? input : JSON.stringify(input, null, 4);
    document.getElementById("textarea-output").value = str;
}

async function getProfileUserInfo() {
    const user = await chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' });
    writeOutput(user);
    return user;
}

async function getAuthToken() {
    const token = await chrome.identity.getAuthToken({ 'interactive': true });
    writeOutput(token);
    return token;
}

async function verifyUser() {
    const { token } = await getAuthToken();
    const res = await fetch('http://localhost:8080/private', {
        method: 'get',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + token,
          }
    })
    const j = await res.json();
    writeOutput(j);
    return j;
}

async function getPublicAPI() {
    const res = await fetch('http://localhost:8080/public', {
        method: 'get',
        headers: {
            'Content-Type': 'text/plain',
          }
    })
    const j = await res.json();
    writeOutput(j);
    return j;
}

function main() {
    const btnGetProfile = document.getElementById("btn-get-profile");
    btnGetProfile.addEventListener('click', getProfileUserInfo);

    const btnAuthToken = document.getElementById("btn-get-token");
    btnAuthToken.addEventListener('click', getAuthToken);

    const btnAuthUser = document.getElementById("btn-get-user");
    btnAuthUser.addEventListener('click', verifyUser);

    const btnPublic = document.getElementById("btn-public");
    btnPublic.addEventListener('click', getPublicAPI);
}

main();
