from typing import Callable, Dict, Any, Awaitable

# A task is an async function that takes a payload (Dict) and returns a result (Dict)
TaskFunction = Callable[[Dict[str, Any]], Awaitable[Dict[str, Any]]]


class TaskRegistry:
    def __init__(self) -> None:
        self._tasks: Dict[str, TaskFunction] = {}

    def register(self, task_name: str, func: TaskFunction) -> None:
        self._tasks[task_name] = func

    def get_task(self, task_name: str) -> TaskFunction:
        if task_name not in self._tasks:
            raise ValueError(f"Task '{task_name}' is not registered.")
        return self._tasks[task_name]
