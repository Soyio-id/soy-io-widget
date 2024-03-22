import postRobot from 'post-robot';
import { FINISHING_EVENTS } from './constants';
import { removePopUp } from './widget';
import * as messageTypes from '../sharedTypes/messages';

type Hooks = {
  onEvent: (event: any) => void,
};

function buildEventListener(hooks: Hooks) {
  const { onEvent } = hooks;

  postRobot.on(messageTypes.WIDGET_EVENT, (event: any) => {
    onEvent(event.data);
    if (FINISHING_EVENTS.includes(event.data.eventName)) {
      removePopUp();
    }
  });
}

export function setListeners(hooks: Hooks) {
  buildEventListener(hooks);
}
