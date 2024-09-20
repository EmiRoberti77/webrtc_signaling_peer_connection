const localVideEl = document.querySelector('#local-video');
const remoteVideEl = document.querySelector('#remote-video');

let localStream;
let remoteStream;
let peerConnection; // the pier connection that the two clients talk

const call = async (e) => {
  console.log('call btn');
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  localVideEl.srcObject = stream;
  localStream = stream;

  await createPeerConnection();

  //create offer
  try {
    console.log('creating offer');
    const offer = await peerConnection.createOffer();
    console.log(offer);
  } catch (err) {
    console.error(err);
  }
};

//The RTCConnection is the thing that creates the connection
//we pass the config object that contains the STUN servers information
//which will fetch the ICE candidates
//( the icec will eventually be passed to the other browser)
const createPeerConnection = async () => {
  console.log('iceServer', peerConfiguration);
  return new Promise(async (resolve, reject) => {
    peerConnection = await new RTCPeerConnection(peerConfiguration);
    peerConnection.addEventListener('icecandidate', (e) => {
      console.log('Ice candidate found');
      console.log(e);
    });
    resolve();
  });
};

document.querySelector('#call').addEventListener('click', call);
