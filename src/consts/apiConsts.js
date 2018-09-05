const dev_pre_url='http://wkwin5422023.global.publicisgroupe.net:8080';
export const API_URLS={
  EVENT_SAVE:'/save',
  EVENT_DELETE:'/delete',
  INT_SAVE:'/interviewer/save',
  INT_DELETE:'/interviewer/delete',
  INT_GET:'/interviewer/get'
}
const prod_pre_url='https://lit-refuge-73772.herokuapp.com/';


export const urlResolver= function(){
  return ((process.env.NODE_ENV=='production')?prod_pre_url:dev_pre_url);
}
