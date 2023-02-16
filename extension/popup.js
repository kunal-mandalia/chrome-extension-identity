function writeOutput(input) {
    const str = typeof input === "string" ? input : JSON.stringify(input, null, 4);
    document.getElementById("textarea-output").value = str;
}

async function getProfileUserInfo() {
    const user = await chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' });
    writeOutput(user);
}

async function getAuthToken() {
    const token = await chrome.identity.getAuthToken({ 'interactive': true });
    writeOutput(token);
}

function main() {
    const btnGetProfile = document.getElementById("btn-get-profile");
    btnGetProfile.addEventListener('click', getProfileUserInfo);

    const btnAuthToken = document.getElementById("btn-get-token");
    btnAuthToken.addEventListener('click', getAuthToken);
}

main();
