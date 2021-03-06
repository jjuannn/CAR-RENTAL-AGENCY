import Car from '../entity/car';
import {CarModel} from '../module';
export function formToEntity(car: Car): Car {
  console.log(car);
  const {
    id,
    brand,
    model,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  } = car;
  return new Car(
    Number(id),
    brand,
    model,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  );
}

export function dbToEntity(carModel: typeof CarModel): Car {
  const {
    id,
    brand,
    model,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  } = carModel.toJSON();
  const image_url = `http://localhost:8080${images}`;
  return new Car(
    id,
    brand,
    model,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    image_url
  );
}
