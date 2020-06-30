import axios from 'axios'

//上传文件并显示上传进度
function uploadFile (url,payload,cancelToken,callback1) {
    return new Promise(function(resolve,reject){
        axios({
            url:url,
            method:'post',
            data:payload,
            onUploadProgress:function(progressEvent){
                if(progressEvent.lengthComputable){ callback1(progressEvent); }
            },
            cancelToken: cancelToken
        }).then(res =>{
            resolve(res);
            })
            .catch(thrown => { 
                if (axios.isCancel(thrown)) {
                    reject('-2')

              } else {
                reject(thrown)
              }
            })
    })
  
}

//获取所有的分类
function getAllCategory(){
    return new Promise(function(resolve, reject){
        axios({
            url:'/emro_boss/category/getCategoryList',
            method:'get'
        }).then((res)=>{
            resolve(res)
        }).catch((thrown)=>{
            reject(thrown)
        })
    })
}

export default{
    install: function(Vue){
        Vue.prototype.uploadFile = (url,payload,cancelToken,callback1) => uploadFile (url,payload,cancelToken,callback1);
        Vue.prototype.getAllCategory = () => getAllCategory ();
    }
};
