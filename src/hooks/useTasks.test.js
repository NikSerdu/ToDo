import { act, renderHook } from "@testing-library/react";
import useTasks from "./useTasks";

describe("useTasks", () => {
  test("should add a new task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.addNewTask("New Task");
    });
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("New Task");
  });
});
