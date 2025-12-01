export const CATEGORY_OPTIONS = [
  "Presidential",
  "Governorship",
  "Senatorial",
  "Parliamentary",
  "Women Representative",
];

export const regionCountyMap: Record<string, string[]> = {
  Coast: ["Mombasa", "Kwale", "Kilifi", "Tana_River", "Lamu", "Taita_Taveta"],
  Nairobi: ["Nairobi"],
  Central: ["Nyandarua", "Nyeri", "Kirinyaga", "Muranga", "Kiambu"],
  Eastern: [
    "Embu",
    "Kitui",
    "Machakos",
    "Makueni",
    "Isiolo",
    "Meru",
    "Tharaka_Nithi",
  ],
  North_Eastern: ["Garissa", "Wajir", "Mandera"],
  Rift_Valley: [
    "Turkana",
    "West_Pokot",
    "Samburu",
    "Trans_Nzoia",
    "Uasin_Gishu",
    "Elgeyo_Marakwet",
    "Nandi",
    "Baringo",
    "Laikipia",
    "Nakuru",
    "Narok",
    "Kajiado",
    "Kericho",
    "Bomet"
  ],
  Western: ["Kakamega", "Vihiga", "Bungoma", "Busia"],
  Nyanza: ["Siaya", "Kisumu", "Homa_Bay", "Migori", "Kisii", "Nyamira"],
};
export const countyConstituencyMap: Record<string, string[]> = {
  Mombasa: ['Changamwe', 'Jomvu', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'],
  Kwale: ['Msambweni', 'LungaLunga', 'Matuga', 'Kinango'],
  Kilifi: ['Kilifi_North', 'Kilifi_South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'],
  Tana_River: ['Garsen', 'Galole', 'Bura'],
  Lamu: ['Lamu_East', 'Lamu_West'],
  Taita_Taveta: ['Taveta', 'Wundanyi', 'Mwatate', 'Voi'],
  Garissa: ['Garissa_Township', 'Balambala', 'Lagdera', 'Dadaab', 'Fafi'],
  Wajir: ['Wajir_East', 'Tarbaj', 'Wajir_West', 'Eldas', 'Wajir_South'],
  Mandera: ['Mandera_West', 'Mandera_North', 'Mandera_South', 'Mandera_East', 'Lafey'],
  Isiolo: ['Isiolo_North', 'Isiolo_South'],
  Marsabit: ['North_Horr', 'Laisamis', 'Saku', 'Moyale'],
  Meru: ['Tigania_East', 'Tigania_West', 'Igembe_South', 'Igembe_Central', 'Igembe_North', 'Buuri', 'North_Imenti', 'South_Imenti', 'Central_Imenti'],
  Tharaka_Nithi: ['Chuka', 'Maara', 'Tharaka'],
  Embu: ['Manyatta', 'Mbeere_North', 'Runyenjes', 'Mbeere_South'],
  Kitui: ['Kitui_Central', 'Kitui_West', 'Kitui_East', 'Kitui_Rural', 'Mwingi_North', 'Mwingi_Central', 'Mwingi_West'],
  Machakos: ['Mavoko', 'Yatta', 'Kangundo', 'Masinga', 'Matungulu', 'Kathiani', 'Machakos_Town', 'Mwala'],
  Makueni: ['Makueni', 'Kibwezi_East', 'Kibwezi_West', 'Mbooni', 'Kilome', 'Kaiti'],
  Kiambu: ['Gatundu_North', 'Gatundu_South', 'Githunguri', 'Juja', 'Kabete', 'Kiambaa', 'Kiambu', 'Kikuyu', 'Lari', 'Limuru', 'Ruiru', 'Thika_Town'],
  Nyandarua: ['kinangop', 'Ol_Kalou', 'Ndaragwa', 'Kipipiri','Ol_Jorok'],
  Nyeri: ['Tetu', 'Kieni', 'Mathira', 'Othaya', 'Nyeri_Town', 'Mukurweini'],
  Kirinyaga: ['Mwea', 'Ndia', 'Gichugu', 'Kirinyaga_Central'],
  Muranga: ['Kandara', 'Kangema', 'Mathioya', 'Kiharu', 'Maragua', 'Kigumo'],
  Turkana: ['Loima', 'Turkana_North', 'Turkana_East', 'Turkana_Central', 'Turkana_ South'],
  West_Pokot: ['Kapenguria', 'Kacheliba', 'Sigor', 'Pokot_South'],
  Samburu: ['Samburu_East', 'Samburu_North', 'Samburu_West'],
  Trans_Nzoia: ['Saboti', 'Kwanza', 'Endebess', 'Kiminini'],
  Uasin_Gishu: ['Kapseret', 'Moiben', 'Turbo', 'Soy', 'Kesses', 'Ainabkoi'],
  Elgeyo_Marakwet: ['Keiyo_North', 'Keiyo_South', 'Marakwet_East', 'Marakwet_West'],
  Nandi: ['Emgwen', 'Aldai', 'Mosop', 'Chesumei', 'Tinderet', 'Nandi_Hills'],
  Baringo: ['Mogotio', 'Baringo_North', 'Baringo_Central', 'Baringo_South', 'Eldama_Ravine'],
  Laikipia: ['Laikipia_East', 'Laikipia_West', 'Laikipia_North'],
  Nakuru: ['Nakuru_Town_East', 'Nakuru_Town_West', 'Subukia', 'Njoro', 'Gilgil', 'Molo', 'Rongai', 'Naivasha', 'Kuresoi_South', 'Kuresoi_North', 'Bahati'],
  Narok: ['Narok_North', 'Narok_South', 'Emurua_Dikirr', 'Kilgoris', 'Narok_East'],
  Kajiado: ['Kajiado_East', 'Kajiado_North', 'Kajiado_West', 'Kajiado_Central', 'Kajiado_South'],
  Kericho: ['Ainamoi', 'Bureti', 'Belgut', 'Sigowet', 'kipkelion_West', 'Kipkelion_East'],
  Bomet: ['Sotik', 'Bomet_East', 'Bomet_Central', 'Konoin', 'Chepalungu'],
  Kakamega: ['Mumias_East', 'Mumias_West', 'Butere', 'Lugari', 'Matungu', 'Khwisero', 'Shinyalu', 'Ikolomani', 'Malava', 'Likuyani', 'Lurambi'],
  Vihiga: ['Vihiga', 'Hamisi', 'Sabatia', 'Luanda', 'Emuhaya'],
  Bungoma: ['Mt_Elgon', 'Sirisia', 'Bumula', 'Webuye_West', 'Webuye_East', 'Kimilili', 'Kanduyi', 'Tongaren', 'Kabuchai'],
  Busia: ['Teso_North', 'Teso_South', 'Nambale', 'Matayos', 'Butula', 'Funyula', "Budalangi"],
  Siaya: ['Ugenya', 'Rarieda', 'Gem', 'Uguja', 'Bondo', 'Alego_Usonga'],
  Kisumu: ['Kisumu_East', 'Kisumu_West', 'Kisumu_Central', 'Seme', 'Muhoroni', 'Nyakach'],
  Homa_Bay: ['Kasipul', 'Karachuonyo', 'Homa_Bay_Town', 'Suba_South', 'Rangwe', 'Ndhiwa', 'Kabondo_Kasipul'],
  Migori: ['Rongo', 'Awendo', 'Uriri', 'Nyatike', 'Suna_East', 'Suna_West', 'Kuria_West', 'Kuria_East'],
  Kisii: ['Bonchari', 'Bobasi', 'Bomachoge_Borabu', 'Bomachoge_Chache', 'Nyaribari_Masaba', 'Nyaribari_Chache', 'South_Mugirango', 'Kitutu_Chache_North', 'Kitutu_Chache_South'],
  Nyamira: ['Kitutu_Masaba', 'West_Mugirango', 'North_Mugirango', 'Borabu'],
  Nairobi: ['Dagoretti_North', 'Dagoretti_South', 'Langata', 'Kibra', 'Kasarani', 'Roysambu', 'Ruaraka', 'Embakasi_Central', 'Embakasi_East', 'Embakasi_North', 'Embakasi_South', 'Embakasi_West', 'Kamukunji', 'Makadara', 'Mathare', 'Starehe', 'Westlands']
};


export const countyAssemblyWardMap: Record<string, string[]> = {
Westlands:['Kitisuru','Parklands/Highridge','Karura','Kangemi','Mountain View'],
Langata:['Karen','Nairobi West','Nyayo Highrise','Mugumo-ini','South C'],
Dagoretti_North: ['Kilimani', 'Kawangware', 'Gatina', 'Kileleshwa', 'Kabiro'],
Dagoretti_South: ['Mutu-ini', 'Ngando', 'Riruta', 'Uthiru/Ruthimitu', 'Waithaka'],
  Roysambu: ['Githurai', 'Kahawa', 'Kahawa West', 'Zimmerman', 'Roysambu'],
  Kasarani: ['Clay City', 'Mwiki', 'Kasarani', 'Njiru', 'Ruai'],
  Ruaraka: ['Baba Dogo', 'Utalii', 'Mathare North', 'Lucky Summer', 'Korogocho'],
  Embakasi_South: ['Imara Daima', 'Kwa Njenga', 'Kwa Reuben', 'Pipeline', 'Kware'],
  Embakasi_North: ['Dandora Area I', 'Dandora Area II', 'Dandora Area III', 'Dandora Area IV', 'Kariobangi North'],
  Embakasi_Central: ['Kayole North', 'Kayole South', 'Komarock', 'Matopeni/Spring Valley', 'Chokaa'],
  Embakasi_East: ['Upper Savanna', 'Lower Savanna', 'Embakasi', 'Utawala', 'Mihango'],
  Embakasi_West: ['Umoja I', 'Umoja II', 'Mowlem', 'Kariobangi South'],
  Makadara: ['Maringo/Hamza', 'Viwandani', 'Harambee', 'Makongeni', 'Mbotela'],
  Kamukunji: ['Pumwani', 'Eastleigh North', 'Eastleigh South', 'Airbase', 'California'],
  Starehe: ['Nairobi Central', 'Ngara', 'Pangani', 'Ziwani/Kariokor', 'Landimawe', 'Nairobi South'],
  Mathare: ['Hospital', 'Mabatini', 'Huruma', 'Ngei', 'Mlango Kubwa', 'Kiamaiko'],
  Kibra: ['Laini Saba', 'Lindi', 'Makina', 'Woodley/Kenyatta Golf Course', 'Sarangombe'],

    // Mombasa County constituencies
  Changamwe: ['Port Reitz', 'Kipevu', 'Airport', 'Miritini', 'Chaani'],
  Jomvu: ['Jomvu Kuu', 'Magongo', 'Mikindani'],
  Kisauni: ['Mjambere', 'Junda', 'Bamburi', 'Mwakirunge', 'Mtopanga', 'Magogoni', 'Shanzu'],
  Nyali: ['Frere Town', 'Ziwa La Ng’ombe', 'Mkomani', 'Kongowea', 'Kadzandani'],
  Likoni: ['Mtongwe', 'Shika Adabu', 'Bofu', 'Likoni', 'Timbwani'],
  Mvita: ['Mji Wa Kale/Makadara', 'Tudor', 'Tononoka', 'Shimanzi/Ganjoni', 'Majengo'],
  // Kwale County (4 constituencies, 20 wards)
  Msambweni: ['Ukunda', 'Kinondo', 'Gombato Bongwe', 'Ramisi'],
  LungaLunga: ['Pongwe/Kikoneni', 'Dzombo', 'Mwereni', 'Vanga'],
  Matuga: ['Tsimba Golini', 'Waa', 'Tiwi', 'Kubo South', 'Mkongani'],
  Kinango: ['Ndavaya', 'Puma', 'Kinango', 'Mackinnon Road', 'Chengoni/Samburu', 'Mwavumbo', 'Kasemeni'],
  
  // Kilifi County (7 constituencies, 35 wards)
  Kilifi_North: ['Tezo', 'Sokoni', 'Kibarani', 'Dabaso', 'Matsangoni', 'Watamu', 'Mnarani'],
  Kilifi_South: ['Junju', 'Mwarakaya', 'Shimo la Tewa', 'Chasimba', 'Mtepeni'],
  Kaloleni: ['Mariakani', 'Kayafungo', 'Kaloleni', 'Mwana Mwinga'],
  Rabai: ['Mwawesa', 'Ruruma', 'Kambe/Ribe', 'Rabai/Kisurutini'],
  Ganze: ['Ganze', 'Bamba', 'Jaribuni', 'Sokoke'],
  Malindi: ['Jilore', 'Kakuyuni', 'Ganda', 'Malindi Town', 'Shella'],
  Magarini: ['Marafa', 'Magarini', 'Gongoni', 'Adu', 'Garashi', 'Sabaki'],
  
  // Tana River County (3 constituencies, 15 wards)
  Garsen: ['Kipini East', 'Garsen South', 'Garsen Central', 'Garsen West', 'Garsen North', 'Kipini West'],
  Galole: ['Wayu', 'Chewani', 'Kinakomba', 'Mikinduni'],
  Bura: ['Chewele', 'Hiriman', 'Bangale', 'Sala', 'Madogo'],
  
  // Lamu County (2 constituencies, 10 wards)
  Lamu_East: ['Faza', 'Kiunga', 'Basuba'],
  Lamu_West: ['Shella', 'Mkomani', 'Hindi', 'Mkunumbi', 'Hongwe', 'Witu', 'Bahari'],
  
  // Taita Taveta County (4 constituencies, 20 wards)
  Taveta: ['Chala', 'Mahoo', 'Bomani', 'Mboghoni', 'Mata'],
  Wundanyi: ['Wundanyi/Mbale', 'Werugha', 'Wumingu/Kishushe', 'Mwanda/Mghange'],
  Mwatate: ['Ronge', 'Mwatate', 'Bura', 'Chawia', 'Wusi/Kishamba'],
  Voi: ['Mbololo', 'Sagalla', 'Kaloleni', 'Marungu', 'Kasigau', 'Ngolia'],

     // Kiambu County constituencies
  Gatundu_South: ['Kiamwangi', 'Kiganjo', 'Ndarugu', 'Ngenda'],
  Gatundu_North: ['Gituamba', 'Githobokoni', 'Chania', 'Mang’u'],
  Juja: ['Murera', 'Theta', 'Juja', 'Witeithie', 'Kalimoni'],
  Thika_Town: ['Township', 'Kamenu', 'Hospital', 'Gatuanyaga', 'Ngoliba'],
  Ruiru: ['Gitothua', 'Biashara', 'Gatongora', 'Kahawa Sukari', 'Kahawa Wendani', 'Kiuu', 'Mwiki', 'Mwihoko'],
  Githunguri: ['Githunguri', 'Githiga', 'Ikinu', 'Ngewa', 'Komothai'],
  Kiambu: ['Tinganga', 'Ndumberi', 'Riabai', 'Township'],
  Kiambaa: ['Cianda', 'Karuri', 'Ndenderu', 'Muchatha', 'Kihara'],
  Kabete: ['Gitaru', 'Muguga', 'Nyathuna', 'Kabete', 'Uthiru'],
  Kikuyu: ['Karai', 'Nachu', 'Sigona', 'Kikuyu', 'Kinoo'],
  Limuru: ['Bibirioni', 'Limuru Central', 'Ndeiya', 'Limuru East', 'Ngecha Tigoni'],
  Lari: ['Kinale', 'Kijabe', 'Nyanduma', 'Kamburu', 'Lari/Kirenga'],

 // Nyandarua County (7 constituencies, 35 wards)
  Kinangop: ['Engineer', 'Gathaara', 'North Kinangop', 'Murungaru', 'Njabini/Kiburu', 'Nyakio', 'Githabai', 'Magumu'],
  Kipipiri: ['Wanjohi', 'Kipipiri', 'Geta', 'Githioro'],
  Ol_Kalou: ['Karau', 'Kanjuiri Ridge', 'Mirangine', 'Kaimbaga', 'Rurii'],
  Ol_Jorok: ['Gathanji', 'Central', 'Shamata', 'Leshao/Pondo', 'Weru'],
  Ndaragwa: ['Charagita', 'Kiriita', 'Kariamu', 'Ndogino', 'Munyaka'],
  Geta: ['Muringari', 'Kanyiriri', 'Gatimu', 'Mukui', 'Kiburu'],
  Mirangine: ['Tumaini', 'Ol Kalou Central', 'Ol Joro Orok'],

  // Nyeri County (6 constituencies, 30 wards)
  Tetu: ['Dedan Kimathi', 'Wamagana', 'Aguthi-Gaaki'],
  Kieni: ['Mweiga', 'Naromoru Kiamathaga', 'Mwiyogo/Endarasha', 'Mugunda', 'Gatarakwa', 'Thegu River', 'Kabaru', 'Gakawa'],
  Mathira: ['Ruguru', 'Magutu', 'Iriaini', 'Konyu', 'Kirimukuyu', 'Karatina Town'],
  Othaya: ['Mahiga', 'Iria-Ini', 'Chinga', 'Karima'],
  Mukurweini: ['Gikondi', 'Rugi', 'Mukurwe-Ini West', 'Mukurwe-Ini East'],
  Nyeri_Town: ['Khamis', 'Rware', 'Gatitu/Muruguru', 'Ruringu', 'Kamkunji/Kiganjo'],

  // Kirinyaga County (4 constituencies, 20 wards)
  Mwea: ['Mutithi', 'Kangai', 'Wamumu', 'Nyangati', 'Murinduko', 'Gathigiriri', 'Tebere'],
  Gichugu: ['Kabare', 'Baragwi', 'Njukiini', 'Ngariama', 'Karumandi'],
  Ndia: ['Mukure', 'Kiine', 'Kariti'],
  Kirinyaga_Central: ['Mutira', 'Kanyekini', 'Kerugoya', 'Inoi', 'Nyangeni'],

  // Murang’a County (7 constituencies, 35 wards)
  Kangema: ['Kanyenya-Ini', 'Muguru', 'Rwathia'],
  Mathioya: ['Gitugi', 'Kiru', 'Kamacharia'],
  Kiharu: ['Wangu', 'Mugoiri', 'Mbari Ya Ngai', 'Township', 'Muruka', 'Kagundu-Ini'],
  Kigumo: ['Kahumbu', 'Kinyona', 'Kigumo', 'Kangari'],
  Maragwa: ['Kimorori/Wempa', 'Makuyu', 'Nginda', 'Ng’araria', 'Ichagaki', 'Nginda'],
  Kandara: ['Ngararia', 'Muruka', 'Kagundu-Ini', 'Gaichanjiru', 'Ithiru', 'Ruchu'],
  Gatanga: ['Ithanga', 'Kakuzi/Mitubiri', 'Mugumo-Ini', 'Kihumbuini', 'Gatanga', 'Kariara'],

  // Embu County constituencies
  Manyatta: ['Ruguru/Ngandori', 'Kithimu', 'Nginda', 'Mbeti North', 'Kirimari'],
  Runyenjes: ['Gaturi South', 'Kagaari North', 'Kagaari South', 'Central Ward', 'Kyeni North', 'Kyeni South'],
  Mbeere_South: ['Mwea', 'Makima', 'Mbeti South', 'Mavuria', 'Kiambere'],
  Mbeere_North: ['Nthawa', 'Muminji', 'Evurore'],
//kitui County constituencies
 Mwingi_North: ['Ngomeni', 'Kyuso', 'Mumoni', 'Tseikuru', 'Tharaka'],
  Mwingi_West: ['Kyome/Thaana', 'Nguutani', 'Migwani', 'Kiomo/Kyethani'],
  Mwingi_Central: ['Central', 'Kivou', 'Nguni', 'Nu', 'Mui', 'Waita'],
  Kitui_West: ['Mutonguni', 'Kauwi', 'Matinyani', 'Kwa Mutonga/Kithumula'],
  Kitui_Rural: ['Kisasi', 'Mbitini', 'Kwavonza/Yatta', 'Kanyangi'],
  Kitui_Central: ['Miambani', 'Township', 'Kyangwithya West', 'Kyangwithya East', 'Mulango'],
  Kitui_East: ['Zombe/Mwitika', 'Nzambani', 'Chrulani', 'Voo/Kyamatu', 'Endau/Malalani', 'Mutitu/Kaliku'],
  Kitui_South: ['Ikanga/Kyatune', 'Mutomo', 'Mutha', 'Ikutha', 'Kanziko', 'Athi'],

  // Machakos County constituencies
    Masinga: ['Kivaa', 'Masinga Central', 'Ekalakala', 'Muthesya', 'Ndithini'],
  Yatta: ['Ndalani', 'Matuu', 'Kithimani', 'Ikombe', 'Katangi'],
  Kangundo: ['Kangundo North', 'Kangundo Central', 'Kangundo East', 'Kangundo West'],
  Matungulu: ['Tala', 'Matungulu North', 'Matungulu East', 'Matungulu West', 'Kyeleni'],
  Kathiani: ['Mitaboni', 'Kathiani Central', 'Upper Kaewa/Kaani', 'Lower Kaewa/Kaani'],
  Mavoko: ['Athi River', 'Kinanie', 'Muthwani', 'Syokimau/Mulolongo'],
  Machakos_Town: ['Kalama', 'Mua', 'Mutituni', 'Machakos Central', 'Mumbuni North', 'Muvuti/Kiima-Kimwe'],
  Mwala: ['Mbiuni', 'Makutano/Mwala', 'Masii', 'Muthetheni', 'Wamunyu', 'Kibauni'],

  // Makueni County constituencies
    Mbooni: ['Tulimani', 'Mbooni', 'Kithungo/Kitundu', 'Kiteta/Kisau', 'Waia/Kako', 'Kalawa'],
  Kilome: ['Kasikeu', 'Mukaa', 'Kiima Kiu/Kalanzoni'],
  Kaiti: ['Ukia', 'Kee', 'Kilungu', 'Ilima'],
  Makueni: ['Wote', 'Muvau/Kikumini', 'Mavindini', 'Kitise/Kithuki', 'Nzaui/Kalamba', 'Mbitini'],
  Kibwezi_West: ['Makindu', 'Nguumo', 'Kikumbulyu North', 'Kikumbulyu South', 'Nguu/Masumba', 'Emali/Mulala'],
  Kibwezi_East: ['Masongaleni', 'Mtito Andei', 'Thange', 'Ivingoni/Nzambani'],

  //Isiolo County constituencies
    Isiolo_North: ['Wabera', 'Bulla Pesa', 'Chari', 'Cherab', 'Ngare Mara'],
  Isiolo_South: ['Garbatulla', 'Kinna', 'Sericho'],

  //meru County constituencies
  Igembe_South: ['Mauro', 'Kiegoi/Antubochiu', 'Athiru Gaiti', 'Akachiu', 'Kanuni'],
  Igembe_Central: ['Igembe East', 'Njia', 'Kangeta', 'Akirang’ondu', 'Athiru Ruujine'],
  Igembe_North: ['Amwathi', 'Antuambui', 'Naathu', 'Antubetwe Kiongo', 'Ntunene'],
  Tigania_West: ['Athwana', 'Akithi', 'Kianjai', 'Nkomo', 'Mbeu'],
  Tigania_East: ['Thangatha', 'Mikinduri', 'Kiguchwa', 'Muthara', 'Karama'],
  North_Imenti: ['Municipality', 'Ntima East', 'Ntima West', 'Nyaki West', 'Nyaki East'],
  Buuri: ['Timau', 'Kisima', 'Kiirua/Naari', 'Ruiri/Rwarera'],
  Central_Imenti: ['Mwanganthia', 'Abothuguchi Central', 'Abothuguchi West', 'Kiagu', 'Abothuguchi East'],
  South_Imenti: ['Mitunguu', 'Igoji East', 'Igoji West', 'Abogeta East', 'Abogeta West', 'Nkuene'],

  // Tharaka Nithi County (3 constituencies, 15 wards)
  Maara: ['Mitheru', 'Muthambi', 'Mwimbi', 'Ganga', 'Chogoria'],
  Chuka: ['Mariani', 'Karingani', 'Magumoni', 'Mugwe', 'Igambang’ombe'],
  Tharaka: ['Gatunga', 'Mukothima', 'Nkondi', 'Chiakariga', 'Marimanti'],
// Garissa County (6 constituencies, 30 wards)
  Garissa_Township: ['Waberi', 'Galbet', 'Township', 'Iftin'],
  Balambala: ['Balambala', 'Danyere', 'Jarajara', 'Saka', 'Sankuri'],
  Lagdera: ['Modogashe', 'Bura', 'Goreale', 'Maalimin', 'Sabena', 'Baraki'],
  Dadaab: ['Dertu', 'Dadaab', 'Labasigale', 'Damajale', 'Liboi', 'Abakaile'],
  Fafi: ['Dekaharia', 'Jarajila', 'Fafi', 'Nanighi', 'Hulugho'],
  Ijara: ['Hulugho', 'Masalani', 'Ijara', 'Sangailu'],

  // Wajir County (6 constituencies, 30 wards)
  Wajir_North: ['Gurar', 'Bute', 'Korondile', 'Malkagufu', 'Batalu', 'Danaba', 'Godoma'],
  Wajir_East: ['Wagberi', 'Township', 'Barwaqo', 'Khorof/Harar'],
  Tarbaj: ['Elben', 'Sarman', 'Tarbaj', 'Wargadud'],
  Wajir_West: ['Arbajahan', 'Hadado/Athibohol', 'Ademasajide', 'Ganyure/Wagalla', 'Adamawajir'],
  Eldas: ['Eldas', 'Della', 'Lakoley_South/Basir', 'El_Nur/Tulutulu'],
  Wajir_South: ['Benane', 'Burder', 'Dadajabulla', 'Habaswein', 'Lagboghol_South', 'Ibrahim_Ure'],

  // Mandera County (6 constituencies, 30 wards)
  Mandera_West: ['Takaba_South', 'Takaba_North', 'Lagsure', 'Dandu', 'Gither'],
  Banissa: ['Banissa', 'Derkale', 'Eymole', 'Kiliwehiri', 'Malkamari'],
  Mandera_North: ['Ashabito', 'Neboi', 'Guticha', 'Morothile', 'Rhamu', 'Rhamu_Dimtu'],
  Mandera_South: ['Wargadud', 'Kutulo', 'Elwak_South', 'Elwak_North', 'Shimbir_Fatuma'],
  Mandera_East: ['Arabia', 'Libehia', 'Khalalio', 'Neboi', 'Hareri'],
  Lafey: ['Lafey', 'Warankara', 'Alango', 'Fino', 'Sala'],

  // Turkana County (6 constituencies, 30 wards)
  Turkana_North: ['Kaeris', 'Lake_Zone', 'Lapur', 'Kaaleng/Kaikor', 'Kibish', 'Nakalale'],
  Turkana_West: ['Kakuma', 'Lopur', 'Letea', 'Songot', 'Kalobeyei', 'Lokichoggio', 'Nanaam'],
  Turkana_Central: ['Kerio_Delta', 'Kangatotha', 'Kalokol', 'Lodwar_Township', 'Kanamkemer'],
  Loima: ['Kotaruk/Lobei', 'Turkwel', 'Loima', 'Lokiriama/Lorenipp'],
  Turkana_South: ['Kaputir', 'Katilu', 'Lobokat', 'Kalapata', 'Lokichar'],
  Turkana_East: ['Kapedo/Napeitom', 'Katilia', 'Lokori/Kochodin'],

  // West Pokot County (4 constituencies, 20 wards)
  Kapenguria: ['Kapenguria', 'Mnagei', 'Siyoi', 'Endogh', 'Sook', 'Riwo'],
  Kacheliba: ['Suam', 'Kodich', 'Kasei', 'Kapchok', 'Kiwawa', 'Alale'],
  Pokot_South: ['Chepareria', 'Batei', 'Lelan', 'Tapach'],
  Sigor: ['Weiwei', 'Lomut', 'Sekerr', 'Masool'],

  // Samburu County (3 constituencies, 15 wards)
  Samburu_West: ['Lodokejek', 'Suguta_Marmar', 'Maralal', 'Loosuk', 'Porro'],
  Samburu_North: ['El_Barta', 'Nachola', 'Ndoto', 'Nyiro', 'Angata_Nanyukie'],
  Samburu_East: ['Waso', 'Wamba_West', 'Wamba_East', 'Wamba_North'],

  // Trans Nzoia County (5 constituencies, 25 wards)
  Kwanza: ['Kwanza', 'Keiyo', 'Bidii', 'Kapomboi'],
  Endebess: ['Endebess', 'Chepchoina', 'Matumbei'],
  Saboti: ['Kinyoro', 'Matisi', 'Tuwani', 'Saboti', 'Machewa'],
  Kiminini: ['Kiminini', 'Waitaluk', 'Sirende', 'Hospital', 'Sikhendu', 'Nabiswa'],
  Cherangany: ['Sinyerere', 'Makutano', 'Kaplamai', 'Motosiet', 'Cherangany/Suwerwa', 'Sitatunga'],

  // Uasin Gishu County (6 constituencies, 30 wards)
  Soy: ['Mois_Bridge', 'Kapkures', 'Ziwa', 'Segero/Barsombe', 'Kipsomba', 'Soy'],
  Turbo: ['Ngenyilel', 'Tapsagoi', 'Kamagut', 'Kiplombe', 'Kaptagat', 'Tembelio'],
  Moiben: ['Tembelio', 'Sergoit', 'Karuna/Meibeki', 'Moiben', 'Kimumu'],
  Ainabkoi: ['Kapsoya', 'Kaptagat', 'Ainabkoi/Olare'],
  Kapseret: ['Simat/Kapseret', 'Ngeria', 'Langas', 'Kipkenyo', 'Racecourse'],
  Kesses: ['Tulwet/Chuiyat', 'Cheptiret/Kipchamo', 'Tarakwa', 'Chepkoilel'],

  // Elgeyo Marakwet County (4 constituencies, 20 wards)
  Marakwet_East: ['Kapyego', 'Sambirir', 'Endo', 'Embobut/Embulot'],
  Marakwet_West: ['Lelan', 'Sengwer', 'Cherangany/Chebororwa', 'Moiben/Kuserwo', 'Kapsowar', 'Arror'],
  Keiyo_North: ['Emsoo', 'Kamariny', 'Kapchemutwa', 'Tambach'],
  Keiyo_South: ['Kaptarakwa', 'Chepkorio', 'Soy_North', 'Soy_South', 'Kabiemit', 'Metkei'],

  // Nandi County (6 constituencies, 30 wards)
  Tinderet: ['Songhor/Soba', 'Tindiret', 'Chemelil/Chemase', 'Kapsimotwo'],
  Aldai: ['Kabwareng', 'Terik', 'Kemeloi/Maraba', 'Kobujoi', 'Kaptumo/Kaboi'],
  Nandi_Hills: ['Nandi_Hills', 'Chepkunyuk', 'Olaiserr', 'Kapchorua'],
  Chesumei: ['Chemundu/Kapng’etuny', 'Kosirai', 'Lelmokwo/Ngechek', 'Kaptel/Kamoiywo', 'Kiptuya'],
  Emgwen: ['Mutwot/Ngechek', 'Kapsabet', 'Kilibwoni', 'Chepkumia'],
  Mosop: ['Kiptaiya', 'Kabisaga', 'Sangalo/Kebulonik', 'Ndalat', 'Kabiyet', 'Kurgung/Surungai'],

  // Baringo County (6 constituencies, 30 wards)
  Tiaty: ['Tirioko', 'Kolowa', 'Ribkwo', 'Silale', 'Loiyamorok', 'Tangulbei/Korossi', 'Churo/Amaya'],
  Baringo_North: ['Barwessa', 'Kabartonjo', 'Saimo/Kipsaraman', 'Saimo/Soi', 'Bartabwa'],
  Baringo_Central: ['Sacho', 'Tenges', 'Ewalel/Chapchap', 'Kapropita'],
  Baringo_South: ['Mukutani', 'Marigat', 'Ilchamus', 'Mochongoi'],
  Mogotio: ['Mogotio', 'Emsos', 'Kisanana'],
  Eldama_Ravine: ['Lembus', 'Lembus_Kwen', 'Ravine', 'Mumberes/Maji_Mazuri', 'Lembus/Perkerra'],

  // Laikipia County (3 constituencies, 15 wards)
  Laikipia_West: ['Ol-Moran', 'Rumuruti_Township', 'Kinamba', 'Marmanet', 'Igwamiti'],
  Laikipia_East: ['Ngobit', 'Tigithi', 'Thingithu', 'Nanyuki', 'Umande'],
  Laikipia_North: ['Segera', 'Mukogodo_East', 'Mukogodo_West', 'Sosian'],

  // Nakuru County (11 constituencies, 55 wards)
  Molo: ['Mariashoni', 'Elburgon', 'Turi', 'Molo'],
  Njoro: ['Mau_Naroo', 'Mauche', 'Kihingo', 'Nesuit', 'Lare', 'Njoro'],
  Naivasha: ['Biashara', 'Hells_Gate', 'Lakeview', 'Maai_Mahu', 'Maiella', 'Olkaria', 'Naivasha_East', 'Viwandani'],
  Gilgil: ['Gilgil', 'Elementaita', 'Mbaruk/Eburu', 'Malewa_West', 'Murindati'],
  Kuresoi_South: ['Amalo', 'Keringet', 'Kiptagich', 'Kiptororo'],
  Kuresoi_North: ['Kiptororo', 'Nyota', 'Sirikwa', 'Kamara'],
  Subukia: ['Subukia', 'Waseges', 'Kabazi'],
  Rongai: ['Menengai_West', 'Soinoi', 'Mosop', 'Solai', 'Visoi'],
  Bahati: ['Dundori', 'Kabatini', 'Kiamaina', 'Lanet/Umoja', 'Bahati'],
  Nakuru_Town_West: ['Barut', 'London', 'Kaptembwo', 'Kapkures', 'Rhoda'],
  Nakuru_Town_East: ['Nakuru_East', 'Menengai', 'Flamingo', 'Biashara', 'Kivumbini'],
 
  // Narok County (6 constituencies, 30 wards)
  Kilgoris: ['Kilgoris_Central', 'Keyian', 'Angata_Barikoi', 'Shankoe', 'Kimintet', 'Lolgorian'],
  Emurua_Dikirr: ['Ilkerin', 'Ololmasani', 'Mogondo', 'Kapsasian'],
  Narok_North: ['Olpusimoru', 'Olokurto', 'Narok_Town', 'Nkareta', 'Olorropil', 'Melili'],
  Narok_East: ['Mosiro', 'Ildamat', 'Keekonyokie', 'Suswa'],
  Narok_South: ['Majimoto/Naroosura', 'Ololulung’a', 'Melelo', 'Loita', 'Sogoo', 'Sagamian'],
  Narok_West: ['Ilmotiok', 'Mara', 'Siana', 'Naikarra'],

  // Kajiado County (5 constituencies, 25 wards)
  Kajiado_North: ['Ngong', 'Oloolua', 'Ongata_Rongai', 'Nkaimurunya', 'Olekasasi'],
  Kajiado_Central: ['Purko', 'Ildamat', 'Dalalekutuk', 'Matapato_North', 'Matapato_South'],
  Kajiado_East: ['Kaputiei_North', 'Kitengela', 'Oloosirkon/Sholinke', 'Kenyawa-Poka', 'Imaroro'],
  Kajiado_West: ['Keekonyokie', 'Iloodokilani', 'Magadi', 'Ewuaso_Oonkidong’i', 'Mosiro'],
  Kajiado_South: ['Entonet/Lenkism', 'Mbirikani/Eselenkei', 'Kuku', 'Rombo', 'Kimana'],

  // Kericho County (6 constituencies, 30 wards)
  Kipkelion_East: ['Londiani', 'Kedowa/Kimugul', 'Chepseon', 'Tendeno/Sorget'],
  Kipkelion_West: ['Kunyak', 'Kamasian', 'Kipkelion', 'Chilchila'],
  Ainamoi: ['Ainamoi', 'Kapsoit', 'Kipchebor', 'Kipchimchim', 'Kapsaos'],
  Bureti: ['Kisiara', 'Tebesonik', 'Cheboin', 'Chemosot', 'Litein'],
  Belgut: ['Waldai', 'Kabianga', 'Cheptororiet/Seretut', 'Chaik', 'Kapsuser'],
  Sigowet: ['Sigowet', 'Kaplelartet', 'Soin', 'Soliat'],

  // Bomet County (5 constituencies, 25 wards)
  Sotik: ['Ndanai/Abosi', 'Chemagel', 'Kipsonoi', 'Kapletundo', 'Rongena/Manaret'],
  Chepalungu: ['Chepalungu', 'Sigor', 'Kong’asis', 'Nyongores', 'Siongiroi'],
  Bomet_East: ['Merigi', 'Kembu', 'Longisa', 'Kipreres', 'Chemaner'],
  Bomet_Central: ['Silibwet_Township', 'Ndaraweta', 'Singorwet', 'Chesoen', 'Mutarakwa'],
  Konoin: ['Chepchabas', 'Kimulot', 'Mogogosiek', 'Boito', 'Embomos'],

  // Kakamega County (12 constituencies, 60 wards)
  Lugari: ['Mautuma', 'Lugari', 'Lumakanda', 'Chekalini', 'Chevaywa', 'Lwandeti'],
  Likuyani: ['Likuyani', 'Sango', 'Kongoni', 'Nzoia', 'Sinoko'],
  Malava: ['West_Kabras', 'Chemuche', 'East_Kabras', 'Butali/Chegulo', 'Manda_Shivanga', 'Shirugu_Mugai', 'South_Kabras'],
  Lurambi: ['Butsotso_East', 'Butsotso_South', 'Butsotso_Central', 'Sheywe', 'Mahiakalo', 'Shirere'],
  Navakholo: ['Ingostse_Mathia', 'Shinoyi_Shikomari', 'Esumeyia', 'Bunjoro', 'Bunyala_West'],
  Mumias_West: ['Mumias_Central', 'Mumias_North', 'Etenje', 'Musanda'],
  Mumias_East: ['Lusheya/Lubinu', 'Malaha/Isongo/Makunga', 'East_Wanga'],
  Matungu: ['Koyonzo', 'Kholera', 'Khalaba', 'Mayoni', 'Namamali'],
  Butere: ['Marama_Inaya', 'Marama_Central', 'Marama_North', 'Marama_South', 'Marama_West'],
  Khwisero: ['Kisa_North', 'Kisa_East', 'Kisa_West', 'Kisa_Central'],
  Shinyalu: ['Isukha_North', 'Isukha_South', 'Isukha_Central', 'Isukha_East', 'Isukha_West', 'Murhanda'],
  Ikolomani: ['Idakho_South', 'Idakho_East', 'Idakho_North', 'Idakho_Central'],

  // Vihiga County (5 constituencies, 25 wards)
  Vihiga: ['Lugaga_Wamuluma', 'South_Maragoli', 'Central_Maragoli', 'Mungoma'],
  Sabatia: ['Lyaduywa/Izava', 'West_Sabatia', 'Chavakali', 'North_Maragoli', 'Wodanga'],
  Hamisi: ['Shiru', 'Gisambai', 'Shamakhokho', 'Banja', 'Muhudu', 'Tambua', 'Jepkoyai'],
  Luanda: ['Luanda_Township', 'Wemilabi', 'Mwibona', 'Luanda_South', 'Emabungo'],
  Emuhaya: ['North_East_Bunyore', 'Central_Bunyore', 'West_Bunyore'],

  // Bungoma County (9 constituencies, 45 wards)
  Mt_Elgon: ['Cheptais', 'Chesikaki', 'Chepyuk', 'Kapkateny', 'Kaptama', 'Elgon'],
  Sirisia: ['Namwela', 'Malakisi/South_Kulisiru', 'Lwandanyi'],
  Kabuchai: ['Kabuchai/Chwele', 'West_Nalondo', 'Bwake/Luuya', 'Mukuyuni'],
  Bumula: ['Bumula', 'Khasoko', 'Kabula', 'Kimaeti', 'South_Bukusu'],
  Kanduyi: ['Bukembe_West', 'Bukembe_East', 'Township', 'Khalaba', 'Musikoma', 'East_Sang’alo', 'Tuuti_Maraka'],
  Webuye_East: ['Mihuu', 'Ndivisi', 'Maraka'],
  Webuye_West: ['Sitikho', 'Matulo', 'Bokoli', 'Misikhu', 'Mukuyuni'],
  Kimilili: ['Kibingei', 'Kimilili', 'Maeni', 'Kamukuywa'],
  Tongaren: ['Mbanga', 'Naitiri/Kabuyefwe', 'Milima', 'Ndalu/Tabani', 'Tongaren', 'Soysambu/Mitua'],

  // Busia County (7 constituencies, 35 wards)
  Teso_North: ['Malaba_Central', 'Malaba_North', 'Ang’urai_South', 'Ang’urai_North', 'Ang’urai_East', 'Malaba_South'],
  Teso_South: ['Ang’orom', 'Chakol_South', 'Chakol_North', 'Amukura_West', 'Amukura_East', 'Amukura_Central'],
  Nambale: ['Nambale_Township', 'Bukhayo_North/West', 'Bukhayo_East', 'Bukhayo_Central'],
  Matayos: ['Bukhayo_West', 'Mayenje', 'Busibwabo', 'Burumba', 'Matayos_South'],
  Butula: ['Marachi_West', 'Marachi_East', 'Marachi_Central', 'Marachi_North', 'Elugulu'],
  Funyula: ['Nangina', 'Ageng’a_Nanguba', 'Bwiri', 'Namboboto_Nambuku'],
  Budalangi: ['Bunjimba', 'Bunyala_Central', 'Bunyala_North', 'Bunyala_South'],

  // Siaya County (6 constituencies, 30 wards)
  Ugunja: ['Sigomere', 'Ugunja', 'Sidindi', 'West_Ugenya'],
  Ugenya: ['West_Ugenya', 'East_Ugenya', 'North_Ugenya', 'Ukwala'],
  Alego_Usonga: ['Usonga', 'West_Alego', 'Central_Alego', 'Siaya_Township', 'North_Alego', 'South_East_Alego'],
  Gem: ['North_Gem', 'West_Gem', 'Central_Gem', 'Yala_Township', 'East_Gem'],
  Bondo: ['West_Yimbo', 'Central_Sakwa', 'South_Sakwa', 'Yimbo_East', 'West_Sakwa', 'North_Sakwa'],
  Rarieda: ['East_Asembo', 'West_Asembo', 'North_Uyoma', 'South_Uyoma', 'West_Uyoma'],

  // Kisumu County (7 constituencies, 35 wards)
  Kisumu_East: ['Kajulu', 'Kiwanja_Kogony', 'Manyatta_B', 'Nyalenda_A', 'Kolwa_East'],
  Kisumu_West: ['South_West_Kisumu', 'Central_Kisumu', 'Kisumu_North', 'West_Kisumu', 'North_West_Kisumu'],
  Kisumu_Central: ['Railways', 'Migosi', 'Shaurimoyo_Kaloleni', 'Market_Milimani', 'Kondegaga_Kondele'],
  Seme: ['West_Seme', 'Central_Seme', 'East_Seme', 'North_Seme'],
  Nyando: ['East_Kano/Wawidhi', 'Awasi/Onjiko', 'Ahero', 'Kabonyo_Kanyagwal', 'Kobura'],
  Muhoroni: ['Miwani', 'Ombeyi', 'Masogo_Nyang’oma', 'Chemelil', 'Muhoroni_Koru'],
  Nyakach: ['South_West_Nyakach', 'North_Nyakach', 'Central_Nyakach', 'West_Nyakach', 'South_East_Nyakach'],

  // Homa Bay County (8 constituencies, 40 wards)
  Kasipul: ['West_Kasipul', 'South_Kasipul', 'Central_Kasipul', 'East_Kamagak', 'West_Kamagak'],
  Kabondo_Kasipul: ['Kabondo_East', 'Kabondo_West', 'Kojwach', 'Kokwanyo_Kakelo'],
  Karachuonyo: ['North_Karachuonyo', 'West_Karachuonyo', 'Kibiri', 'Wangchieng', 'Kendu_Bay_Town'],
  Rangwe: ['Gem_West', 'Gem_East', 'Kagan', 'Kochia'],
  Homa_Bay_Town: ['Homa_Bay_Central', 'Homa_Bay_Arujo', 'Homa_Bay_West', 'Homa_Bay_East'],
  Ndhiwa: ['Kabuoch_South/Pala', 'Kabuoch_North', 'Kanyamwa_Kosewe', 'Kanyamwa_Kologi', 'Kwabwai'],
  Suba_North: ['Mfangano_Island', 'Ruma_Kaksingri', 'Gwassi_West', 'Gwassi_East'],
  Suba_South: ['Kaksingri_West', 'Gembe', 'Lambwe', 'Rusinga_Island'],

  // Migori County (8 constituencies, 40 wards),
  Rongo: ['North_Kamagambo', 'Central_Kamagambo', 'East_Kamagambo', 'South_Kamagambo'],
  Awendo: ['North_East_Sakwa', 'South_Sakwa', 'West_Sakwa', 'Central_Sakwa'],
  Suna_East: ['God_Jope', 'Suna_Central', 'Kakrao', 'Kwa'],
  Suna_West: ['Wiga', 'Wasweta_I', 'Wasweta_II', 'Ragana_Oruba'],
  Uriri: ['West_Kanyamkago', 'North_Kanyamkago', 'Central_Kanyamkago', 'South_Kanyamkago', 'East_Kanyamkago'],
  Nyatike: ['Kachieng', 'Kanyasa', 'North_Kadem', 'Macalder_Kanyarwanda', 'Kaler', 'Got_Kachola', 'Muhuru'],
  Kuria_West: ['Bukira_East', 'Bukira_Central/Ikerege', 'Isibania', 'Makerero', 'Masaba', 'Tagare'],
  Kuria_East: ['Gokeharaka/Getambwega', 'Ntimaru_West', 'Ntimaru_East', 'Nyabasi_East', 'Nyabasi_West'],

  // Kisii County (9 constituencies, 45 wards)
  Bonchari: ['Bomariba', 'Bogiakumu', 'Bomorenda', 'Riana'],
  South_Mugirango: ['Boikang’a', 'Borabu/Chitago', 'Moticho', 'Getenga', 'Tabaka'],
  Bomachoge_Borabu: ['Boochi_Borabu', 'Bokimonge', 'Magenche', 'Boochi/Tendere'],
  Bobasi: ['Masige_West', 'Masige_East', 'Basi_Central', 'Nyacheki', 'Basi_Bogetaorio', 'Bobasi_Boikang’a', 'Sameta/Mokwerero'],
  Bomachoge_Chache: ['Bosoti_Sengera', 'Majoge_Basi', 'Boochi_Borabu'],
  Nyaribari_Masaba: ['Ichuni', 'Nyamasogono', 'Kiamokama', 'Gesusu'],
  Nyaribari_Chache: ['Birongo', 'Ibeno', 'Kisii_Central'],
  Kitutu_Chache_North: ['Monyerero', 'Sensi', 'Marani', 'Kegogi'],
  Kitutu_Chache_South: ['Bogusero', 'Bogeka', 'Nyakoe', 'Kitutu_Central', 'Nyatieko'],

  // Nyamira County (4 constituencies, 20 wards)
  Kitutu_Masaba: ['Rigoma', 'Gachuba', 'Kemera', 'Magombo'],
  West_Mugirango: ['Bonyamatuta', 'Bogichora', 'Bosamaro', 'Bokeira'],
  North_Mugirango: ['Itibo', 'Bomwagamo', 'Ekerenyo', 'Mekenene'],
  Borabu: ['Esise', 'Manga', 'Kiabonyoru', 'Nyansiongo'],
}