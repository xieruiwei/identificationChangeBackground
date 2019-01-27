<div align="center"> 
	<img src="https://i.imgur.com/lnNUDnW.png" width=""/>
	<div style="font-weight:900">小ko照片换底</div>
</div>

# **基于opencv c++ java 微信小程序   证件照换底**
##### 最原始思路：前端访问后台，后台执行代码，代码块为编译好的opencv .so 动态库文件，达到处理图像的效果
##### 最终使用方法：前端通过访问后台 后台调用服务器Linux运行命令行 执行opencv_c++编译完成的代码


## 项目重难点在于opencv c++ java环境部署

## 目录


- [:coffee: 创建动态windows-dll-Linux-so](#coffee-创建动态windows-dll-Linux-so)
- [:open_file_folder: vs2017配置opencv](#open_file_folder-vs2017配置opencv)
- [:computer: linux安装配置opencv](#computer-linux安装配置opencv)
	- [安装配置opencv](#安装配置opencv)
	- [下载地址](#下载地址)
	- [配置过程](#配置过程)
- [:pencil2: 编译成opencv](#pencil2-编译成opencv)
</br>
</br>
</br>
</br>













## :coffee: 创建动态windows-dll-Linux-so
[https://blog.csdn.net/woniu211111/article/details/78041868](https://blog.csdn.net/woniu211111/article/details/78041868)
## :open_file_folder: vs2017配置opencv

[https://blog.csdn.net/zhuofai_/article/details/79937088](https://blog.csdn.net/zhuofai_/article/details/79937088)
## :computer: linux安装配置opencv
### 安装配置opencv
### 
[https://www.cnblogs.com/xiaomanon/p/3824818.html](https://www.cnblogs.com/xiaomanon/p/3824818.html)
>第四步不能直接cmake
要创建一个文件夹在文件夹里cmake ..两个点。如果先在根目录用了cmake .要删除CMakeCache.tx


### 下载地址
[https://github.com/opencv/opencv_3rdparty/tree/ippicv/master_20170822/ippicv](https://github.com/opencv/opencv_3rdparty/tree/ippicv/master_20170822/ippicv)
>ippicv_2017u3_lnx_intel64_general_20170822.tgz
### 配置过程
[https://blog.csdn.net/u010739369/article/details/79966263](https://blog.csdn.net/u010739369/article/details/79966263)

## :pencil2: 编译成opencv
运行
>g++ test.cpp -o test \`pkg-config --cflags --libs opencv\`
