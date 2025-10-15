import * as cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { EmailService, MovieReminderEmailData } from './emailService';

const prisma = new PrismaClient();

export interface ScheduledEmail {
  id: string;
  movieId: string;
  userId: string;
  userEmail: string;
  movieTitle: string;
  releaseDate: string;
  cronExpression: string;
  isActive: boolean;
}

export class EmailSchedulerService {
  private static scheduledJobs: Map<string, cron.ScheduledTask> = new Map();
  // Manter console.log para ver os logs do cron
  static async scheduleMovieReminderEmail(
    movieId: string,
    userId: string,
    userEmail: string,
    userName: string,
    movieTitle: string,
    releaseDate: string,
  ): Promise<void> {
    try {
      const releaseDateObj = this.parseDate(releaseDate);
      const now = new Date();

      const nowDateOnly = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const releaseDateOnly = new Date(
        releaseDateObj.getFullYear(),
        releaseDateObj.getMonth(),
        releaseDateObj.getDate(),
      );

      if (releaseDateOnly <= nowDateOnly) {
        console.log(
          `Data de lançamento ${releaseDate} não é futura. E-mail não será agendado.`,
        );
        return;
      }

      const cronExpression = this.generateCronExpression(releaseDateObj);

      console.log(
        `Agendando e-mail para ${releaseDate} com expressão cron: ${cronExpression}`,
      );

      const jobId = `${movieId}-${userId}`;

      const task = cron.schedule(
        cronExpression,
        async () => {
          console.log(`Executando envio de e-mail para o filme: ${movieTitle}`);

          const emailData: MovieReminderEmailData = {
            userEmail,
            userName,
            movieTitle,
            releaseDate,
            movieId,
          };

          const success = await EmailService.sendMovieReminderEmail(emailData);

          if (success) {
            console.log(
              `E-mail de lembrete enviado com sucesso para ${userEmail} sobre o filme ${movieTitle}`,
            );
            this.cancelScheduledEmail(jobId);
          } else {
            console.error(
              `Falha ao enviar e-mail de lembrete para ${userEmail} sobre o filme ${movieTitle}`,
            );
          }
        },
        {
          timezone: 'America/Sao_Paulo',
        },
      );

      this.scheduledJobs.set(jobId, task);

      console.log(
        `E-mail agendado com sucesso para ${releaseDate} - Filme: ${movieTitle}`,
      );
    } catch (error) {
      console.error('Erro ao agendar e-mail de lembrete:', error);
    }
  }

  static cancelScheduledEmail(jobId: string): void {
    const task = this.scheduledJobs.get(jobId);
    if (task) {
      task.stop();
      task.destroy();
      this.scheduledJobs.delete(jobId);
      console.log(`Job ${jobId} cancelado com sucesso`);
    }
  }

  private static generateCronExpression(date: Date): string {
    const minute = 0;
    const hour = 9;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${minute} ${hour} ${day} ${month} *`;
  }

  static getScheduledJobs(): string[] {
    return Array.from(this.scheduledJobs.keys());
  }

  static isJobScheduled(jobId: string): boolean {
    return this.scheduledJobs.has(jobId);
  }

  static async initializeScheduler(): Promise<void> {
    console.log('Inicializando serviço de agendamento de e-mails...');

    try {
      console.log('Serviço de agendamento inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar serviço de agendamento:', error);
    }
  }

  static stopAllJobs(): void {
    this.scheduledJobs.forEach((task, jobId) => {
      task.stop();
      task.destroy();
    });
    this.scheduledJobs.clear();
    console.log('Todos os jobs foram parados');
  }

  private static parseDate(dateString: string): Date {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(dateRegex);

    if (match) {
      const [, day, month, year] = match;
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        9,
        0,
        0,
      );
    }

    const isoDate = new Date(dateString + 'T09:00:00');
    if (isNaN(isoDate.getTime())) {
      throw new Error(`Formato de data inválido: ${dateString}`);
    }

    return isoDate;
  }
}
