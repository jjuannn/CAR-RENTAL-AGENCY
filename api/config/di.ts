import {Sequelize} from 'sequelize';
import DIContainer, {object, get, factory} from 'rsdi';
import {CarRepository, CarModel, CarController, CarService} from '../module/car/module';
import {
  ClientRepository,
  ClientModel,
  ClientController,
  ClientService
} from '../module/client/module';
import {
  RentalRepository,
  RentalModel,
  RentalController,
  RentalService
} from '../module/rental/module';

import multer from 'multer';

function configureDatabase(): Sequelize {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.MAIN_DB_PATH
  });

  return sequelize;
}

function configureCarModel(container: DIContainer) {
  return CarModel.setup(container.get('Sequelize'));
}

function configureClientModel(container: DIContainer) {
  return ClientModel.setup(container.get('Sequelize'));
}

function configureRentalModel(container: DIContainer) {
  RentalModel.setup(container.get('Sequelize'));
  RentalModel.setupAssociations(container.get('CarModel'), container.get('ClientModel'));
  return RentalModel;
}

function configureMulter() {
  const upload = multer({
    dest: process.env.UPLOAD_MULTER_DIR
  });

  return upload;
}

function addCarModuleDefinitions(container: DIContainer) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('multer'), get('CarRepository')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('CarModel')),
    CarModel: factory(configureCarModel)
  });
}

function addRentalModelDefinitions(container: DIContainer) {
  container.addDefinitions({
    RentalController: object(RentalController).construct(
      get('RentalService'),
      get('CarController'),
      get('ClientController')
    ),
    RentalService: object(RentalService).construct(get('RentalRepository')),
    RentalRepository: object(RentalRepository).construct(
      get('RentalModel'),
      get('ClientModel'),
      get('CarModel')
    ),
    RentalModel: factory(configureRentalModel)
  });
}

function addClientModuleDefinitions(container: DIContainer) {
  container.addDefinitions({
    ClientController: object(ClientController).construct(get('ClientService')),
    ClientService: object(ClientService).construct(get('ClientRepository')),
    ClientRepository: object(ClientRepository).construct(get('ClientModel')),
    ClientModel: factory(configureClientModel)
  });
}

function addCommonDefinitions(container: DIContainer) {
  container.addDefinitions({
    Sequelize: factory(configureDatabase),
    multer: factory(configureMulter)
  });
}

function configureContainer(): DIContainer {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addClientModuleDefinitions(container);
  addRentalModelDefinitions(container);
  return container;
}

export {configureContainer};