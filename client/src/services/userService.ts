// utils
import axios from '../utils/axios';

export async function getUsers() {
  return new Promise(async (resolve,reject) => {
    const url = '/users';
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

export async function fetchUserById(id:string) {
  return new Promise(async (resolve,reject) => {
    const url = `/users/${id}`;
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

export async function deleteUserById(id:number) {
  return new Promise(async (resolve,reject) => {
      const url = `/users/${id}`;
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