import { clearOverlayEffects, removePopUp } from './popup';
import { WIDGET_EVENT } from './types';

import { CLOSED_EVENT, FINISHING_EVENTS } from '@/constants';
import { isBrowser } from '@/utils';

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
  if (isBrowser) {
    const { onEvent } = hooks;

    const postRobot = await import('post-robot');

    if (activeListener) removeListener();

    activeListener = postRobot.on(WIDGET_EVENT, async (event) => {
      onEvent(event.data);
      if (FINISHING_EVENTS.includes(event.data.eventName)) {
        removePopUp();
      } else if (event.data.eventName === CLOSED_EVENT) {
        clearOverlayEffects();
      }
    });
  }
}

export function setListeners(hooks: Hooks) {
  if (!isBrowser) return;

  buildEventListener(hooks);
}
