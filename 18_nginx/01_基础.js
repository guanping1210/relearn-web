/**
 * 1、什么是nginx
 *  nginx是一种高性能的HTTP和反向代理web服务器；
 *  占有内存少，并发能力强；
 * 
 *  nginx在mac上的部分命令：
 *    brew search nginx  查找nginx
 *    brew install nginx 安装nginx
 *    brew info nginx 查看nginx相关的安装信息
 * 
 *  2、nginx 反向代理：
 *    (1)、正向代理：在客户端配置代理服务器，通过代理服务器进行互联网访问
 *        举例：用户想访问谷歌网址
 *        用户 -> www.google.com  直接访问，失败
 *        用户 -> 代理服务器 www.abc.com -> www.google.com  代理访问，成功
 * 
 *    (2)、反向代理：客户端将请求发送给反向代理服务器，代理服务器去选择目标服务器
 * 
 *        举例：用户通过客户端进行访问
 *        用户 -> 不能直接访问服务器
 *            -> 发送请求的时候，先访问反向代理服务器  -> 目标服务器
 * 
 *        用户 -> xxxx:9001  -> xxxx:8001, 用户访问的是9001， 但是实际是转发到8001的
 * 
 *  3、nginx 负载均衡：
 *      普通的请求和响应的流程， 并发请求数量相对较少：
 * 
 *               请求            查询
 *        客户端  ----->  服务端  ----->  数据库
 *               <-----         <-----
 *                响应
 * 
 *      高并发的时候，容易导致服务器崩溃、有性能瓶颈；
 *      
 *      增加服务器数量，将请求分发到各个服务器上，将负载分发到不同的服务器，就是所谓的负载均衡
 *       
 *      客户端           反向代理服务器          服务器
 *            一共15个请求                       8001
 *      客户端    --->      9001        --->    8002
 *                                             8003
 *      例如总共15个请求，有三台服务器，那么每台服务器可以有5个请求，
 *      将15个请求平均分发给3台服务器的过程，叫负载均衡。
 *  
 *  4、nginx 动静分离：将网站的动态页面和静态页面，由不同的服务器解析，加快解析速度，降低单个服务器的压力
 *                       
 *     客户端    -->     反向代理服务器      -->   服务器tomcat
 *                                               html\css\js 静态资源
 *                                               jsp\servlet 动态资源
 * 
 *     当所有资源都部署到同一台服务器上的时候，访问会有压力；所以需要把资源动静区分开
 * 
 *     
 *    客户端   --->     nginx      --->   动态资源服务器,只部署动态资源
 *                                --->   静态资源服务器，只存放静态资源
 *            
 *   5、nginx 是一种服务器软件，所以也是需要安装的                            
 *      
 *   6、命令: 使用nginx操作命令的前提是：必须进入到nginx的目录  -> 我的电脑上是 /usr/local/bin
 *    可能linux和mac操作会有些不一样：
 *    
 *    其他目录：                        bin目录下：
 *    nginx -version                  ./nginx -v            查看nginx版本号
 *    nginx -s stop                   ./nginx -s stop       停止nginx服务
 * 
 *    brew services start nginx       ./nginx               启动nginx 服务,能够访问8080端口
 *    brew services restart nginx     ./nginx -s reload     重启nginx命令
 *    
 *    ps -ef | grep nginx  -> 查看是否启动了nginx, 以及nginx的状态
 * 
 *    
 *  7、配置文件
 * 
 *    
 *    nginx.conf  --> nginx 配置信息   ->  /usr/local/etc/nginx/nginx.conf
 *    nginx服务器默认安装路径： /usr/local/var/www
 *    nginx的安装路径： /usr/local/Cellar/nginx/1.21.0
 *    /usr/local/  -> 里面有sbin启动脚本
 *    /usr/local/etc/bin/nginx.conf  -> nginx 配置文件
 * 
 *  final: mac 安装 nginx
 * 
 *    -  brew install nginx 就可以啦
 */