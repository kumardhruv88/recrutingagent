import traceback
from typing import Dict, Any, List
from app.services.workflow.registry import WorkflowStep


class WorkflowExecutor:
    """
    Executes a sequence of workflow steps synchronously (within the async event loop).
    Maintains a state context dictionary that is passed between steps.
    """

    async def execute(
        self, steps: List[WorkflowStep], initial_payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Iterates through the steps, passing context.
        Returns the final context.
        Raises Exception if any step fails.
        """
        context = initial_payload.copy()

        for step in steps:
            try:
                # Execute the step and update the context
                context = await step(context)
            except Exception as e:
                # Log or handle step failure specifically if needed
                error_msg = (
                    f"Step {step.__name__} failed: {str(e)}\n{traceback.format_exc()}"
                )
                raise RuntimeError(error_msg) from e

        return context
