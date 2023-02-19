import axios from "axios";
import { URLconfig } from "./config";

export const cloudCosting = function (page, page_size, filtertype, search_query, sortBy, sortType) {
  let URL =`${URLconfig.base}/cloudcosting?page=${page}&page_size=${page_size}&filtertype=${filtertype}&search_query=${search_query}`
   if(sortBy && sortType)
      URL = `${URLconfig.base}/cloudcosting?page=${page}&page_size=${page_size}&filtertype=${filtertype}&search_query=${search_query}&sort_by=${sortBy}&sort_type=${sortType}`
  
   return axios.get(URL);
};


//fetch all list of apllication from the server 
export  const getApplications = function () {
  const URL = `${URLconfig.base}/applications`
  return axios.get(URL);
}


// fetch all list of resorces from the server  
export  const getResources = function () {
  const URL = `${URLconfig.base}/resources`
  return axios.get(URL);
}
