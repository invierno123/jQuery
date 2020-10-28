window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray==='string'){//这是判断是否相等，要用全等啊
     elements=document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){//是instanceof,不是instanceOf
           elements=selectorOrArray
      }
    return {
      addClass(className){
          for(let i=0;i<elements.length;i++){
            elements[i].classList.add(className)
          }
        return this
      },
      find(selector){
          let array=[]//定义新变量要记得使用声明啊！
          for(let i=0;i<elements.length;i++){
                const //elements2=Array.from(document.querySelectorAll(elements[i]))
                elements2=Array.from(elements[i].querySelectorAll(selector))
             array=array.concat(elements2)   //是concat不是cancat!注意拼写啊 ！
          }
       return jQuery(array)     
      },
    }
  }
  
  window.$ = window.jQuery
  
  $('#test').find('.child').addClass('red') // 请确保这句话成功执行
