import axios from "axios";

export const todoDataApi = (formData) => {
  console.log(formData,'frrr')
  return axios.post("http://localhost:5000/api/datas/create", formData);
};

export const todoDataApiUpdate = (formData) => {
  console.log(formData,'dxdxxd');
  return axios.put(
    "http://localhost:5000/api/datas/update/" + formData.id,
    formData
  );
};

export const todoDataApiDelete = (formData) => {
  console.log(formData,'dxdxxd');

  return axios.delete("http://localhost:5000/api/datas/delete/"+formData.id,formData);
};

export const gettodoDataApi = (query)=>{
  console.log(query)
  return axios.get("http://localhost:5000/api/datas?query="+query)
}