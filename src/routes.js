import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import authMiddleware from './app/middlewares/auth';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Cria um middleware global para as rotas abaixo de authMiddleware

routes.use(authMiddleware);
// Update de usuarios
routes.put('/users', UserController.update);
// Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);
// Listagem de providers
routes.get('/providers', ProviderController.index);
// Agendar atendimento
routes.post('/appointments', AppointmentController.store);
// Cancelar Agendamento
routes.delete('/appointments/:id', AppointmentController.delete);
// Listagem de Agendamentos
routes.get('/appointments', AppointmentController.index);
// Agenda do provider
routes.get('/schedule', ScheduleController.index);
// Notificacoes do provider
routes.get('/notification', NotificationController.index);
// Marcar notificacao como lida
routes.put('/notification/:id', NotificationController.update);
export default routes;
