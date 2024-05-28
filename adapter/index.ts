import EventSource from 'eventsource';

const url = 'http://localhost:3000/sse';
const eventSource = new EventSource(url);

eventSource.onopen = () => {
    console.log('Connection to server opened.');
};

eventSource.onmessage = (event) => {
    console.log('New message from server:', event.data);
};

eventSource.onerror = (err) => {
    console.error('EventSource failed:', err);
};

let counter = 0;

setInterval(() => {
    fetch(`http://localhost:3000/event/${counter}`);
    counter++;
}, 1000);
