from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """Called when a Locust start before any task is scheduled."""
        pass

    @task(3)
    def check_health(self):
        self.client.get("/api/v1/health/health")

    @task(1)
    def check_ready(self):
        self.client.get("/api/v1/health/ready")

    @task(1)
    def check_live(self):
        self.client.get("/api/v1/health/live")
