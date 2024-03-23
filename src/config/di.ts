import { Container } from 'inversify';
import {
    IProjectRepository,
    PROJECT_TYPES,
    ProjectController,
    ProjectRepositoryMongo,
    ProjectMapper,
    ProjectService
} from '../features/projects';
import {
    ITaskRepository,
    TASK_TYPES,
    TaskMapper,
    TaskRepositoryMongo,
    TaskService,
    Taskcontroller
} from '../features/tasks';

const container = new Container();

container.bind<ProjectController>(PROJECT_TYPES.ProjectController).to(ProjectController);
container.bind<IProjectRepository>(PROJECT_TYPES.ProjectRepository).to(ProjectRepositoryMongo);
container.bind<ProjectMapper>(PROJECT_TYPES.ProjectMapper).to(ProjectMapper);
container.bind<ProjectService>(PROJECT_TYPES.ProjectService).to(ProjectService);

container.bind<Taskcontroller>(TASK_TYPES.TaskController).to(Taskcontroller);
container.bind<ITaskRepository>(TASK_TYPES.TaskRepository).to(TaskRepositoryMongo);
container.bind<TaskMapper>(TASK_TYPES.TaskMapper).to(TaskMapper);
container.bind<TaskService>(TASK_TYPES.TaskService).to(TaskService);

export default container;