module.exports=function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const script={getScriptManifest:()=>({name:"Time Until",description:"Send a message about the time until an event like a game release or a birthday",author:"oh_mg",version:"1.1.0",firebotVersion:"5"}),getDefaultParameters:()=>({date:{type:"string",default:(new Date).toISOString(),description:"Target Date",secondaryDescription:"Date must be formatted like '01 Jan 2022 00:00:00 GMT' or '2019-01-01T00:00:00.000Z'"},message:{type:"string",useTextArea:!0,default:"%days days until Elden Ring",description:"Message to send to chat",secondaryDescription:"Variable are %days, %hours, %minutes, %seconds, %rDays, %rHours %rMinutes. The 'r' prefixed variables should be used when multiple time components are used, e.g. '%rDays days %rHours hours until Elden Ring', while the non-prefixed variables should be used when the duration is by itself, e.g. '%days until Elden Ring'"},sendAs:{type:"enum",default:"Streamer",description:"Send the chat message as",secondaryDescription:"'Bot' has no effect if no bot user is set up",options:["Streamer","Bot"]},ignoreIfInPast:{type:"boolean",default:!0,description:"Don't send message if target date is in the past"}}),run:runRequest=>{const{logger:logger}=runRequest.modules,now=new Date,targetDate=Date.parse(runRequest.parameters.date);if(isNaN(targetDate))return Promise.reject("Unable to parse date");const sendAs=runRequest.parameters.sendAs,message=runRequest.parameters.message,totalSeconds=Math.ceil((targetDate-now)/1e3);if(logger.debug(`Total seconds: ${totalSeconds}`),totalSeconds<0&&runRequest.parameters.ignoreIfInPast)return Promise.reject("Target date is in the past and ignoreIfInPast = true");const totalMinutes=Math.ceil(totalSeconds/60),totalHours=Math.ceil(totalSeconds/3600),totalDays=Math.ceil(totalSeconds/86400),days=Math.floor(totalSeconds/86400),hours=Math.floor(totalSeconds%86400/3600),minutes=Math.floor(totalSeconds%86400%3600/60),formattedMessage=message.replace("%rDays",`${days}`).replace("%rHours",`${hours}`).replace("%rMinutes",`${minutes}`).replace("%seconds",`${totalSeconds}`).replace("%minutes",`${totalMinutes}`).replace("%hours",`${totalHours}`).replace("%days",`${totalDays}`);return new Promise(((resolve,reject)=>{resolve({success:!0,effects:[{type:"firebot:chat",message:formattedMessage,chatter:sendAs}]})}))}};exports.default=script}]).default;