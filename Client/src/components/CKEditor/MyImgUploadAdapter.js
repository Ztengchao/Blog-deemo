import axios from 'axios';
import Cookie from 'react-cookies';

export default class MyImgUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }


    upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            let userInfo = Cookie.load("userInfo");
            if (userInfo != undefined) {
                console.log(file);
                let formData = new FormData();
                formData.append("file", file);
                axios.post("api/editor/uploadImg", formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        if (res.data.success) {
                            resolve(res.data.data);
                        } else {
                            reject(res.data.message);
                        }
                    })
                    .catch(err => {
                        reject("图片上传失败")
                    })
            } else {
                reject("获取用户信息失败，请重新登录");
            }
        }));
    }

    // Aborts the upload process.
    abort() {
        console.log('暂停上传');
    }

    // ...
}