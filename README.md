# Calendar-app

# 前提条件
node, npmがインストールされている

MongoDBがインストールされている

# サーバーサイドモジュールインストール
```bash
npm init -y
npm i --save express
npm i --save mongoose  // nodeからMongoDBを操作
npm i --save babel-cli babel-preset-es2015  // ES6→ES5の変換
npm i --save body-parser 
```

# 立ち上げ手順
server.jsがある階層で
```bash
npm start
```
clientフォルダーに入る
```bash
cd client
```
`npm start`でreactを立ち上げる
```bash
npm start
```
