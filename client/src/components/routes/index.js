import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import HomePage from '../../pages/home';
//
import CarList from '../../pages/_car/list';
import AddCar from '../../pages/_car/add';
import CarDetail from '../../pages/_car/detail';
import EditCar from '../../pages/_car/edit';
//
import ClientList from '../../pages/_client/list';
import ClientDetail from '../../pages/_client/detail';
import AddClient from '../../pages/_client/add';
import EditClient from '../../pages/_client/edit';

export default function AppRoutes() {
  return (
    <>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/car/list' exact>
        <CarList />
      </Route>
      <Route path='/car/add' exact>
        <AddCar />
      </Route>
      <Route path='/car/view/id=:id' exact>
        <CarDetail />
      </Route>
      <Route path='/car/edit/id=:id' exact>
        <EditCar />
      </Route>

      <Route path='/client/list' exact>
        <ClientList />
      </Route>
      <Route path='/client/add' exact>
        <AddClient />
      </Route>
      <Route path='/client/view/id=:id' exact>
        <ClientDetail />
      </Route>
      <Route path='/client/edit/id=:id' exact>
        <EditClient />
      </Route>

      <Route path='/rental/list' exact></Route>
      <Route path='/rental/add' exact></Route>
      <Route path='/rental/view/id=:id' exact></Route>
      <Route path='/rental/edit/id=:id' exact></Route>

      <Route path='/test' exact>
        <p>Test path</p>
      </Route>
    </>
  );
}
