import axios from "axios";

export default axios.create({
  baseURL: "https://vpic.nhtsa.dot.gov/api/vehicles/",
  headers: {
    "Content-type": "application/json"
  }
});
