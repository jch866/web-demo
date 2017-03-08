/Users/jch/.ssh/id_rsa
在阿里云上搞个Git远程仓库。
搭建一个gitlab
建议用命令复制ssh key,用文本软件打开有可能出错!
mac
pbcopy < ~/.ssh/id_rsa.pub

windows
clip < ~/.ssh/id_rsa.pub

linux
sudo apt-get install xclip
xclip -sel clip < ~/.ssh/id_rsa.pub

…or create a new repository on the command line

echo "# web-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/jch866/web-demo.git
git push -u origin master

…or push an existing repository from the command line

git remote add origin https://github.com/jch866/web-demo.git
git push -u origin master

…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.


git name: jch   git pwd : 12345