import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('SpotFinder2 | Boyang Yu')
    .setDescription(
      `The autospace API.
    <h1>Looking for the graphql api?</h1>
    Go to <a href="/graphql" target="_blank">graphql</a>.
    Or,
    You might also be need to use the <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query users{users{ uid }}">
    Apollo exployer</a> for a greater experience.
    `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  console.log(config);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
