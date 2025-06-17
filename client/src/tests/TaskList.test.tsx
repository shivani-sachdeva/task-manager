import { render } from "@testing-library/react";
import TaskList from "../components/TaskList";
import { expect, vi, beforeEach, test } from 'vitest';
import '@testing-library/jest-dom';

const mockTasks = [
  { id: "1", title: "Task One", completed: false },
  { id: "2", title: "Task Two", completed: true },
];

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTasks),
    })
  ) as unknown as typeof fetch;
});

test("renders tasks from API", async () => {
  const { findByText } = render(<TaskList />);
  expect(await findByText("Task One")).toBeInTheDocument();
  expect(await findByText("Task Two")).toBeInTheDocument();
});

test("renders input and add button", () => {
  const { getByPlaceholderText, getByText } = render(<TaskList />);
  expect(getByPlaceholderText("New Task")).toBeInTheDocument();
  expect(getByText("Add Task")).toBeInTheDocument();
});

test("checkbox exists for each task", async () => {
  const { findAllByRole } = render(<TaskList />);
  const checkboxes = await findAllByRole("checkbox");
  expect(checkboxes.length).toBe(mockTasks.length);
});
