const mod = require('./equal.js')

var delayId

window.exports = {
    "equal": {
       mode: "list",
       args: {
          // 进入插件时调用（可选）
          enter: (action, callbackSetList) => {
             setTimeout(() => {
                if(action.type==='over'){
                   utools.setSubInputValue(action.payload);
                }
             }, 5); 
          },
          // 子输入框内容变化时被调用 可选 (未设置则无搜索)
          search: (action, searchWord, callbackSetList) => {
             console.info('search', searchWord)
             if (searchWord.length < 2) {
                return
             }
             delayId && clearTimeout(delayId);
             delayId = setTimeout(() => {
                if ('setting' === searchWord) {
                   callbackSetList(tldr.getSettings(_config))
                   return;
                }
 
                let res=[]
                mod.mods().forEach((mod)=>{
                    if(mod.match(searchWord)){
                        res=res.concat(mod.eq(searchWord))  
                    }  
                })
                callbackSetList(res)
             }, 500);
 
          },
          // 用户选择列表中某个条目时被调用
          select: (action, itemData, callbackSetList) => {
          },
          // 子输入框为空时的占位符，默认为字符串"搜索"
          placeholder: "试一下 tldr | try a tldr"
       }
    }
 }