window.jQuery=function(selectorOrArrayOrTemplate){
    //判断是数组还是对象
    let elements
     if(selectorOrArrayOrTemplate[0] === '<'){
      // 创建 div
      elements=[createElement(selectorOrArrayOrTemplate)]
    }else{
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)//此时elements是一个伪数组
    }else if(selectorOrArrayOrTemplate instanceof Array){//instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
         elements=selectorOrArrayOrTemplate
    }
    function createElement(string){
    const container = document.createElement("template");
    container.innerHTML = string.trim();//trim()函数移除字符串两侧的空白字符或其他预定义字符
    return container.content.firstChild;//返回的是添加的元素的第一个节点
  }
    //api可以操作elements
    //const api=
  //闭包，访问函数外部变量
    return {
    jquery: true,
    elements: elements,
    get(index){
      return elements[index]
    },
        oldApi:selectorOrArrayOrTemplate.oldApi,
        addClass(className){//api是一个对象，key为addClass，value为函数
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this//api
        },
        appendTo(node){//x.appendTo 是x当别人的儿子
      if(node instanceof Element){//判断节点是不是标签(?)
        this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
      }else if(node.jquery === true){
        this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
      }
    },
    append(children){// x.append 是x当别人的爸爸
      if(children instanceof Element){
        this.get(0).appendChild(children)
      }else if(children instanceof HTMLCollection){//HTMLCollection 对象类似一个包含 HTML 元素的数组列表。
        for(let i =0;i<children.length;i++){
          this.get(0).appendChild(children[i])
        }
      }else if(children.jquery === true){
        children.each(node => this.get(0).appendChild(node))
      }
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
    window.$ = window.jQuery

