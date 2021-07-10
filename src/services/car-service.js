import http from "../http-common";
class CarDataService {

  getGetModelsForMakeYear(make, year, type) {
    if (year === "" && type === "") {
      return http.get(`/GetModelsForMake/${make}?format=json`);
    }
    else {
      var urlPart = `/GetModelsForMakeYear/make/${make}`;
      if (year !== null && year !== "") {
        urlPart += `/modelyear/${year}`;
      }
      if (type !== null && type !== "") {
        urlPart += `/vehicletype/${type}`;
      }
      return http.get(`${urlPart}?format=json`);
    }
  }
  
}

export default new CarDataService();