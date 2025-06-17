import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import fetch from 'node-fetch';
import app from '../index';

let server;

beforeAll(() => {
  server = app.listen(5001);
});

afterAll(() => {
  server.close();
});

describe('API Tests', () => {
  it('GET / should return welcome message', async () => {
    const res = await fetch('http://localhost:5001/');
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toBe('API is running!');
  });

  it('POST /tasks should add a task', async () => {
    const res = await fetch('http://localhost:5001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Task' }),
    });
    const data = await res.json();
    expect(data.title).toBe('Test Task');
  });
  it('PUT /tasks/:id - should update the task', async () => {
    const res = await fetch('http://localhost:5001/tasks/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated Title', completed: true }),
    });
    const data = await res.json();
    expect(data.title).toBe('Updated Title');
    expect(data.completed).toBe(true);
  });

  it('DELETE /tasks/:id - should delete the task', async () => {
    const res = await fetch('http://localhost:5001/tasks/1', {
      method: 'DELETE',
    });
    expect(res.status).toBe(204);

    // Verify it's gone
    const getRes = await fetch('http://localhost:5001/tasks');
    const tasks = await getRes.json();
    expect(tasks.find((t) => t.id === 1)).toBeUndefined();
  });
});
