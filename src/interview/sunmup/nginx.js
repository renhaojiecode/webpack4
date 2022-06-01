export default {
  title: 'nginx 配置',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: '什么是nginx???',
      jsCode: ``, // code  代码行最好用;结尾 以便copy运行
      desc: [
        'nginx 是高性能的HTTP和反向代理web服务器',
        
        '特点是：内存小、并发能力强（官方50000个并发）tomcat(500多个并发)，当然这个主要看服务器的硬件配置',
        
        '这里如果想了解到反向代理是什么，可以先了解正向代理是什么',
        
        '正向代理：代理客户端，如vpn，我们需要访问国外的网站，当然需要一个代理客户端的',
        
        '反向代理：用于代理服务端的',
      ],
      img: [
        // '<img src="' + require('../img/async-await.jpg') + '"/>',
      ]
    },
    {
      title: 'nginx 能做些什么？？？',
      jsCode: ` server {
        
        server_name xms-test.intra.xxx.com;
      
        listen 8888; 
      
        root /home/xxx/wujie/;
      
        location /myweb {
      
            add_header 'Access-Control-Allow-Origin' $http_origin;
      
            add_header 'Access-Control-Allow-Credentials' 'true';
      
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      
            add_header 'Access-Control-Allow-Headers' 'DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
      
            index index.htm index.html;
      
          }
      
      }`,
      desc: [
        '静态资源部署',
        '对于前端来说这个是最常用的，前端部署都是一般都是静态资源部署，如html / js / css/ img 等; 直接贴配置文件吧',
        '这里在nginx.conf 里配置 如上的配置，再重新启动一下nginx, /usr/sbin/nginx -s reload, 就可以访问了，例如 10.96.91.145:8888/myweb 就可以访问到资源，也就是部署成功了',
      ],
      img: []
    },
    {
      title: '对上述配置详解',
      jsCode: ``,
      desc: [
        'server_name: 顾明思议，就是这个server 的name，就是域名',
        'listen： 是监听的端口号，也是这个server 的端口号，在一个server 中 server_name 和 listen是这个服务的唯一标志，也就是说，你可以起多个端口号为 8888 的server，但是这里必须保证每个server端口号为8888的 server_name唯一',
        'root: 是访问文件的根路径，root 当然可以放在 location 里面，放在外面表示是以下所有的location的共用配置',
        'location /myweb ：这里表示 如果访问到 /myweb 就会被拦截到访问/home/xx/wujie/myweb/index.html ',
        'add_header: 这里加一些解决跨域的一些cors, 当然这样的配置也可以放到location 外， 表示是这个server 的共用配置',
        '坑点：在配置root路径容易出错， 这里nginx 访问的路径 先通过root路径访问再匹配到location 的路径，再去找下面的index 的文件，拿上面的为例，这里访问资源是通过在/home/xx/wujie/ 下访问文件路径为  /myweb/ 下的index.html 或者 index.htm文件',
      ],
      img: []
    },
    {
      title: '反向代理',
      jsCode: ``,
      desc: [
        '反向代理对于客户端是无感知的，客户端不需要任何配置，只是将服务发送到反向代理服务器上，由反向代理服务器去选择目标服务器获取数据，再返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理的服务器，隐藏了真实的服务器',
      
      ],
      img: [
        '<img src="' + require('../img/nginx-exp.jpg') + '"/>',
      ]
    },
    {
      title: '场景1 ',
      jsCode: `server {

        server_name localhost;
      
        listen 9999;
      
        # 前端静态资源部署
      
        location / {
      
            root /home/xxx/wujie/gms-fe/qa;
      
            index index.html;
      
        }
      
       # 后端地址代理
      
        location /apiv2/{
      
          proxy_pass http://10.96.81.101:8080/;
      
        }
      
      }`,
      desc: [
        '在处理跨域过程中，可以通过反向代理进行处理；前端资源通过静态部署部署在NGINX 上，将后端地址通过nginx进行代理，如果前端访问后端地址，这样直接访问NGINX的代理，这样就不会出现不同源策略，配置如下',
      ],
      img: []
    },
    {
      title: '场景2',
      jsCode: `server {

        server_name localhost;
      
        listen 80;
      
        location /baidu/ {
      
          proxy_pass http://baidu.com/;
  
        }
      
        location /taobao/ {
      
          proxy_pass http://taobao.com/;
      
        }
      
        location /xx/ {
      
          proxy_pass http://xx.com/;
      
        }
      
        location /qq/ {
      
          proxy_pass http://qq.com/;
      
        }
      
       
      
        proxy_intercept_errors on;
      
        error_page 404 403 500 502 503 504  /404.html;
      
        location = /404.html {
      
          root  /home/xx/wujie/;
      
        }
      
      }`,
      desc: [
        '如果通过一个ip 地址去访问多个服务，当然可以用到反向代理，比如 访问淘宝http://10.96.91.145/taobao，访问百度http://10.96.91.145/baidu， 访问滴滴 http://10.96.91.145/xx,.......，配置如下',
      ],
      img: []
    },
    {
      title: '负载均衡',
      jsCode: `http {

        upstream myapp1 {
    
            server 192.168.1.103:8080;
    
            server 192.168.1.104:8080;
    
        }
    
        ……略
    
       server {
    
            listen 80;
    
            server_name  localhost;
    
            ……略
    
            location /myweb {
    
                proxy_pass http://myapp1;
    
            }
    
        }
    
      }`,
      desc: [
        '原理：在一个应用中，用户量和QPS往往都是很大的，往往一个服务机器是承载不住的，往往需要很多个机器进行分压的，如百度、淘宝可能都是需要上万个服务支撑，但是每个机器都是有自己唯一的IP地址，但是用户都是通过例如 baidu.com 这一个域名去访问的，那像这样的场景就是需要负载均衡进行来控制转发到那个机器去',
        '这里的配置核心点是 upstream， 这里配置 myapp1, 那就在location 进行代理 proxy_pass 到 http://myapp1; 当然负载均衡的算法有很多中，这里默认轮询，也就是访问一次192.168.1.103:8080， 然后就访问一次192.168.1.104:8080',
      ],
      img: [
        '<img src="' + require('../img/nginx-origin.jpg') + '"/>',
      ]
    },
    {
      title: '负载均衡的算法',
      jsCode: `
      // 轮询策略：
      upstream myapp1 {

        server 192.168.1.103:8080;

        server 192.168.1.104:8080;

      }
      // 权重策略：
      upstream myapp1 {

        server 192.168.1.103:8080  weight = 3;

        server 192.168.1.104:8080 weight = 2;

      }
      // 最少连接策略：
      upstream myapp1 {

        least_conn;
      
        server 192.168.1.103:8080;
      
        server 192.168.1.104:8080;
      
      }
      // IP hash策略：
      upstream myapp1 {

        ip_hash;
       
        server 192.168.1.103:8080;

        server 192.168.1.104:8080;
       
      }
      `,
      desc: [
        '轮询策略：轮询就是每个服务各访问一次，然后就轮询起来，配置如下',
        '权重策略：负载的服务器都会存在差异，有的服务器处理能力强、或者内存大，有的服务器则相反，如果还是按照轮询策略的话，可能性能差的服务器就容易挂掉，那么就应该就“能有多少力出多少力”的策略，性能好的权重当然可以大一些，性能差的权重可以小一些，这样就会把各个服务器更好的分配出来，配置如下',
        '最少连接策略：web请求都会被转发到空闲的机器上去, 但是这么需要慎重使用，一般来说空闲的机器都是性能差的机器， 配置如下',
        '以上策略都有一个问题 session 丢失的问题*********',
        'IP hash策略：ip hash 也叫ip绑定，每个请求按访问的ip hash 值去分配， 这样每个客户端都会访问固定的 后端服务器， 这样也就可以解决session丢失的问题；配置如下'
      ],
      img: []
    },
    {
      title: '动静分离',
      jsCode: `
      server {

        server_name localhost;
      
        listen 9999;
      
        # 前端静态资源部署
      
        location / {
      
            root /home/xx/wujie/gms-fe/qa;
      
            index index.html;
      
        }
      
       # 后端地址代理
      
        location /apiv2/{
      
          proxy_pass http://10.96.81.101:8080/;
      
        }
      
      }`,
      desc: [
        '在之前前后端不分离的时候，前后端部署就是通过一个jar 包进行部署在tomcat上，这样有一个问题是，静态资源的访问速度很慢；nginx 处理静态资源的能力是tomcat 10 倍，tomcat 处理后端服务又是比较强的，那为什么不让适合的服务去处理适合的事儿呢？NGINX 部署前端的静态资源，tomcat 部署后端服务,这样就可以实现服务性能的最大化',
        '',
      ],
      img: []
    },
    {
      title: '虚拟主机',
      jsCode: ``,
      desc: [
        '虚拟主机就是把一台物理机划分多个“虚拟”的服务器，就是一台物理服务器当做多个服务器使用，从而可以配置多个网站; nginx提供虚拟主机的功能，就是不用在一个服务器上安装多个nginx, 就可以运行多个域名不同的网站。',
        'nginx 下，一个server 就是一个虚拟主机。nginx的虚拟主机就是通过nginx.conf 的server 节点指定的，想要配置多个虚拟主机，配置多个server节点即可，比如说像 微服务的子应用就没有必要一个微应用就一个nginx 服务器，就可以通过虚拟主机来实现',
      ],
      img: []
    },
    {
      title: '基于端口的虚拟主机',
      jsCode: `
      server {

        server_name localhost;
      
        listen 9999;
      
        location / {
      
            root /home/xx/wujie/gms-fe/qa;
      
            index index.html;
      
        }
      
      }
      
       
      
      server {
      
        server_name localhost;
      
        listen 8888;
      
        location / {
      
            root /home/xx/wujie/gms-fe/qa;
      
            index index.html;
      
        }
      
      }`,
      desc: [
        '基于端口的虚拟主机，使用端口来进行区分，浏览器可以通过同一域名+端口号，或者通过同一个ip+端口号进行访问',
      ],
      img: []
    },
    {
      title: '基于域名的虚拟主机',
      jsCode: `
      server {

        server_name wms.intra.xx.com;
      
        listen 80;
      
        location / {
      
            root /home/xx/wujie/wms-fe/qa;
      
            index index.html;
      
        }
      
      }
      
       
      
      server {
      
        server_name gms.intra.xx.com;
      
        listen 80;
      
        location / {
      
            root /home/xx/wujie/gms-fe/qa;
      
            index index.html;
      
        }
      
      }`,
      desc: [
        '基于域名访问是最常见的虚拟主机 这里就可以通过 wms.intra.xx.com，  gms.intra.xx.com 访问',
      ],
      img: []
    },
    {
      title: 'nginx常用指令',
      jsCode: ``,
      desc: [
        './nginx 启动',
        './nginx -s stop 停止',
        './nginx -s quit 安全退出',
        './nginx -s reload 重新加载配置文件',
        'ps aux|grep nginx 查看nginx 进程',
      ],
      img: []
    },
  ]
}


        
        
       
        
  