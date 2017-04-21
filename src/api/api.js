import axios from 'axios';
var qs = require('qs');

//let base = '';
//let curWwwPath=window.document.location.href;
//let base=curWwwPath.substring(0,curWwwPath.lastIndexOf('/h5/'));
let base="http://192.168.2.227:8081";

export const requestLogin = params => { return axios.post(`${base}/jkapp/v1/app/damboard/login`, qs.stringify(params)).then(res => res.data); };

export const getMessage  =params => {return axios.post(`${base}/jkapp/v1/mobile/getMessage`, qs.stringify(params)).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/jkapp/v1/app/queryDamBoardInfo`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/jkapp/v1/app/deleteDamBoardInfo`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/jkapp/v1/app/updateDamBoardInfo`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/jkapp/v1/app/saveDamBoardInfo`, { params: params }); };

// 配置信息
export const allsettingList = params => { return axios.post(`${base}/jkapp/v1/app/allsetting`, qs.stringify(params)).then(res => res.data); };
export const allsettingdel = params => { return axios.post(`${base}/jkapp/v1/app/delsetting`, qs.stringify(params)).then(res => res.data); };
export const allsettingsave = params => { return axios.post(`${base}/jkapp/v1/app/setting`, qs.stringify(params)).then(res => res.data); };

// app 版本信息配置
export const appversionupload = params => { return axios.post(`${base}/jkapp/v1/app/uploadappversion`, qs.stringify(params)).then(res => res.data); };
export const appversiondel = params => { return axios.post(`${base}/jkapp/v1/app/delappversion`, qs.stringify(params)).then(res => res.data); };
export const appversionlist = params => { return axios.post(`${base}/jkapp/v1/app/appversionlist`, qs.stringify(params)).then(res => res.data); };

// 产业链配置

export const industryChainlist = params => { return axios.get(`${base}/jkapp/v1/h5/getchanyelianchecklist`, { params: params }).then(res => res.data); };