// Chinese Proverbs Collection - 200+ Proverbs with Pinyin
// Categories: wisdom, learning, perseverance, friendship, life, love, business, family, health

const proverbs = [
    // WISDOM (+ other categories where applicable)
    { cn: "三思而后行", py: "sān sī ér hòu xíng", en: "Think three times before you act. / Look before you leap.", cats: ["wisdom", "business"] },
    { cn: "知之为知之，不知为不知", py: "zhī zhī wéi zhī zhī, bù zhī wéi bù zhī", en: "To know what you know and know what you do not know is true knowledge.", cats: ["wisdom", "learning"] },
    { cn: "塞翁失马，焉知非福", py: "sài wēng shī mǎ, yān zhī fēi fú", en: "A loss may turn out to be a gain. / Every cloud has a silver lining.", cats: ["wisdom", "life"], story: { title: "The Old Man Who Lost His Horse", content: "During the Han Dynasty, there was an old man named Sai Weng who lived near the northern frontier. One day, his horse ran away to the northern tribes. His neighbors came to console him, but Sai Weng said, 'Who knows if this is not a blessing?'

Months later, his horse returned with several fine northern steeds. The neighbors came to congratulate him, but Sai Weng said, 'Who knows if this is not a misfortune?'

Sai Weng's son loved riding these new horses. One day, he fell and broke his leg. Again, the neighbors came to console the old man, but Sai Weng said, 'Who knows if this is not a blessing?'

Soon after, the northern tribes invaded, and all able-bodied young men were drafted into battle, where most perished. Because of his broken leg, Sai Weng's son was spared from military service and survived. The story illustrates how fortune and misfortune are intertwined and constantly transform into one another." } },
    { cn: "祸兮福之所倚，福兮祸之所伏", py: "huò xī fú zhī suǒ yǐ, fú xī huò zhī suǒ fú", en: "Misfortune leans on fortune; fortune hides in misfortune.", cats: ["wisdom", "life"] },
    { cn: "满招损，谦受益", py: "mǎn zhāo sǔn, qiān shòu yì", en: "Arrogance brings loss, modesty brings benefit.", cats: ["wisdom", "learning"] },
    { cn: "骄者必败", py: "jiāo zhě bì bài", en: "The proud will surely fall. / Pride comes before a fall.", cats: ["wisdom", "perseverance"] },
    { cn: "见微知著", py: "jiàn wēi zhī zhù", en: "See the significant in the trivial.", cats: ["wisdom"] },
    { cn: "举一反三", py: "jǔ yī fǎn sān", en: "Infer three from one. / Draw inferences.", cats: ["wisdom", "learning"] },
    { cn: "触类旁通", py: "chù lèi páng tōng", en: "Understand related categories. / Grasp by analogy.", cats: ["wisdom", "learning"] },
    { cn: "实事求是", py: "shí shì qiú shì", en: "Seek truth from facts.", cats: ["wisdom"] },
    { cn: "明察秋毫", py: "míng chá qiū háo", en: "See clearly the autumn hair. / Perceptive of details.", cats: ["wisdom", "business"] },
    { cn: "前车之覆，后车之鉴", py: "qián chē zhī fù, hòu chē zhī jiàn", en: "The overturned cart ahead warns the cart behind.", cats: ["wisdom", "learning"] },
    { cn: "欲速则不达", py: "yù sù zé bù dá", en: "Haste makes waste.", cats: ["wisdom", "perseverance"] },
    { cn: "瓜熟蒂落", py: "guā shú dì luò", en: "When the melon is ripe, it falls. / Things happen in their own time.", cats: ["wisdom", "life"] },
    { cn: "水到渠成", py: "shuǐ dào qú chéng", en: "When water comes, the channel forms. / Success comes naturally.", cats: ["wisdom", "perseverance"] },
    { cn: "物极必反", py: "wù jí bì fǎn", en: "When things reach an extreme, they turn back.", cats: ["wisdom", "life"] },
    { cn: "否极泰来", py: "pǐ jí tài lái", en: "When misfortune reaches its limit, good fortune comes.", cats: ["wisdom", "life", "perseverance"] },
    { cn: "乐极生悲", py: "lè jí shēng bēi", en: "Extreme joy gives rise to sorrow.", cats: ["wisdom", "life"] },
    { cn: "月满则亏", py: "yuè mǎn zé kuī", en: "When the moon is full, it wanes.", cats: ["wisdom", "life"] },
    { cn: "水满则溢", py: "shuǐ mǎn zé yì", en: "When water is full, it overflows.", cats: ["wisdom", "life"] },
    { cn: "知己知彼，百战不殆", py: "zhī jǐ zhī bǐ, bǎi zhàn bù dài", en: "Know yourself and know your enemy, and you will never be defeated.", cats: ["wisdom", "business"] },
    { cn: "耳听为虚，眼见为实", py: "ěr tīng wéi xū, yǎn jiàn wéi shí", en: "What you hear may be false, what you see is true.", cats: ["wisdom", "business"] },
    { cn: "一言既出，驷马难追", py: "yī yán jì chū, sì mǎ nán zhuī", en: "Once spoken, words cannot be taken back even by a team of four horses.", cats: ["wisdom", "business", "friendship"] },
    { cn: "人无远虑，必有近忧", py: "rén wú yuǎn lǜ, bì yǒu jìn yōu", en: "He who does not plan for the future will have immediate worries.", cats: ["wisdom", "business", "life"] },
    { cn: "种瓜得瓜，种豆得豆", py: "zhòng guā dé guā, zhòng dòu dé dòu", en: "As you sow, so shall you reap.", cats: ["wisdom", "life", "perseverance"] },
    { cn: "江山易改，本性难移", py: "jiāng shān yì gǎi, běn xìng nán yí", en: "Rivers and mountains are easy to change, but one's nature is hard to change.", cats: ["wisdom", "family"] },
    { cn: "冰冻三尺，非一日之寒", py: "bīng dòng sān chǐ, fēi yī rì zhī hán", en: "Ice three feet thick is not formed in a single day.", cats: ["wisdom", "perseverance"] },
    { cn: "不入虎穴，焉得虎子", py: "bù rù hǔ xué, yān dé hǔ zǐ", en: "If you don't enter the tiger's den, how can you catch the tiger's cub?", cats: ["wisdom", "business", "perseverance"], story: { title: "Ban Chao's Bold Mission", content: "In 73 CE, during the Eastern Han Dynasty, the great explorer and diplomat Ban Chao was sent on a diplomatic mission to the Western Regions (Central Asia). While visiting the kingdom of Shanshan, he learned that a Xiongnu delegation had also arrived and the king was leaning toward siding with the Xiongnu against the Han.

Ban Chao gathered his 36 men and told them: 'Without entering the tiger's den, how can we catch the tiger's cub? We must act tonight!' That night, they attacked the Xiongnu camp, killing the envoys and burning their camp.

The next morning, Ban Chao presented the Xiongnu leader's head to the shocked king of Shanshan, who immediately pledged allegiance to the Han Dynasty. This bold action secured the Silk Road for decades and established Chinese influence in Central Asia. The proverb has come to mean that great achievements require taking great risks." } },
    { cn: "机不可失，时不再来", py: "jī bù kě shī, shí bù zài lái", en: "Opportunity knocks but once.", cats: ["wisdom", "business"] },
    { cn: "百闻不如一见", py: "bǎi wén bù rú yī jiàn", en: "Hearing something a hundred times is not as good as seeing it once.", cats: ["wisdom", "learning"] },

    // LEARNING
    { cn: "活到老，学到老", py: "huó dào lǎo, xué dào lǎo", en: "Live until old, learn until old. / Never too old to learn.", cats: ["learning", "wisdom", "life"] },
    { cn: "学而不思则罔", py: "xué ér bù sī zé wǎng", en: "Learning without thinking is labor lost.", cats: ["learning", "wisdom"] },
    { cn: "温故而知新", py: "wēn gù ér zhī xīn", en: "Review the old to learn the new.", cats: ["learning"] },
    { cn: "三人行，必有我师", py: "sān rén xíng, bì yǒu wǒ shī", en: "When three walk together, there must be a teacher among them.", cats: ["learning", "wisdom", "friendship"] },
    { cn: "敏而好学，不耻下问", py: "mǐn ér hào xué, bù chǐ xià wèn", en: "Quick and eager to learn, not ashamed to ask those below.", cats: ["learning", "wisdom"] },
    { cn: "学而不厌，诲人不倦", py: "xué ér bù yàn, huì rén bù juàn", en: "Never tired of learning, never weary of teaching.", cats: ["learning"] },
    { cn: "学而时习之，不亦说乎", py: "xué ér shí xí zhī, bù yì yuè hū", en: "To learn and practice regularly, is that not a joy?", cats: ["learning", "perseverance"] },
    { cn: "玉不琢，不成器", py: "yù bù zhuó, bù chéng qì", en: "Jade uncarved cannot form a vessel.", cats: ["learning", "perseverance", "family"] },
    { cn: "人不学，不知义", py: "rén bù xué, bù zhī yì", en: "People without learning do not know righteousness.", cats: ["learning", "wisdom", "family"] },
    { cn: "读书破万卷", py: "dú shū pò wàn juàn", en: "Read ten thousand volumes.", cats: ["learning"] },
    { cn: "下笔如有神", py: "xià bǐ rú yǒu shén", en: "Write as if guided by gods.", cats: ["learning", "perseverance"] },
    { cn: "书山有路勤为径", py: "shū shān yǒu lù qín wéi jìng", en: "In the mountain of books, diligence is the path.", cats: ["learning", "perseverance"] },
    { cn: "学海无涯苦作舟", py: "xué hǎi wú yá kǔ zuò zhōu", en: "In the endless sea of learning, hardship is the boat.", cats: ["learning", "perseverance"] },
    { cn: "黑发不知勤学早", py: "hēi fà bù zhī qín xué zǎo", en: "In black hair, one does not know to study early.", cats: ["learning", "life"] },
    { cn: "白首方悔读书迟", py: "bái shǒu fāng huǐ dú shū chí", en: "With white hair, one regrets starting late.", cats: ["learning", "life"] },
    { cn: "一日为师，终身为父", py: "yī rì wéi shī, zhōng shēn wéi fù", en: "One day as teacher, lifetime as father.", cats: ["learning", "family"] },
    { cn: "师父领进门，修行在个人", py: "shī fu lǐng jìn mén, xiū xíng zài gè rén", en: "The master leads you to the door, the rest is up to you.", cats: ["learning", "perseverance"] },
    { cn: "听君一席话，胜读十年书", py: "tīng jūn yī xí huà, shèng dú shí nián shū", en: "Listening to a wise word is better than reading ten years of books.", cats: ["learning", "wisdom"] },
    { cn: "问渠那得清如许", py: "wèn qú nà dé qīng rú xǔ", en: "How is the stream so clear?", cats: ["learning"] },
    { cn: "为有源头活水来", py: "wèi yǒu yuán tóu huó shuǐ lái", en: "Because fresh water flows from its source.", cats: ["learning", "wisdom"] },
    { cn: "纸上得来终觉浅", py: "zhǐ shàng dé lái zhōng jué qiǎn", en: "Knowledge from books is superficial after all.", cats: ["learning", "wisdom"] },
    { cn: "绝知此事要躬行", py: "jué zhī cǐ shì yào gōng xíng", en: "To truly know, one must practice.", cats: ["learning", "wisdom", "perseverance"] },
    { cn: "知易行难", py: "zhī yì xíng nán", en: "Knowing is easy, doing is hard.", cats: ["learning", "wisdom", "perseverance"] },
    { cn: "知行合一", py: "zhī xíng hé yī", en: "Unity of knowledge and action.", cats: ["learning", "wisdom"] },

    // PERSEVERANCE
    { cn: "有志者事竟成", py: "yǒu zhì zhě shì jìng chéng", en: "Where there is a will, there is a way.", cats: ["perseverance", "wisdom", "life"] },
    { cn: "滴水穿石", py: "dī shuǐ chuān shí", en: "Dripping water wears through stone. / Perseverance brings success.", cats: ["perseverance", "wisdom"] },
    { cn: "水滴石穿", py: "shuǐ dī shí chuān", en: "Water drops pierce stone.", cats: ["perseverance", "wisdom"] },
    { cn: "绳锯木断", py: "shéng jù mù duàn", en: "A rope saws through wood.", cats: ["perseverance"] },
    { cn: "锲而不舍", py: "qiè ér bù shě", en: "Carve without giving up.", cats: ["perseverance"] },
    { cn: "金石可镂", py: "jīn shí kě lòu", en: "Even metal and stone can be engraved.", cats: ["perseverance"] },
    { cn: "只要功夫深", py: "zhǐ yào gōng fu shēn", en: "If you work hard enough.", cats: ["perseverance"] },
    { cn: "铁杵磨成针", py: "tiě chǔ mó chéng zhēn", en: "An iron pestle can be ground into a needle.", cats: ["perseverance", "learning"], story: { title: "Li Bai and the Old Woman", content: "The famous Tang Dynasty poet Li Bai was known for his brilliant verses, but as a young boy, he was actually quite lazy and often skipped his studies. One day, while wandering by a stream instead of attending class, he saw an old woman grinding a thick iron pestle against a stone.

Curious, young Li Bai asked what she was doing. The old woman replied, 'I'm grinding this iron pestle into a sewing needle.'

Li Bai laughed and said, 'But that's impossible! It would take forever!'

The old woman looked at him seriously and replied, 'If I work at it every day without giving up, eventually the pestle will become a needle. The same is true for your studies.'

Ashamed, Li Bai returned to his books and became one of the most diligent students of his generation. This proverb reminds us that with persistent effort, even seemingly impossible tasks can be accomplished." } },
    { cn: "世上无难事", py: "shì shàng wú nán shì", en: "In the world, nothing is difficult.", cats: ["perseverance", "wisdom"] },
    { cn: "只怕有心人", py: "zhǐ pà yǒu xīn rén", en: "If you put your mind to it.", cats: ["perseverance", "wisdom"] },
    { cn: "吃得苦中苦", py: "chī dé kǔ zhōng kǔ", en: "Eat the bitterest of the bitter.", cats: ["perseverance", "health"] },
    { cn: "方为人上人", py: "fāng wéi rén shàng rén", en: "Become the highest of the high.", cats: ["perseverance"] },
    { cn: "不怕慢，就怕站", py: "bù pà màn, jiù pà zhàn", en: "Fear not slowness, but standing still.", cats: ["perseverance", "wisdom"] },
    { cn: "宝剑锋从磨砺出", py: "bǎo jiàn fēng cóng mó lì chū", en: "A sharp sword is forged through grinding.", cats: ["perseverance", "wisdom"] },
    { cn: "梅花香自苦寒来", py: "méi huā xiāng zì kǔ hán lái", en: "Plum blossoms are fragrant from bitter cold.", cats: ["perseverance", "wisdom", "life"] },
    { cn: "一分耕耘，一分收获", py: "yī fēn gēng yún, yī fēn shōu huò", en: "No pain, no gain.", cats: ["perseverance", "business", "wisdom"] },
    { cn: "天道酬勤", py: "tiān dào chóu qín", en: "Heaven rewards the diligent.", cats: ["perseverance", "wisdom"] },
    { cn: "勤能补拙", py: "qín néng bǔ zhuō", en: "Diligence can make up for lack of talent.", cats: ["perseverance", "learning"] },
    { cn: "笨鸟先飞", py: "bèn niǎo xiān fēi", en: "The slow bird starts early.", cats: ["perseverance", "learning"] },
    { cn: "业精于勤，荒于嬉", py: "yè jīng yú qín, huāng yú xī", en: "Excellence comes from diligence, failure from play.", cats: ["perseverance", "learning", "wisdom"] },
    { cn: "千里之行，始于足下", py: "qiān lǐ zhī xíng, shǐ yú zú xià", en: "A journey of a thousand miles begins with a single step.", cats: ["perseverance", "wisdom", "life"] },
    { cn: "不积跬步，无以至千里", py: "bù jī kuǐ bù, wú yǐ zhì qiān lǐ", en: "No thousand-mile journey happens without tiny steps.", cats: ["perseverance", "wisdom"] },
    { cn: "精诚所至", py: "jīng chéng suǒ zhì", en: "With complete sincerity.", cats: ["perseverance", "wisdom", "love"] },
    { cn: "金石为开", py: "jīn shí wéi kāi", en: "Even metal and stone will open.", cats: ["perseverance", "wisdom", "love"] },
    { cn: "卧薪尝胆", py: "wò xīn cháng dǎn", en: "Sleep on brushwood and taste gall. / Endure hardships.", cats: ["perseverance", "wisdom"], story: { title: "King Goujian's Vengeance", content: "During the Spring and Autumn Period (770-476 BCE), King Goujian of Yue was defeated by King Fuchai of Wu. As a condition of peace, Goujian was forced to serve as Fuchai's slave for three years, even tasting Fuchai's feces to diagnose his illness.

After being released, Goujian was determined to rebuild his kingdom and avenge this humiliation. He hung a gall bladder above his bed and tasted its bitter contents every morning and evening to remind himself of his suffering. He slept on brushwood instead of a comfortable bed. He worked in the fields alongside his people, wore simple clothes, and ate humble food.

Over twenty years, Yue grew strong under his leadership. Meanwhile, Fuchai grew complacent and arrogant. When the time was right, Goujian launched his attack and destroyed the Wu kingdom. This story embodies the spirit of enduring hardship and maintaining determination to achieve one's goals." } },
    { cn: "破釜沉舟", py: "pò fǔ chén zhōu", en: "Break the cauldrons and sink the boats. / Burn bridges.", cats: ["perseverance", "wisdom", "business"], story: { title: "Xiang Yu's Fight to the Death", content: "In 207 BCE, during the fall of the Qin Dynasty, the rebel general Xiang Yu led his army across the Zhang River to attack the Qin forces. After crossing the river, he ordered his men to sink all the boats, smash the cooking pots (cauldrons), and burn their tents. Each soldier was given only three days' worth of dry rations.

Xiang Yu declared to his shocked troops: 'We now have no way to retreat. The only way to survive is to defeat the enemy within three days!'

With their backs against the wall, Xiang Yu's army fought with desperate courage. They won nine consecutive battles against the numerically superior Qin army, eventually forcing the Qin commander to surrender. This decisive victory broke the back of the Qin Dynasty's military power.

The phrase represents absolute commitment - eliminating all avenues of retreat to force total focus on victory." } },

    // FRIENDSHIP
    { cn: "海内存知己", py: "hǎi nèi cún zhī jǐ", en: "Within the four seas, all men are brothers.", cats: ["friendship", "love"] },
    { cn: "天涯若比邻", py: "tiān yá ruò bǐ lín", en: "At the ends of the earth, we are as close as neighbors.", cats: ["friendship", "love"] },
    { cn: "君子之交淡如水", py: "jūn zǐ zhī jiāo dàn rú shuǐ", en: "The friendship of gentlemen is like water.", cats: ["friendship", "wisdom"] },
    { cn: "小人之交甘若醴", py: "xiǎo rén zhī jiāo gān ruò lǐ", en: "The friendship of petty men is like sweet wine.", cats: ["friendship", "wisdom"] },
    { cn: "岁寒知松柏", py: "suì hán zhī sōng bǎi", en: "In cold winter, we know the pine and cypress.", cats: ["friendship", "wisdom", "perseverance"] },
    { cn: "患难见真情", py: "huàn nàn jiàn zhēn qíng", en: "In adversity, we see true friendship.", cats: ["friendship", "wisdom", "love"] },
    { cn: "路遥知马力", py: "lù yáo zhī mǎ lì", en: "Over a long distance, we know the horse's strength.", cats: ["friendship", "wisdom"] },
    { cn: "日久见人心", py: "rì jiǔ jiàn rén xīn", en: "Over a long time, we see the person's heart.", cats: ["friendship", "wisdom", "love"] },
    { cn: "近朱者赤，近墨者黑", py: "jìn zhū zhě chì, jìn mò zhě hēi", en: "Near vermilion, one turns red; near ink, one turns black.", cats: ["friendship", "wisdom", "family"] },
    { cn: "酒逢知己千杯少", py: "jiǔ féng zhī jǐ qiān bēi shǎo", en: "With a close friend, a thousand cups are not enough.", cats: ["friendship", "life"] },
    { cn: "话不投机半句多", py: "huà bù tóu jī bàn jù duō", en: "With a stranger, half a sentence is too much.", cats: ["friendship", "wisdom"] },
    { cn: "人心齐，泰山移", py: "rén xīn qí, tài shān yí", en: "When hearts unite, Mount Tai moves.", cats: ["friendship", "business", "perseverance"] },
    { cn: "众人拾柴火焰高", py: "zhòng rén shí chái huǒ yàn gāo", en: "When everyone adds firewood, the flames rise high.", cats: ["friendship", "business"] },
    { cn: "三个臭皮匠", py: "sān gè chòu pí jiàng", en: "Three cobblers with their wits combined.", cats: ["friendship", "business", "wisdom"] },
    { cn: "赛过诸葛亮", py: "sài guò zhū gě liàng", en: "Surpass Zhuge Liang.", cats: ["friendship", "business", "wisdom"] },
    { cn: "单丝不成线", py: "dān sī bù chéng xiàn", en: "A single thread does not make a line.", cats: ["friendship", "wisdom"] },
    { cn: "独木不成林", py: "dú mù bù chéng lín", en: "A single tree does not make a forest.", cats: ["friendship", "wisdom", "business"] },
    { cn: "孤掌难鸣", py: "gū zhǎng nán míng", en: "A single palm cannot clap.", cats: ["friendship", "business"] },
    { cn: "一个好汉三个帮", py: "yī gè hǎo hàn sān gè bāng", en: "A good man needs three helpers.", cats: ["friendship", "business"] },
    { cn: "远亲不如近邻", py: "yuǎn qīn bù rú jìn lín", en: "A distant relative is not as good as a near neighbor.", cats: ["friendship", "family"] },

    // LIFE
    { cn: "一寸光阴一寸金", py: "yī cùn guāng yīn yī cùn jīn", en: "An inch of time is an inch of gold. / Time is precious.", cats: ["life", "wisdom", "business"] },
    { cn: "光阴似箭", py: "guāng yīn sì jiàn", en: "Time flies like an arrow.", cats: ["life", "wisdom"] },
    { cn: "日月如梭", py: "rì yuè rú suō", en: "The sun and moon shuttle back and forth.", cats: ["life", "wisdom"] },
    { cn: "少壮不努力", py: "shào zhuàng bù nǔ lì", en: "If one does not work hard in youth.", cats: ["life", "perseverance", "learning"] },
    { cn: "老大徒伤悲", py: "lǎo dà tú shāng bēi", en: "In old age one will grieve in vain.", cats: ["life", "perseverance", "learning"] },
    { cn: "树欲静而风不止", py: "shù yù jìng ér fēng bù zhǐ", en: "The tree wishes to be still, but the wind will not stop.", cats: ["life", "family", "wisdom"] },
    { cn: "子欲养而亲不待", py: "zǐ yù yǎng ér qīn bù dài", en: "The son wishes to care for parents, but they are gone.", cats: ["life", "family", "wisdom"] },
    { cn: "人生自古谁无死", py: "rén shēng zì gǔ shuí wú sǐ", en: "Since ancient times, who has not died?", cats: ["life", "wisdom"] },
    { cn: "留取丹心照汗青", py: "liú qǔ dān xīn zhào hàn qīng", en: "Leave a loyal heart to shine in history.", cats: ["life", "wisdom"] },
    { cn: "生当作人杰", py: "shēng dāng zuò rén jié", en: "In life, be a hero among men.", cats: ["life", "perseverance"] },
    { cn: "死亦为鬼雄", py: "sǐ yì wéi guǐ xióng", en: "In death, be a champion among ghosts.", cats: ["life", "perseverance"] },
    { cn: "人生得意须尽欢", py: "rén shēng dé yì xū jìn huān", en: "In life's prime, enjoy to the fullest.", cats: ["life", "health", "wisdom"] },
    { cn: "莫使金樽空对月", py: "mò shǐ jīn zūn kōng duì yuè", en: "Do not let the golden cup face the moon in vain.", cats: ["life", "friendship"] },
    { cn: "天生我材必有用", py: "tiān shēng wǒ cái bì yǒu yòng", en: "Heaven gave me talents for a purpose.", cats: ["life", "wisdom", "perseverance"] },
    { cn: "千金散尽还复来", py: "qiān jīn sàn jìn huán fù lái", en: "A thousand gold spent will return again.", cats: ["life", "business", "wisdom"] },
    { cn: "但愿人长久", py: "dàn yuàn rén cháng jiǔ", en: "May we all be blessed with longevity.", cats: ["life", "love", "family", "health"] },
    { cn: "千里共婵娟", py: "qiān lǐ gòng chán juān", en: "Though far apart, we are still under the same moon.", cats: ["life", "love", "family"] },
    { cn: "家和万事兴", py: "jiā hé wàn shì xīng", en: "When the family is harmonious, all affairs prosper.", cats: ["life", "family", "wisdom", "business"] },
    { cn: "百善孝为先", py: "bǎi shàn xiào wéi xiān", en: "Of all virtues, filial piety comes first.", cats: ["life", "family", "wisdom"] },
    { cn: "身体发肤，受之父母", py: "shēn tǐ fà fū, shòu zhī fù mǔ", en: "Body, hair and skin are received from parents.", cats: ["life", "family", "health"] },
    { cn: "父母在，不远游", py: "fù mǔ zài, bù yuǎn yóu", en: "While parents are alive, do not travel far.", cats: ["life", "family"] },
    { cn: "游必有方", py: "yóu bì yǒu fāng", en: "If you travel, have a destination.", cats: ["life", "wisdom"] },
    { cn: "三十年河东", py: "sān shí nián hé dōng", en: "Thirty years on the east of the river.", cats: ["life", "wisdom", "business"] },
    { cn: "三十年河西", py: "sān shí nián hé xī", en: "Thirty years on the west of the river.", cats: ["life", "wisdom", "business"] },
    { cn: "花无百日红", py: "huā wú bǎi rì hóng", en: "Flowers are not red for a hundred days.", cats: ["life", "wisdom", "love"] },
    { cn: "人无千日好", py: "rén wú qiān rì hǎo", en: "People are not good for a thousand days.", cats: ["life", "wisdom", "friendship"] },
    { cn: "金窝银窝不如自己的狗窝", py: "jīn wō yín wō bù rú zì jǐ de gǒu wō", en: "Gold nest, silver nest, not as good as one's own dog nest.", cats: ["life", "family", "health"] },

    // INTEGRITY (merged with wisdom)
    { cn: "人而无信，不知其可", py: "rén ér wú xìn, bù zhī qí kě", en: "If a man is not trustworthy, what can he do?", cats: ["wisdom", "business", "friendship"] },
    { cn: "一言九鼎", py: "yī yán jiǔ dǐng", en: "One word weighs as much as nine tripods.", cats: ["wisdom", "business", "friendship"] },
    { cn: "一诺千金", py: "yī nuò qiān jīn", en: "A promise is worth a thousand gold.", cats: ["wisdom", "business", "friendship", "love"] },
    { cn: "言必行，行必果", py: "yán bì xíng, xíng bì guǒ", en: "Words must be acted upon, actions must have results.", cats: ["wisdom", "business", "perseverance"] },
    { cn: "知耻近乎勇", py: "zhī chǐ jìn hū yǒng", en: "Knowing shame is close to courage.", cats: ["wisdom", "perseverance"] },
    { cn: "过而能改，善莫大焉", py: "guò ér néng gǎi, shàn mò dà yān", en: "To err and then reform is the greatest good.", cats: ["wisdom", "learning"] },
    { cn: "浪子回头金不换", py: "làng zǐ huí tóu jīn bù huàn", en: "A prodigal son returning is worth more than gold.", cats: ["wisdom", "family"] },
    { cn: "富贵不能淫", py: "fù guì bù néng yín", en: "Wealth and rank cannot corrupt.", cats: ["wisdom", "life", "perseverance"] },
    { cn: "贫贱不能移", py: "pín jiàn bù néng yí", en: "Poverty and lowliness cannot shift.", cats: ["wisdom", "life", "perseverance"] },
    { cn: "威武不能屈", py: "wēi wǔ bù néng qū", en: "Might and force cannot bend.", cats: ["wisdom", "life", "perseverance"] },

    // LOVE - New Category
    { cn: "有情人终成眷属", py: "yǒu qíng rén zhōng chéng juàn shǔ", en: "Lovers will eventually become family. / True love finds its way.", cats: ["love"] },
    { cn: "百年好合", py: "bǎi nián hǎo hé", en: "A hundred years of happy union. / Wishing a couple lasting happiness.", cats: ["love", "family"] },
    { cn: "永结同心", py: "yǒng jié tóng xīn", en: "Forever united in heart. / Eternal love and commitment.", cats: ["love", "family"] },
    { cn: "执子之手，与子偕老", py: "zhí zǐ zhī shǒu, yǔ zǐ xié lǎo", en: "Hold your hand, and grow old with you.", cats: ["love", "family", "life"] },
    { cn: "在天愿作比翼鸟", py: "zài tiān yuàn zuò bǐ yì niǎo", en: "In heaven, we wish to be birds flying wing to wing.", cats: ["love", "family"] },
    { cn: "在地愿为连理枝", py: "zài dì yuàn wéi lián lǐ zhī", en: "On earth, we wish to be twin branches of the same tree.", cats: ["love", "family"] },
    { cn: "两情若是久长时", py: "liǎng qíng ruò shì jiǔ cháng shí", en: "If love between both sides can last for long.", cats: ["love", "wisdom"] },
    { cn: "又岂在朝朝暮暮", py: "yòu qǐ zài zhāo zhāo mù mù", en: "Why need they stay together every night and day?", cats: ["love", "wisdom"] },
    { cn: "曾经沧海难为水", py: "céng jīng cāng hǎi nán wéi shuǐ", en: "Having seen the ocean, other waters seem bland. / None compare to the one you love.", cats: ["love", "wisdom"] },
    { cn: "除却巫山不是云", py: "chú què wū shān bù shì yún", en: "Having seen the clouds of Wu Mountain, other clouds seem plain.", cats: ["love", "wisdom"] },
    { cn: "身无彩凤双飞翼", py: "shēn wú cǎi fèng shuāng fēi yì", en: "We have no wings to fly side by side like colorful phoenixes.", cats: ["love", "family"] },
    { cn: "心有灵犀一点通", py: "xīn yǒu líng xī yì diǎn tōng", en: "Our hearts are connected by a single thread of understanding.", cats: ["love", "friendship"] },
    { cn: "春蚕到死丝方尽", py: "chūn cán dào sǐ sī fāng jìn", en: "The spring silkworm spins until death. / Love until the end.", cats: ["love", "perseverance"] },
    { cn: "蜡炬成灰泪始干", py: "là jù chéng huī lèi shǐ gān", en: "The candle burns to ashes before tears dry. / Devoted love.", cats: ["love", "perseverance"] },
    { cn: "相思相见知何日", py: "xiāng sī xiāng jiàn zhī hé rì", en: "Longing to meet, but when will that day come?", cats: ["love"] },
    { cn: "此时此夜难为情", py: "cǐ shí cǐ yè nán wéi qíng", en: "This moment, this night, my feelings overwhelm me.", cats: ["love"] },
    { cn: "山无陵，江水为竭", py: "shān wú líng, jiāng shuǐ wéi jié", en: "When mountains lose their peaks and rivers run dry.", cats: ["love", "perseverance"] },
    { cn: "冬雷震震，夏雨雪", py: "dōng léi zhèn zhèn, xià yǔ xuě", en: "When winter thunders and summer snows.", cats: ["love", "perseverance"] },
    { cn: "天地合，乃敢与君绝", py: "tiān dì hé, nǎi gǎn yǔ jūn jué", en: "Only when heaven and earth merge will I part from you.", cats: ["love", "perseverance"] },
    { cn: "一日不见，如三秋兮", py: "yī rì bù jiàn, rú sān qiū xī", en: "One day apart feels like three autumns.", cats: ["love", "friendship"] },
    { cn: "衣带渐宽终不悔", py: "yī dài jiàn kuān zhōng bù huǐ", en: "My belt grows loose, yet I regret nothing. / For love.", cats: ["love", "perseverance"] },
    { cn: "为伊消得人憔悴", py: "wèi yī xiāo dé rén qiáo cuì", en: "For you, I grow thin and pale without regret.", cats: ["love", "perseverance"] },
    { cn: "窈窕淑女，君子好逑", py: "yǎo tiǎo shū nǚ, jūn zǐ hǎo qiú", en: "A graceful maiden is the noble man's good match.", cats: ["love", "wisdom"] },
    { cn: "愿得一人心，白首不相离", py: "yuàn dé yī rén xīn, bái shǒu bù xiāng lí", en: "Wish to win one's heart, and never part till white-haired.", cats: ["love", "family", "life"] },
    { cn: "结发为夫妻，恩爱两不疑", py: "jié fà wéi fū qī, ēn ài liǎng bù yí", en: "Bound by hair as husband and wife, our love is without doubt.", cats: ["love", "family"] },

    // BUSINESS - New Category
    { cn: "和气生财", py: "hé qì shēng cái", en: "Harmony brings wealth. / Good relations create prosperity.", cats: ["business", "friendship", "wisdom"] },
    { cn: "诚信经营", py: "chéng xìn jīng yíng", en: "Operate with integrity and trust.", cats: ["business", "wisdom"] },
    { cn: "童叟无欺", py: "tóng sǒu wú qī", en: "Neither child nor elder is cheated. / Honest dealing with all.", cats: ["business", "wisdom"] },
    { cn: "货真价实", py: "huò zhēn jià shí", en: "Genuine goods at fair prices.", cats: ["business"] },
    { cn: "薄利多销", py: "bó lì duō xiāo", en: "Small profits but quick turnover.", cats: ["business", "wisdom"] },
    { cn: "奇货可居", py: "qí huò kě jū", en: "Rare goods can be hoarded for higher prices.", cats: ["business", "wisdom"] },
    { cn: "将本求利", py: "jiāng běn qiú lì", en: "Invest capital to seek profit.", cats: ["business"] },
    { cn: "斤斤计较", py: "jīn jīn jì jiào", en: "Count every ounce. / Haggling over every penny.", cats: ["business", "wisdom"] },
    { cn: "两败俱伤", py: "liǎng bài jù shāng", en: "Both sides suffer. / Lose-lose situation.", cats: ["business", "wisdom"] },
    { cn: "合作共赢", py: "hé zuò gòng yíng", en: "Cooperation leads to mutual success.", cats: ["business", "friendship", "wisdom"] },
    { cn: "未雨绸缪", py: "wèi yǔ chóu móu", en: "Repair before it rains. / Plan ahead.", cats: ["business", "wisdom", "life"] },
    { cn: "三思而行", py: "sān sī ér xíng", en: "Think three times before acting.", cats: ["business", "wisdom"] },
    { cn: "量力而行", py: "liàng lì ér xíng", en: "Act according to one's ability.", cats: ["business", "wisdom"] },
    { cn: "循序渐进", py: "xún xù jiàn jìn", en: "Proceed step by step.", cats: ["business", "wisdom", "learning"] },
    { cn: "稳扎稳打", py: "wěn zhā wěn dǎ", en: "Steady and solid steps.", cats: ["business", "wisdom", "perseverance"] },
    { cn: "开源节流", py: "kāi yuán jié liú", en: "Increase income and reduce expenses.", cats: ["business", "wisdom", "life"] },
    { cn: "物尽其用", py: "wù jìn qí yòng", en: "Make the best use of everything.", cats: ["business", "wisdom"] },
    { cn: "人尽其才", py: "rén jìn qí cái", en: "Make the best use of everyone's talents.", cats: ["business", "wisdom", "friendship"] },
    { cn: "天时地利人和", py: "tiān shí dì lì rén hé", en: "Right time, right place, right people. / All conditions favorable.", cats: ["business", "wisdom"] },
    { cn: "酒香不怕巷子深", py: "jiǔ xiāng bù pà xiàng zi shēn", en: "Good wine needs no bush. / Quality sells itself.", cats: ["business", "wisdom"] },
    { cn: "货比三家", py: "huò bǐ sān jiā", en: "Compare three shops before buying.", cats: ["business", "wisdom"] },
    { cn: "货真价实", py: "huò zhēn jià shí", en: "True goods at real prices.", cats: ["business", "wisdom"] },
    { cn: "磨刀不误砍柴工", py: "mó dāo bù wù kǎn chái gōng", en: "Sharpening the axe won't delay the woodcutting. / Preparation saves time.", cats: ["business", "wisdom", "perseverance"] },
    { cn: "事半功倍", py: "shì bàn gōng bèi", en: "Half the effort, double the result.", cats: ["business", "wisdom"] },
    { cn: "事倍功半", py: "shì bèi gōng bàn", en: "Double the effort, half the result.", cats: ["business", "wisdom"] },
    { cn: "因小失大", py: "yīn xiǎo shī dà", en: "Lose the big for the small. / Penny wise, pound foolish.", cats: ["business", "wisdom"] },
    { cn: "得不偿失", py: "dé bù cháng shī", en: "The gain does not outweigh the loss.", cats: ["business", "wisdom"] },
    { cn: "见好就收", py: "jiàn hǎo jiù shōu", en: "Quit while you're ahead.", cats: ["business", "wisdom"] },
    { cn: "留得青山在，不怕没柴烧", py: "liú dé qīng shān zài, bù pà méi chái shāo", en: "As long as the green hills remain, there will be firewood.", cats: ["business", "wisdom", "life"] },
    { cn: "吃一堑，长一智", py: "chī yī qiàn, zhǎng yī zhì", en: "A fall into the pit, a gain in your wit.", cats: ["business", "wisdom", "learning"] },
    { cn: "失败是成功之母", py: "shī bài shì chéng gōng zhī mǔ", en: "Failure is the mother of success.", cats: ["business", "perseverance", "wisdom"] },

    // FAMILY - New Category
    { cn: "家和万事兴", py: "jiā hé wàn shì xīng", en: "A harmonious family leads to prosperity in all things.", cats: ["family", "wisdom", "life"] },
    { cn: "父母恩深", py: "fù mǔ ēn shēn", en: "Parents' kindness is profound.", cats: ["family", "wisdom"] },
    { cn: "养儿方知父母恩", py: "yǎng ér fāng zhī fù mǔ ēn", en: "Only when raising children do you know parents' kindness.", cats: ["family", "wisdom", "life"] },
    { cn: "树欲静而风不止，子欲养而亲不待", py: "shù yù jìng ér fēng bù zhǐ, zǐ yù yǎng ér qīn bù dài", en: "The tree wants to rest but the wind won't stop; the child wants to care for parents but they are gone.", cats: ["family", "life", "wisdom"] },
    { cn: "谁言寸草心，报得三春晖", py: "shuí yán cùn cǎo xīn, bào dé sān chūn huī", en: "Who says the heart of grass can repay the spring sunshine? / Can never fully repay parents.", cats: ["family", "wisdom"] },
    { cn: "慈母手中线，游子身上衣", py: "cí mǔ shǒu zhōng xiàn, yóu zǐ shēn shàng yī", en: "Thread in a mother's hand, clothes on a wandering son.", cats: ["family", "love"] },
    { cn: "临行密密缝，意恐迟迟归", py: "lín xíng mì mì féng, yì kǒng chí chí guī", en: "Sewing tightly before departure, fearing a late return.", cats: ["family", "love"] },
    { cn: "兄弟如手足", py: "xiōng dì rú shǒu zú", en: "Brothers are like hands and feet.", cats: ["family", "friendship"] },
    { cn: "打断骨头连着筋", py: "dǎ duàn gǔ tou lián zhe jīn", en: "Even broken bones are connected by tendons. / Family bonds endure.", cats: ["family", "friendship", "wisdom"] },
    { cn: "家和万事兴，家衰口不停", py: "jiā hé wàn shì xīng, jiā shuāi kǒu bù tíng", en: "Harmonious families prosper; troubled families bicker.", cats: ["family", "wisdom"] },
    { cn: "国有国法，家有家规", py: "guó yǒu guó fǎ, jiā yǒu jiā guī", en: "A country has laws; a family has rules.", cats: ["family", "wisdom"] },
    { cn: "上梁不正下梁歪", py: "shàng liáng bù zhèng xià liáng wāi", en: "If the upper beam is not straight, the lower beam will be crooked.", cats: ["family", "wisdom"] },
    { cn: "有其父必有其子", py: "yǒu qí fù bì yǒu qí zǐ", en: "Like father, like son.", cats: ["family", "wisdom"] },
    { cn: "虎父无犬子", py: "hǔ fù wú quǎn zǐ", en: "A tiger father has no dog sons.", cats: ["family", "wisdom"] },
    { cn: "儿孙自有儿孙福", py: "ér sūn zì yǒu ér sūn fú", en: "Children and grandchildren have their own blessings.", cats: ["family", "wisdom", "life"] },
    { cn: "莫为儿孙作马牛", py: "mò wèi ér sūn zuò mǎ niú", en: "Don't be a horse or ox for your children.", cats: ["family", "wisdom", "life"] },
    { cn: "不当家不知柴米贵", py: "bù dāng jiā bù zhī chái mǐ guì", en: "Until you manage a household, you don't know the cost of rice and firewood.", cats: ["family", "wisdom", "life", "business"] },
    { cn: "勤俭持家", py: "qín jiǎn chí jiā", en: "Run the household with diligence and thrift.", cats: ["family", "business", "wisdom"] },
    { cn: "男大当婚，女大当嫁", py: "nán dà dāng hūn, nǚ dà dāng jià", en: "When a man grows up he should marry; when a woman grows up she should wed.", cats: ["family", "love", "life"] },
    { cn: "门当户对", py: "mén dāng hù duì", en: "Families of equal social standing. / Well-matched marriage.", cats: ["family", "love", "wisdom"] },
    { cn: "嫁鸡随鸡，嫁狗随狗", py: "jià jī suí jī, jià gǒu suí gǒu", en: "Marry a chicken, follow the chicken; marry a dog, follow the dog.", cats: ["family", "love"] },
    { cn: "清官难断家务事", py: "qīng guān nán duàn jiā wù shì", en: "Even an honest official can't settle family disputes.", cats: ["family", "wisdom"] },
    { cn: "家丑不可外扬", py: "jiā chǒu bù kě wài yáng", en: "Family shame should not be spread outside.", cats: ["family", "wisdom"] },
    { cn: "血浓于水", py: "xuè nóng yú shuǐ", en: "Blood is thicker than water.", cats: ["family", "wisdom"] },
    { cn: "打虎亲兄弟，上阵父子兵", py: "dǎ hǔ qīn xiōng dì, shàng zhèn fù zǐ bīng", en: "To fight tigers, use brothers; to go to war, use father and sons.", cats: ["family", "friendship", "wisdom"] },
    { cn: "家有一老，如有一宝", py: "jiā yǒu yī lǎo, rú yǒu yī bǎo", en: "An elder in the home is like a treasure.", cats: ["family", "wisdom", "life"] },
    { cn: "不听老人言，吃亏在眼前", py: "bù tīng lǎo rén yán, chī kuī zài yǎn qián", en: "Ignore the old, suffer loss soon.", cats: ["family", "wisdom", "learning"] },

    // HEALTH - New Category
    { cn: "身体是革命的本钱", py: "shēn tǐ shì gé mìng de běn qián", en: "Health is the capital of revolution. / Health is wealth.", cats: ["health", "wisdom", "life"] },
    { cn: "健康就是财富", py: "jiàn kāng jiù shì cái fù", en: "Health is wealth.", cats: ["health", "wisdom", "business"] },
    { cn: "预防胜于治疗", py: "yù fáng shèng yú zhì liáo", en: "Prevention is better than cure.", cats: ["health", "wisdom"] },
    { cn: "病从口入", py: "bìng cóng kǒu rù", en: "Disease enters through the mouth.", cats: ["health", "wisdom"] },
    { cn: "祸从口出", py: "huò cóng kǒu chū", en: "Trouble comes out of the mouth.", cats: ["health", "wisdom", "friendship"] },
    { cn: "饭后百步走，活到九十九", py: "fàn hòu bǎi bù zǒu, huó dào jiǔ shí jiǔ", en: "Walk a hundred steps after meals, live to ninety-nine.", cats: ["health", "wisdom"] },
    { cn: "早睡早起身体好", py: "zǎo shuì zǎo qǐ shēn tǐ hǎo", en: "Early to bed, early to rise makes a man healthy.", cats: ["health", "wisdom"] },
    { cn: "生命在于运动", py: "shēng mìng zài yú yùn dòng", en: "Life lies in movement. / Exercise is life.", cats: ["health", "wisdom"] },
    { cn: "心静自然凉", py: "xīn jìng zì rán liáng", en: "When the heart is calm, naturally cool. / Peace of mind brings comfort.", cats: ["health", "wisdom", "life"] },
    { cn: "笑一笑，十年少", py: "xiào yī xiào, shí nián shào", en: "A smile makes you ten years younger.", cats: ["health", "wisdom", "life"] },
    { cn: "愁一愁，白了头", py: "chóu yī chóu, bái le tóu", en: "A worry whitens the hair.", cats: ["health", "wisdom", "life"] },
    { cn: "药补不如食补", py: "yào bǔ bù rú shí bǔ", en: "Nourishment from medicine is not as good as nourishment from food.", cats: ["health", "wisdom"] },
    { cn: "食补不如睡补", py: "shí bǔ bù rú shuì bǔ", en: "Nourishment from food is not as good as nourishment from sleep.", cats: ["health", "wisdom"] },
    { cn: "春捂秋冻", py: "chūn wǔ qiū dòng", en: "Cover up in spring, stay cool in autumn.", cats: ["health", "wisdom"] },
    { cn: "冬吃萝卜夏吃姜", py: "dōng chī luó bo xià chī jiāng", en: "Eat radish in winter, ginger in summer.", cats: ["health", "wisdom"] },
    { cn: "不求医，不吃药", py: "bù qiú yī, bù chī yào", en: "Better not to seek doctors or take medicine. / Prevention first.", cats: ["health", "wisdom"] },
    { cn: "三分治，七分养", py: "sān fēn zhì, qī fēn yǎng", en: "Thirty percent treatment, seventy percent care.", cats: ["health", "wisdom"] },
    { cn: "病来如山倒，病去如抽丝", py: "bìng lái rú shān dǎo, bìng qù rú chōu sī", en: "Illness comes like a mountain falling, leaves like silk unwinding.", cats: ["health", "wisdom", "perseverance"] },
    { cn: "忧思伤脾", py: "yōu sī shāng pí", en: "Worry and thought harm the spleen.", cats: ["health", "wisdom"] },
    { cn: "怒伤肝，喜伤心", py: "nù shāng gān, xǐ shāng xīn", en: "Anger harms the liver, joy harms the heart.", cats: ["health", "wisdom", "life"] },
    { cn: "思伤脾，忧伤肺", py: "sī shāng pí, yōu shāng fèi", en: "Thought harms the spleen, sorrow harms the lungs.", cats: ["health", "wisdom"] },
    { cn: "恐伤肾，惊伤胆", py: "kǒng shāng shèn, jīng shāng dǎn", en: "Fear harms the kidneys, shock harms the gall.", cats: ["health", "wisdom"] },
    { cn: "饮食有节，起居有常", py: "yǐn shí yǒu jié, qǐ jū yǒu cháng", en: "Eat and drink in moderation, keep regular hours.", cats: ["health", "wisdom", "life"] },
    { cn: "食不厌精，脍不厌细", py: "shí bù yàn jīng, kuài bù yàn xì", en: "Food should be fine, meat should be thinly sliced.", cats: ["health", "wisdom", "life"] },
    { cn: "食不言，寝不语", py: "shí bù yán, qǐn bù yǔ", en: "Do not speak while eating, do not talk while sleeping.", cats: ["health", "wisdom", "family"] },
    { cn: "流水不腐，户枢不蠹", py: "liú shuǐ bù fǔ, hù shū bù dù", en: "Running water does not rot, door hinges do not rust. / Activity keeps you healthy.", cats: ["health", "wisdom", "perseverance"] },
    { cn: "一张一弛，文武之道", py: "yī zhāng yī chí, wén wǔ zhī dào", en: "Alternate tension and relaxation - the way of civil and military.", cats: ["health", "wisdom", "perseverance"] },
    { cn: "劳逸结合", py: "láo yì jié hé", en: "Balance work and rest.", cats: ["health", "wisdom", "life"] },
    { cn: "安步当车", py: "ān bù dàng chē", en: "Walk leisurely instead of riding. / Walking is healthy.", cats: ["health", "wisdom", "life"] },

    // IDIOM STORIES - Famous Proverbs with Historical Origins
    { cn: "画蛇添足", py: "huà shé tiān zú", en: "Adding feet to a snake. / Ruining the effect by adding something superfluous.", cats: ["wisdom", "life"], story: { title: "The Snake Drawing Contest", content: "During the Warring States Period, a group of men were drinking together when they decided to have a contest: whoever finished drawing a snake on the ground first would win a pot of wine.

One man finished his snake quickly. Seeing that the others were still struggling, he arrogantly decided to add feet to his snake, thinking it would make his drawing even better. Just as he finished adding the feet, another man completed his simple snake drawing and claimed the wine.

The winner pointed out: 'Snakes don't have feet. What you drew isn't a snake anymore!' The first man lost the contest because of his unnecessary addition.

This story teaches us that sometimes adding too much or being excessive can ruin something that was already good enough. It warns against overdoing things and losing sight of what is truly needed." } },
    { cn: "守株待兔", py: "shǒu zhū dài tù", en: "Guarding the tree waiting for rabbits. / Waiting for fortune to strike again without effort.", cats: ["wisdom", "business", "life"], story: { title: "The Farmer and the Rabbit", content: "In the State of Song during the Spring and Autumn Period, there was a farmer who worked hard in his fields every day. One day, while plowing, he saw a rabbit run into a tree stump and break its neck, dying instantly.

The farmer happily took the rabbit home for dinner. He thought: 'How wonderful! If I wait by this tree stump every day, I'll surely catch more rabbits without any work!'

So he abandoned his plow, sat by the tree stump, and waited for more rabbits to come. Days turned into weeks, but no more rabbits came. His fields became overgrown with weeds, and he became the laughingstock of the village.

The story satirizes those who rely on luck rather than hard work, or who try to gain from chance occurrences without understanding that they were accidents, not patterns to depend on." } },
    { cn: "刻舟求剑", py: "kè zhōu qiú jiàn", en: "Marking the boat to find the sword. / Taking measures without regard to changing circumstances.", cats: ["wisdom", "learning"], story: { title: "The Man Who Marked His Boat", content: "A man from the State of Chu was crossing a river in a boat when his sword fell into the water. He quickly took out his knife and carved a notch on the side of the boat where his sword had fallen.

When the boat reached the shore, he confidently said: 'My sword fell right here,' pointing to the mark on the boat. He then dove into the water at that exact spot, searching for his sword.

Of course, he found nothing. The boat had moved, but the sword remained at the bottom of the river where it had originally fallen. The man had failed to understand that while the boat moved, the sword stayed in place.

This story illustrates the foolishness of rigid thinking and not adapting to changing circumstances. It warns against relying on static solutions when the world around us is dynamic." } },
    { cn: "亡羊补牢", py: "wáng yáng bǔ láo", en: "Fixing the pen after sheep are lost. / Better late than never.", cats: ["wisdom", "learning", "life"], story: { title: "The Shepherd Mends His Pen", content: "A shepherd raised many sheep. One night, he discovered a hole in his sheep pen and one sheep was missing - eaten by a wolf. His neighbor advised him: 'You should fix that hole immediately!'

But the shepherd replied dismissively: 'The sheep is already lost. What's the point of fixing the pen now?'

The next morning, another sheep was gone. The shepherd finally realized his mistake and immediately repaired the pen, reinforcing it to make it stronger than before.

Although he had lost two sheep, he prevented further losses. As the saying goes: 'It's not too late to mend the pen after the sheep are lost.'

This proverb teaches us that when we make mistakes or face setbacks, we should learn from them and make corrections promptly. It's never too late to fix a problem and prevent further damage." } },
    { cn: "井底之蛙", py: "jǐng dǐ zhī wā", en: "Frog in the well. / A person with limited perspective.", cats: ["wisdom", "learning"], story: { title: "The Frog of the Well", content: "A frog lived in an old well. He was very content with his home and often boasted to a visiting sea turtle about how wonderful his well was.

'Look how comfortable I am!' the frog said. 'I can hop around on the ledge, rest in the hollows of the bricks, and swim in the cool water. This well is the greatest place in the world!'

The sea turtle tried to tell the frog about the vast ocean - how it stretched to the horizon, how its waters were immeasurably deep, and how its waves reached mountains. The frog was stunned into silence. He finally realized how small his world had been.

This proverb describes someone with a narrow outlook who believes their limited experience represents the whole world. It encourages us to expand our horizons and recognize there's always more to learn and experience." } },
    { cn: "毛遂自荐", py: "máo suì zì jiàn", en: "Mao Sui recommending himself. / Volunteering for a task.", cats: ["wisdom", "business", "perseverance"], story: { title: "Mao Sui's Self-Recommendation", content: "During the Warring States Period, Prince Pingyuan of Zhao needed to select twenty talented men to accompany him on a diplomatic mission to the State of Chu. He had already chosen nineteen but couldn't find a suitable twentieth person.

Mao Sui, who had been living as a guest at the prince's house for three years, stepped forward and said: 'I hear you need one more person. I would like to recommend myself.'

The prince was skeptical: 'A talented person is like a nail in a bag - the tip will show through. You've been here three years and I've never heard of you.'

Mao Sui replied: 'The problem is you never put me in the bag. If you had, the tip would have shown long ago.'

Impressed by his confidence, the prince took him along. When negotiations with Chu stalled, Mao Sui fearlessly confronted the King of Chu with drawn sword, compelling him to agree to an alliance. Mao Sui proved his worth and became famous for his bold self-confidence." } },
    { cn: "纸上谈兵", py: "zhǐ shàng tán bīng", en: "Discussing military tactics on paper. / Theoretical knowledge without practical experience.", cats: ["wisdom", "learning", "business"], story: { title: "Zhao Kuo's Theoretical Defeat", content: "During the Warring States Period, there was a general named Zhao Kuo, son of the famous Zhao She. Since childhood, Zhao Kuo studied military strategy and could debate tactics with anyone, even his father. Everyone praised his theoretical knowledge.

In 260 BCE, when Qin attacked Zhao, the elderly general Lian Po led the defense. The battle became a stalemate, so Qin spread rumors that they feared only Zhao Kuo, not Lian Po. The King of Zhao believed the rumors and replaced Lian Po with Zhao Kuo.

Zhao Kuo's mother warned the king: 'My husband said Zhao Kuo treats war like a game. He lacks real experience.' But the king didn't listen.

Zhao Kuo immediately changed all of Lian Po's battle plans, following only what he had read in books. The Qin general Bai Qi feigned retreat to lure Zhao Kuo out, then surrounded and destroyed his army. Zhao Kuo died in battle, and 400,000 Zhao soldiers were buried alive.

This story warns against relying solely on book knowledge without practical experience and judgment." } },
    { cn: "完璧归赵", py: "wán bì guī zhào", en: "Returning the jade intact to Zhao. / Returning something to its rightful owner in perfect condition.", cats: ["wisdom", "business"], story: { title: "Lin Xiangru Saves the He Shi Bi", content: "The He Shi Bi was a legendary jade disc of extraordinary beauty, treasured by the State of Zhao. The King of Qin offered fifteen cities in exchange for the jade. The King of Zhao knew this was likely a trick but feared refusing would give Qin an excuse to attack.

Lin Xiangru, a clever courtier, volunteered to deliver the jade. At the Qin court, the King of Qin examined the jade with delight but showed no intention of discussing the cities. Lin Xiangru calmly said: 'The jade has a flaw. Let me show you.'

When the king handed back the jade, Lin Xiangru retreated to a pillar and held the jade high. 'If you try to take this by force, I will smash the jade and myself against this pillar!' he declared. 'If you are sincere, let's have a ceremony to transfer the cities first.'

Knowing Qin had no intention of giving up the cities, Lin Xiangru secretly sent the jade back to Zhao. When confronted, he said: 'Qin has never kept its word. I ensured the jade's safety first.' The King of Qin, impressed by his courage and wit, let him go.

The story celebrates wisdom, courage, and protecting one's treasures through clever diplomacy." } },
    { cn: "负荆请罪", py: "fù jīng qǐng zuì", en: "Carrying thorns to ask for punishment. / Offering a sincere apology.", cats: ["wisdom", "friendship"], story: { title: "Lian Po and Lin Xiangru's Reconciliation", content: "After Lin Xiangru's successful mission with the He Shi Bi jade, the King of Zhao promoted him to a high position above General Lian Po. Lian Po, a proud military commander who had defended Zhao for decades, was furious. 'I have shed blood for this kingdom, while he just used words!' he declared. 'If I see him, I will humiliate him!'

Lin Xiangru heard this but avoided all encounters with Lian Po, even feigning illness when he knew Lian Po would be at court. His followers were ashamed, thinking their master was a coward.

Lin Xiangru explained: 'Which is more important - my personal honor or the safety of the state? If two powerful ministers fight, enemies will attack. I avoid conflict for the good of Zhao.'

When Lian Po heard this, he was deeply ashamed. He removed his shirt, carried a bundle of thorny branches on his back (a traditional punishment), and went to Lin Xiangru's house to beg for forgiveness. The two became close friends and allies, working together to strengthen Zhao.

This story exemplifies humility, recognizing one's mistakes, and prioritizing the greater good over personal pride." } },
    { cn: "四面楚歌", py: "sì miàn chǔ gē", en: "Songs of Chu on all sides. / Surrounded by enemies; isolated and desperate.", cats: ["wisdom", "life"], story: { title: "Xiang Yu's Final Battle", content: "In 202 BCE, Xiang Yu, the powerful warlord known as the 'Conqueror of Western Chu,' found himself trapped at Gaixia by the forces of Liu Bang, who would later found the Han Dynasty. Xiang Yu's army was surrounded, outnumbered, and running low on supplies.

During the night, Liu Bang's forces began singing folk songs from the Chu region - Xiang Yu's homeland. Hearing songs of home on all sides, Xiang Yu's soldiers believed that Chu had already fallen and that their families were in enemy hands. Their morale collapsed, and many deserted or surrendered.

Xiang Yu, hearing the songs, understood Liu Bang's psychological warfare. In despair, he composed the famous 'Song of Gaixia': 'My strength could pull mountains, my spirit could cover the world; but the times are against me, and my horse can run no more. If my horse can run no more, what can I do? Yu, my beloved, what will become of you?'

Despite breaking through the encirclement with a small force, Xiang Yu was eventually cornered at the Wu River. Unwilling to face capture, he committed suicide, ending the Chu-Han contention.

The phrase describes being surrounded on all sides with no way out, feeling utterly isolated and desperate." } },
    { cn: "鹬蚌相争，渔翁得利", py: "yù bàng xiāng zhēng, yú wēng dé lì", en: "When the snipe and the clam fight, the fisherman profits. / Two parties fight while a third benefits.", cats: ["wisdom", "business"], story: { title: "The Snipe, the Clam, and the Fisherman", content: "One day, a snipe (a type of wading bird) spotted a clam lying open on the beach and tried to eat its soft flesh. The clam quickly clamped its shell shut, trapping the snipe's beak inside.

The snipe said: 'If you don't open up, you will dry out and die when the sun gets hot.'

The clam replied: 'If I don't open up, you won't be able to eat or fly away, and you will starve to death!'

They remained locked in their struggle for hours. Neither would give way, each believing they could outlast the other.

An old fisherman came along and saw the struggling pair. He easily caught them both, delighted at his unexpected double prize. The two enemies had been so focused on defeating each other that they failed to see the danger approaching from outside.

This proverb warns against prolonged conflicts where both parties lose sight of the bigger picture, allowing third parties to take advantage of the situation." } },
    { cn: "邯郸学步", py: "hán dān xué bù", en: "Learning to walk in Handan. / Losing one's own identity while imitating others.", cats: ["wisdom", "learning"], story: { title: "The Young Man Who Forgot How to Walk", content: "In the Warring States Period, the people of Handan (capital of Zhao) were famous for their elegant, graceful way of walking. A young man from the State of Yan heard about this and decided to travel to Handan to learn their walking style.

He spent months watching and imitating the Handan people. He tried to copy every detail of their posture, stride, and movement. But the more he tried to mimic them, the more awkward he became.

He became so focused on copying others that he completely forgot his own natural way of walking. Finally, when he tried to return home, he found he couldn't walk at all - he had to crawl back to Yan.

The story satirizes those who try so hard to imitate others that they lose their own identity and abilities. It teaches us to appreciate our own strengths while learning from others, rather than blindly copying at the expense of our authentic selves." } },
    { cn: "叶公好龙", py: "yè gōng hào lóng", en: "Lord Ye's love of dragons. / Professed love of something one actually fears.", cats: ["wisdom", "life"], story: { title: "Lord Ye and the Real Dragon", content: "Lord Ye was a man famous throughout the land for his passionate love of dragons. His house was decorated with dragon carvings, his clothes embroidered with dragon patterns, and he spoke of dragons constantly. Everyone knew of Lord Ye's devotion to dragons.

The real Dragon King in Heaven heard about this mortal who loved dragons so much and decided to reward him with a personal visit. One day, as Lord Ye sat in his study admiring a dragon painting, the actual Dragon King descended - enormous, golden-scaled, with thunder in his breath and lightning in his eyes.

Lord Ye took one look at the real dragon and screamed in terror. He ran out of his house, never to return. The Dragon King was deeply disappointed and flew back to Heaven.

The story exposes those who claim to love or support something in theory but are actually afraid of it in reality. It warns against superficial admiration and hypocrisy." } },
    { cn: "朝三暮四", py: "zhāo sān mù sì", en: "Three in the morning, four in the evening. / Changing one's mind frequently; being fickle.", cats: ["wisdom", "life"], story: { title: "The Monkey and the Chestnuts", content: "In the State of Song, there was a man who loved monkeys and kept many of them. When his household ran short of food, he decided to reduce the monkeys' rations.

He gathered the monkeys and announced: 'From now on, I'll give you three chestnuts in the morning and four in the evening. Is that acceptable?'

The monkeys were furious, screeching and jumping about in protest.

The man quickly changed his proposal: 'Very well then, I'll give you four chestnuts in the morning and three in the evening. Will that do?'

The monkeys were delighted, chattering happily among themselves at their apparent victory.

In reality, the total number of chestnuts was exactly the same - seven per day. The man had simply rearranged the numbers to trick the monkeys into accepting what they had initially rejected.

This story mocks those who are fooled by superficial changes when the substance remains the same, and also describes people who are fickle or change their minds capriciously." } },
];

// Cantonese Proverbs (粤语谚语)
const cantoneseProverbs = [
    { cn: "十個茶壺九個蓋", py: "sahp go chàh wu gáu go goi", en: "Ten teapots but only nine lids. / Not enough to go around.", cats: ["cantonese", "business", "life"] },
    { cn: "牛唔飲水唔撳得牛低頭", py: "ngàuh mh yám séui mh gahm dāk ngàuh dài tàuh", en: "You can't force a cow to drink or bow its head. / You can't force someone to do what they don't want.", cats: ["cantonese", "wisdom", "family"] },
    { cn: "有早知，冇乞兒", py: "yáuh jóu jī, móuh hat yìh", en: "If we knew beforehand, there'd be no beggars. / Hindsight is 20/20.", cats: ["cantonese", "wisdom", "business"] },
    { cn: "走得和尚走唔到寺", py: "jáu dāk wòh seuhng jáu mh dōu jih", en: "The monk can run but not the temple. / You can't escape responsibility.", cats: ["cantonese", "wisdom", "family"] },
    { cn: "小時偷針，大時偷金", py: "síu sìh tāu jām, daaih sìh tāu gām", en: "Steal a needle in childhood, steal gold in adulthood. / Bad habits start small.", cats: ["cantonese", "family", "wisdom"] },
    { cn: "不怕虎生三隻口，只怕人懷兩樣心", py: "bat pa fu saang sāam jek háu, jí pa yàhn wàaih léuhng yeuhng sām", en: "Not afraid of a tiger with three mouths, but a person with two hearts. / Humans are more dangerous than beasts.", cats: ["cantonese", "wisdom", "friendship"] },
    { cn: "雞髀打人牙骹軟", py: "gāi bei daa yàhn ngàh hàau yúhn", en: "Chicken legs make people's jaws soft. / Bribery works wonders.", cats: ["cantonese", "business", "wisdom"] },
    { cn: "一尺之捶，日取其半，萬世不竭", py: "yāt chek jī séuih, yaht chéui kéi bun, maahn sai bat kit", en: "A foot-long stick, cut in half daily, never exhausted. / Infinite divisibility.", cats: ["cantonese", "wisdom"] },
    { cn: "狗眼看人低", py: "gáu ngáahn hon yàhn dāi", en: "A dog's eye looks down on people. / Snobbish people look down on others.", cats: ["cantonese", "wisdom", "friendship"] },
    { cn: "同人唔同命，同遮唔同柄", py: "tùhng yàhn mh tùhng meng, tùhng jē mh tùhng beng", en: "Same person, different fate; same umbrella, different handle. / Same situation, different outcomes.", cats: ["cantonese", "life", "wisdom"] },
    { cn: "死牛一便頸", py: "séi ngàuh yāt bin géng", en: "A dead cow with a stiff neck. / Stubborn as a mule.", cats: ["cantonese", "wisdom", "perseverance"] },
    { cn: "食碗面，反碗底", py: "sihk wún mihn, fáan wún dái", en: "Eat from the bowl, then turn it over. / Bite the hand that feeds you.", cats: ["cantonese", "wisdom", "friendship", "family"] },
    { cn: "有咁大隻蛤乸隨街跳", py: "yáuh gam daaih jek gap nàah chèuih gāai tiu", en: "Such a big frog won't jump on the street for free. / No such thing as a free lunch.", cats: ["cantonese", "business", "wisdom"] },
    { cn: "邊有咁大隻蛤乸隨街跳", py: "bīn yáuh gam daaih jek gap nàah chèuih gāai tiu", en: "Where would such a big frog jump on the street? / If it sounds too good to be true, it probably is.", cats: ["cantonese", "business", "wisdom"] },
    { cn: "皇帝唔急太監急", py: "wòhng dai mh gāp taai gām gāp", en: "The emperor's not worried but the eunuchs are. / More anxious than the person concerned.", cats: ["cantonese", "wisdom", "family"] },
    { cn: "鹹魚翻生", py: "hàahm yùh fāan sāang", en: "A salted fish comes back to life. / Making an impossible comeback.", cats: ["cantonese", "perseverance", "wisdom"] },
    { cn: "豬籠入水", py: "jyū lùhng yahp séui", en: "Water enters a bamboo basket. / Money flowing in from all directions.", cats: ["cantonese", "business", "life"] },
    { cn: "濕水炮仗", py: "sāp séui paau jeung", en: "A wet firecracker. / Useless or won't explode/achieve.", cats: ["cantonese", "wisdom"] },
    { cn: "鬼拍後尾枕", py: "gwái paak hauh méih jám", en: "A ghost pats the back of your pillow. / Speaking without thinking; blurting out secrets.", cats: ["cantonese", "wisdom", "friendship"] },
    { cn: "竹籠打水一場空", py: "juk lùhng daa séui yāt chèuhng hūng", en: "Drawing water with a bamboo basket - all in vain. / Futile effort.", cats: ["cantonese", "wisdom", "business"] },
    { cn: "醜婦終須見家翁", py: "cháu fuh jūng sēu gin gā yūng", en: "An ugly daughter-in-law must eventually meet her father-in-law. / Can't hide the truth forever.", cats: ["cantonese", "family", "wisdom"] },
    { cn: "一竹篙打一船人", py: "yāt jūk gōu daa yāt syùhn yàhn", en: "One bamboo pole hits everyone on the boat. / Tar everyone with the same brush.", cats: ["cantonese", "wisdom", "friendship"] },
    { cn: "山水有相逢", py: "sāan séui yáuh sēung fùhng", en: "Mountains and waters will meet again. / Our paths will cross again.", cats: ["cantonese", "friendship", "wisdom"] },
    { cn: "狗咬狗骨", py: "gáu ngáau gáu gwāt", en: "Dog bites dog bone. / Infighting among crooks.", cats: ["cantonese", "wisdom", "friendship"] },
    { cn: "捉到鹿都唔識脫角", py: "jūk dōu lūk dōu mh sīk tyut gok", en: "Caught the deer but don't know how to remove the antlers. / Can't finish what you started.", cats: ["cantonese", "business", "wisdom"] },
    { cn: "係咁意", py: "haih gam yi", en: "Just a little gesture. / Just a token; casually.", cats: ["cantonese", "friendship", "life"] },
    { cn: "走得甩", py: "jáu dāk lät", en: "Able to run away. / Getting away with it.", cats: ["cantonese", "life"] },
    { cn: "執到寶", py: "jāp dōu bóu", en: "Picked up treasure. / Found a bargain or great deal.", cats: ["cantonese", "business", "life"] },
    { cn: "走寶", py: "jáu bóu", en: "Missed the treasure. / Missed a good opportunity.", cats: ["cantonese", "business", "life"] },
    { cn: "踩過界", py: "cháai gwo gaa", en: "Stepped over the boundary. / Overstepped one's bounds.", cats: ["cantonese", "business", "wisdom"] },
    { cn: "食塞米", py: "sihk choi máih", en: "Ate sticky rice. / Got into trouble; stuck in a mess.", cats: ["cantonese", "life", "wisdom"] },
];

// Combine all proverbs for display
const allProverbs = [...proverbs, ...cantoneseProverbs];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { proverbs, cantoneseProverbs, allProverbs };
}
