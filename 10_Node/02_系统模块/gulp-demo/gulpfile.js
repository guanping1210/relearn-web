/**
 * 使用gulp-cli来执行gulpfile: gulp 任务名
 *  gulp first
 * 
 * 使用第三方插件来进行各种源码的处理：css压缩、js压缩、html压缩，JS转换等
 * 
 *  gulp-htmlmin html文件压缩
 *  gulp-csso 压缩css
 *  gulp-babel JS语法转化
 *  gulp-less less语法转化
 *  gulp-uglify 压缩混淆JS源码
 *  gulp-file-include 公共文件包含
 *  browsersync 浏览器实时同步
 * 
 * package-lock.json的作用：
 *  锁定版本；
 *  加快下载速度，各种依赖层级关系已经明确；
 *  
 */
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const fileInclude = require('gulp-file-include')
const babel = require('gulp-babel')

// 建立任务
gulp.task('first', () => {
    // 待处理的文件
    gulp.src('./src/style.css')
    // 处理之后存放的目录
        .pipe(gulp.dest('dist/css'))
})

/**
 * 处理html文件：
 *  提取公共部分
 *  压缩空格
 */
gulp.task('html', () => {
    gulp.src('./src/*.html')
        // @ts-ignore
        .pipe(fileInclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
})

/**
 * 处理JS：
 *  ES代码转换
 *  代码压缩
 */
gulp.task('jsmin', () => {
    gulp.src('./src/*.js')
        .pipe(
            babel({ presets: ['@babel/env']})
        )
        .pipe(gulp.dest('dist'))
})

// 综合其他任务
// gulp.task('default', ['first', 'html', 'jsmin'])  // 以前的声明方式 + gulp default | gulp
gulp.task('default', gulp.series('html', 'jsmin')) // 现在的调用方式 + gulp --tasks