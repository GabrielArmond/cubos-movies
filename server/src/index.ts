import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // CREATE - usar create() ao invés de findFirst()
  const user = await prisma.user.create({
    data: {
      email: 'teste@teste.com',
      name: 'Teste user',
      password: '123456',
    },
  });

  console.log('Usuário criado:', user);

  // READ - buscar todos os usuários
  const allUsers = await prisma.user.findMany();
  console.log('\nTodos os usuários:');
  console.log(JSON.stringify(allUsers, null, 2));

  // UPDATE
  const updatedUser = await prisma.user.update({
    where: { email: 'teste@teste.com' },
    data: { name: 'Teste user atualizado' },
  });
  console.log('\nUsuário atualizado:', updatedUser);

  // DELETE
  const deletedUser = await prisma.user.delete({
    where: { email: 'teste@teste.com' },
  });
  console.log('\nUsuário deletado:', deletedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
