import { Router } from 'express';
import { Request, Response } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { EmailService } from '../services/emailService';
import { EmailSchedulerService } from '../services/emailSchedulerService';

const router = Router();

router.post('/test-email', protect, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { movieTitle, releaseDate } = req.body;

    const emailData = {
      userEmail: req.user.email,
      userName: req.user.name,
      movieTitle: movieTitle || 'Filme de Teste',
      releaseDate: releaseDate || new Date().toISOString().split('T')[0],
      movieId: 'test-movie-id',
    };

    const success = await EmailService.sendMovieReminderEmail(emailData);

    res.json({
      message: success
        ? 'E-mail enviado com sucesso!'
        : 'Falha ao enviar e-mail',
      success,
      sentTo: req.user.email,
    });
  } catch (error) {
    console.error('Erro no teste de e-mail:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

// Endpoint para agendar um e-mail de teste
router.post('/schedule-test', protect, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { movieTitle, releaseDate } = req.body;

    if (!releaseDate) {
      return res.status(400).json({
        message: 'releaseDate é obrigatório (formato: YYYY-MM-DD)',
      });
    }

    await EmailSchedulerService.scheduleMovieReminderEmail(
      'test-movie-' + Date.now(),
      req.user.id,
      req.user.email,
      req.user.name,
      movieTitle || 'Filme de Teste Agendado',
      releaseDate,
    );

    res.json({
      message: 'E-mail agendado com sucesso!',
      scheduledFor: releaseDate,
      movieTitle: movieTitle || 'Filme de Teste Agendado',
      userEmail: req.user.email,
      activeJobs: EmailSchedulerService.getScheduledJobs(),
    });
  } catch (error) {
    console.error('Erro no agendamento de teste:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

router.get('/scheduled-jobs', protect, (req: Request, res: Response) => {
  try {
    const jobs = EmailSchedulerService.getScheduledJobs();

    res.json({
      message: 'Jobs agendados listados com sucesso',
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error('Erro ao listar jobs:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

export default router;
