from typing import Callable, Awaitable, Dict, Any, List

# A workflow step is an async function that takes a context dictionary and returns an updated context dictionary
WorkflowStep = Callable[[Dict[str, Any]], Awaitable[Dict[str, Any]]]


class WorkflowRegistry:
    """Registry for workflow definitions (name -> list of steps)."""

    def __init__(self) -> None:
        self._workflows: Dict[str, List[WorkflowStep]] = {}

    def register(self, name: str, steps: List[WorkflowStep]) -> None:
        self._workflows[name] = steps

    def get(self, name: str) -> List[WorkflowStep]:
        if name not in self._workflows:
            raise ValueError(f"Workflow '{name}' not found.")
        return self._workflows[name]


class TriggerRegistry:
    """Registry mapping trigger names to workflow names."""

    def __init__(self) -> None:
        self._triggers: Dict[str, List[str]] = {}

    def register(self, trigger_name: str, workflow_name: str) -> None:
        if trigger_name not in self._triggers:
            self._triggers[trigger_name] = []
        if workflow_name not in self._triggers[trigger_name]:
            self._triggers[trigger_name].append(workflow_name)

    def get_workflows_for_trigger(self, trigger_name: str) -> List[str]:
        return self._triggers.get(trigger_name, [])
