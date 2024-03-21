import postRobot from 'post-robot';
import { FINISHING_EVENTS } from './constants';
import { removeWidget } from './widget';
import * as messageTypes from '../sharedTypes/messages';

type Hooks = {
  configure: () => void,
  onEvent: (event: any) => void,
};

function buildEventListener(hooks: Hooks) {
  const { configure, onEvent } = hooks;

  postRobot.on(messageTypes.WIDGET_MOUNTED, () => {
    configure();
  });

  postRobot.on(messageTypes.WIDGET_EVENT, (event: any) => {
    onEvent(event.data);
    if (FINISHING_EVENTS.includes(event.data.eventName)) {
      removeWidget();
    }
  });
}

export function setListeners(hooks: Hooks) {
  buildEventListener(hooks);
}
