/**
 * Korean Proverbs (속담 - Sokdam)
 * 50+ Traditional Korean sayings with Romanization
 */

const koreanProverbsData = [
    // WISDOM & LIFE (1-15)
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
    
    // LEARNING (16-25)
    { id: "ko-016", kr: "배움에는 왕도가 없다", roman: "Baeume-neun wangdoga eopda", en: "There is no royal road to learning.", cats: ["learning", "wisdom"], culture: "korean" },
    { id: "ko-017", kr: "가는 날이 장날", roman: "Ganeun nari jangnal", en: "The day you go is market day. / Perfect timing.", cats: ["learning", "wisdom", "life"], culture: "korean" },
    { id: "ko-018", kr: "열 번 찍어 안 넘어가는 나무 없다", roman: "Yeol beon jjigeo an neomeoganeun namu eopda", en: "There's no tree that won't fall after ten chops. / Persistence pays.", cats: ["learning", "perseverance"], culture: "korean" },
    { id: "ko-019", kr: "공든 탑이 물러가랴", roman: "Gongdeun tapi mulleogarya", en: "Would a tower built with effort collapse? / Hard work endures.", cats: ["learning", "perseverance", "wisdom"], culture: "korean" },
    { id: "ko-020", kr: "늦게 배운 도둑질이 날 새는 줄 모른다", roman: "Neutge baeun dodukjiri nal saeneun jul moreunda", en: "A thief who learns late doesn't know daybreak. / Too absorbed to notice time.", cats: ["learning", "wisdom"], culture: "korean" },
    { id: "ko-021", kr: "배보다 배꼽이 더 크다", roman: "Baeboda baekkobi deo keuda", en: "The belly button is bigger than the belly. / The part is greater than the whole.", cats: ["learning", "wisdom"], culture: "korean" },
    { id: "ko-022", kr: "아는 길도 물어가라", roman: "Aneun gildo mureogara", en: "Ask even about the road you know. / Verify what you think you know.", cats: ["learning", "wisdom"], culture: "korean" },
    { id: "ko-023", kr: "백지장도 맞들면 낫다", roman: "Baekjijangdo matdeulmeon natda", en: "Even lifting a blank paper is better together. / Two heads are better than one.", cats: ["learning", "friendship", "wisdom"], culture: "korean" },
    { id: "ko-024", kr: "선무당이 사람 잡는다", roman: "Seonmudangi saram jamneunda", en: "An unskilled shaman harms people. / Half knowledge is dangerous.", cats: ["learning", "wisdom"], culture: "korean" },
    { id: "ko-025", kr: "수박 겉핥기", roman: "Subak geotalhgi", en: "Licking the outside of watermelon. / Superficial knowledge.", cats: ["learning", "wisdom"], culture: "korean" },
    
    // PERSEVERANCE (26-35)
    { id: "ko-026", kr: "지성이면 감천", roman: "Jiseongimyeon gamcheon", en: "With sincerity, even heaven will be moved. / Persistence conquers all.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-027", kr: "개구리 올챙이 적 생각 안 한다", roman: "Gaeguri olchaengi jeok saenggak an handa", en: "The frog doesn't remember when it was a tadpole. / Forgetting one's roots.", cats: ["perseverance", "wisdom", "family"], culture: "korean" },
    { id: "ko-028", kr: "금강산도 식후경", roman: "Geumgangsudo sikugyeong", en: "Even Mount Kumgang is best seen after a meal. / Basic needs first.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-029", kr: "눈물로는 밥을 못 먹는다", roman: "Nunmullo-neun babeul mot meongneunda", en: "You can't eat rice with tears. / Tears don't solve problems.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-030", kr: "빈 수레가 요란하다", roman: "Bin surega yoranhada", en: "Empty carts make the most noise. / Empty vessels make the most sound.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-031", kr: "고생 끝에 낙이 온다", roman: "Gosaeng kkeute nagi onda", en: "At the end of hardship comes happiness.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    { id: "ko-032", kr: "쇠뿔도 단김에 빼라", roman: "Soeppuldoo dangime ppara", en: "Pull out even ox horns while they're hot. / Strike while the iron is hot.", cats: ["perseverance", "business", "wisdom"], culture: "korean" },
    { id: "ko-033", kr: "끝까지 간다", roman: "Kkeutkkaji ganda", en: "Go until the end. / See it through.", cats: ["perseverance", "wisdom"], culture: "korean" },
    { id: "ko-034", kr: "포기하지 마라", roman: "Pogihaji mara", en: "Do not give up.", cats: ["perseverance", "wisdom"], culture: "korean" },
    { id: "ko-035", kr: "오늘은 내일의 어제", roman: "Oneureun naeir-ui eoje", en: "Today is yesterday's tomorrow. / Seize the day.", cats: ["perseverance", "wisdom", "life"], culture: "korean" },
    
    // FRIENDSHIP (36-45)
    { id: "ko-036", kr: "벗이 먼 곳에 있으니 내 마음이 아프다", roman: "Beosi meun godeu isseuni nae maeumi apeuda", en: "My friend is far away, and my heart aches.", cats: ["friendship", "love", "life"], culture: "korean" },
    { id: "ko-037", kr: "친구는 세상의 가장 큰 보물", roman: "Chinguneun sesang-ui gajang keun bomul", en: "A friend is the world's greatest treasure.", cats: ["friendship", "wisdom", "love"], culture: "korean" },
    { id: "ko-038", kr: "웃는 얼굴에 침 뱉으랴", roman: "Utneun eolgure chim baeteurya", en: "Would you spit on a smiling face? / Don't hurt those who are kind.", cats: ["friendship", "wisdom"], culture: "korean" },
    { id: "ko-039", kr: "남의 떡이 커 보인다", roman: "Nam-ui tteogi keo boinda", en: "Others' rice cakes look bigger. / The grass is always greener.", cats: ["friendship", "wisdom", "life"], culture: "korean" },
    { id: "ko-040", kr: "빚은 갚되 정은 못 갚는다", roman: "Bijeun gapdoe jeongeun mot gamneunda", en: "Debt can be repaid, but kindness cannot. / Gratitude is eternal.", cats: ["friendship", "wisdom", "life"], culture: "korean" },
    { id: "ko-041", kr: "벗은 보물이다", roman: "Beoseun bomulida", en: "A friend is a treasure.", cats: ["friendship", "wisdom"], culture: "korean" },
    { id: "ko-042", kr: "참된 벗은 희로애락을 함께한다", roman: "Chamdoen beoseun huiroaerageul hamkkehanda", en: "True friends share joy and sorrow.", cats: ["friendship", "wisdom", "love"], culture: "korean" },
    { id: "ko-043", kr: "오랜 벗이 낫다", roman: "Oraen beosi natda", en: "Old friends are better.", cats: ["friendship", "wisdom"], culture: "korean" },
    { id: "ko-044", kr: "검이불루 처이불침", roman: "Geombulru cheoibulchim", en: "Not pleased by gain, not saddened by loss. / True friendship.", cats: ["friendship", "wisdom", "life"], culture: "korean" },
    { id: "ko-045", kr: "친구끼리는 술이 달다", roman: "Chingukkirineun suri dalda", en: "Drinks are sweeter with friends.", cats: ["friendship", "life"], culture: "korean" },
    
    // LOVE (46-52)
    { id: "ko-046", kr: "정이 많은 사람은 미움도 많다", roman: "Jeongi maneun sarameun miumdo manta", en: "Those with much affection also have much hatred.", cats: ["love", "wisdom"], culture: "korean" },
    { id: "ko-047", kr: "사랑은 눈먼 것", roman: "Sarang-eun nunmeun geot", en: "Love is blind.", cats: ["love", "wisdom"], culture: "korean" },
    { id: "ko-048", kr: "부부싸움은 칼로 물 베기", roman: "Bubussaweunneun kallo mul begi", en: "A married couple's fight is like cutting water with a knife. / Couples' quarrels don't last.", cats: ["love", "wisdom", "family"], culture: "korean" },
    { id: "ko-049", kr: "첫사랑은 잊지 못한다", roman: "Cheotsarangeun ijji motanda", en: "First love is never forgotten.", cats: ["love", "wisdom", "life"], culture: "korean" },
    { id: "ko-050", kr: "미운 사람 떡 하나 더 준다", roman: "Miun saram tteok hana deo junda", en: "Give an extra rice cake to someone you dislike. / Kill them with kindness.", cats: ["love", "wisdom", "friendship"], culture: "korean" },
    { id: "ko-051", kr: "사랑은 참는 것", roman: "Sarang-eun chamneun geot", en: "Love is endurance.", cats: ["love", "perseverance", "wisdom"], culture: "korean" },
    { id: "ko-052", kr: "정이 들면 약도 안 든다", roman: "Jeongi deulmyeon yakdo an deunda", en: "When affection enters, medicine is not needed. / Love heals.", cats: ["love", "health", "wisdom"], culture: "korean" },
    
    // BUSINESS (53-60)
    { id: "ko-053", kr: "장사는 장사꾼이 하는 것", roman: "Jangsaneun jangsakkuni haneun geot", en: "Business is done by business people. / Leave it to the experts.", cats: ["business", "wisdom"], culture: "korean" },
    { id: "ko-054", kr: "싼 게 비지떡", roman: "Ssangei bijitteok", en: "Cheap things are rice cake made of bean curd dregs. / You get what you pay for.", cats: ["business", "wisdom"], culture: "korean" },
    { id: "ko-055", kr: "떡 줄 놈은 생각도 않는데 김칫국부터 마신다", roman: "Tteok jul nomeun saenggakdo anneunde gimchitgukbuteo masinda", en: "Thinking about kimchi stew before anyone offers rice cake. / Counting chickens before they hatch.", cats: ["business", "wisdom", "life"], culture: "korean" },
    { id: "ko-056", kr: "호랑이도 제 말 하면 온다", roman: "Horangido je mal hamyeon onda", en: "Speak of the tiger and it comes. / Speak of the devil.", cats: ["business", "wisdom", "life"], culture: "korean" },
    { id: "ko-057", kr: "돈이 다가 아니다", roman: "Doni daga anida", en: "Money isn't everything.", cats: ["business", "wisdom", "life"], culture: "korean" },
    { id: "ko-058", kr: "물이 커야 배도 크다", roman: "Muri keoya baedo keuda", en: "When the water is big, the boat is big. / Scale matters.", cats: ["business", "wisdom"], culture: "korean" },
    { id: "ko-059", kr: "거래는 신뢰가 기본", roman: "Georaeneun sillyoga gibon", en: "Trust is the foundation of business.", cats: ["business", "wisdom", "friendship"], culture: "korean" },
    { id: "ko-060", kr: "이익은 공정한 데서 생긴다", roman: "Iigeun gongjeonghan deseo saengginda", en: "Profit comes from fairness.", cats: ["business", "wisdom"], culture: "korean" },
    
    // HEALTH (61-68)
    { id: "ko-061", kr: "건강이 최고의 재산", roman: "Geongangi choegoui jaesan", en: "Health is the greatest wealth.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-062", kr: "먹는 음식이 곧 몸이 된다", roman: "Meongneun eumsigi got momi doenda", en: "The food you eat becomes your body. / You are what you eat.", cats: ["health", "wisdom"], culture: "korean" },
    { id: "ko-063", kr: "웃음은 최고의 약", roman: "Useumeun choegoui yak", en: "Laughter is the best medicine.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-064", kr: "일찍 일어나는 새가 벌레를 잡는다", roman: "Iljjik ireonaneun saega beorereul jamneunda", en: "The early bird catches the worm.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-065", kr: "마음이 건강해야 몸도 건강하다", roman: "Maeumi geonganghaeya momdo geonganghada", en: "A healthy mind makes a healthy body.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-066", kr: "적당한 운동이 건강의 비결", roman: "Jeokdanghan undongi geongang-ui bigyeol", en: "Moderate exercise is the secret of health.", cats: ["health", "wisdom", "perseverance"], culture: "korean" },
    { id: "ko-067", kr: "잠은 만병의 통치약", roman: "Jameun manbyeong-ui tongchiyak", en: "Sleep is the cure-all medicine.", cats: ["health", "wisdom", "life"], culture: "korean" },
    { id: "ko-068", kr: "스트레스는 만병의 근원", roman: "Seuteureseuneun manbyeong-ui geunwon", en: "Stress is the root of all illness.", cats: ["health", "wisdom", "life"], culture: "korean" },
    
    // FAMILY (69-78)
    { id: "ko-069", kr: "가는 방망이가 돌아오는 홍두깨", roman: "Ganeun bangmangi-ga doraoneun hongdukkke", en: "The stick you swing comes back as a bigger club. / What goes around comes around.", cats: ["family", "wisdom", "life"], culture: "korean" },
    { id: "ko-070", kr: "형제는 부모가 주지만 친구는 스스로 만든다", roman: "Hyeongje-neun bumuga jujiman chinguneun seuseuro mandeunda", en: "Brothers are given by parents, but friends are made by oneself.", cats: ["family", "friendship", "wisdom"], culture: "korean" },
    { id: "ko-071", kr: "부모은혜는 하늘보다 높다", roman: "Bumoeunhyeneun haneulboda nopda", en: "Parents' grace is higher than heaven.", cats: ["family", "wisdom", "love"], culture: "korean" },
    { id: "ko-072", kr: "자라 보고 놀란 가슴 솥뚜껑 보고 놀란다", roman: "Jara bogo nollan gaseum sottukkkeong bogo nollanda", en: "Once frightened by a saw, scared by a pot lid. / Once bitten, twice shy.", cats: ["family", "wisdom", "life"], culture: "korean" },
    { id: "ko-073", kr: "가장 큰 병은 부모 마음의 상처", roman: "Gajang keun byeong-eun bumoe ma-eum-ui sangcheo", en: "The greatest illness is a wound to parents' hearts.", cats: ["family", "wisdom", "love"], culture: "korean" },
    { id: "ko-074", kr: "집 안의 도둑을 잡기 어렵다", roman: "Jib an-ui dodeugeul japgi eoryeopda", en: "It's hard to catch a thief inside the house. / Family problems are hardest.", cats: ["family", "wisdom", "life"], culture: "korean" },
    { id: "ko-075", kr: "눈에는 눈, 이에는 이", roman: "Nunenun nun, ieneun i", en: "An eye for an eye, a tooth for a tooth.", cats: ["wisdom", "life", "friendship"], culture: "korean" },
    { id: "ko-076", kr: "까마귀 날자 배 떨어진다", roman: "Kkamagwi nalja bae tteoreojinda", en: "When the crow flies, the pear drops. / Coincidence.", cats: ["wisdom", "life"], culture: "korean" },
    { id: "ko-077", kr: "윗물이 맑아야 아랫물이 맑다", roman: "Witmuri malgaya araetmuri malda", en: "When the upper water is clear, the lower water is clear. / Leaders set the example.", cats: ["wisdom", "family", "business"], culture: "korean" },
    { id: "ko-078", kr: "가족은 영원한 보물", roman: "Gajokeun yeongwonhan bomul", en: "Family is an eternal treasure.", cats: ["family", "wisdom", "love"], culture: "korean" }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.koreanProverbsData = koreanProverbsData;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = koreanProverbsData;
}
