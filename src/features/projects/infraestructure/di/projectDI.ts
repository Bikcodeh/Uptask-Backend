import { container } from "../../../../config/di";
import { ProjectController } from '../controller/ProjectController';

container.bind<ProjectController>(ProjectController.NAME).to(ProjectController);