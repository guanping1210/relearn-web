# 检测nginx是否还活着的脚本
#!/bin/bash
A=`ps -C nginx -no-header |wc -l`

if [$A -eq 0];then
  # nginx访问路径
  /usr/local/nginx/sbin/nginx 
  sleep 2
  if [`ps -C nginx --no-header |wc -l` -eq 0];then
    killall keepalived
    fi
  fi