import { Global, Module, Logger } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Global()
@Module({
  imports: [
    //injecting typeorm  database config
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('typeorm');
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        const logger = new Logger('database-connection');
        logger.log('database-connection 👉' + '-' + dataSource.isInitialized);
        console.log('database-name 👉', process.env.DATABASE_NAME);
        return dataSource;
      },
    }),

    // Injecting grapgql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'src/shared/graphql-schemas/schema.gql',
      ),
      sortSchema: true,
      // context: ({ req, res }) => ({ req, res }),
    }),

    //Injecting logger module
    LoggerModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class SharedModule {}
