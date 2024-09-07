
# Rain & Water Effect Experiments

Credit to Lucas bebber for creating the rain effect used! 

[Link to original repository](https://github.com/codrops/RainEffect)

[Article on Codrops](http://tympanus.net/codrops/?p=25417)

## To compile:

Run in the folder:

```
npm install
npm install gulp@3.9.1 --save-dev
```
### Download nvm (for older node version):

#### FOR WINDOWS:
```
Invoke-WebRequest -Uri "https://github.com/coreybutler/nvm-windows/releases/download/1.1.10/nvm-setup.zip" -OutFile "$env:TEMP\nvm-setup.zip"
Expand-Archive -Path "$env:TEMP\nvm-setup.zip" -DestinationPath "$env:TEMP\nvm"
Start-Process "$env:TEMP\nvm\nvm-setup.exe"
```

Then follow installation process and relaunch Editor/Terminal.

Run
```
nvm version
```
to make sure it properly installed.

Now we need to download node version 10:
```
nvm install 10
nvm use 10
node -v
```


#### FOR MAC (After the other stuff):
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Then run:

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
Relaunch Editor/Terminal

### To Compile:

Finally, run:

```
gulp
```
