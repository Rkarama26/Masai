class TaskService {
  createTask(name: string) {
    console.log(`Creating task: ${name}`);
  }
}

class EmailService {
  sendEmail(to: string) {
    console.log(`Sending email to ${to}`);
  }
}

class TaskManager {
  private taskService: TaskService;
  private emailService: EmailService;

  constructor(taskService: TaskService, emailService: EmailService) {
    this.taskService = taskService;
    this.emailService = emailService;
  }

  createTask(name: string, notifyEmail?: string) {
    this.taskService.createTask(name);
    if (notifyEmail) {
      this.emailService.sendEmail(notifyEmail);
    }
  }
}
