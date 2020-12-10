<template lang="pug">
  .geolocation-component
    ._container._get-geo-access-request(v-if="getGeoAccessRequest")
      p Разрешите доступ к данным местоположения
    ._container._weather(v-if="!getGeoAccessRequest && !getGeoAccessFailed && !getDataFailed")
      h1._full-width._city {{ weatherData.name }}
      h2._full-width._temp
        ._temp-icon
          img._icon(:src="getIconSrc(weatherData.weather[0].icon)")
          span {{ weatherData.main.temp + ' &#x2103;'}}
      h3._full-width._description {{ weatherData.weather[0].description }}
      ._full-width._last-update-time {{ 'Обновлено в ' + update_time }}
      ._column
        ._fills-like {{ 'Ощущается как ' + weatherData.main.feels_like + ' &#x2103;'}}
        ._pressure {{ 'Давление ' + weatherData.main.pressure + ' мм' }}
      ._column
        ._wind {{ 'Ветер ' + weatherData.wind.speed + ' м/c' }}
        ._humidity {{ 'Влажность ' + weatherData.main.humidity + ' %' }}
      ._column
        ._visibility {{ 'Видимость ' + weatherData.visibility + ' м' }}
    ._container._geo-access-failed-desctiption(v-if="!getGeoAccessRequest && getGeoAccessFailed")
      p {{ 'Доступ к геолокации запрещен. Включите геолокацию и перезагрузите страницу.' }}
    ._container._request-failed-desctiption(v-if="!getGeoAccessRequest && !getGeoAccessFailed && getDataFailed")
      p {{ 'Ошибка сервера' }}

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import WeatherEntity from "@/app/core/entities/Weather.entity";
import {weatherService} from "@/app/shared/services/weather.service";
import {CONFIG} from "@/app/configs/config";

@Component({
  name: 'GeolocationComponent'
})
export default class GeolocationComponent extends Vue {
  public weatherData: WeatherEntity = new WeatherEntity();
  public update_time: string = '';
  public getDataFailed: boolean = false;
  public getGeoAccessFailed: boolean = false;
  public getGeoAccessRequest: boolean = true;

  mounted() {
    this.getLocation();
  }

  public getLocation() {
    navigator.geolocation.getCurrentPosition(this.getWeatherData, this.catchDeniedGeoAccess);
  }

  public getWeatherData(position: GeolocationPosition) {
    this.getGeoAccessRequest = false
    const queryParams = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      appid: CONFIG.appId,
      lang: CONFIG.lang,
      units: CONFIG.units
    }
    weatherService.getWeatherByGeolocation(queryParams)
        .then(response => {
          this.weatherData = response.data;
          this.getCurrentTime();
        })
        .catch(error => {
          this.getDataFailed = true;
        });
  }


  public catchDeniedGeoAccess(error: any) {
    this.getGeoAccessRequest = false
    this.getGeoAccessFailed = true;
  }

  public getCurrentTime() {
    let date = new Date();
    let options = {
      hour: "2-digit", minute: "2-digit"
    };
    this.update_time = date.toLocaleTimeString("ru-RU", options);
  }

  public getIconSrc(icon: string) {
    return CONFIG.imgApi + icon + '.png';
  }
}
</script>

<style lang="scss" scoped>
  ._container {
    height: 325px;
    width: 800px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: Microsoft Sans Serif, sans-serif;

    box-shadow: 0 0 10px rgb(0 0 0 / 35%);
    border-radius: 20px;

    ._city {
      font-size: larger;
    }

    ._description {
      text-transform: capitalize;
    }

    ._temp-icon {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    ._full-width {
      display: block;
      width: 100%;
      text-align: center;
    }

    ._column {
      flex-grow: 1;
      width: 33%;
      font-size: medium;
    }
  }
</style>
