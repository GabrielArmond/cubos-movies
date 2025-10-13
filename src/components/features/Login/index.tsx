import { useState } from 'react';
import { AuthCard } from '../../ui/AuthCard';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../../services/authService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      const emailFormatted = email.trim();
      const success = await handleLogin(emailFormatted, password);

      if (success) {
        window.location.href = '/';
      }
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        'Erro interno do servidor. Tente novamente mais tarde.';

      console.error(`Erro ao fazer login: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-auto w-full">
      <AuthCard>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-start w-full flex-1 gap-5">
            <Input
              label="E-mail"
              placeholder="Digite seu E-mail"
              type="text"
              className="w-full"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              className="w-full"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <img
                  src="/src/assets/icons/eye.svg"
                  alt={showPassword ? 'Senha visível' : 'Senha oculta'}
                  className={`cursor-pointer ${
                    showPassword ? 'brightness-0 invert' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? 'Senha visível' : 'Senha oculta'}
                />
              }
            />
            <div className="flex flex-row items-center justify-between w-full">
              <Button variant="link" className="!px-0 !py-0">
                Esqueci minha senha
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="!px-6 !py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center w-full">
          <Button
            variant="link"
            className="!px-0 !py-0 mt-5"
            onClick={() => navigate('/register')}
          >
            Não tem uma conta? Cadastre-se
          </Button>
        </div>
      </AuthCard>
    </div>
  );
};
