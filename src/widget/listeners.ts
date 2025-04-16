import { WIDGET_EVENT } from './constants';
import { clearOverlayEffects, removePopUp } from './popup';
import type { EventData } from './types';

import { CLOSED_EVENT, FINISHING_EVENTS } from '@/constants';

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

  activeListener = postRobot.on(WIDGET_EVENT, async ({ data }: { data: EventData }) => {
    onEvent(data);
    if (FINISHING_EVENTS.includes(data.eventName)) {
      removePopUp();
    } else if (data.eventName === CLOSED_EVENT) {
      clearOverlayEffects();
    }

    return Promise.resolve();
  });
}

export function setListeners(hooks: Hooks) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  buildEventListener(hooks);
}
