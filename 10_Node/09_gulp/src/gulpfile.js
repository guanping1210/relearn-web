// @ts-nocheck
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const fileInclude = require('gulp-file-include')
const less = requrie('gulp-less')
const csso = require('gulp-csso')
const babel = require('gulp-babel')
const gulify = require('gulp-uglify')

// 使用gulp.task 新建任务
// 任务名称，回调函数
gulp.task('first', () => { // 建立任务
    gulp.src('./src/css/base.css')
    .pipe(gulp.dest('./dist/css')) // 将处理后的文件输出到dist目录
})

/**
 * gulp借助很多插件来完成任务：
 *  gulp-htmlmin: html文件压缩
 *  gulp-csso: 压缩css
 *  gulp-babel: javascript语法转化
 *  gulp-less: less语法转化
 *  gulp-uglify: 压缩混淆javascript
 *  gulp-file-include: 公共文件包含
 *  browsersync: 浏览器实时同步
 * 
 * gulp中任务的执行是有顺序的
 */

/**
 * 压缩html中的代码：压缩 + 提取公共代码
 */
gulp.task('htmlmin', () =>{
    gulp.src('./src/*.html')
        .pipe(fileInclude()) // 抽取公共代码片段到指定文件夹下
        .pipe(htmlmin({ collapseWhitespace: true })) // 压缩html代码中的空格
        .pipe(gulp.dest('dist')) // 输出到dist文件夹下面
})

/**
 * css任务:
 *  1、less 语法转换
 *  2、css代码压缩
 */
gulp.task('cssmin', () => {
    gulp.src(['./src/*.less', './src/*.css'])
        .pipe(less()) // less编译，转为css
        .pipe(csso()) // 压缩css
        .pipe(gulp.dest('dist/css')) // 输出到dist/css文件夹下面
})

/**
 * js任务:
 *  1、把ES6转为ES6
 *  2、压缩JS代码
 */
gulp.task('jsmin', () => {
    gulp.src('./src/*.js')
        .pipe(babel({
            presets: ['@babel/env'] // 可以判断当前代码的运行环境，将代码转化为当前运行环境所支持的代码
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

/**
 * 复制其他资源的文件夹：
 *  
 */
gulp.task('copy', () => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'))

    gulp.src('./src/lib')
        .pipe(gulp.dest('dist/lib'))
})

/**
 * 构建任务: 表示执行default任务的时候，会依次执行htmlmin、cssmin、jsmin、copy任务
 *  命令行 gulp 执行，会自动找 default 的任务
 */
gulp.task('default', ['htmlmin', 'cssmin', 'jsmin', 'copy'])