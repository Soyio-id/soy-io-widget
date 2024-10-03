import * as messageTypes from '../sharedTypes/messages';

import { CLOSED_EVENT, FINISHING_EVENTS } from './constants';
import { clearOverlayEffects, removePopUp } from './widget';

type Hooks = {
  onEvent: (event: any) => void;
};

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

let activeListener: PostRobotListener | null = null;

function removeListener() {
  if (!activeListener) return;

  activeListener.cancel();
  activeListener = null;
}

async function buildEventListener(hooks: Hooks) {
  const { onEvent } = hooks;

  const postRobot = await import('post-robot');

  if (activeListener) removeListener();

  activeListener = postRobot.on(messageTypes.WIDGET_EVENT, async (event) => {
    onEvent(event.data);
    if (FINISHING_EVENTS.includes(event.data.eventName)) {
      removePopUp();
    } else if (event.data.eventName === CLOSED_EVENT) {
      clearOverlayEffects();
    }
  });
}

export function setListeners(hooks: Hooks) {
  buildEventListener(hooks);
}
