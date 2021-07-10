import React, { useState, useEffect } from "react";
import CarDataService from "../services/car-service";
import defaultMakeName from "../general/constants.js"

const CarsList = props => {

  const [cars, setCars] = useState([]);

  const [searchMake, setSearchMake] = useState(defaultMakeName);
  const [searchYear, setSearchYear] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearchMake = e => {
    const searchMake = e.target.value;
    setSearchMake(searchMake);
  };

  const onChangeSearchYear = e => {
    const searchYear = e.target.value;
    setSearchYear(searchYear);
  };

  const onChangeSearchType = e => {
    const searchType = e.target.value;
    setSearchType(searchType);
  };

  const getModels = (searchMake, searchYear, searchType) => {
    setIsLoading(true);
    CarDataService.getGetModelsForMakeYear(searchMake, searchYear, searchType)
      .then(response => {
        console.log(response.data.Results);
        setIsLoading(false);
        setCars(response.data.Results);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getModels(defaultMakeName, searchYear, searchType);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="row pb-1">
        <div className="card mb-3" >
          <div className="card-body">
            <form className="mb-3 pt-3" onSubmit={(event) => {
              event.preventDefault()
              getModels(searchMake, searchYear, searchType)
            }}>
              <div className="input-group col-lg-4 mb-4" >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Make"
                  value={searchMake}
                  onChange={onChangeSearchMake}
                  required
                />
              </div>
              <div className="input-group col-lg-4 mb-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ModelYear"
                  value={searchYear}
                  onChange={onChangeSearchYear}
                />
              </div>
              <div class="range mb-3">
                <input type="range" class="form-range" init="2014" value={searchYear} min="1980" max={currentYear} id="customRange" onChange={onChangeSearchYear} />
              </div>
              <div className="input-group col-lg-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="VehicleType"
                  value={searchType}
                  onChange={onChangeSearchType}
                />
              </div>
              <div className="input-group col-lg-4">
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {cars.map((car, i) => {
            return (
              <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 pb-2" key={i}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{car.Make_Name}</h5>
                    <p className="card-text">
                      <strong>Model Name: </strong>{car.Model_Name}<br />
                      <strong>Vehicle Type Name: </strong>{car.VehicleTypeName ?? ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarsList;