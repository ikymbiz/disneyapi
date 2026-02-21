# Tokyo Disney Resort Wait Times API

GitHub Actions を利用して、東京ディズニーランド（TDL）と東京ディズニーシー（TDS）の待ち時間を5分おきに取得し、JSON形式で提供するプロジェクトです。

## 🚀 API Endpoint (JSON)
GitHub Pagesを有効にすると、以下のURLからデータを取得できます：
`https://<あなたのユーザー名>.github.io/<リポジトリ名>/data.json`

## 🛠 データ構造
APIは以下のようなJSONを返します：

```json
{
  "updated_at": "2023-10-27T10:00:00.000Z",
  "count": 65,
  "rides": [
    {
      "park": "TDS",
      "name_ja": "ソアリン：ファンタスティック・フライト",
      "name_en": "Soaring: Fantastic Flight",
      "wait_time": 120,
      "is_open": true,
      "last_updated": "2023-10-27T10:00:00.000Z"
    }
  ]
}

#  仕組み
​GitHub Actions: 5分ごとに update.js を実行します。
​Data Fetching: queue-times.com から最新の待ち時間を取得します。
​Translation: 英語名を日本語名に変換し、データを整形します。
​Caching: 結果を data.json としてこのリポジトリに保存（コミット）します。
​Hosting: GitHub Pages を通じて、静的ファイルとしてAPI公開されます。
​⚠️ 注意事項
​本データは queue-times.com の提供データに基づいています。公式アプリの値と僅かな差がある場合があります。
​パークの運用時間外は、すべての施設が「休止中（Closed）」として表示されます。
​<!-- end list -->

---

### リポジトリの最終的なフォルダ構成

GitHubのリポジトリは以下のようになっていれば完璧です。

```text
.github/
  └── workflows/
      └── update.yml    (GitHub Actionsの設定)
update.js               (データ取得プログラム)
index.html              (検証用画面)
README.md               (このリポジトリの説明)
data.json               (自動生成されるデータファイル)