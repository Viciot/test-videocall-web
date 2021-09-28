import './Zoom.css';
import { ZoomMtg } from '@zoomus/websdk';
import { useEffect } from "react";

const crypto = require('crypto') // crypto comes with Node.js

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    // Prevent time sync issue between client signature generation and zoom 
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      'base64'
    );
    const hash = crypto
      .createHmac('sha256', apiSecret)
      .update(msg)
      .digest('base64');
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
      ).toString('base64');

    res(signature);
  });  
}

var apiKey = 'OC2Zj7bWQ9qnEdFUmaURYw'
var apiSecret = "bgqOf3pUjvoGlJL2YKzaPn1KPIR0aymEsA6k";
var meetingNumber = 82471275156
var leaveUrl = 'http://localhost:3000' //our redirect url
var userName = 'WebSDK'
var userEmail = 'test123456@gmail.com'
var passWord = 'FJe97m'

var signature = '';
generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res) => {
  signature = res; 
}); // need to generate based on meeting id - using - role by default 0 - javascript 

const Zoom = () => {
  // loading zoom libraries before joining on component did mount
  useEffect(() => {
    showZoomDiv();
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.9/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting();
  }, []);

  const showZoomDiv = () => {
    document.getElementById('zmmtg-root').style.display = 'block';
  }

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)
    
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
    
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return <div className="App">Zoom</div>;
  
}

export default Zoom;
