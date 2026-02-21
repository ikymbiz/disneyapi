const fs = require('fs');

// --- ランド & シー 共通名前変換辞書 ---
const nameMap = {
    // 【東京ディズニーシー】
    "Soaring: Fantastic Flight": "ソアリン：ファンタスティック・フライト",
    "Toy Story Mania!": "トイ・ストーリー・マニア！",
    "Tower of Terror": "タワー・オブ・テラー",
    "Journey to the Center of the Earth": "センター・オブ・ジ・アース",
    "Indiana Jones® Adventure: Temple of the Crystal Skull": "インディ・ジョーンズ®：クリスタルスカルの魔宮",
    "Indiana Jones Adventure®: Temple of the Crystal Skull": "インディ・ジョーンズ®：クリスタルスカルの魔宮",
    "Raging Spirits": "レイジングスピリッツ",
    "20,000 Leagues Under the Sea": "海底2万マイル",
    "Turtle Talk": "タートル・トーク",
    "Nemo & Friends SeaRider": "ニモ＆フレンズ・シーライダー",
    "Aquatopia": "アクアトピア",
    "The Magic Lamp Theater": "マジックランプシアター",
    "Sindbad's Storybook Voyage": "シンドバッド・ストーリーブック・ヴォヤッジ",
    "Jasmine's Flying Carpets": "ジャスミンのフライングカーペット",
    "Flounder's Flying Fish Coaster": "フランダーのフライングフィッシュコースター",
    "Scuttle's Scooters": "スカットルのスクーター",
    "Jumpin' Jellyfish": "ジャンピン・ジェリーフィッシュ",
    "Blowfish Balloon Race": "ブローフィッシュ・バルーンレース",
    "Venetian Gondolas": "ヴェネツィアン・ゴンドラ",
    "The Whirlpool": "ワールプール",
    "Caravan Carousel": "キャラバンカルーセル",
    "Ariel's Playground": "アリエルのプレイグラウンド",
    "The Leonardo Challenge": "レオナルド・チャレンジ",
    "DisneySea Electric Railway (American Waterfront)": "ディズニーシー・エレクトリックレールウェイ（アメフロ）",
    "DisneySea Electric Railway (Port Discovery)": "ディズニーシー・エレクトリックレールウェイ（ポート）",
    "DisneySea Transit Steamer Line (Mediterranean Harbor)": "トランジットスチーマーライン（メディテレーニアン）",
    "DisneySea Transit Steamer Line (American Waterfront)": "トランジットスチーマーライン（アメフロ）",
    "DisneySea Transit Steamer Line (Lost River Delta)": "トランジットスチーマーライン（ロストリバー）",
    "Anna and Elsa's Frozen Journey": "アナとエルサのフローズンジャーニー",
    "Peter Pan's Never Land Adventure": "ピーターパンのネバーランドアドベンチャー",
    "Fairy Tinker Bell's Busy Buggies": "フェアリー・ティンカーベルのビジーバギー",
    "Rapunzel's Lantern Festival": "ラプンツェルのランタンフェスティバル",
    "Mickey & Friends Greeting Trails": "ミッキー＆フレンズ・グリーティングトレイル",

    // 【東京ディズニーランド】
    "Enchanted Tale of Beauty and the Beast": "美女と野獣“魔法のものがたり”",
    "The Happy Ride with Baymax": "ベイマックスのハッピーライド",
    "Splash Mountain": "スプラッシュ・マウンテン",
    "Monsters, Inc. Ride & Go Seek!": "モンスターズ・インク“ライド＆ゴーシーク！”",
    "Big Thunder Mountain": "ビッグサンダー・マウンテン",
    "Pooh's Hunny Hunt": "プーさんのハニーハント",
    "Haunted Mansion": "ホーンテッドマンション",
    "Peter Pan's Flight": "ピーターパン空の旅",
    "Dumbo The Flying Elephant": "空飛ぶダンボ",
    "Roger Rabbit's Car Toon Spin": "ロジャーラビットのカートゥーンスピン",
    "Jungle Cruise: Wildlife Expeditions": "ジャングルクルーズ：ワイルドライフ・エクスペディション",
    "Snow White's Adventures": "白雪姫と七人のこびと",
    "Gadget's Go Coaster": "ガジェットのゴーコースター",
    "Western River Railroad": "ウエスタンリバー鉄道",
    "Star Tours: The Adventures Continue": "スター・ツアーズ：ザ・アドベンチャーズ・コンティニュー",
    "Stitch Encounter": "スティッチ・エンカウンター",
    "Beaver Brothers Explorer Canoes": "ビーバーブラザーズのカヌー探険",
    "Pirates of the Caribbean": "カリブの海賊",
    "“it's a small world with Groot”": "イッツ・ア・スモールワールド（with グルート）",
    "Cinderella's Fairy Tale Hall": "シンデレラのフェアリーテイル・ホール",
    "Pinocchio's Daring Journey": "ピノキオの冒険旅行",
    "Castle Carrousel": "キャッスルカルーセル",
    "Country Bear Theater": "カントリーベア・シアター",
    "Alice's Tea Party": "アリスのティーパーティー",
    "Mark Twain Riverboat": "蒸気船マークトウェイン号",
    "Minnie's House": "ミニーの家",
    "Goofy's Paint 'n' Play House": "グーフィーのペイント＆プレイハウス",
    "Mickey's PhilharMagic": "ミッキーのフィルハーマジック",
    "The Enchanted Tiki Room: Stitch Presents “Aloha E Komo Mai!”": "魅惑のチキルーム：スティッチ・プレゼンツ“アロハ・エ・コモ・マイ！”",
    "Westernland Shootin' Gallery": "ウエスタンランド・シューティングギャラリー",
    "Omnibus": "オムニバス",
    "Chip 'n Dale's Treehouse": "チップとデールのツリーハウス",
    "Donald's Boat": "ドナルドのボート",
    "Tom Sawyer Island Rafts": "トムソーヤ島いかだ",
    "Mickey's House and Meet Mickey": "ミッキーの家とミート・ミッキー",
    "Woodchuck Greeting Trail": "ウッドチャック・グリーティングトレイル",
    "Swiss Family Treehouse": "スイスファミリー・ツリーハウス",
    "Penny Arcade": "ペニーアーケード"
};

async function fetchParkData(parkId, parkCode) {
    const url = `https://queue-times.com/parks/${parkId}/queue_times.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fetch error: ${response.status}`);
    
    const data = await response.json();
    let rides = [];

    data.lands.forEach(land => {
        land.rides.forEach(ride => {
            rides.push({
                park: parkCode,
                name_ja: nameMap[ride.name] || ride.name, // 辞書にない場合は英語名
                name_en: ride.name,
                wait_time: ride.wait_time,
                is_open: ride.is_open,
                last_updated: new Date().toISOString()
            });
        });
    });
    return rides;
}

async function main() {
    try {
        console.log("Fetching data from TDL and TDS...");
        const tdl = await fetchParkData(274, "TDL");
        const tds = await fetchParkData(275, "TDS");

        const combinedData = {
            updated_at: new Date().toISOString(),
            count: tdl.length + tds.length,
            rides: [...tdl, ...tds]
        };

        fs.writeFileSync('data.json', JSON.stringify(combinedData, null, 2));
        console.log(`Successfully saved ${combinedData.count} rides to data.json`);
    } catch (error) {
        console.error("Critical Error:", error);
        process.exit(1);
    }
}

main();
