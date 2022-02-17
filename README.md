# npm-
## npm上传新版本
```
//首先检查当前版本
npm view @scorpioop/test_button versions
//然后考虑是什么版本的更新使用命令：npm version <update_type>进行修改，update_type 有三个参数，

第一个是patch,  第二个是minor,第三个是 major，

patch：这个是补丁的意思，补丁最合适；

minor：这个是小修小改；

major：这个是大改咯；



具体咋用：

比如我想来个1.0.1版本，注意，是最后一位修改了增1，那么命令：
npm version patch    回车就可以了；

比如我想来个1.1.0版本，注意，是第二位修改了增1，那么命令：    
npm version minor    回车就可以了；

比如我想来个2.0.0版本，注意，是第一位修改了增1，那么命令：    
npm version major     回车就可以了

//最后
npm publish
 ```