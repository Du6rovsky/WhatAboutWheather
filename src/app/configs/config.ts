import {environment} from "@/environments/environment";
import {IMainConfig} from "@/app/core/interfaces/IMainConfig.interface";

export const CONFIG: IMainConfig = {
    api: environment.api,
    appId: environment.appId,
    imgApi: environment.imgApi,
    units: 'metric',
    lang: 'ru'
};
