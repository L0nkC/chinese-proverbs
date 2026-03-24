/**
 * Japanese Proverbs (ことわざ - Kotowaza)
 * 50+ Traditional Japanese sayings with Romaji
 */

const japaneseProverbsData = [
    // WISDOM & LIFE (1-20)
    { id: "ja-001", jp: "石の上にも三年", romaji: "Ishi no ue ni mo sannen", en: "Three years on a stone. / Perseverance brings success.", cats: ["perseverance", "wisdom", "life"], culture: "japanese" },
    { id: "ja-002", jp: "七転び八起き", romaji: "Nana korobi ya oki", en: "Fall seven times, stand up eight. / Never give up.", cats: ["perseverance", "wisdom", "life"], culture: "japanese" },
    { id: "ja-003", jp: "猿も木から落ちる", romaji: "Saru mo ki kara ochiru", en: "Even monkeys fall from trees. / Everyone makes mistakes.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-004", jp: "虎穴に入らずんば虎子を得ず", romaji: "Koketsu ni irazunba koji wo ezu", en: "If you don't enter the tiger's den, you won't catch the cub. / Nothing ventured, nothing gained.", cats: ["wisdom", "business", "perseverance"], culture: "japanese" },
    { id: "ja-005", jp: "知らぬが仏", romaji: "Shiranu ga hotoke", en: "Not knowing is Buddha. / Ignorance is bliss.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-006", jp: "案ずるより産むが易し", romaji: "Anzuru yori umu ga yasushi", en: "Giving birth is easier than worrying. / Doing is easier than worrying.", cats: ["wisdom", "life", "perseverance"], culture: "japanese" },
    { id: "ja-007", jp: "目くそ鼻くそを笑う", romaji: "Mekuso hanakuso wo warau", en: "Eye dirt laughing at nose dirt. / The pot calling the kettle black.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-008", jp: "井の中の蛙大海を知らず", romaji: "I no naka no kawazu taikai wo shirazu", en: "The frog in the well knows nothing of the great ocean. / Limited perspective.", cats: ["wisdom", "learning"], culture: "japanese" },
    { id: "ja-009", jp: "出る杭は打たれる", romaji: "Deru kui wa utareru", en: "The stake that sticks up gets hammered down. / Don't stand out.", cats: ["wisdom", "business", "life"], culture: "japanese" },
    { id: "ja-010", jp: "花より団子", romaji: "Hana yori dango", en: "Dumplings over flowers. / Substance over style.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-011", jp: "枯れ木も山の賑わい", romaji: "Kareki mo yama no nigiwai", en: "Even dead trees bring life to the mountain. / Everything has value.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-012", jp: "一期一会", romaji: "Ichi-go ichi-e", en: "One time, one meeting. / Cherish every encounter.", cats: ["wisdom", "life", "friendship"], culture: "japanese" },
    { id: "ja-013", jp: "雨降って地固まる", romaji: "Ame futte ji katamaru", en: "After rain, the earth hardens. / Adversity strengthens.", cats: ["wisdom", "life", "perseverance"], culture: "japanese" },
    { id: "ja-014", jp: "禍を転じて福と為す", romaji: "Wazawai wo tenjite fuku to nasu", en: "Turn misfortune into fortune. / Make lemonade from lemons.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-015", jp: "急がば回れ", romaji: "Isogaba maware", en: "If in a hurry, take the long way. / Haste makes waste.", cats: ["wisdom", "life"], culture: "japanese" },
    { id: "ja-016", jp: "以心伝心", romaji: "Ishin denshin", en: "Heart to heart communication. / Tacit understanding.", cats: ["wisdom", "friendship", "love"], culture: "japanese" },
    { id: "ja-017", jp: "蛙の子は蛙", romaji: "Kaeru no ko wa kaeru", en: "The child of a frog is a frog. / Like father, like son.", cats: ["family", "wisdom"], culture: "japanese" },
    { id: "ja-018", jp: "良薬は口に苦し", romaji: "Ryōyaku wa kuchi ni nigashi", en: "Good medicine tastes bitter. / Good advice is hard to take.", cats: ["wisdom", "learning", "health"], culture: "japanese" },
    { id: "ja-019", jp: "猫に小判", romaji: "Neko ni koban", en: "Gold coins to a cat. / Pearls before swine.", cats: ["wisdom", "business"], culture: "japanese" },
    { id: "ja-020", jp: "のど元過ぎれば熱さを忘れる", romaji: "Nodomoto sugireba atsusa wo wasureru", en: "Once past the throat, forget the heat. / Out of sight, out of mind.", cats: ["wisdom", "life"], culture: "japanese" },
    
    // LEARNING (21-30)
    { id: "ja-021", jp: "三人寄れば文殊の知恵", romaji: "Sannin yoreba monju no chie", en: "Three heads are better than one. / Wisdom of the masses.", cats: ["learning", "wisdom", "friendship"], culture: "japanese" },
    { id: "ja-022", jp: "聞くは一時の恥、聞かぬは一生の恥", romaji: "Kiku wa ittoki no haji, kikanu wa isshō no haji", en: "Asking is a temporary shame, not asking is a lifetime shame.", cats: ["learning", "wisdom"], culture: "japanese" },
    { id: "ja-023", jp: "早起きは三文の徳", romaji: "Hayaoki wa sanmon no toku", en: "Waking early brings three benefits. / Early to bed, early to rise.", cats: ["learning", "wisdom", "health"], culture: "japanese" },
    { id: "ja-024", jp: "馬鹿は死ななきゃ治らない", romaji: "Baka wa shinanakya naoranai", en: "A fool won't heal until he dies. / You can't fix stupid.", cats: ["learning", "wisdom"], culture: "japanese" },
    { id: "ja-025", jp: "十年一日の如し", romaji: "Jūnen ichinichi no gotoshi", en: "Ten years like one day. / Consistent effort.", cats: ["learning", "perseverance"], culture: "japanese" },
    { id: "ja-026", jp: "温故知新", romaji: "Onko chishin", en: "Review the old, learn the new.", cats: ["learning", "wisdom"], culture: "japanese" },
    { id: "ja-027", jp: "学問に近道なし", romaji: "Gakumon ni chikimichi nashi", en: "There is no shortcut to learning.", cats: ["learning", "perseverance"], culture: "japanese" },
    { id: "ja-028", jp: "天才は努力の天才", romaji: "Tensai wa doryoku no tensai", en: "Genius is the genius of effort.", cats: ["learning", "perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-029", jp: "論より証拠", romaji: "Ron yori shōko", en: "Evidence over argument. / Proof is better than discussion.", cats: ["learning", "wisdom", "business"], culture: "japanese" },
    { id: "ja-030", jp: "芸は身を助く", romaji: "Gei wa mi wo tasuku", en: "Art saves the body. / Skills bring security.", cats: ["learning", "wisdom", "life"], culture: "japanese" },
    
    // PERSEVERANCE (31-40)
    { id: "ja-031", jp: "塵も積もれば山となる", romaji: "Chiri mo tsumoreba yama to naru", en: "Even dust piled up becomes a mountain. / Little by little.", cats: ["perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-032", jp: "亀の甲より年の功", romaji: "Kame no kō yori toshi no kō", en: "The years count more than the shell of a turtle. / Experience trumps youth.", cats: ["perseverance", "wisdom", "learning"], culture: "japanese" },
    { id: "ja-033", jp: "鉄は熱いうちに打て", romaji: "Tetsu wa atsui uchi ni ute", en: "Strike while the iron is hot. / Seize the moment.", cats: ["perseverance", "business", "wisdom"], culture: "japanese" },
    { id: "ja-034", jp: "縄で縛るようではない", romaji: "Nawa de shibaru yō dewa nai", en: "Not bound by rope. / True discipline comes from within.", cats: ["perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-035", jp: "為せば成る", romaji: "Naseba naru", en: "If you do it, it will happen. / Where there's a will, there's a way.", cats: ["perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-036", jp: "能ある鷹は爪を隠す", romaji: "Nō aru taka wa tsume wo kakusu", en: "The skilled hawk hides its claws. / Hide your talents.", cats: ["wisdom", "business"], culture: "japanese" },
    { id: "ja-037", jp: "不易流行", romaji: "Fuhekiryūkō", en: "Unchanging yet ever-changing. / Tradition and innovation.", cats: ["perseverance", "wisdom", "life"], culture: "japanese" },
    { id: "ja-038", jp: "初心忘るべからず", romaji: "Shoshin wasurubekarazu", en: "Do not forget your original intention. / Stay true to your roots.", cats: ["perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-039", jp: "日日是好日", romaji: "Nichinichi kore kōjitsu", en: "Every day is a good day. / Find joy in each moment.", cats: ["perseverance", "wisdom", "life"], culture: "japanese" },
    { id: "ja-040", jp: "残心", romaji: "Zanshin", en: "Remaining mind. / Awareness even after completion.", cats: ["perseverance", "wisdom", "learning"], culture: "japanese" },
    
    // FRIENDSHIP (41-48)
    { id: "ja-041", jp: "遠くの親戚より近くの他人", romaji: "Tōku no shinseki yori chikaku no tanin", en: "A nearby stranger is better than a distant relative.", cats: ["friendship", "wisdom", "family"], culture: "japanese" },
    { id: "ja-042", jp: "親しき中にも礼儀あり", romaji: "Shitashiki naka ni mo reigi ari", en: "Courtesy even among close friends. / Good fences make good neighbors.", cats: ["friendship", "wisdom"], culture: "japanese" },
    { id: "ja-043", jp: "友達は第二の自己である", romaji: "Tomodachi wa daini no jiko de aru", en: "A friend is a second self.", cats: ["friendship", "wisdom", "love"], culture: "japanese" },
    { id: "ja-044", jp: "同舟相救う", romaji: "Dōshū sasukuu", en: "Those in the same boat help each other.", cats: ["friendship", "wisdom", "business"], culture: "japanese" },
    { id: "ja-045", jp: "歳月人を待たず", romaji: "Saigetsu hito wo matazu", en: "Time waits for no one.", cats: ["life", "wisdom", "friendship"], culture: "japanese" },
    { id: "ja-046", jp: "馬の合う友は遠くから来る", romaji: "Uma no au tomo wa tōku kara kuru", en: "Compatible friends come from far away. / Kindred spirits.", cats: ["friendship", "wisdom", "love"], culture: "japanese" },
    { id: "ja-047", jp: "悪友を交わるな", romaji: "Akyū wo majiwaru na", en: "Do not associate with bad friends.", cats: ["friendship", "wisdom"], culture: "japanese" },
    { id: "ja-048", jp: "朋あり遠方より来る", romaji: "Tomo ari enpō yori kitaru", en: "Friends come from far away. / Cherish visiting friends.", cats: ["friendship", "wisdom", "life"], culture: "japanese" },
    
    // LOVE (49-55)
    { id: "ja-049", jp: "会うは別れの始め", romaji: "Au wa wakare no hajime", en: "Meeting is the beginning of parting.", cats: ["love", "wisdom", "life"], culture: "japanese" },
    { id: "ja-050", jp: "恋は盲目", romaji: "Koi wa mōmoku", en: "Love is blind.", cats: ["love", "wisdom"], culture: "japanese" },
    { id: "ja-051", jp: "惚れた病に薬なし", romaji: "Horeta yamai ni kusuri nashi", en: "There is no medicine for the disease of love.", cats: ["love", "wisdom"], culture: "japanese" },
    { id: "ja-052", jp: "片思いは乙なもの", romaji: "Kataomoi wa otsuna mono", en: "Unrequited love is sweet in its own way.", cats: ["love", "wisdom", "life"], culture: "japanese" },
    { id: "ja-053", jp: "男女の仲は巡り合わせ", romaji: "Danjo no naka wa meguriai", en: "Relationships are a matter of fate.", cats: ["love", "wisdom", "family"], culture: "japanese" },
    { id: "ja-054", jp: "縁は異なもの味なもの", romaji: "En wa ina mono aji na mono", en: "Fate is strange and flavorful. / Love comes unexpectedly.", cats: ["love", "wisdom", "life"], culture: "japanese" },
    { id: "ja-055", jp: "思い立ったが吉日", romaji: "Omoitatta ga kichijitsu", en: "The day you decide is a lucky day. / Today is the day.", cats: ["love", "wisdom", "life"], culture: "japanese" },
    
    // BUSINESS (56-62)
    { id: "ja-056", jp: "商売は駆け引き", romaji: "Shōbai wa kakehiki", en: "Business is give and take.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-057", jp: "前門の虎、後門の狼", romaji: "Zenmon no tora, kōmon no ōkami", en: "Tiger at the front gate, wolf at the back. / Out of the frying pan, into the fire.", cats: ["business", "wisdom", "life"], culture: "japanese" },
    { id: "ja-058", jp: "安物買いの銭失い", romaji: "Yasumono kai no zeni ushinai", en: "Buying cheap is losing money. / Penny wise, pound foolish.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-059", jp: "損して得取れ", romaji: "Son shite eitore", en: "Lose to gain. / Short-term loss for long-term gain.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-060", jp: "信は世の宝", romaji: "Shin wa yo no takara", en: "Trust is the treasure of the world.", cats: ["business", "wisdom", "friendship"], culture: "japanese" },
    { id: "ja-061", jp: "借りは返すもの", romaji: "Kari wa kaesu mono", en: "Borrowed things must be returned. / Pay your debts.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-062", jp: "時は金なり", romaji: "Toki wa kane nari", en: "Time is money.", cats: ["business", "wisdom", "life"], culture: "japanese" },
    
    // HEALTH (63-68)
    { id: "ja-063", jp: "健康は富に勝る", romaji: "Kenkō wa tomi ni masaru", en: "Health is better than wealth.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-064", jp: "病は口から", romaji: "Yamai wa kuchi kara", en: "Illness comes from the mouth. / You are what you eat.", cats: ["health", "wisdom"], culture: "japanese" },
    { id: "ja-065", jp: "笑う門には福来る", romaji: "Warau kado ni wa kitaru", en: "Fortune comes to those who smile.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-066", jp: "心身一如", romaji: "Shinshin ichinyo", en: "Mind and body as one. / Healthy mind, healthy body.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-067", jp: "気は心", romaji: "Ki wa kokoro", en: "Spirit is heart. / Attitude is everything.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-068", jp: "適度の運動は健康の源", romaji: "Tekido no undō wa kenkō no minamoto", en: "Moderate exercise is the source of health.", cats: ["health", "wisdom", "perseverance"], culture: "japanese" },
    
    // FAMILY (69-75)
    { id: "ja-069", jp: "親の心子知らず", romaji: "Oya no kokoro ko shirazu", en: "The child knows not the parent's heart.", cats: ["family", "wisdom", "love"], culture: "japanese" },
    { id: "ja-070", jp: "子は三界の首枷", romaji: "Ko wa sangoku no kubi kase", en: "Children are a burden for three worlds. / Children are a big responsibility.", cats: ["family", "wisdom", "life"], culture: "japanese" },
    { id: "ja-071", jp: "悪妻は百年の不作", romaji: "Akusai wa hyakunen no fusaku", en: "A bad wife means a hundred years of bad harvest.", cats: ["family", "wisdom", "love"], culture: "japanese" },
    { id: "ja-072", jp: "亭主関白", romaji: "Teishu kanpaku", en: "The husband rules. / Traditional family structure.", cats: ["family", "wisdom"], culture: "japanese" },
    { id: "ja-073", jp: "家内安全", romaji: "Kanai anzen", en: "Safety in the household. / Peace in the home.", cats: ["family", "wisdom", "life"], culture: "japanese" },
    { id: "ja-074", jp: "家は最後の砦", romaji: "Ie wa saigo no toride", en: "Home is the last fortress.", cats: ["family", "wisdom", "life"], culture: "japanese" },
    { id: "ja-075", jp: "親の光は七光", romaji: "Oya no hikari wa nanahikari", en: "Parents' light shines seven times. / Benefits of good parents.", cats: ["family", "wisdom", "learning"], culture: "japanese" }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.japaneseProverbs = japaneseProverbs;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = japaneseProverbs;
}
