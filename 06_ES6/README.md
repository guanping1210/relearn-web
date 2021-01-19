### ES6 https://www.bilibili.com/video/av41783773?spm_id_from=333.788.b_636f6d6d656e74.57

#### var/let/const

    区别：
        var存在变量提升，自动挂载到window上；
        let/const不存在变量提升，不会自动挂载到window上；
        const定义的变量不能修改；

    为什么禁止变量提升：
        没法在编译时就报出变量未声明的错误，只能在运行时才能知道；

    why:
        let/const不存在变量提升，是为了修补以前设计的错误。
