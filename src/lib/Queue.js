import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  // Para cada job, cria uma fila, adiciona o bee,
  // que possui acesso ao redis(armazenar e recuperar valores)
  // handle processa a fila, recebe variaveis do contexto
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig
        }),
        handle
      };
    });
  }

  // Adiciona um job na fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Processamento de cada job em background
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailture).process(handle);
    });
  }

  handleFailture(job, err) {
    console.log(`Queue: ${job.queue.name} FAILED!`, err);
  }
}

export default new Queue();
