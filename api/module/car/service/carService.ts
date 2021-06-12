import Car from '../entity/car';
import InvalidIdError from './error/invalidId';
import InvalidCarError from './error/invalidCar';
import ICarService from './interface/ICarService';
import ICarRepository from '../repository/interface/ICarRepository';

export default class Service implements ICarService {
  constructor(public carRepository: ICarRepository) {}

  async saveNewCar(car: Car): Promise<Car> {
    if (car === undefined) {
      throw new InvalidCarError();
    }
    return this.carRepository.saveNewCar(car);
  }

  async saveEditedCar(car: Car): Promise<Car> {
    if (car === undefined) {
      throw new InvalidCarError();
    }
    return this.carRepository.saveEditedCar(car);
  }
  async getById(id: number): Promise<Car> {
    if (id === undefined) {
      throw new InvalidIdError();
    }
    return this.carRepository.getById(id);
  }
  async delete(id: number): Promise<Boolean> {
    if (id === undefined) {
      throw new InvalidIdError();
    }
    return this.carRepository.delete(id);
  }
  async getAll(): Promise<Car[]> {
    return this.carRepository.getAll();
  }
}
