import postRobot from 'post-robot';

function setReady(iframe: HTMLIFrameElement) {
  postRobot.send(iframe.contentWindow, 'ready');
}

function configUser(iframe: HTMLIFrameElement, userEmail: string) {
  postRobot.send(iframe.contentWindow, 'userEmail', userEmail);
}

export { setReady, configUser };
