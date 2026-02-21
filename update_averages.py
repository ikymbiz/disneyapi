import pandas as pd
import json

def get_park_averages(park_id):
    url = f"https://queue-times.com/en-US/parks/{park_id}/stats"
    # ページ内のテーブルをすべて取得
    dfs = pd.read_html(url)
    # 通常、最初のテーブル（index 0）にアトラクション別平均が入っています
    df = dfs[0]
    
    # "Ride" と "Overall average wait time, mins" カラムを使用
    # カラム名はサイトの仕様変更で変わる可能性があるため注意
    stats = {}
    for _, row in df.iterrows():
        ride_name = row['Ride']
        # 文字列から数値のみを抽出（例: "45 mins" -> 45）
        avg_wait = int(''.join(filter(str.isdigit, str(row.iloc[1]))))
        stats[ride_name] = avg_wait
    return stats

# ランド(274)とシー(275)の両方を取得
all_averages = {
    "TDL": get_park_averages(274),
    "TDS": get_park_averages(275)
}

with open('averages.json', 'w', encoding='utf-8') as f:
    json.dump(all_averages, f, ensure_ascii=False, indent=2)

print("averages.json has been updated!")
