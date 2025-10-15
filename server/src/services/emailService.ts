import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface MovieReminderEmailData {
  userEmail: string;
  userName: string;
  movieTitle: string;
  releaseDate: string;
  movieId: string;
}

export class EmailService {
  static async sendMovieReminderEmail(
    data: MovieReminderEmailData,
  ): Promise<boolean> {
    try {
      const { userEmail, userName, movieTitle, releaseDate, movieId } = data;

      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">🎬 Lembrete de Estreia!</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Olá, <strong>${userName}</strong>!</p>
            
            <p>O filme que você adicionou à sua lista estreia hoje!</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #007bff;">
              <h3 style="margin: 0 0 10px 0; color: #007bff;">Filme: ${movieTitle}</h3>
              <p style="margin: 0; color: #666;">Data de estreia: ${releaseDate}</p>
            </div>
          </div>
        </div>
      `;

      const result = await resend.emails.send({
        from: 'Cubos Movies <onboarding@resend.dev>',
        to: [userEmail],
        subject: `🎬 ${movieTitle} estreia hoje!`,
        html: emailContent,
      });

      console.log('Resultado do envio de e-mail:', result);
      return true;
    } catch (error) {
      console.error('Erro ao enviar e-mail de lembrete:', error);
      return false;
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const result = await resend.emails.send({
        from: 'Cubos Movies <onboarding@resend.dev>',
        to: ['test@example.com'],
        subject: 'Teste de Conexão',
        text: 'Este é um teste de conexão com o Resend.',
      });

      return true;
    } catch (error) {
      console.error('Erro no teste de conexão:', error);
      return false;
    }
  }
}
