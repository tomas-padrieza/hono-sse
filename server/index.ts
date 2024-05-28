import { Hono } from 'hono';
import { SSEStreamingApi } from 'hono/streaming';
import { cors } from 'hono/cors';

const app = new Hono();

const { readable, writable } = new TransformStream();
const stream = new SSEStreamingApi(writable, readable);

app.use(
    '*',
    cors({
        origin: '*',
        allowMethods: ['GET'],
        allowHeaders: ['Content-Type'],
    })
);

app.get('/event/:counter', (c) => {
    console.log('event received', c.req.param('counter'));

    stream.writeSSE({
        id: '1',
        event: 'message',
        data: `Hello, world! Counter: ${c.req.param('counter')}`,
    });

    return c.text('success');
});

app.get('/sse', (c) => {
    c.header('Content-Type', 'text/event-stream');
    c.header('Cache-Control', 'no-cache');
    c.header('Connection', 'keep-alive');

    return c.newResponse(stream.responseReadable);
});

export default app;
