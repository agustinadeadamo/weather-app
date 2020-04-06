# Weather App

## Stack
* Node.js / Espress js
* React.js

## Instalar dependencias 

1 - Clonar repositorio 

2 - Dirigirse a ui-client

3 - Ejecturar npm install

4 - Dirigirse a server

5 - Ejecturar npm install

## Para iniciar la aplicación 

1 - Dirigirse a ui-client

2 - Ejecute el comando npm run dev

## Para iniciar los tests

1 - Dirigirse a ui-client

2 - Ejecute el comando npm run test


## Mejoras que me gustaría implementar con mayor tiempo en un futuro

1 - Me hubiera gustado con mayor tiempo implementar webpack, pero teniendo en cuenta este punto, y que la configuración de create-react-app me era eficiente para el caso, opte por esta segunda opción.

2 - Typescript 

3 - React Testing Library 

4 - Test para el backend

5 - Me hubiera gustado implementar esta api http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10 que permite obtener las ciudades cercanas a la ubicación actual para las cinco ciudades seleccionables que piden en el challenge, la realidad es que esta api la encontré una vez ya finalizada la prueba

6 - También implemente la siguiente api http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key} que obtiene la data de los siguientes cinco días cada tres horas y la modifique desde el back para que el front reciba solo el máximo y el mínimo por día, ya que la que devolvía la data mas acorde a lo que buscaba era la siguiente https://pro.openweathermap.org/data/2.5/climate/month?q=London&appid={YOUR API KEY} pero era paga


