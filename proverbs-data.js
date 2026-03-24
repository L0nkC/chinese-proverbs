// East Asian Wisdom Hub - Multi-language Proverbs Data
// Contains Chinese (谚语), Japanese (ことわざ), and Korean (속담) proverbs

// ============================================
// CHINESE PROVERBS (Mandarin & Cantonese)
// ============================================

const chineseProverbs = [
    // WISDOM
    { id: "zh-001", cn: "三思而后行", py: "sān sī ér hòu xíng", en: "Think three times before you act. / Look before you leap.", cats: ["wisdom", "business"], culture: "chinese" },
    { id: "zh-002", cn: "知之为知之，不知为不知", py: "zhī zhī wéi zhī zhī, bù zhī wéi bù zhī", en: "To know what you know and know what you do not know is true knowledge.", cats: ["wisdom", "learning"], culture: "chinese" },
    { id: "zh-003", cn: "塞翁失马，焉知非福", py: "sài wēng shī mǎ, yān zhī fēi fú", en: "A loss may turn out to be a gain. / Every cloud has a silver lining.", cats: ["wisdom", "life"], culture: "chinese" },
    { id: "zh-004", cn: "满招损，谦受益", py: "mǎn zhāo sǔn, qiān shòu yì", en: "Arrogance brings loss, modesty brings benefit.", cats: ["wisdom", "learning"], culture: "chinese" },
    { id: "zh-005", cn: "见微知著", py: "jiàn wēi zhī zhù", en: "See the significant in the trivial.", cats: ["wisdom"], culture: "chinese" },
    { id: "zh-006", cn: "欲速则不达", py: "yù sù zé bù dá", en: "Haste makes waste.", cats: ["wisdom", "perseverance"], culture: "chinese" },
    { id: "zh-007", cn: "瓜熟蒂落", py: "guā shú dì luò", en: "When the melon is ripe, it falls. / Things happen in their own time.", cats: ["wisdom", "life"], culture: "chinese" },
    { id: "zh-008", cn: "知己知彼，百战不殆", py: "zhī jǐ zhī bǐ, bǎi zhàn bù dài", en: "Know yourself and know your enemy, and you will never be defeated.", cats: ["wisdom", "business"], culture: "chinese" },
    { id: "zh-009", cn: "种瓜得瓜，种豆得豆", py: "zhòng guā dé guā, zhòng dòu dé dòu", en: "As you sow, so shall you reap.", cats: ["wisdom", "life", "perseverance"], culture: "chinese" },
    { id: "zh-010", cn: "活到老，学到老", py: "huó dào lǎo, xué dào lǎo", en: "Live until old, learn until old. / Never too old to learn.", cats: ["learning", "wisdom", "life"], culture: "chinese" },
    { id: "zh-011", cn: "有志者事竟成", py: "yǒu zhì zhě shì jìng chéng", en: "Where there is a will, there is a way.", cats: ["perseverance", "wisdom", "life"], culture: "chinese" },
    { id: "zh-012", cn: "滴水穿石", py: "dī shuǐ chuān shí", en: "Dripping water wears through stone. / Perseverance brings success.", cats: ["perseverance", "wisdom"], culture: "chinese" },
    { id: "zh-013", cn: "海内存知己", py: "hǎi nèi cún zhī jǐ", en: "Within the four seas, all men are brothers.", cats: ["friendship", "love"], culture: "chinese" },
    { id: "zh-014", cn: "一寸光阴一寸金", py: "yī cùn guāng yīn yī cùn jīn", en: "An inch of time is an inch of gold. / Time is precious.", cats: ["life", "wisdom", "business"], culture: "chinese" },
    { id: "zh-015", cn: "家和万事兴", py: "jiā hé wàn shì xīng", en: "A harmonious family leads to prosperity in all things.", cats: ["family", "wisdom", "life", "business"], culture: "chinese" },
    { id: "zh-016", cn: "有情人终成眷属", py: "yǒu qíng rén zhōng chéng juàn shǔ", en: "Lovers will eventually become family. / True love finds its way.", cats: ["love"], culture: "chinese" },
    { id: "zh-017", cn: "和气生财", py: "hé qì shēng cái", en: "Harmony brings wealth. / Good relations create prosperity.", cats: ["business", "friendship", "wisdom"], culture: "chinese" },
    { id: "zh-018", cn: "身体是革命的本钱", py: "shēn tǐ shì gé mìng de běn qián", en: "Health is the capital of revolution. / Health is wealth.", cats: ["health", "wisdom", "life"], culture: "chinese" },
];

const cantoneseProverbs = [
    { id: "yue-001", cn: "十個茶壺九個蓋", py: "sahp go chàh wu gáu go goi", en: "Ten teapots but only nine lids. / Not enough to go around.", cats: ["cantonese", "business", "life"], culture: "cantonese" },
    { id: "yue-002", cn: "牛唔飲水唔撳得牛低頭", py: "ngàuh mh yám séui mh gahm dāk ngàuh dài tàuh", en: "You can't force a cow to drink or bow its head. / You can't force someone to do what they don't want.", cats: ["cantonese", "wisdom", "family"], culture: "cantonese" },
    { id: "yue-003", cn: "有早知，冇乞兒", py: "yáuh jóu jī, móuh hat yìh", en: "If we knew beforehand, there'd be no beggars. / Hindsight is 20/20.", cats: ["cantonese", "wisdom", "business"], culture: "cantonese" },
    { id: "yue-004", cn: "鹹魚翻生", py: "hàahm yùh fāan sāang", en: "A salted fish comes back to life. / Making an impossible comeback.", cats: ["cantonese", "perseverance", "wisdom"], culture: "cantonese" },
];

// ============================================
// JAPANESE PROVERBS (ことわざ - Kotowaza)
// ============================================

const japaneseProverbs = [
    // WISDOM & LIFE
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
    
    // LEARNING
    { id: "ja-021", jp: "三人寄れば文殊の知恵", romaji: "Sannin yoreba monju no chie", en: "Three heads are better than one. / Wisdom of the masses.", cats: ["learning", "wisdom", "friendship"], culture: "japanese" },
    { id: "ja-022", jp: "聞くは一時の恥、聞かぬは一生の恥", romaji: "Kiku wa ittoki no haji, kikanu wa isshō no haji", en: "Asking is a temporary shame, not asking is a lifetime shame.", cats: ["learning", "wisdom"], culture: "japanese" },
    { id: "ja-023", jp: "早起きは三文の徳", romaji: "Hayaoki wa sanmon no toku", en: "Waking early brings three benefits. / Early to bed, early to rise.", cats: ["learning", "wisdom", "health"], culture: "japanese" },
    { id: "ja-024", jp: "馬鹿は死ななきゃ治らない", romaji: "Baka wa shinanakya naoranai", en: "A fool won't heal until he dies. / You can't fix stupid.", cats: ["learning", "wisdom"], culture: "japanese" },
    { id: "ja-025", jp: "十年一日の如し", romaji: "Jūnen ichinichi no gotoshi", en: "Ten years like one day. / Consistent effort.", cats: ["learning", "perseverance"], culture: "japanese" },
    
    // PERSEVERANCE
    { id: "ja-026", jp: "塵も積もれば山となる", romaji: "Chiri mo tsumoreba yama to naru", en: "Even dust piled up becomes a mountain. / Little by little.", cats: ["perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-027", jp: "亀の甲より年の功", romaji: "Kame no kō yori toshi no kō", en: "The years count more than the shell of a turtle. / Experience trumps youth.", cats: ["perseverance", "wisdom", "learning"], culture: "japanese" },
    { id: "ja-028", jp: "鉄は熱いうちに打て", romaji: "Tetsu wa atsui uchi ni ute", en: "Strike while the iron is hot. / Seize the moment.", cats: ["perseverance", "business", "wisdom"], culture: "japanese" },
    { id: "ja-029", jp: "縄で縛るようではない", romaji: "Nawa de shibaru yō dewa nai", en: "Not bound by rope. / True discipline comes from within.", cats: ["perseverance", "wisdom"], culture: "japanese" },
    { id: "ja-030", jp: "すずめの涙", romaji: "Suzume no namida", en: "A sparrow's tears. / A very small amount.", cats: ["wisdom", "life"], culture: "japanese" },
    
    // FRIENDSHIP
    { id: "ja-031", jp: "遠くの親戚より近くの他人", romaji: "Tōku no shinseki yori chikaku no tanin", en: "A nearby stranger is better than a distant relative.", cats: ["friendship", "wisdom", "family"], culture: "japanese" },
    { id: "ja-032", jp: "親しき中にも礼儀あり", romaji: "Shitashiki naka ni mo reigi ari", en: "Courtesy even among close friends. / Good fences make good neighbors.", cats: ["friendship", "wisdom"], culture: "japanese" },
    { id: "ja-033", jp: "友達は第二の自己である", romaji: "Tomodachi wa daini no jiko de aru", en: "A friend is a second self.", cats: ["friendship", "wisdom", "love"], culture: "japanese" },
    { id: "ja-034", jp: "同舟相救う", romaji: "Dōshū sasukuu", en: "Those in the same boat help each other.", cats: ["friendship", "wisdom", "business"], culture: "japanese" },
    { id: "ja-035", jp: "歳月人を待たず", romaji: "Saigetsu hito wo matazu", en: "Time waits for no one.", cats: ["life", "wisdom", "friendship"], culture: "japanese" },
    
    // LOVE
    { id: "ja-036", jp: "会うは別れの始め", romaji: "Au wa wakare no hajime", en: "Meeting is the beginning of parting.", cats: ["love", "wisdom", "life"], culture: "japanese" },
    { id: "ja-037", jp: "恋は盲目", romaji: "Koi wa mōmoku", en: "Love is blind.", cats: ["love", "wisdom"], culture: "japanese" },
    { id: "ja-038", jp: "惚れた病に薬なし", romaji: "Horeta yamai ni kusuri nashi", en: "There is no medicine for the disease of love.", cats: ["love", "wisdom"], culture: "japanese" },
    { id: "ja-039", jp: "片思いは乙なもの", romaji: "Kataomoi wa otsuna mono", en: "Unrequited love is sweet in its own way.", cats: ["love", "wisdom", "life"], culture: "japanese" },
    { id: "ja-040", jp: "男女の仲は巡り合わせ", romaji: "Danjo no naka wa meguriai", en: "Relationships are a matter of fate.", cats: ["love", "wisdom", "family"], culture: "japanese" },
    
    // BUSINESS
    { id: "ja-041", jp: "商売は駆け引き", romaji: "Shōbai wa kakehiki", en: "Business is give and take.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-042", jp: "前門の虎、後門の狼", romaji: "Zenmon no tora, kōmon no ōkami", en: "Tiger at the front gate, wolf at the back. / Out of the frying pan, into the fire.", cats: ["business", "wisdom", "life"], culture: "japanese" },
    { id: "ja-043", jp: "安物買いの銭失い", romaji: "Yasumono kai no zeni ushinai", en: "Buying cheap is losing money. / Penny wise, pound foolish.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-044", jp: "損して得取れ", romaji: "Son shite eitore", en: "Lose to gain. / Short-term loss for long-term gain.", cats: ["business", "wisdom"], culture: "japanese" },
    { id: "ja-045", jp: "信は世の宝", romaji: "Shin wa yo no takara", en: "Trust is the treasure of the world.", cats: ["business", "wisdom", "friendship"], culture: "japanese" },
    
    // HEALTH
    { id: "ja-046", jp: "健康は富に勝る", romaji: "Kenkō wa tomi ni masaru", en: "Health is better than wealth.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-047", jp: "病は口から", romaji: "Yamai wa kuchi kara", en: "Illness comes from the mouth. / You are what you eat.", cats: ["health", "wisdom"], culture: "japanese" },
    { id: "ja-048", jp: "笑う門には福来る", romaji: "Warau kado ni wa kitaru", en: "Fortune comes to those who smile.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-049", jp: "心身一如", romaji: "Shinshin ichinyo", en: "Mind and body as one. / Healthy mind, healthy body.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    { id: "ja-050", jp: "気は心", romaji: "Ki wa kokoro", en: "Spirit is heart. / Attitude is everything.", cats: ["health", "wisdom", "life"], culture: "japanese" },
    
    // FAMILY
    { id: "ja-051", jp: "親の心子知らず", romaji: "Oya no kokoro ko shirazu", en: "The child knows not the parent's heart.", cats: ["family", "wisdom", "love"], culture: "japanese" },
    { id: "ja-052", jp: "子は三界の首枷", romaji: "Ko wa sangoku no kubi kase", en: "Children are a burden for three worlds. / Children are a big responsibility.", cats: ["family", "wisdom", "life"], culture: "japanese" },
    { id: "ja-053", jp: "悪妻は百年の不作", romaji: "Akusai wa hyakunen no fusaku", en: "A bad wife means a hundred years of bad harvest.", cats: ["family", "wisdom", "love"], culture: "japanese" },
    { id: "ja-054", jp: "亭主関白", romaji: "Teishu kanpaku", en: "The husband rules. / Traditional family structure.", cats: ["family", "wisdom"], culture: "japanese" },
    { id: "ja-055", jp: "家内安全", romaji: "Kanai anzen", en: "Safety in the household. / Peace in the home.", cats: ["family", "wisdom", "life"], culture: "japanese" },
];

// ============================================
// KOREAN PROVERBS (속담 - Sokdam)
// ============================================

const koreanProverbs = [
    // WISDOM & LIFE
    { id: "ko-001", kr: "가는 말이 고와야 오는 말이 곱다", roman: "Ganeun mari gowaya oneun mari gopda", en: "If the outgoing words are beautiful, the incoming words will be beautiful too. / Treat others as you wish to be treated.", cats: ["wisdom", "friendship", "life"], culture: "korean" },
    { id: "ko-002", kr: "소 잃고 외양간 고친다", roman: "So ilko woeyanggan gochinda", en: "After losing the cow, fix the barn. / Lock the barn door after the horse is stolen.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-003", kr: "세 살 버릇 여든까지 간다", roman: "Se sal beoreut yeoreunkkaji ganda", en: "Habits from age three last until eighty. / Old habits die hard.", cats: ["wisdom", "family", "life"], culture: "korean" },
    { id: "ko-004", kr: "낮말은 새가 듣고 밤말은 쥐가 듣는다", roman: "Nanmareun saega deutgo bammareun jwiga deunneunda", en: "Birds hear daytime words, mice hear nighttime words. / The walls have ears.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-005", kr: "눈치가 빠르다", roman: "Nunchiga ppareuda", en: "Quick to catch the eye. / Reading the room.", cats: ["wisdom", "business", "life"], culture: "korean" },
    { id: "ko-006", kr: "천 리 길도 한 걸음부터", roman: "Cheon ri gildo han georeumbuteo", en: "A thousand-mile journey begins with one step.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-007", kr: "등잔 밑이 어둡다", roman: "Deungjan michi eodupda", en: "It's dark under the lamp. / Can't see what's right in front of you.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-008", kr: "고래 싸움에 새우 등 터진다", roman: "Gorae ssaweume saeu deung teojinda", en: "When whales fight, the shrimp's back is broken. / The weak suffer when the powerful fight.", cats: ["wisdom", "life", "business"], culture: "korean" },
    { id: "ko-009", kr: "가랑비에 옷 젖는 줄 모른다", roman: "Garangbie ot jeomneun jul moreunda", en: "Don't know clothes are getting wet in drizzle. / Slow but steady harm.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-010", kr: "도둑이 제 발 저리다", roman: "Dodugi je bal jeorida", en: "The thief's own foot falls asleep. / A guilty conscience.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-011", kr: "하늘의 별 따기", roman: "Haneure byeol ttagi", en: "Plucking stars from the sky. / Nearly impossible.", cats: ["wisdom", "life", "perseverance"], culture: "korean" },
    { id: "ko-012", kr: "원숭이도 나무에서 떨어진다", roman: "Wonsungido namueseo tteoreojinda", en: "Even monkeys fall from trees. / Everyone makes mistakes.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-013", kr: "티끌 모아 태산", roman: "Tikkeul moa taesan", en: "Gather dust to build a mountain. / Little things add up.", cats: ["perseverance", "wisdom"], culture: "korean" },
    { id: "ko-014", kr: "발 없는 말이 천 리 간다", roman: "Bal eomneun mari cheon ri ganda", en: "Words without legs travel a thousand miles. / Word travels fast.", cats: ["wisdom", "friendship", "life"], culture: "korean" },
    { id: "ko-015", kr: "콩 심은 데 콩 나고 팥 심은 데 팥 난다", roman: "Kong simeun de kong nago pat simeun de pat nanda", en: "Beans grow where beans are planted, red beans where red beans are planted. / You reap what you sow.", cats: ["wisdom", "life", "perseverance"], culture: "korean" },
    
    // LEARNING
    { id: "ko-016", kr: "배움에는 왕도가 없다", roman: "Baeume-neun wangdoga eopda", en: "There is no royal road to learning.", cats: ["learning", "wisdom"], culture: "korean" },
    { id: "ko-017", kr: "가는 날이 장날", roman: "Ganeun nari jangnal", en: "The day you go is market day. / Perfect timing.", cats: ["learning", "wisdom", "life"], culture: "korean" },
    { id: "ko-018", kr: "열 번 찍어 안 넘어가는 나무 없다", roman: "Yeol beon jjigeo an neomeoganeun namu eopda", en: "There's no tree that won't fall after ten chops. / Persistence pays.", cats: ["learning", "perseverance"], culture: "korean" },
    { id: "ko-019", kr: "공든 탑이 물러가랴", roman: "Gongdeun tapi mulleogarya", en: "Would a tower built with effort collapse? / Hard work endures.", cats: ["learning", "perseverance", "wisdom"], culture: "korean" },
    { id: "ko-020", kr: "늦게 배운 도둑질이 날 새는 줄 모른다", roman: "Neutge baeun dodukjiri nal saeneun jul moreunda", en: "A thief who learns late doesn't know daybreak. / Too absorbed to notice time.", cats: ["learning", "wisdom"], culture: "korean" },
    
    // PERSEVERANCE
    { id: "ko-021", kr: "지성이면 감천", roman: "Jiseongimyeon gamcheon", en: "With sincerity, even heaven will be moved. / Persistence conquers all.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-022", kr: "개구리 올챙이 적 생각 안 한다", roman: "Gaeguri olchaengi jeok saenggak an handa", en: "The frog doesn't remember when it was a tadpole. / Forgetting one's roots.", cats: ["perseverance", "wisdom", "family"], culture: "korean" },
    { id: "ko-023", kr: "금강산도 식후경", roman: "Geumgangsudo sikugyeong", en: "Even Mount Kumgang is best seen after a meal. / Basic needs first.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-024", kr: "눈물로는 밥을 못 먹는다", roman: "Nunmullo-neun babeul mot meongneunda", en: "You can't eat rice with tears. / Tears don't solve problems.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-025", kr: "빈 수레가 요란하다", roman: "Bin surega yoranhada", en: "Empty carts make the most noise. / Empty vessels make the most sound.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    
    // FRIENDSHIP
    { id: "ko-026", kr: "벗이 먼 곳에 있으니 내 마음이 아프다", roman: "Beosi meun godeu isseuni nae maeumi apeuda", en: "My friend is far away, and my heart aches.", cats: ["friendship", "love", "life"], culture: "korean" },
    { id: "ko-027", kr: "친구는 세상의 가장 큰 보물", roman: "Chinguneun sesang-ui gajang keun bomul", en: "A friend is the world's greatest treasure.", cats: ["friendship", "wisdom", "love"], culture: "korean" },
    { id: "ko-028", kr: "웃는 얼굴에 침 뱉으랴", roman: "Utneun eolgure chim baeteurya", en: "Would you spit on a smiling face? / Don't hurt those who are kind.", cats: ["friendship", "wisdom"], culture: "korean" },
    { id: "ko-029", kr: "남의 떡이 커 보인다", roman: "Nam-ui tteogi keo boinda", en: "Others' rice cakes look bigger. / The grass is always greener.", cats: ["friendship", "wisdom", "life"], culture: "korean" },
    { id: "ko-030", kr: "빚은 갚되 정은 못 갚는다", roman: "Bijeun gapdoe jeongeun mot gamneunda", en: "Debt can be repaid, but kindness cannot. / Gratitude is eternal.", cats: ["friendship", "wisdom", "life"], culture: "korean" },
    
    // LOVE
    { id: "ko-031", kr: "정이 많은 사람은 미움도 많다", roman: "Jeongi maneun sarameun miumdo manta", en: "Those with much affection also have much hatred.", cats: ["love", "wisdom"], culture: "korean" },
    { id: "ko-032", kr: "사랑은 눈먼 것", roman: "Sarang-eun nunmeun geot", en: "Love is blind.", cats: ["love", "wisdom"], culture: "korean" },
    { id: "ko-033", kr: "부부싸움은 칼로 물 베기", roman: "Bubussaweunneun kallo mul begi", en: "A married couple's fight is like cutting water with a knife. / Couples' quarrels don't last.", cats: ["love", "wisdom", "family"], culture: "korean" },
    { id: "ko-034", kr: "첫사랑은 잊지 못한다", roman: "Cheotsarangeun ijji motanda", en: "First love is never forgotten.", cats: ["love", "wisdom", "life"], culture: "korean" },
    { id: "ko-035", kr: "원숭이도 나무에서 떨어질 때가 있다", roman: "Wonsungido namueseo tteoreojil ttaega itda", en: "Even monkeys fall from trees sometimes. / Everyone fails in love.", cats: ["love", "wisdom", "life"], culture: "korean" },
    
    // BUSINESS
    { id: "ko-036", kr: "장사는 장사꾼이 하는 것", roman: "Jangsaneun jangsakkuni haneun geot", en: "Business is done by business people. / Leave it to the experts.", cats: ["business", "wisdom"], culture: "korean" },
    { id: "ko-037", kr: "싼 게 비지떡", roman: "Ssangei bijitteok", en: "Cheap things are rice cake made of bean curd dregs. / You get what you pay for.", cats: ["business", "wisdom"], culture: "korean" },
    { id: "ko-038", kr: "떡 줄 놈은 생각도 않는데 김칫국부터 마신다", roman: "Tteok jul nomeun saenggakdo anneunde gimchitgukbuteo masinda", en: "Thinking about kimchi stew before anyone offers rice cake. / Counting chickens before they hatch.", cats: ["business", "wisdom", "life"], culture: "korean" },
    { id: "ko-039", kr: "호랑이도 제 말 하면 온다", roman: "Horangido je mal hamyeon onda", en: "Speak of the tiger and it comes. / Speak of the devil.", cats: ["business", "wisdom", "life"], culture: "korean" },
    { id: "ko-040", kr: "돈이 다가 아니다", roman: "Doni daga anida", en: "Money isn't everything.", cats: ["business", "wisdom", "life"], culture: "korean" },
    
    // HEALTH
    { id: "ko-041", kr: "건강이 최고의 재산", roman: "Geongangi choegoui jaesan", en: "Health is the greatest wealth.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-042", kr: "먹는 음식이 곧 몸이 된다", roman: "Meongneun eumsigi got momi doenda", en: "The food you eat becomes your body. / You are what you eat.", cats: ["health", "wisdom"], culture: "korean" },
    { id: "ko-043", kr: "웃음은 최고의 약", roman: "Useumeun choegoui yak", en: "Laughter is the best medicine.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-044", kr: "일찍 일어나는 새가 벌레를 잡는다", roman: "Iljjik ireonaneun saega beorereul jamneunda", en: "The early bird catches the worm.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-045", kr: "마음이 건강해야 몸도 건강하다", roman: "Maeumi geonganghaeya momdo geonganghada", en: "A healthy mind makes a healthy body.", cats: ["health", "wisdom", "life"], culture: "korean" },
    
    // FAMILY
    { id: "ko-046", kr: "가는 방망이가 돌아오는 홍두깨", roman: "Ganeun bangmangi-ga doraoneun hongdukkke", en: "The stick you swing comes back as a bigger club. / What goes around comes around.", cats: ["family", "wisdom", "life"], culture: "korean" },
    { id: "ko-047", kr: "형제는 부모가 주지만 친구는 스스로 만든다", roman: "Hyeongje-neun bumuga jujiman chinguneun seuseuro mandeunda", en: "Brothers are given by parents, but friends are made by oneself.", cats: ["family", "friendship", "wisdom"], culture: "korean" },
    { id: "ko-048", kr: "부모은혜는 하늘보다 높다", roman: "Bumoeunhyeneun haneulboda nopda", en: "Parents' grace is higher than heaven.", cats: ["family", "wisdom", "love"], culture: "korean" },
    { id: "ko-049", kr: "자라 보고 놀란 가슴 솥뚜껑 보고 놀란다", roman: "Jara bogo nollan gaseum sottukkkeong bogo nollanda", en: "Once frightened by a saw, scared by a pot lid. / Once bitten, twice shy.", cats: ["family", "wisdom", "life"], culture: "korean" },
    { id: "ko-050", kr: "가장 큰 병은 부모 마음의 상처", roman: "Gajang keun byeong-eun bumoe ma-eum-ui sangcheo", en: "The greatest illness is a wound to parents' hearts.", cats: ["family", "wisdom", "love"], culture: "korean" },
    { id: "ko-051", kr: "집 안의 도둑을 잡기 어렵다", roman: "Jib an-ui dodeugeul japgi eoryeopda", en: "It's hard to catch a thief inside the house. / Family problems are hardest.", cats: ["family", "wisdom", "life"], culture: "korean" },
    { id: "ko-052", kr: "눈에는 눈, 이에는 이", roman: "Nunenun nun, ieneun i", en: "An eye for an eye, a tooth for a tooth.", cats: ["wisdom", "life", "friendship"], culture: "korean" },
    { id: "ko-053", kr: "고생 끝에 낙이 온다", roman: "Gosaeng kkeute nagi onda", en: "At the end of hardship comes happiness.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-054", kr: "까마귀 날자 배 떨어진다", roman: "Kkamagwi nalja bae tteoreojinda", en: "When the crow flies, the pear drops. / Coincidence.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-055", kr: "윗물이 맑아야 아랫물이 맑다", roman: "Witmuri malgaya araetmuri malda", en: "When the upper water is clear, the lower water is clear. / Leaders set the example.", cats: ["wisdom", "family", "business"], culture: "korean" },
];

// ============================================
// CROSS-CULTURAL SIMILAR PROVERBS
// References proverbs that have similar meanings across cultures
// ============================================

const crossCulturalReferences = [
    {
        theme: "perseverance",
        concept: "Persistence brings success",
        proverbs: ["zh-012", "ja-001", "ja-002", "ko-006", "ko-021"]
    },
    {
        theme: "wisdom",
        concept: "Everyone makes mistakes",
        proverbs: ["ja-003", "ko-012", "yue-002"]
    },
    {
        theme: "learning",
        concept: "Experience is the best teacher",
        proverbs: ["zh-008", "ja-007", "ko-011"]
    },
    {
        theme: "life",
        concept: "You reap what you sow",
        proverbs: ["zh-009", "ko-015"]
    },
    {
        theme: "friendship",
        concept: "True friendship endures",
        proverbs: ["zh-013", "ja-031", "ko-027"]
    },
    {
        theme: "business",
        concept: "Risk and reward",
        proverbs: ["zh-005", "ja-004"]
    },
    {
        theme: "health",
        concept: "Laughter is the best medicine",
        proverbs: ["ja-048", "ko-043"]
    },
    {
        theme: "love",
        concept: "Love is blind",
        proverbs: ["ja-037", "ko-032"]
    }
];

// ============================================
// UNIFIED PROVERBS ARRAY
// All proverbs combined for the application
// ============================================

var allProverbs = [
    ...chineseProverbs,
    ...cantoneseProverbs,
    ...japaneseProverbs,
    ...koreanProverbs
];

// Make available for legacy compatibility
var proverbs = chineseProverbs;

// ============================================
// COLLECTIONS / THEMES
// ============================================

var collections = {
    entrepreneurs: {
        id: 'entrepreneurs',
        name: 'For Entrepreneurs',
        nameCn: '企业家之道',
        nameJp: '起業家への道',
        nameKr: '기업가의 길',
        icon: '🚀',
        description: 'Wisdom for risk-takers, innovators, and business builders.',
        descriptionCn: '为冒险者、创新者和商业建设者提供的智慧。',
        descriptionJp: 'リスクを取る人、革新者、ビジネスビルダーのための知恵。',
        descriptionKr: '모험가, 혁신가, 비즈니스 빌더를 위한 지혜.',
        featured: true,
        proverbIds: ["zh-001", "zh-008", "ja-004", "ja-042", "ko-036", "ko-038"]
    },
    students: {
        id: 'students',
        name: 'For Students',
        nameCn: '学子箴言',
        nameJp: '学生への言葉',
        nameKr: '학생을 위한 말',
        icon: '📚',
        description: 'Wisdom for those on the journey of learning.',
        featured: true,
        proverbIds: ["zh-010", "ja-021", "ja-022", "ko-016", "ko-018"]
    },
    hardtimes: {
        id: 'hardtimes',
        name: 'For Hard Times',
        nameCn: '艰难时刻',
        nameJp: '困難な時期に',
        nameKr: '어려운 시기에',
        icon: '💪',
        description: 'Strength and encouragement when you need it most.',
        featured: true,
        proverbIds: ["ja-002", "ja-014", "ko-021", "ko-023", "ko-053"]
    },
    eastasian: {
        id: 'eastasian',
        name: 'East Asian Wisdom',
        nameCn: '东亚智慧',
        nameJp: '東アジアの知恵',
        nameKr: '동아시아의 지혜',
        icon: '🌏',
        description: 'Universal truths shared across Chinese, Japanese, and Korean cultures.',
        featured: true,
        proverbIds: ["zh-012", "ja-001", "ko-006", "zh-013", "ja-031", "ko-027"]
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getProverbById(id) {
    return allProverbs.find(p => p.id === id);
}

function getProverbsByCulture(culture) {
    return allProverbs.filter(p => p.culture === culture);
}

function getProverbsByCategory(category) {
    return allProverbs.filter(p => p.cats && p.cats.includes(category));
}

function getCrossCulturalProverbs(theme) {
    const reference = crossCulturalReferences.find(r => r.theme === theme);
    if (!reference) return [];
    return reference.proverbs.map(id => getProverbById(id)).filter(Boolean);
}

// Export for module systems if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        allProverbs,
        chineseProverbs,
        cantoneseProverbs,
        japaneseProverbs,
        koreanProverbs,
        collections,
        crossCulturalReferences,
        getProverbById,
        getProverbsByCulture,
        getProverbsByCategory,
        getCrossCulturalProverbs
    };
}
