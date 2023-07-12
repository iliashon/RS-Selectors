import { EResStatus, IDataLevels } from './typeService';

class Service {
  private static checkStatus(response: Response): Response {
    if (!response.ok) {
      if (response.status === EResStatus.er401 || response.status === EResStatus.er404)
        console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
      throw Error(response.statusText);
    }
    return response;
  }

  public static loadingData(dbLink: string): Promise<void | IDataLevels | object> {
    return fetch(dbLink)
      .then((response) => Service.checkStatus(response))
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === 'object') {
          return data as IDataLevels;
        }
        return data;
      })
      .catch((err) => console.error(err));
  }
}

export default Service;
