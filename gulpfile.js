var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concatCss = require('gulp-concat-css');
var run = require('gulp-run');

var src = './src';
var app = './app';
//task
gulp.task('js',function(){
    return gulp.src(src +'/js/bundle.js')
        .pipe(browserify({

            transform:'reactify',
            extensions:'browserify-css',
            debug:true

    }))
        .on('error',function(err){
            console.error('Error '+err.message);
    })
        .pipe(gulp.dest(app+'/js'));


});



//css
gulp.task('css',function(){
    gulp.src(src+'/css/*.css')
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest(app+'/css'));

});

//fonts
gulp.task('fonts',function(){
    gulp.src('node_modules/bootstrap/dist/fonts/**/*')

        .pipe(gulp.dest(app+'/fonts'));

});

//html
gulp.task('html',function(){
    gulp.src(src+'/**/*.html')



});
//serve
gulp.task('serve',['html','js','css'],function(){
    run('electron main.js').exec();



});




//watch
gulp.task('watch',['serve'],function(){
    gulp.watch(src+'/js/**/*',['js']);
    gulp.watch(src+'/css/**/*.css',['css']);
    gulp.watch([app + '/**/*.html'],['html']);

});


//default
gulp.task('default',['watch','fonts','serve']);



