# Tokyo Disney Resort Wait Times API

GitHub Actions を利用して、東京ディズニーランド（TDL）と東京ディズニーシー（TDS）の待ち時間を5分おきに取得し、JSON形式で提供するプロジェクトです。

## 🚀 API Endpoint (JSON)
`https://ikymbiz.github.io/disneyapi/data.json`

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
```

データ提供元: 本アプリの待ち時間データは Queue-Times.com (https://queue-times.com/) を利用しています。
