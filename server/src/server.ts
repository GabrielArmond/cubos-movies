import app from './app';
import config from './config/config';
import { EmailSchedulerService } from './services/emailSchedulerService';

EmailSchedulerService.initializeScheduler();

app.listen(config.port, () => {
  console.log(
    `Server running in ${config.nodeEnv} mode on port ${config.port}`,
  );
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  EmailSchedulerService.stopAllJobs();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  EmailSchedulerService.stopAllJobs();
  process.exit(0);
});
