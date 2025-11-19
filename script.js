const socket = io();


let pc = peers[from];


if (data.type === "offer") {
await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
const ans = await pc.createAnswer();
await pc.setLocalDescription(ans);
socket.emit("signal", { to: from, data: { type: "answer", sdp: pc.localDescription } });
} else if (data.type === "answer") {
await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
} else if (data.type === "ice") {
if (data.candidate) pc.addIceCandidate(data.candidate).catch(() => {});
}
});


socket.on("user-left", (id) => {
if (peers[id]) peers[id].close();
delete peers[id];
renderUsers();
});


function createPeer(id) {
const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });


pc.onicecandidate = (e) => {
if (e.candidate) {
socket.emit("signal", { to: id, data: { type: "ice", candidate: e.candidate } });
}
};


pc.ontrack = (e) => {
let audio = document.getElementById(`a-${id}`);
if (!audio) {
audio = document.createElement("audio");
audio.id = `a-${id}`;
audio.autoplay = true;
usersDiv.appendChild(audio);
}
audio.srcObject = e.streams[0];
};


renderUsers();
return pc;
}


function renderUsers() {
usersDiv.innerHTML = "";
Object.keys(peers).forEach((id) => {
const div = document.createElement("div");
div.innerText = "User " + id;
usersDiv.appendChild(div);
});
}
