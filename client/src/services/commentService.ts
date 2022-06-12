// utils
import axios from '../utils/axios';

export async function fetchComments() {
  return new Promise(async (resolve,reject) => {
    const url = '/comments';
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

export async function fetchCommentById(commentId: string) {
  return new Promise(async (resolve,reject) => {
    const url = `/comments/${commentId}`;
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

export async function createComment(userId: string, plantId: string | undefined,
  content: string) {
  return new Promise(async (resolve,reject) => {
    const url = '/comments';
    try {
      // console.log(localStorage.getItem('accessToken'))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
        const response =  await axios.post(url, {
          userId,
          plantId,
          content
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function editCommentById(commentId: string, content: string) {
  return new Promise(async (resolve,reject) => {
    const url = `/comments/${commentId}`;
    try {
      // console.log(localStorage.getItem('accessToken'))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken');
        const response =  await axios.post(url, {
          content
        });
        resolve(response.data)
    } catch(err){
        reject(err);
    }
  });
};

export async function deleteCommentById(commentId: number) {
  return new Promise(async (resolve,reject) => {
    const url = `/comments/${commentId}`;
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