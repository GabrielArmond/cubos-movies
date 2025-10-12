import { useState } from 'react';
import { AuthCard } from '../../ui/AuthCard';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const Login = () => {
  const [nameOrEmail, setNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nameOrEmail || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Form submitted: ', { nameOrEmail, password });
  };
  return (
    <div className="flex justify-center items-center my-auto w-full">
      <AuthCard>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-start w-full flex-1 gap-5">
            <Input
              label="Nome/E-mail"
              placeholder="Digite seu nome/E-mail"
              type="text"
              className="w-full"
              autoComplete="off"
              value={nameOrEmail}
              onChange={(e) => setNameOrEmail(e.target.value)}
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
              <Button type="submit" variant="primary" className="!px-6 !py-2">
                Entrar
              </Button>
            </div>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};
