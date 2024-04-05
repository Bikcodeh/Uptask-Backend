const TASK_TYPES = {
    TaskRepository: Symbol.for('TaskRepository'),
    TaskController: Symbol.for('TaskController'),
    TaskMapper:     Symbol.for('TaskMapper'),
    TaskService:    Symbol.for('TaskService')
}

export { TASK_TYPES };