import { ConsentRequestEvent, IFRAME_EVENT } from './types';

type Hooks = {
  onEvent: (event: ConsentRequestEvent) => void;
};

type PostRobotListener = ReturnType<typeof import('post-robot')['on']>;

let activeListener: PostRobotListener | null = null;

function removeListener() {
  if (!activeListener) return;

  activeListener.cancel();
  activeListener = null;
}

export async function setListener(hooks: Hooks) {
  const { onEvent } = hooks;
  const postRobot = await import('post-robot');

  if (activeListener) removeListener();

  activeListener = postRobot.on(IFRAME_EVENT, async (event) => {
    const eventData = event.data as ConsentRequestEvent;
    onEvent(eventData);
  });
}

export { removeListener };
