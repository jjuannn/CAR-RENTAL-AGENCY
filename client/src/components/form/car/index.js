import React, {useEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Button
} from '@chakra-ui/react';
import {AiOutlineSave} from 'react-icons/ai';
import useCars from '../../../hooks/useCars';
export default function CarForm({
  brand,
  model,
  year,
  price_per_day,
  mileage,
  color,
  passengers,
  hasAC,
  gearbox_type,
  images
}) {
  const {addCar, addCarError, addCarSuccess, addCarLoading} = useCars();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (addCarSuccess) {
      setRedirect(true);
    }
  }, [addCarSuccess]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    formData.append('images', URL.createObjectURL(values.images));
    addCar(formData);
  };

  return (
    <Box
      encType='multipart/form-data'
      onSubmit={handleSubmit}
      as='form'
      borderRadius='12px'
      border='1px'
      borderColor='gray.200'
      padding='5'
      width='100%'
    >
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Brand</FormLabel>
        <Input type='text' name='brand' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' name='model' isRequired>
        <FormLabel>Model</FormLabel>
        <Input type='text' name='model' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Year</FormLabel>
        <Input type='number' name='year' maxLength='4' minLength='4' max='2020' isRequired />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Price per day</FormLabel>
        <Input type='number' name='price_per_day' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Mileage</FormLabel>
        <Input type='number' name='mileage' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Color</FormLabel>
        <Input type='text' name='color' />
      </FormControl>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Passengers</FormLabel>
        <Input type='number' name='passengers' maxLength='1' minLength='1' min='1' max='7' />
      </FormControl>
      <Box display='flex' marginBottom='10' flexDirection='row'>
        <FormControl as='fieldset' isRequired>
          <FormLabel>Has AC</FormLabel>
          <RadioGroup defaultValue='true' name='hasAC'>
            <HStack spacing='24px'>
              <Radio value='true'>Yes</Radio>
              <Radio value='false'>No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl as='fieldset' isRequired>
          <FormLabel>Gearbox type</FormLabel>
          <RadioGroup defaultValue='automatic' name='gearbox_type'>
            <HStack spacing='24px'>
              <Radio value='automatic'>Automatic</Radio>
              <Radio value='manual'>Manual</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </Box>
      <FormControl as='fieldset' marginBottom='10' isRequired>
        <FormLabel>Car image</FormLabel>
        <Input padding='1' type='file' name='images' />
      </FormControl>
      <Button type='submit' boxShadow='base' leftIcon={<AiOutlineSave />}>
        Submit{' '}
      </Button>
      {addCarError && (
        <Text fontSize='16px' margin='10' as='em' color='red'>
          {addCarError.message}
        </Text>
      )}
      {redirect && <Redirect from='/car/add' to='/car/list' />}
    </Box>
  );
}
