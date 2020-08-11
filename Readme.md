# Clinica API (Teste)

  - [Documentação da API](https://documenter.getpostman.com/view/11653917/T1LLDTGu)

### Dev


Instalar as dependencias para iniciar os desenvolvimentos
* Precisa do arquivo .env para o desenvolvimento e produção
```sh
npm install
npm run dev
```

Sequelize
1. Criar o banco
2. Criar as tabelas do banco
3. Popular o banco com alguns dados para dev
```
npx run sequelize db:create
npx run sequelize db:migrate
npx run sequelize db:seed:all
```

### Tecnologia usadas

| Nome | 
| ------ |
| NodeJS | 
| Typescript |
| Sequelize |
| MySQL |
