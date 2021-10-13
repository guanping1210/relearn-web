/**
 * 新的验证写法： https://blog.csdn.net/Y_soybean_milk/article/details/116482652
 * 新版语法API：https://joi.dev/api/?v=17.4.0
 */
const Joi = require('joi')

// 定义对象的验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(20).error(new Error('用户名没有通过验证')),
    // password: 
    // email: 

})

// 实施验证, 是个promise
// Joi.validate({ username: '123'}, schema)

async function run() {
    try {
        // 新版API是valid, 老版本是validate
        await schema.validateAsync({ username: '1'})
        console.log('验证通过')
    } catch(ex) {
        console.log(ex.message)
    }
}

run()