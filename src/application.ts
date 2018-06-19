
import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer, RestBindings } from '@loopback/rest';
import { MySequence } from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';
import {
  Class,
  Repository,
  RepositoryMixin,
  juggler
} from '@loopback/repository';
/* tslint:enable:no-unused-variable */

export class SafariApiApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options?: ApplicationConfig) {
    super({
      rest: {
        port: process.env.PORT || 3000
      }
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };


    var enviroment = process.env.NODE_ENV;
    var databaseName = process.env.DATABASE_NAME as string;
    var databasePassword = process.env.DATABASE_PASSWORD as string;
    var databaseUser = process.env.DATABASE_USER as string;

    var dataSourceConfig = new juggler.DataSource({
      name: "db",
      connector: "loopback-connector-mysql",
      host: process.env.DATABASE_HOST,
      port: 3306,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    });


    this.dataSource(dataSourceConfig);
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get(RestBindings.PORT);
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
  }
}
