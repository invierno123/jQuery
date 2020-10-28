window.jQuery=function(selectorOrArray){
    //判断是数组还是对象
    let elements
    if(typeof selectorOrArray==='string'){
         elements=document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
         elements=selectorOrArray
    }
    //api可以操作elements
    //const api=
    return {//闭包，访问函数外部变量
        oldApi:selectorOrArray.oldApi,
        addClass(className){//api是一个对象，key为addClass，value为函数
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this//api
        },
        find(selector){
            let array=[]
            for(let i=0;i<elements.length;i++){
                const elements2=Array.from(elements[i].querySelectorAll(selector))
                array=array.concat(elements2)
            }
            array.oldApi=this//此时this为旧的api
            return jQuery(array)//返回一个新的api对象来操作数组，this<=>array
        },
        each(fn){
            for(let i=0;i<elements.length;i++){
               fn.call(null,elements[i],i)
            }
            return this//当前api
        },
        children(){
            const array = []
            this.each((node)=>{
              array.push(...node.children)//...的意思是把数组拆开，第一个元素当做第一个参数，第二个元素当做第二个参数。。。，
              //array.push(node.children[0],node.children[1],node.children[2])
              
            })
            return jQuery(array)
          },
        parent(){
            const array=[]
            this.each((node)=>{
                if(array.indexOf(node.parentNode)===-1){
                array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
        },
        end(){
            return this.oldApi//此时this为新api(预测用户会用新api调用end)
        }
    }
}
