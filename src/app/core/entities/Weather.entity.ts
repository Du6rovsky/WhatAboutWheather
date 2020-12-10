interface IClouds {
    all: number;
}

interface ICoord {
    lon: number;
    lat: number;
}

interface IMain {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: string;
    grnd_level: number;
    sea_level: number;
}

interface ISys {
    country: string;
    sunrise: number;
    sunset: number;
}

interface IWeather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface IWind {
    deg: number;
    speed: string;
}

export default class WeatherEntity {
    public base: string = '';
    public clouds: IClouds = {
        all: 0
    };
    public all: number = 0;
    public cod: number = 0;
    public coord: ICoord = {
        lon: 0,
        lat: 0
    };
    public main: IMain = {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
        feels_like: 0,
        pressure: 0,
        humidity: '',
        grnd_level: 0,
        sea_level: 0,
    }
    public dt: Number = 0;
    public id: Number = 0;
    public name: String = '';
    public sys: ISys = {
        country: '',
        sunrise: 0,
        sunset: 0
    };
    timezone: number = 0;
    visibility: number = 0;
    weather: IWeather[] = [];
    wind: IWind = {
        deg: 0,
        speed: '',
    }
}
