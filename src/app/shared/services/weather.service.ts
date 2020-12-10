import http from "@/app/core/http";
import {CONFIG} from "@/app/configs/config";

class WeatherService {
    public getWeatherByGeolocation(params?: any) {
        return http.get(CONFIG.api + `weather`, {params});
    }
}

export const weatherService = new WeatherService();
