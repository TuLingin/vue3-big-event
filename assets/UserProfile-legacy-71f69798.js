System.register(["./PageContainer-legacy-3b06105e.js","./index-legacy-c42bf9c3.js","./el-col-legacy-f9f4787d.js","./el-form-item-legacy-7e68c8d6.js","./_plugin-vue_export-helper-legacy-0a8bd3f0.js","./el-input-legacy-fc582903.js","./el-message-legacy-8967fbd9.js"],(function(e,l){"use strict";var a,u,t,r,n,s,i,d,m,o,c,g,f,p,_,v,y;return{setters:[e=>{a=e._},e=>{u=e.r,t=e.h,r=e.o,n=e.c,s=e.a,i=e.bZ,d=e.b,m=e.d,o=e.b_,c=e.E},e=>{g=e.a,f=e.E},e=>{p=e.E,_=e.a},e=>{v=e.E},e=>{y=e.E},null],execute:function(){e("default",{__name:"UserProfile",setup(e){const l=u({id:"",username:"",nickname:"",email:""}),b=u(),V={nickname:[{required:!0,message:"请输入用户昵称",trigger:"blur"},{pattern:/^\S{2,10}$/,message:"昵称必须是2-10位的非空字符串",trigger:"blur"}],email:[{required:!0,message:"请输入用户邮箱",trigger:"blur"},{type:"email",message:"邮箱格式不正确",trigger:"blur"}]},j=t();(async()=>{const e=await i();l.value=e.data.data})();const k=async()=>{await b.value.validate()&&(await o(l.value),j.setUser(l.value),c.success("修改成功"))};return(e,u)=>{const t=y,i=p,o=v,c=_,j=g,E=f,U=a;return r(),n(U,{title:"基本资料"},{default:s((()=>[d(E,null,{default:s((()=>[d(j,{span:12},{default:s((()=>[d(c,{model:l.value,rules:V,ref_key:"formRef",ref:b,"label-width":"100px",size:"large"},{default:s((()=>[d(i,{label:"登录名称"},{default:s((()=>[d(t,{modelValue:l.value.username,"onUpdate:modelValue":u[0]||(u[0]=e=>l.value.username=e),disabled:""},null,8,["modelValue"])])),_:1}),d(i,{label:"用户昵称",prop:"nickname"},{default:s((()=>[d(t,{modelValue:l.value.nickname,"onUpdate:modelValue":u[1]||(u[1]=e=>l.value.nickname=e)},null,8,["modelValue"])])),_:1}),d(i,{label:"用户邮箱",prop:"email"},{default:s((()=>[d(t,{modelValue:l.value.email,"onUpdate:modelValue":u[2]||(u[2]=e=>l.value.email=e)},null,8,["modelValue"])])),_:1}),d(i,null,{default:s((()=>[d(o,{type:"primary",onClick:k},{default:s((()=>[m("提交修改")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1})])),_:1})])),_:1})}}})}}}));
