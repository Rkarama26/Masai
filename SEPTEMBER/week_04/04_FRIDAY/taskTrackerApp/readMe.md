# Task Tracker API
This is a simple Task Tracker API built using Node.js and Express. It allows users to create, read, update, and delete tasks.

## Endpoints

### GET /tasks
- Description: Get all tasks
- Response: List of tasks

### POST /tasks
- Description: Create a new task
- Request Body: Task details (title, description, tag, priority, status)
- Response: Created task

### GET /tasks/filter?tag=tagName
- Description: Get tasks by tag
- Response: List of tasks with the specified tag

### PUT /tasks/:id
- Description: Update a task
- Request Body: Updated task details
- Response: Updated task

### DELETE /tasks/:id
- Description: Delete a task
- Response: Confirmation message