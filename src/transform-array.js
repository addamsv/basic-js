const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if(!Array.isArray(arr)){
    throw new error();
    console.log(' throw new error(); ');
    return;
  }
  let newArr = [];
  let removedEltPos = [];
  for (let i=0,j=0,l=arr.length; i<l; i++){
    // if(i==l-1 && arr[i]==='--discard-next' ||  arr[i]==='--double-next'){
    //   // console.log('--double-next or --discard-next');
    //   continue;
    // }
    if(arr[i+1]!==undefined && arr[i+1]==='--discard-prev'){
      continue;
    }
    if(arr[i]==='--discard-next'){
      removedEltPos.push(i+1);
      // console.log('pushed');
      continue;
    } 
    if( arr[i-1]==='--discard-next'){ 
      continue;
    }
    switch(arr[i]){
      case '--discard-prev':
        continue;
      break;
      case '--double-next':
        if(arr[i+1]===undefined){
          continue;
        }
        newArr[j]=arr[i+1];
        newArr[j+1]=arr[i+1];
        j++;
        continue;
      break;
      case '--double-prev':
        if(arr[i-1]===undefined || newArr[j-1]===undefined){
          continue;
        }
        // console.log(removedEltPos.indexOf( i-1 ));
        if(removedEltPos.indexOf( i-1 ) != -1 ){
          continue;
        }        
        newArr[j] = newArr[j-1];
        // console.log('--double-prev: '+newArr[j-1]+' '+arr[i-1] + ' ' + newArr);
        j++;
        continue;
      break;
    }
    newArr[j]=arr[i];
    j++;
  }
  return newArr;
};
