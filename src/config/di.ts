import { Container } from 'inversify';
import {
    IProjectRepository,
    PROJECT_TYPES,
    ProjectController,
    ProjectRepositoryMongo
} from '../features/projects';
import {
    ITaskRepository,
    TASK_TYPES,
    TaskRepositoryMongo,
    Taskcontroller
} from '../features/tasks';

const container = new Container();

container.bind<ProjectController>(PROJECT_TYPES.ProjectController).to(ProjectController);
container.bind<IProjectRepository>(PROJECT_TYPES.ProjectRepository).to(ProjectRepositoryMongo);

container.bind<Taskcontroller>(TASK_TYPES.TaskController).to(Taskcontroller);
container.bind<ITaskRepository>(TASK_TYPES.TaskRepository).to(TaskRepositoryMongo);

export default container;