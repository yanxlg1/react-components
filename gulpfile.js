const gulp = require('gulp');
const shelljs = require('shelljs');
const pkg = require('./package.json');


gulp.task('clean', async (done)=>{
    done();
});

gulp.task(
    'compile',
    gulp.series("clean",done => {
        let ret = shelljs.exec("npm run compile").code;
        if (!ret) {
            ret = undefined;
        }
        done(ret);
    })
);

gulp.task(
    'pub',
    gulp.series('compile', done => {
        const { version } = pkg;
        shelljs.cd(process.cwd());
        shelljs.exec(`git add -A`);
        shelljs.exec(`git commit -m "update version"`);
        shelljs.exec('git push origin master:master');
        shelljs.exec(`git tag ${version}`);
        shelljs.exec(`git push origin ${version}:${version}`);
        shelljs.exec('git push origin master:master');
        done();
    })
);

gulp.task(
    'replace',
    gulp.series('compile', done => {
        const { version } = pkg;
        shelljs.cd(process.cwd());
        shelljs.exec(`git tag -d ${version}`);
        shelljs.exec(`git push origin :refs/tags/${version}`);
        shelljs.exec(`git add -A`);
        shelljs.exec(`git commit -m "update version"`);
        shelljs.exec('git push origin master:master');
        shelljs.exec(`git tag ${version}`);
        shelljs.exec(`git push origin ${version}:${version}`);
        shelljs.exec('git push origin master:master');
        done();
    })
);
