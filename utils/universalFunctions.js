import axios from 'axios';
export const gotoAnotherPage = (page, props,params)=>{
    props.navigation.navigate(page,params);
}


export const makePostRequest = ()=>{
    return new Promise((resolve, reject)=>{
        axios.post(url,data).then(r=>{
            resolve(r);
        }).catch(e=>{
            reject(e);
        })
    })
}

export const makeGetRequest = (url,data=null)=>{
    return new Promise((resolve, reject)=>{
        axios.get(url,data).then(r=>{
            resolve(r);
        }).catch(e=>{
            reject(e);
        })
    })
}




