## 下载Linux版 navicat

## 重新试用14天
```
rm -rf ~/.config/navicat/Premium/preferences.json
rm -rf ~/.config/dconf/user
```
或者
1. 删除 rm -rf ~/.config/navicat/Premium/preferences.json   
2. 编辑 ~/.config/dconf/user 删除其中 com.premiumsoft.navicat-premium下所有键值
> "dconf编辑器"可以编辑 ~/.config/dconf/user



[下载地址](http://www.navicat.com.cn/download/navicat-premium)

## navicat15-premium-cs激活

参考：https://gitee.com/andisolo/navicat-keygen 进行激活

1. 打开控制台进入管理员权限  

sudo -i

2. 安装依赖  
```
# install capstone
$ apt-get install libcapstone-dev
# install rapidjson
$ apt-get install rapidjson-dev
# install openssl
$ apt-get install openssl
```
其中有一个依赖需要手动编译，建立临时文件夹  
`mkdir ~/temp && cd ~/temp`  
继续安装依赖
```
# install keystone
$ apt-get install cmake
$ git clone https://github.com/keystone-engine/keystone.git
或
$ git clone https://gitee.com/xlfxulinfeng/keystone.git
$ cd keystone
$ mkdir build
$ cd build
$ ../make-share.sh
$ make install
$ ldconfig
```

3. 下载编译navicat-keygen
```
$ git clone -b linux --single-branch https://gitee.com/andisolo/navicat-keygen.git
$ cd navicat-keygen
$ make all
$ cd..
```

4. 下载并解压 navicat15
```
# 下载 navicat15
$ wget https://download.navicat.com.cn/download/navicat15-premium-cs.AppImage
$ chmod +x navicat15-premium-cs.AppImage
$ mkdir test #新建临时挂在文件
$ cd test 进入临时挂载文件
$ mount -o loop ../navicat15-premium-cs.AppImage ./ #把挂载到临时文件
$ cp -r ./test ./navicat #把挂载好的文件复制到navicat目录
$ umount ./test #取消挂载
$ rm -rf ./test #删除临时文件
```
5. 开始激活
```
$ cd navicat-keygen/ 进入编译好的keygen文件夹
$ bin/navicat-patcher ../navicat
```
输出以下内容即为替换根key成功
```
**********************************************************
*       Navicat Patcher (Linux) by @DoubleLabyrinth      *
*                  Version: 1.0                          *
**********************************************************

Press ENTER to continue or Ctrl + C to abort.

[+] Try to open libcc.so ... Ok!

[+] PatchSolution0 ...... Ready to apply
    RefSegment      =  1
    MachineCodeRva  =  0x000000000137f0d0
    PatchMarkOffset = +0x00000000029437e8

[*] Generating new RSA private key, it may take a long time...
[*] Your RSA private key:
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAowfvVcYyvRR/UHpOPw/wx0gg+WBdNY+uNo/pVY4Bq3yHUVuJ
    jMFLcMRHpBPp6a8WLDc4/OpDbrXf41EJRGjV2LVILyJvEgrAHIaHXq0+rYVsARkv
    DJPw5lL0779p3Ik1R7+JBeLAbf8/G/ZIQvQyOedOjuLfO+aJFjUVg4xpn8qUZCUM
    p05gr2L6ryCQd/72vrYwnp123BsWYkQtzri5UDXwSse4L/Kq5wpOw3yMhpEdxzwJ
    tLt2e3m+/NElqYgupR66NSQBXDa/lCMZ4IXhUjfeUxc4cLs0qftx0IOsFm0SVjDy
    ASrHtrqv9RLybT+2tNjQ7RnnjanEGs+Q294E6QIDAQABAoIBAQCAi48gmIgFIhZI
    hEcR3iXBW5P0TRDxXHrGtq4KMVALwMKJWZ2ZCAfNwFWkf7cd9FmNP3WFpcjJkEoZ
    2BlwgSCsIDPsRkBBf4x+cWxnMD6NXvgL3amFR1jYomxSZSC5LM5/5fvKUkHb+Tfv
    ej7728OGeGUusJ/HgTxx8CUodhwKStRdc9VJG/imuHDM665qKSXwWzATDBYL7u4q
    mG8pewzsGyILOL55QVBaw0VDk+H1W/zkIsBL4nLm/Y9bnxwbjHRb2awcEJBvyWCR
    MYAvmi4fT1Ibn7CHPOT2iZPbwDCNYOIOLucKbli/PsRcZ+UIWEu9ihiw8Brwc31i
    UpUaU9QhAoGBANOVNxah+fqI5j47ZM1Qc9sFsTiExEgkhHue5nRn+ItT8R2LVtYd
    BE5xwi//cpAQ0Grhhd96rieozC/JVKobCOiTwqAyocG0WORciX9TyWN9eJM1EULH
    7b89haRM2YxvPoz86wa7o2MqX8X5U/0OSv0O9RMRXtjOZvlR983ucOQlAoGBAMVB
    d9nMIgbMs/ebjWorR+4CKByVAePhP2vR8rdSMKLyY9hkzlv3K08SWXgsfwjtpyn5
    a8Bu2XbEFzguSsEejPy5q+IZRk+gSagT6PtguNEh5VMCbgP45NxsR3W4b43qGFbN
    5gzp2cYyQHDojWZsUM1lYK8M3KMpDKTtDD0NYsB1AoGAfAimUbNEyxUD/Ilu71lx
    gX0Vxi82raAStjGRob3tmyfrWkl772r1QlM35lFWxJPGylFI3JibjY5LnNvmsQ3G
    LCmq16S25Monrj99L1Jb5eIBFDLw2ng/rHORa57NjaENRzNhSAIppxGJMZKXJOsD
    FNR24OW291wQS6o8ndFhBq0CgYAuCRRuiRyb16RcsjnzwDweSPSRjxkM1OHXSP1L
    WWwua0FwHD6o6et6nb6xtDjFnak4u5QxKe2osST2IJ+jqHyg8rgxoVJufOsTxenG
    2RDpBe8eS1/fn3PSGZcn2y51wV+CyrTY6K7BebLeZvexIrBM7078K5VGournhscn
    bHtSjQKBgQCU1uXyGXoHQeLrCL+y7Rg2oO20dMWQAkjz9DzDo/oOkub4VjvAOWVH
    4JZ6LkerZ+BI6WI4ezTabDnjb/X5iJnEj+Q8UXtb/q/8HUKTTk8WJ2l5gy1Hxdha
    /dv/OD2Axvdr+tlzWthyaQ9+bXcNibiuVZY2MxVnk4wRjo44R/UQfQ==
    -----END RSA PRIVATE KEY-----
[*] Your RSA public key:
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAowfvVcYyvRR/UHpOPw/w
    x0gg+WBdNY+uNo/pVY4Bq3yHUVuJjMFLcMRHpBPp6a8WLDc4/OpDbrXf41EJRGjV
    2LVILyJvEgrAHIaHXq0+rYVsARkvDJPw5lL0779p3Ik1R7+JBeLAbf8/G/ZIQvQy
    OedOjuLfO+aJFjUVg4xpn8qUZCUMp05gr2L6ryCQd/72vrYwnp123BsWYkQtzri5
    UDXwSse4L/Kq5wpOw3yMhpEdxzwJtLt2e3m+/NElqYgupR66NSQBXDa/lCMZ4IXh
    UjfeUxc4cLs0qftx0IOsFm0SVjDyASrHtrqv9RLybT+2tNjQ7RnnjanEGs+Q294E
    6QIDAQAB
    -----END PUBLIC KEY-----

*******************************************************
*                   PatchSolution0                    *
*******************************************************
[*] Previous:
+0x0000000000000070                          01 00 00 00 05 00 00 00          ........
+0x0000000000000080  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000000000090  00 00 00 00 00 00 00 00 e8 37 94 02 00 00 00 00  .........7......
+0x00000000000000a0  e8 37 94 02 00 00 00 00 00 10 00 00 00 00 00 00  .7..............
[*] After:
+0x0000000000000070                          01 00 00 00 05 00 00 00          ........
+0x0000000000000080  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000000000090  00 00 00 00 00 00 00 00 78 39 94 02 00 00 00 00  ........x9......
+0x00000000000000a0  78 39 94 02 00 00 00 00 00 10 00 00 00 00 00 00  x9..............

[*] Previous:
+0x00000000029437e0                          00 00 00 00 00 00 00 00          ........
+0x00000000029437f0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943800  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943810  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943820  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943830  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943840  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943850  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943860  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943870  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943880  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943890  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x00000000029438a0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x00000000029438b0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x00000000029438c0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x00000000029438d0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x00000000029438e0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x00000000029438f0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943900  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943910  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943920  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943930  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943940  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943950  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943960  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  ................
+0x0000000002943970  00 00 00 00 00 00 00 00                          ........        
[*] After:
+0x00000000029437e0                          ef be ad de 4d 49 49 42          ....MIIB
+0x00000000029437f0  49 6a 41 4e 42 67 6b 71 68 6b 69 47 39 77 30 42  IjANBgkqhkiG9w0B
+0x0000000002943800  41 51 45 46 41 41 4f 43 41 51 38 41 4d 49 49 42  AQEFAAOCAQ8AMIIB
+0x0000000002943810  43 67 4b 43 41 51 45 41 6f 77 66 76 56 63 59 79  CgKCAQEAowfvVcYy
+0x0000000002943820  76 52 52 2f 55 48 70 4f 50 77 2f 77 78 30 67 67  vRR/UHpOPw/wx0gg
+0x0000000002943830  2b 57 42 64 4e 59 2b 75 4e 6f 2f 70 56 59 34 42  +WBdNY+uNo/pVY4B
+0x0000000002943840  71 33 79 48 55 56 75 4a 6a 4d 46 4c 63 4d 52 48  q3yHUVuJjMFLcMRH
+0x0000000002943850  70 42 50 70 36 61 38 57 4c 44 63 34 2f 4f 70 44  pBPp6a8WLDc4/OpD
+0x0000000002943860  62 72 58 66 34 31 45 4a 52 47 6a 56 32 4c 56 49  brXf41EJRGjV2LVI
+0x0000000002943870  4c 79 4a 76 45 67 72 41 48 49 61 48 58 71 30 2b  LyJvEgrAHIaHXq0+
+0x0000000002943880  72 59 56 73 41 52 6b 76 44 4a 50 77 35 6c 4c 30  rYVsARkvDJPw5lL0
+0x0000000002943890  37 37 39 70 33 49 6b 31 52 37 2b 4a 42 65 4c 41  779p3Ik1R7+JBeLA
+0x00000000029438a0  62 66 38 2f 47 2f 5a 49 51 76 51 79 4f 65 64 4f  bf8/G/ZIQvQyOedO
+0x00000000029438b0  6a 75 4c 66 4f 2b 61 4a 46 6a 55 56 67 34 78 70  juLfO+aJFjUVg4xp
+0x00000000029438c0  6e 38 71 55 5a 43 55 4d 70 30 35 67 72 32 4c 36  n8qUZCUMp05gr2L6
+0x00000000029438d0  72 79 43 51 64 2f 37 32 76 72 59 77 6e 70 31 32  ryCQd/72vrYwnp12
+0x00000000029438e0  33 42 73 57 59 6b 51 74 7a 72 69 35 55 44 58 77  3BsWYkQtzri5UDXw
+0x00000000029438f0  53 73 65 34 4c 2f 4b 71 35 77 70 4f 77 33 79 4d  Sse4L/Kq5wpOw3yM
+0x0000000002943900  68 70 45 64 78 7a 77 4a 74 4c 74 32 65 33 6d 2b  hpEdxzwJtLt2e3m+
+0x0000000002943910  2f 4e 45 6c 71 59 67 75 70 52 36 36 4e 53 51 42  /NElqYgupR66NSQB
+0x0000000002943920  58 44 61 2f 6c 43 4d 5a 34 49 58 68 55 6a 66 65  XDa/lCMZ4IXhUjfe
+0x0000000002943930  55 78 63 34 63 4c 73 30 71 66 74 78 30 49 4f 73  Uxc4cLs0qftx0IOs
+0x0000000002943940  46 6d 30 53 56 6a 44 79 41 53 72 48 74 72 71 76  Fm0SVjDyASrHtrqv
+0x0000000002943950  39 52 4c 79 62 54 2b 32 74 4e 6a 51 37 52 6e 6e  9RLybT+2tNjQ7Rnn
+0x0000000002943960  6a 61 6e 45 47 73 2b 51 32 39 34 45 36 51 49 44  janEGs+Q294E6QID
+0x0000000002943970  41 51 41 42 ad de ef be                          AQAB....        

[*] Previous:
+0x000000000137f0d0  44 0f b6 24 18 48 8b 44 24 28 8b 50 f8 85 d2 79  D..$.H.D$(.P...y
+0x000000000137f0e0  6f                                               o               
[*] After:
+0x000000000137f0d0  45 31 e4 48 8d 05 12 47 5c 01 90 90 90 90 90 90  E1.H...G\.......
+0x000000000137f0e0  90                                               .               

[*] New RSA-2048 private key has been saved to
    /home/zlq/Downloads/navicat-keygen/bin/RegPrivateKey.pem

*******************************************************
*           PATCH HAS BEEN DONE SUCCESSFULLY!         *
*                  HAVE FUN AND ENJOY~                *
*******************************************************
```

6. 重新打包navicat15并激活
```
cd ../../
$ wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage #下载打包工具
$ wget "https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage"
$ chmod +x appimagetool-x86_64.AppImage #赋予执行权限
$ ./appimagetool-x86_64.AppImage ./navicat #打包

$ chmod +x ./Navicat_Premium_15-x86_64.AppImage #赋予打包好的程序执行权限
$ ./Navicat_Premium_15-x86_64.AppImage #测试运行

$ cd /navicat-keygen/ #进入编译好的keygen文件夹
$ ./bin/navicat-keygen --text ./RegPrivateKey.pem
**********************************************************
* Navicat Keygen (Linux) by @DoubleLabyrinth *
* Version: 1.0 *
**********************************************************
选择Navicat产品类别、Navicat语言版本和填写主版本号。之后一个随机生成的 序列号 将会给出。
[*] Select Navicat product:
0. DataModeler
1. Premium
2. MySQL
3. PostgreSQL
4. Oracle
5. SQLServer
6. SQLite
7. MariaDB
8. MongoDB
9. ReportViewer
(Input index)> 1
[*] Select product language:
0. English
1. Simplified Chinese
2. Traditional Chinese
3. Japanese
4. Polish
5. Spanish
6. French
7. German
8. Korean
9. Russian
10. Portuguese
(Input index)> 1
[*] Input major version number:
(range: 0 ~ 15, default: 12)> 15
[*] Serial number:
NAVM-RTVJ-EO42-IODD
[*] Your name:
[*] Your name: DoubleLabyrinth
[*] Your organization: DoubleLabyrinth
[*] Input request code in Base64: (Double press ENTER to end)
```
断开网络. 找到注册窗口，填写keygen给你的 序列号，然后点击 激活

通常在线激活会失败，所以在弹出的提示中选择  **手动激活** 。

复制 请求码 到keygen，连按两次回车结束。

最终你会得到一个base64编码的 激活码。
```

[*] Request Info:
{"K":"NAVFTB2TRRF5ORPT", "DI":"0A2BE98E55792E4DB2B7", "P":"linux"}

[*] Response Info:
{"K":"NAVFTB2TRRF5ORPT","DI":"0A2BE98E55792E4DB2B7","N":"tomhat","O":"org","T":1676599912}

[*] Activation Code:
V2lvIYe09FSeA+bod/kDiehp0PRBivXbS17oW94PjwLa11vlBei1OE5DXHiLXrwWCuJBVAKLO7EI9/NHjZ84mp7OddF7VjQ1hvYIb/gMYskLF8+xXQrJ+DHAuKhors+GKoU/XjgzsPkxZP1FJmwFfCWh45uZbLQ2JlWtSl7Py5CU80Wfsu9/bjNCDaxpChXZP+SBBPoze+N/2V6+Wt3be5LfT5Kd+lhPP6f+/6inG+M6bSwaMrik8WznKwzEZ3Dv0OkfHQvVQLV+K4Us19D0pZneSotbs3FJNJfxJlXMNdGhma9bHTnSSOJ0XGo62G2whtCq7hZOR+Z3Honv7mqFug==
```
之复制到 手动激活 的窗口，然后点击 激活。

如果没有什么意外，应该可以成功激活。


## navicat16-premium-cs激活

参考：  
https://ylyhappy.gitee.io/posts/linux/install-navciat.html  
https://notabug.org/doublesine/navicat-keygen/src/linux/doc/how-to-build.zh-CN.md


破解navicat16 使用 navicat-keygen for linux
从官网[下载Navicat](https://www.navicat.com.cn/download/direct-download?product=navicat16-premium-cs.AppImage&location=1)，你应该会得到一个AppImage文件，例如 navicat16-premium-cs.AppImage。   
提取安装包内容
我假定这个AppImage文件在 ~/ 文件夹下。
提取 navicat16-premium-cs.AppImage 里的所有文件到一个文件夹，例如 ~/navicat16-premium-cs-patched
```
mkdir ~/navicat16-premium-cs
sudo mount -o loop ~/navicat16-premium-cs.AppImage ~/navicat16-premium-cs
cp -r ~/navicat16-premium-cs ~/navicat16-premium-cs-patched
sudo umount ~/navicat16-premium-cs
rm -rf ~/navicat16-premium-cs
```


















