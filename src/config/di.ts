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
import {
    AUTH_TYPES,
    AuthController,
    AuthRepositoryMongo,
    AuthService,
    IAuthRepository
} from '../features/auth';

const container = new Container();

/** PROJECTS */
container.bind<ProjectController>(PROJECT_TYPES.ProjectController).to(ProjectController);
container.bind<IProjectRepository>(PROJECT_TYPES.ProjectRepository).to(ProjectRepositoryMongo);
container.bind<ProjectMapper>(PROJECT_TYPES.ProjectMapper).to(ProjectMapper);
container.bind<ProjectService>(PROJECT_TYPES.ProjectService).to(ProjectService);

/** TASKS */
container.bind<Taskcontroller>(TASK_TYPES.TaskController).to(Taskcontroller);
container.bind<ITaskRepository>(TASK_TYPES.TaskRepository).to(TaskRepositoryMongo);
container.bind<TaskMapper>(TASK_TYPES.TaskMapper).to(TaskMapper);
container.bind<TaskService>(TASK_TYPES.TaskService).to(TaskService);

/** AUTH */
container.bind<AuthController>(AUTH_TYPES.AuthController).to(AuthController);
container.bind<IAuthRepository>(AUTH_TYPES.AuthRepository).to(AuthRepositoryMongo);
container.bind<AuthService>(AUTH_TYPES.AuthService).to(AuthService);

export { container };