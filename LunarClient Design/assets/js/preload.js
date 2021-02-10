const electron = require("electron");
const remote = electron.remote;
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("directoryW", (event, data) => {
        document.getElementById("path").innerHTML = data;
});

document.getElementById("cape-load").addEventListener("click", function () {
        ipcRenderer.send('cape-load', 'ping')
});
document.getElementById("cape-unload").addEventListener("click", function () {
        ipcRenderer.send('cape-unload', 'ping')
});
document.getElementById("close-btn").addEventListener("click", function () {
        const windowXD = remote.getCurrentWindow();
        windowXD.close();
});