// utils
import axios from '../utils/axios';

export async function getPlants() {
  return new Promise(async (resolve,reject) => {
    const url = '/plants';
    try {
        const response =  await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function createPlant(commonName:string, scientificName:string,
  description: string, picture: string) {
  return new Promise(async (resolve,reject) => {
    const url = '/plants';
    let bodyFormData = new FormData();
    bodyFormData.append('commonName', commonName);
    bodyFormData.append('scientificName', scientificName);
    // bodyFormData.append('description', description);
    bodyFormData.append('picture', picture);


    try {
      // console.log(localStorage.getItem('accessToken'))
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
      const response =  await axios.post(url, bodyFormData);
      resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function fetchPlantById(id:string) {
  return new Promise(async (resolve,reject) => {
    const url = `/plants/${id}`;
    try {
        const response =  await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });

        resolve(response.data)

    } catch(err){
        reject(err);
    }
  });
};

export async function editPlantById(id:string,commonName:string, scientificName:string,
  description: string, picture: string) {
  return new Promise(async (resolve,reject) => {
    const url = `/plants/${id}`;
    let bodyFormData = new FormData();
    bodyFormData.append('commonName', commonName);
    bodyFormData.append('scientificName', scientificName);
    // bodyFormData.append('description', description);
    bodyFormData.append('picture', picture);

    try {
      // console.log(localStorage.getItem('accessToken'))
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
      const response =  await axios.post(url, bodyFormData);
      resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function deletePlantById(id:number) {
  return new Promise(async (resolve,reject) => {
    const url = `/plants/${id}`;
    try {
        const response =  await axios.delete(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
}