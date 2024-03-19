import { Container } from 'inversify';
import { IProjectRepository } from '../features/projects/domain/repository/ProjectRepository';
import { PROJECT_TYPES } from '../features/projects/domain/types';
import { ProjectController } from '../features/projects/infraestructure/controller/ProjectController';
import { ProjectRepositoryMongo } from '../features/projects/infraestructure/repository/ProjectRepositoryMongo';

const container = new Container({ autoBindInjectable: true });

container.bind<ProjectController>(PROJECT_TYPES.ProjectController).to(ProjectController);
container.bind<IProjectRepository>(PROJECT_TYPES.ProjectRepository).to(ProjectRepositoryMongo);

export default container;