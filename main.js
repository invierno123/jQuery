// const api=jQuery(".test")//不返回元素，返回api对象
// api.addClass('red')//遍历所有刚刚获取的对象，添加.red
// .addClass('green')
// .addClass('blue')//链式操作
/*jQuery(".test")
.addClass('red')
.addClass('green')
.addClass('blue')*/

// jQuery('.test')
// .addClass('green')
// .find('.child')
// .addClass('red')
// .end()
// .addClass('blue')//加到test上面

// const x=jQuery('.test')
// .find('.child')
// x.each((div)=>console.log(div))//div为传进去的第一个函数elements[i]

const x=jQuery('.test')
x.children().print()