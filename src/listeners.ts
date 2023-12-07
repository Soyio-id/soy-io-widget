import postRobot from 'post-robot';

type ListenerCallback = () => void;

function onMounted(configure: ListenerCallback) {
  postRobot.on('mounted', () => {
    configure();
  });
}

export { onMounted };
