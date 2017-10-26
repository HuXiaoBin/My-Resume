var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rev = require('gulp-rev'),	//MD5戳
    revCollector = require('gulp-rev-collector'), //路径替换
    gulpSequence = require('gulp-sequence'),    //123
    imagemin = require('gulp-imagemin'), //图片
    htmlmin = require('gulp-htmlmin');	//压缩HTML


//压缩css
gulp.task('minifycss', function(){
	return gulp.src('./assets/css/*.css')
		.pipe(minifycss())
		.pipe(rev())				//给文件添加hash编码  
		.pipe(gulp.dest('bulid/assets/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('bulid/assets/css'));//rev-manifest.json文件
})

//压缩js
gulp.task('uglify', function(){
	return gulp.src('./assets/js/*.js')
		.pipe(uglify())
		.pipe(rev())				//给文件添加hash编码  
		.pipe(gulp.dest('bulid/assets/js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('bulid/assets/js'));//rev-manifest.json文件
})

//压缩img
gulp.task('imagemin', function () {
    return gulp.src('./assets/img/**')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('bulid/assets/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('bulid/assets/img'));//rev-manifest.json文件
});

//压缩html
gulp.task('htmlMin', function() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    gulp.src(['bulid/assets/img/*.json','bulid/assets/css/*.css'])
    .pipe(revCollector())
    .pipe(gulp.dest('bulid/assets/css'));

    gulp.src(['bulid/assets/img/*.json','bulid/assets/css/*.json','bulid/assets/js/*.json','./*.html'])
    .pipe(revCollector()) //执行文件内引用名的替换
    .pipe(htmlmin(options))
    .pipe(gulp.dest('bulid'));
});

gulp.task('product',gulpSequence('imagemin','minifycss','uglify','htmlMin'));

gulp.task('default',['product'], function() {
    console.log('ok');
});






