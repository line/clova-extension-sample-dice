### 概要
「サイコロ遊び」というClova ExtensionのREST APIサーバーのソースコードです。サイコロ遊びExtensionがどのように動作するかを見るためには、ClovaアプリやClovaのスマートスピーカー(Clova WAVE、Clova Friends)に「サイコロ遊びを起動して」と話しかけてください。このExtensionを実行すると、サイコロを振った結果を返します。サイコロは1個から10個まで振ることができ、2個以上の場合はその合計を返します。

### 使用環境
サイコロ遊びExtensionのREST APIサーバーは、Node.jsで実装されています。Windows、MacOS、Linuxなど、Node.jsが稼動可能なOSで実行可能です。詳細については下記のサイトを参照し、Node.jsをあらかじめインストールしてください。
https://nodejs.org/ja/download/current/

### インストール方法
サイコロ遊びのREST APIサーバーのソースコードは、次の手順でインストールしてください。
1) Node.jsをインストールする: https://nodejs.org/ja/download/current/
2) ソースコードをダウンロードする: git clone https://github.com/line/clova-extension-sample-dice.git
3) 依存ライブラリをインストールする: npm install
4) config.js を編集し、"com.example.dice"を登録済みのExtension IDへ書き換える

### 使い方
「サイコロ遊び」ExtensionのREST APIサーバーは、ClovaプラットフォームからのExtensionリクエストに応じて適切な応答をするようになっています。APIサーバーを実行する場合、正常に動作しているかを確認するために、Clovaプラットフォームが送信するのと同じAPIを送信する必要がある点に留意してください。実際にサービスを行う際には、外部からhttpsでアクセス可能なドメインにする必要があります。
- APIサーバーの実行: node app.js
- APIサーバーのテスト: Postmanで下記のようにJSONリクエストを送信して、JSONが応答するかテストしてみます。
    - URL: http://localhost:3000/clova
    - リクエスト方法: POST
    - Body: raw (JSONフォーマット)
- リクエスト例)
```
{
  "version": "0.1.0",
  "session": {
    "sessionId": "55ca6ee4-72dd-4694-b30f-4b49e238634f",
    "user": {
      "userId": "U1bd47e4c7c68ca8a8ead15517d055ad1-BCw",
      "accessToken": "3d0e7bab-2c1a-44d4-be20-c84910b78e2c"
    },
    "new": true
  },
  "context": {
    "System": {
      "user": {
        "userId": "U1bd47e4c7c68ca8a8ead15517d055ad1-BCw",
        "accessToken": "3d0e7bab-2c1a-44d4-be20-c84910b78e2c"
      },
      "device": {
        "deviceId": "da6db6c26dcbe1a077eb2c890031ce2b1980asf2d30e00ee58804daf0ee89eff"
      },
      "application": {
        "applicationId": "com.example.dice"
      }
    }
  },
  "request": {
    "type": "IntentRequest",
    "intent": {
      "name": "ThrowDiceIntent",
      "slots": {
        "diceCount": {
          "name": "diceCount",
          "value": "1"
        }
      }
    }
  }
}
```

### ライセンス
NAVER & LINE Corporation

[LICENSE](https://github.com/line/clova-extension-sample-dice/blob/github-public/LICENSE)

```
Copyright 2018 NAVER Corp. & LINE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

