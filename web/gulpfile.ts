const fs = require('fs/promises')
const gulp = require('gulp')
const typescript = require('gulp-typescript')
const yarn = require('gulp-yarn')
const sass = require('gulp-sass')(require('sass'))

// Typescript

gulp.task('compileMainTypescript', () =>
    gulp.src('./src/main/typescript/**/*.ts')
        .pipe(typescript.createProject('./src/main/typescript/tsconfig.json')())
        .pipe(gulp.dest('./build/javascript/main'))
)

gulp.task('cleanMainTypescript', () =>
    fs.rm('./build/javascript/main', {recursive: true, force: true})
        .catch()
)

gulp.task('compileClientTypescript', () =>
    gulp.src('./src/client/typescript/**/*.ts')
        .pipe(typescript.createProject('./src/client/typescript/tsconfig.json')())
        .pipe(gulp.dest('./build/javascript/client'))
)

gulp.task('cleanClientTypescript', () =>
    fs.rm('./build/javascript/client', {recursive: true, force: true})
        .catch()
)

// Sass

gulp.task('compileClientSass', () =>
    gulp.src('./src/client/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/client'))
)

gulp.task('cleanClientSass', () =>
    fs.rm('./build/css/client', {recursive: true, force: true})
        .catch()
)

// Bundle

gulp.task('bundleViews', () =>
    gulp.src('./src/views/pug/**/*.pug')
        .pipe(gulp.dest('./build/bundle/views'))
)

gulp.task('cleanViewsBundle', () =>
    fs.rm('./build/bundle/views', {recursive: true, force: true})
        .catch()
)

gulp.task('bundleMain', () =>
    gulp.src('./src/main/res/**/*.*')
        .pipe(gulp.dest('./build/bundle/main'))
)

gulp.task('cleanMainBundle', () =>
    fs.rm('./build/bundle/main', {recursive: true, force: true})
        .catch()
)

gulp.task('bundleClient', () =>
    gulp.src('./src/client/static/**/*.*')
        .pipe(gulp.dest('./build/bundle/client'))
)

gulp.task('cleanClientBundle', () =>
    fs.rm('./build/bundle/client', {recursive: true, force: true})
        .catch()
)

gulp.task('bundleConfig', () =>
    gulp.src(['.default.env', '.env'], {allowEmpty: true})
        .pipe(gulp.dest('./build/bundle/config'))
)

gulp.task('cleanConfigBundle', () =>
    fs.rm('./build/bundle/config', {recursive: true, force: true})
        .catch()
)

// Ctrl

gulp.task('install', () =>
    gulp.src(['./package.json'])
        .pipe(yarn())
)

gulp.task('build', gulp.parallel(
    'bundleViews',
    'bundleMain',
    'bundleClient',
    'bundleConfig',
    'compileClientSass',
    gulp.series(
        'install',
        gulp.parallel(
            'compileMainTypescript',
            'compileClientTypescript'
        )
    )
))

gulp.task('clean', gulp.parallel(
    'cleanViewsBundle',
    'cleanMainBundle',
    'cleanClientBundle',
    'cleanConfigBundle',
    'cleanMainTypescript',
    'cleanClientTypescript',
    'cleanClientSass'
))

gulp.task('watch', gulp.series('clean', 'build', async () => {
    gulp.watch('./src/main/typescript/**/*.ts', gulp.series(
        'cleanMainTypescript',
        'compileMainTypescript'
    ))
    gulp.watch('./src/client/typescript/**/*.ts', gulp.series(
        'cleanClientTypescript',
        'compileClientTypescript'
    ))
    gulp.watch('./src/client/sass/**/*.sass', gulp.series(
        'cleanClientSass',
        'compileClientSass'
    ))
    gulp.watch('./src/views/pug/**/*.pug', gulp.series(
        'cleanViewsBundle',
        'bundleViews'
    ))
    gulp.watch('./src/main/res/**/*.*', gulp.series(
        'cleanMainBundle',
        'bundleMain'
    ))
    gulp.watch('./src/client/static/**/*.*', gulp.series(
        'cleanClientBundle',
        'bundleClient'
    ))
    gulp.watch(['.default.env', '.env'], gulp.series(
        'cleanConfigBundle',
        'bundleConfig'
    ))
}))
