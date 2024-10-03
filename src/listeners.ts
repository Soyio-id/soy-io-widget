import * as messageTypes from '../sharedTypes/messages';

import { CLOSED_EVENT, FINISHING_EVENTS } from './constants';
import { clearOverlayEffects, removePopUp } from './widget';

type Hooks = {
  onEvent: (event: any) => void,
};

let isListenerSet = false;

async function buildEventListener(hooks: Hooks) {
  const { onEvent } = hooks;

  const postRobot = await import('post-robot');

  if (!isListenerSet) {
    postRobot.on(messageTypes.WIDGET_EVENT, async (event: any) => {
      onEvent(event.data);
      if (FINISHING_EVENTS.includes(event.data.eventName)) {
        removePopUp();
      } else if (event.data.eventName === CLOSED_EVENT) {
        clearOverlayEffects();
      }
    });
    isListenerSet = true;
  }
}

export function setListeners(hooks: Hooks) {
  buildEventListener(hooks);
}
