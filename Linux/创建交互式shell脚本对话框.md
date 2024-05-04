当你在终端环境下安装新的软件时，你可以经常看到信息对话框弹出，需要你的输入，比如：RHEL/CentOS自带的setup，对话框的类型有密码箱、检查表、菜单等等。他们可以引导你以一种直观的方式输入必要的信息，使用这样的用户友好的对话框的好处是显而易见的。

当你写一个交互式shell脚本，你可以使用这样的对话框来接受用户的输入。whiptail可以在shell脚本中创建基于终端的对话框，消息框的过程，类似于Zenity或xdialog GUI脚本代码。whiptail预先安装在所有的Linux发布版本中。

whiptail 语法
```
whiptail  [  --title  title  ]  [ --backtitle backtitle ] [ --clear ] [ --default-item string ] [ --defaultno ] [  --fb  ]  [  --nocancel  ]  [ --yes-button  text ] [ --no-button text ] [ --ok-button text ] [ --can‐cel-button text ] [ --noitem [ ] --output-fd fd ] [ --separate-output ] [ --scrolltext ] [ --topleft ] box-options
```
选项说明
```
--clear
       The screen will be cleared to the screen attribute on exit.  This doesn't work in an  xterm  (and  descendants)  if  alternate
       screen switching is enabled, because in that case slang writes to (and clears) an alternate screen.

--defaultno
       The dialog box will open with the cursor over the No button.

--default-item string
       Set  the default item in a menu box.  Normally the first item in the box is the default.

--fb   Use full buttons. (By default, whiptail uses compact buttons).

--nocancel
       The dialog box won't have a Cancel button.

--yes-button text
       Set the text of the Yes button.

--no-button text
       Set the text of the No button.

--ok-button text
       Set the text of the Ok button.

--cancel-button text
       Set the text of the Cancel button.

--noitem
       The menu, checklist and radiolist widgets will display tags only, not the item strings. The menu widget still needs some items
       specified, but checklist and radiolist expect only tag and status.

--separate-output
       For checklist widgets, output result one line at a time, with no quoting.  This facilitates parsing by another program.

--output-fd fd
       Direct output to the given file descriptor.  Most whiptail scripts write to standard error, but  error   messages   may   also
       be written there, depending on your script.

--title title
       Specifies a title string to be displayed at the top of the dialog box.

--backtitle backtitle
       Specifies a backtitle string to be displayed on the backdrop, at the top of the screen.

--scrolltext
       Force the display of a vertical scrollbar.

--topleft
       Put window in top-left corner.
```
对话框选项说明
```
--yesno text height width
       A  yes/no  dialog box of size height rows by width columns will be displayed. The string specified by text is displayed inside
       the dialog box. If this string is too long to be fit in one line, it will be automatically  divided  into  multiple  lines  at
       appropriate  places.  The text string may also contain the sub-string "\n" or newline characters `\n' to control line breaking
       explicitly.  This dialog box is useful for asking questions that require the user to answer either yes or no.  The dialog  box
       has a Yes button and a No button, in which the user can switch between by pressing the TAB key.

--msgbox text height width
       A  message  box is very similar to a yes/no box.  The only difference between a message box and a yes/no box is that a message
       box has only a single OK button. You can use this dialog box to display any message you like.  After reading the message,  the
       user can press the ENTER key so that whiptail will exit and the calling shell script can continue its operation.

--infobox text height width
       An info box is basically a message box.  However, in this case, whiptail will exit immediately after displaying the message to
       the user. The screen is not cleared when whiptail exits, so that the message will remain on the screen until the calling shell
       script  clears it later. This is useful when you want to inform the user that some operations are carrying on that may require
       some time to finish.

--inputbox text height width [init]
       An input box is useful when you want to ask questions that require the user to input a string as the answer. If init  is  sup‐
       plied  it  is  used to initialize the input string.  When inputing the string, the BACKSPACE key can be used to correct typing
       errors. If the input string is longer than the width of the dialog box, the input field will be scrolled. On exit,  the  input
       string will be printed on stderr.

--passwordbox text height width [init]
       A password box is similar to an input box, except the text the user enters is not displayed. This is useful when prompting for
       passwords or other sensitive information. Be aware that if anything is passed in "init", it will be visible  in  the  system's
       process  table  to casual snoopers. Also, it is very confusing to the user to provide them with a default password they cannot
       see. For these reasons, using "init" is highly discouraged.

--textbox file height width
       A text box lets you display the contents of a text file in a dialog box. It is like a simple text file viewer.  The  user  can
       move  through  the  file  by using the UP/DOWN, PGUP/PGDN and HOME/END keys available on most keyboards.  If the lines are too
       long to be displayed in the box, the LEFT/RIGHT keys can be used to scroll the text region horizontally. For more convenience,
       forward and backward searching functions are also provided.

--menu text height width menu-height [ tag item ] ...
       As  its  name suggests, a menu box is a dialog box that can be used to present a list of choices in the form of a menu for the
       user to choose. Each menu entry consists of a tag string and an item string. The tag gives the entry a name to distinguish  it
       from the other entries in the menu. The item is a short description of the option that the entry represents. The user can move
       between the menu entries by pressing the UP/DOWN keys, the first letter of the tag as a hot-key. There are menu-height entries
       displayed in the menu at one time, but the menu will be scrolled if there are more entries than that. When whiptail exits, the
       tag of the chosen menu entry will be printed on stderr.

--checklist text height width list-height [ tag item status ] ...
       A checklist box is similar to a menu box in that there are multiple entries presented in the form of a menu.  You  can  select
       and  deselect  items  using the SPACE key.  The initial on/off state of each entry is specified by status.  On exit, a list of
       the tag strings of those entries that are turned on will be printed on stderr.

--radiolist text height width list-height  [ tag item status ] ...
       A radiolist box is similar to a menu box.  The only difference is that you can indicate which entry is currently selected,  by
       setting its status to on.

--gauge text height width percent
       A  gauge  box  displays a meter along the bottom of the box.  The meter indicates a percentage.  New percentages are read from
       standard input, one integer per line.  The meter is updated to reflect each new percentage.  If stdin is XXX, then  subsequent
       lines up to another XXX are used for a new prompt.  The gauge exits when EOF is reached on stdin.
```

whiptail用法示例：

创建一个消息框  
> 一个消息框中显示一个确认按钮继续任意的文本消息。  
> 语法：  
```
whiptail --title "<message box title>" --msgbox "<text to show>" <height> <width> 
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190341_b403598e_132614.png "1.png")
> 示例：   
```
#!/usr/bin/env bash
# encoding: utf-8.0

whiptail --title "Test Message Box" --msgbox "Create a message box with whiptail. Choose Ok to continue." 10 60 
```

创建一个yes/no对话框
> 用户输入yes或no的对话框。  
> 语法：  
```
whiptail --title "<dialog box title>" --yesno "<text to show>" <height> <width> 
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190404_94303c2e_132614.png "2.png")

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190420_0e5cf0f4_132614.png "3.png")
> 示例：
```
#!/usr/bin/env bash
# encoding: utf-8.0 

if (whiptail --title "Test Yes/No Box" --yesno "Choose between Yes and No." 10 60) then 
    echo "You chose Yes. Exit status was $?." 
else 
    echo "You chose No. Exit status was $?." 
fi 
```
或者，你可以是“--yes-button” ,"--no-button"选项。   
```
#!/bin/bash 

if (whiptail --title "Test Yes/No Box" --yes-button "Skittles" --no-button "M&M's" --yesno "Which do you like better?" 10 60) then
    echo "You chose Skittles Exit status was $?." 
else 
    echo "You chose M&M's. Exit status was $?." 
fi 
```

创建一个表单输入框  
> 如果你想用户输入任意的文本，您可以使用一个输入框。  
> 语法：
```
 whiptail --title "<input box title>" --inputbox "<text to show>" <height> <width> <default-text>
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190438_5637c608_132614.png "4.png")
> 示例：
```
#!/usr/bin/env bash
# encoding: utf-8.0 

PET=$(whiptail --title "Test Free-form Input Box" --inputbox "What is your pet's name?" 10 60 Wigglebutt 3>&1 1>&2 2>&3) exitstatus=$? 
if [ $exitstatus = 0 ]; then 
    echo "Your pet name is:" $PET 
else 
    echo "You chose Cancel." 
fi 
```

创建一个密码框  
> 当用户需要输入敏感信息时密码框是有用的。  
> 语法：
```
whiptail --title "<password box title>" --passwordbox "<text to show>" <height> <width>
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190531_39a779af_132614.png "5.png")
> 示例：  
```
#!/bin/bash 

PASSWORD=$(whiptail --title "Test Password Box" --passwordbox "Enter your password and choose Ok to continue." 10 60 3>&1 1>&2 2>&3) exitstatus=$?
if [ $exitstatus = 0 ]; then 
    echo "Your password is:" $PASSWORD 
else 
    echo "You chose Cancel." 
fi 
```

创建一个菜单栏  
> 当你想让用户选择一个任意数量的选择中，你可以使用菜单框。  
> 语法：  
```
whiptail --title "<menu title>" --menu "<text to show>" <height> <width> <menu height> [ <tag> <item> ] . . .
```

![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190502_f876cc0a_132614.png "6.png")
> 示例：  
```
#!/usr/bin/env bash
# encoding: utf-8.0 

OPTION=$(whiptail --title "Test Menu Dialog" --menu "Choose your option" 15 60 4 \ "1" "Grilled Spicy Sausage" \ "2" "Grilled Halloumi Cheese" \ "3" "Charcoaled Chicken Wings" \ "4" "Fried Aubergine" 3>&1 1>&2 2>&3) exitstatus=$? 
if [ $exitstatus = 0 ]; then 
    echo "Your chosen option:" $OPTION 
else 
    echo "You chose Cancel." 
fi 
```

创建radiolist对话框  
> 语法：
```
 whiptail --title "<radiolist title>" --radiolist "<text to show>" <height> <width> <list height> [ <tag> <item> <status> ] . . .
```
![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/190546_01304cde_132614.png "7.png")
> 示例：
```
#!/usr/bin/env bash
# encoding: utf-8.0 

DISTROS=$(whiptail --title "Test Checklist Dialog" --radiolist \ "What is the Linux distro of your choice?" 15 60 4 \ "debian" "Venerable Debian" ON \ "ubuntu" "Popular Ubuntu" OFF \ "centos" "Stable CentOS" OFF \ "mint" "Rising Star Mint" OFF 3>&1 1>&2 2>&3) exitstatus=$? 
if [ $exitstatus = 0 ]; then 
    echo "The chosen distro is:" $DISTROS 
else 
    echo "You chose Cancel." 
fi 
```

创建一个表对话框  
> 当你想让用户选择一个列表中选择多个选项的清单对话框是有用的，radiolist对话框，只允许选择一个。  
> 语法：
```
whiptail --title "<checklist title>" --checklist "<text to show>" <height> <width> <list height> [ <tag> <item> <status> ] . . .
```
![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/191109_059d89e0_132614.png "8.png")
> 示例：  
```
#!/usr/bin/env bash
# encoding: utf-8.0 

DISTROS=$(whiptail --title "Test Checklist Dialog" --checklist \ "Choose preferred Linux distros" 15 60 4 \ "debian" "Venerable Debian" ON \ "ubuntu" "Popular Ubuntu" OFF \ "centos" "Stable CentOS" ON \ "mint" "Rising Star Mint" OFF 3>&1 1>&2 2>&3) exitstatus=$? 
if [ $exitstatus = 0 ]; then 
    echo "Your favorite distros are:" $DISTROS 
else 
    echo "You chose Cancel." 
fi 
```
创建一个进度条  
> 进度条是一个用户友好的对话框。whiptail从标准输入读取一个百分数（0～100），显示一个表内相应的计数。  
> 语法：
```
whiptail --gauge "<test to show>" <height> <width> <inital percent>
```
![输入图片说明](https://images.gitee.com/uploads/images/2019/0227/191152_7ec128b8_132614.png "9.png")
> 示例：  
```
#!/bin/bash 

{ 
for ((i = 0 ; i <= 100 ; i+=20)); do
    sleep 1 
    echo $i 
done 
} | whiptail --gauge "Please wait while installing" 6 60 0 
```

本文转载自：https://www.cnblogs.com/probemark/p/5890599.html  
本文转载自：http://www.linuxprobe.com/create-interactive-shell-script.html  
更多Linux干货请访问：http://www.linuxprobe.com/  
