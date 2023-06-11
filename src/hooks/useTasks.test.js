import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../Components/screens/Home/Home";
describe("useTasks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without errors", () => {
    render(<Home />);

    expect(screen.getByText("Todos")).toBeInTheDocument();
  });
  it("adds a task to the list and stores it to localStorage", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("123")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "     " } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.queryByText("     ")).not.toBeInTheDocument();
    const localTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(localTasks).toEqual([{ id: 0, isDone: false, title: "123" }]);
  });
  it("delete a task to the list and check it to localStorage", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Task1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "Task2" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const deleteTask2 = screen.getByTestId("deleteTask2");
    fireEvent.click(deleteTask2);

    expect(screen.getByText("Task1")).toBeInTheDocument();
    expect(screen.queryByText("Task2")).not.toBeInTheDocument();

    const localTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(localTasks).toEqual([{ id: 0, isDone: false, title: "Task1" }]);
  });
  it("toggle a task and check it to localStorage", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Task1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "Task2" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const toggleTask1 = screen.getByTestId("toggle1");
    fireEvent.click(toggleTask1);

    const localTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(localTasks).toEqual([
      { id: 0, isDone: true, title: "Task1" },
      { id: 1, isDone: false, title: "Task2" },
    ]);
  });
  it("show only active tasks", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Task1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "Task2" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const toggleTask1 = screen.getByTestId("toggle1");
    fireEvent.click(toggleTask1);
    const activeFilter = screen.getByText("Active");
    fireEvent.click(activeFilter);
    expect(screen.getByText("Task2")).toBeInTheDocument();
    expect(screen.queryByText("Task1")).not.toBeInTheDocument();
  });
  it("show only completed tasks", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Task1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "Task2" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const toggleTask1 = screen.getByTestId("toggle1");
    fireEvent.click(toggleTask1);
    const activeFilter = screen.getByText("Completed");
    fireEvent.click(activeFilter);
    expect(screen.getByText("Task1")).toBeInTheDocument();
    expect(screen.queryByText("Task2")).not.toBeInTheDocument();
  });
  it("clear tasks", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Task1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "Task2" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const toggleTask1 = screen.getByTestId("toggle1");
    fireEvent.click(toggleTask1);
    const activeFilter = screen.getByText("Active");
    const allFilter = screen.getByText("All");
    fireEvent.click(activeFilter);
    const clear = screen.getByText("Clear");
    fireEvent.click(clear);
    expect(screen.queryByText("Task1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task2")).not.toBeInTheDocument();
    fireEvent.click(allFilter);
    expect(screen.getByText("Task1")).toBeInTheDocument();
    const localTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(localTasks).toEqual([{ id: 0, isDone: true, title: "Task1" }]);
  });
  it("toggle active tasks when an Active filter  is active", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Task1" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "Task2" } });
    fireEvent.keyDown(input, { key: "Enter" });
    const toggleTask1 = screen.getByTestId("toggle1");
    const activeFilter = screen.getByText("Active");
    fireEvent.click(toggleTask1);
    fireEvent.click(activeFilter);
    expect(screen.getByText("Task2")).toBeInTheDocument();
    const toggleTask2 = screen.getByTestId("toggle2");
    fireEvent.click(toggleTask2);
    expect(screen.queryByText("Task2")).not.toBeInTheDocument();
  });
});
