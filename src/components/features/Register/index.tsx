import { useState } from 'react';
import { AuthCard } from '../../ui/AuthCard';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { handleRegister } from '../../../services/authService';
import { validateEmail } from '../../../utils';

export const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await handleRegister(name, email, password);

      if (success) {
        window.location.href = '/login';

        alert('Registro realizado com sucesso! Por favor, faça login.');
      }
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        'Erro interno do servidor. Tente novamente mais tarde.';

      console.error(`Erro ao registrar: ${errorMessage}`);
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
              label="Nome"
              placeholder="Digite seu nome"
              type="text"
              className="w-full"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="E-mail"
              placeholder="Digite seu e-mail"
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
            <Input
              label="Confirmação de senha"
              placeholder="Digite sua senha novamente"
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={
                <img
                  src="/src/assets/icons/eye.svg"
                  alt={showConfirmPassword ? 'Senha visível' : 'Senha oculta'}
                  className={`cursor-pointer ${
                    showConfirmPassword ? 'brightness-0 invert' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword((prev) => !prev);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={
                    showConfirmPassword ? 'Senha visível' : 'Senha oculta'
                  }
                />
              }
            />

            <div className="flex flex-row items-center justify-end w-full">
              <Button
                type="submit"
                variant="primary"
                className="!px-6 !py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrar...' : 'Cadastrar'}
              </Button>
            </div>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};
