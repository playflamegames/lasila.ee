// AI Huviring - Session Data
const sessionsData = [
    // MOODUL 1: AI Alused & Esimesed Sammud
    {
        id: 1,
        number: "Sessioon 1",
        title: "AI Võlumaa – Mis see üldse on?",
        category: "alused",
        module: "Moodul 1: AI Alused",
        description: "Tutvumine AI-ga läbi mängu ja esimeste piltide loomise.",
        topics: ["AI tutvustus", "AI vs inimene", "Pildiloomine"],
        duration: "2x 45 min",
        details: {
            goal: "Demüstifitseerida AI ja tekitada 'wow' hetk",
            activities: [
                "Mäng: 'AI või Inimene?' – 10 pilti, lapsed arvaavad",
                "Reaalajas loomine: Grupp dikteerib, loome pildi Bing Image Creatoris",
                "Paaristöö: Iga paar loob 3 pilti teemal 'Meie küla tulevikus 2050'",
                "Galerii kõnd – Lapsed hindavad teiste töid kleepsudega",
                "Reflektsioon: 'Üks asi, mis üllatab' + 'Üks asi, mida tahaksin järgmine kord proovida'"
            ],
            tools: ["Bing Image Creator", "Eelnevalt valitud pildid"],
            homework: "Vabatahtlik: Küsige vanematelt, millises töös nad kasutavad või võiksid kasutada AI-d"
        }
    },
    {
        id: 2,
        number: "Sessioon 2",
        title: "Promptimise Kunst",
        category: "alused",
        module: "Moodul 1: AI Alused",
        description: "Õppida struktureeritud promptimist läbi mängu.",
        topics: ["Promptimine", "Prompt valemid", "Praktika"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida struktureeritud promptimist läbi mängu",
            activities: [
                "Mini-loeng: 'Prompt = Retsept' – Näidake halba vs head prompti",
                "Promptimise Bingo: Lapsed saavad kaardi ülesannetega ('Loo pilt, mis sisaldab 3 looma + vikerkaart + öö')",
                "Grupi väljakutse: Looge 'võimalikult naljakas' pilt ainult sõnadega",
                "Jagamine: Igaüks näitab oma kõige veidramat tulemust",
                "Promptimise valemleht: Lapsed kopeerivad malli '[OBJEKT] stiilis [STIIL] kes [TEGEVUS]'"
            ],
            tools: ["Bing Image Creator", "ChatGPT"],
            homework: "Looge pilt, mis kirjeldab teie lemmikhobisid (jagavad järgmine kord)"
        }
    },
    {
        id: 3,
        number: "Sessioon 3",
        title: "AI Kui Õpiabi",
        category: "alused",
        module: "Moodul 1: AI Alused",
        description: "Näidata AI praktilist väärtust koolis.",
        topics: ["Õppimine", "Eetika", "Faktikontroll"],
        duration: "2x 45 min",
        details: {
            goal: "Näidata AI praktilist väärtust koolis",
            activities: [
                "Ajurünnak: 'Millistes kooliainetes võiks AI aidata?'",
                "Demo: Õpetaja küsib ChatGPT-lt: 'Seleta mulle nagu ma oleksin 12, kuidas fotosüntees töötab'",
                "Praktiline ülesanne: Vali 1 teema, mida ei saa koolis aru. Küsi AI-lt 3 erinevat seletust",
                "Grupi väljakutse: Looge 5-küsimuse viktoriini oma lemmikteemast AI abil",
                "Arutelu: 'Millal on AI kasutamine petmine?'"
            ],
            tools: ["ChatGPT", "Google AI Studio", "Quizlet"],
            homework: "Proovige AI-d ühe kodutöö juures (nt ajalugu, bioloogia) ja kirjutage 3 lausega, kas see aitas"
        }
    },
    
    // MOODUL 2: Visuaalne Looving
    {
        id: 4,
        number: "Sessioon 4",
        title: "Pildiloomine – Sügavuti",
        category: "pildid",
        module: "Moodul 2: Visuaalne Looving",
        description: "Erinevad pildistiilid ja kompositsiooni põhitõed.",
        topics: ["Pildistiilid", "Kompositsioon", "Iteratsioon"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida erinevaid pildistiile ja kompositsiooni põhitõdesid",
            activities: [
                "Erinevate stiilide tutvustus: realistlik, anime, maalikunst",
                "Kompositsiooni põhitõed AI jaoks",
                "Negatiivsed promptid ja nende kasutamine",
                "Kujude iteratsioon: kui ei meeldi, muuda prompti",
                "Loomingu portfolio: 5 erinevat stiili samast ideest"
            ],
            tools: ["Bing Image Creator", "Ideogram", "Canva"],
            homework: "Looge 3 erinevat versiooni sama teemast erinevates stiilides"
        }
    },
    {
        id: 5,
        number: "Sessioon 5",
        title: "AI Kujunduslaual",
        category: "pildid",
        module: "Moodul 2: Visuaalne Looving",
        description: "Logo, plakatid ja värvide teooria.",
        topics: ["Logo", "Plakatid", "Värvid"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida disaini põhitõdesid ja AI kasutamist kujunduses",
            activities: [
                "Logo loomine AI abil",
                "Plakatite ja reklaamide disain",
                "AI + Canva kombinatsioon",
                "Värvide teooria AI promptides",
                "Praktiline ülesanne: Disaini plakat kooli üritusele"
            ],
            tools: ["Bing Image Creator", "Canva", "Ideogram"],
            homework: "Looge plakat oma lemmikraamatu või filmi jaoks"
        }
    },
    {
        id: 6,
        number: "Sessioon 6",
        title: "3D & Fantaasiamaailmad",
        category: "pildid",
        module: "Moodul 2: Visuaalne Looving",
        description: "3D-stiilis pildid ja karakterite loomine.",
        topics: ["3D", "Karakterid", "Konsistentsus"],
        duration: "2x 45 min",
        details: {
            goal: "Luua 3D-stiilis pilte ja fantasiamaailmu",
            activities: [
                "3D-stiilis piltide loomine",
                "Karakterite loomine mängude jaoks",
                "Konsistentsus: Sama karakter erinevates olukordades",
                "AI kunstnike inspiratsioon",
                "Praktiline projekt: Looge oma superkangelane või fantaasiategelane"
            ],
            tools: ["Bing Image Creator", "Ideogram", "Leonardo.ai (free)"],
            homework: "Looge oma fantaasiategelane 3 erinevas olukorras"
        }
    },
    
    // MOODUL 3: Video & Animatsioon
    {
        id: 7,
        number: "Sessioon 7",
        title: "Video Alused AI-ga",
        category: "video",
        module: "Moodul 3: Video & Animatsioon",
        description: "Pildi animeerimise tööriistad ja AI avatars.",
        topics: ["Video", "Animatsioon", "Avatars"],
        duration: "2x 45 min",
        details: {
            goal: "Tutvuda AI video loomisega",
            activities: [
                "Mis on AI video?",
                "Pildi animeerimise tööriistad",
                "Lühikeste klippide loomine",
                "AI avataarid ja räägievad pildid",
                "Praktiline projekt: Tehke oma iseenda 'rääkivaks' tegelaseks (foto → animatsioon)"
            ],
            tools: ["D-ID (free tier)", "Runway (free)", "CapCut"],
            homework: "Animeerige üks oma varasemalt loodud pilt"
        }
    },
    {
        id: 8,
        number: "Sessioon 8",
        title: "Lühivideod & TikTok Stiil",
        category: "video",
        module: "Moodul 3: Video & Animatsioon",
        description: "Stsenaariumi kirjutamine ja lühivideod.",
        topics: ["Stsenaarium", "Lühivideod", "Efektid"],
        duration: "2x 45 min",
        details: {
            goal: "Luua lühivideod ja õppida stsenaariumite kirjutamist",
            activities: [
                "Stsenaariumi kirjutamine AI-ga",
                "Kaadrite planeerimine",
                "AI heliefektid ja muusika",
                "CapCut + AI tööriistad",
                "Praktiline projekt: 15-sekundiline harivideo 'Tere tulemast meie linna'"
            ],
            tools: ["ChatGPT", "CapCut", "Canva Video"],
            homework: "Looge 15-sekundiline video oma lemmikhobist"
        }
    },
    {
        id: 9,
        number: "Sessioon 9",
        title: "Subtitrid, Tõlge & Hääled",
        category: "video",
        module: "Moodul 3: Video & Animatsioon",
        description: "Automaatsed subtitrid ja AI hääled.",
        topics: ["Subtitrid", "Tõlge", "Hääled"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida töötama subtitrite ja AI häältega",
            activities: [
                "Automaatsed subtitrid AI-ga",
                "Tekst hääleks (TTS)",
                "Keelte vahetus videotes",
                "Voice cloning eetika",
                "Praktiline projekt: Looge video koos AI-häälega (nt saateankur)"
            ],
            tools: ["CapCut", "ElevenLabs (free)", "Google AI"],
            homework: "Lisage ühe oma video juurde AI-hääl"
        }
    },
    
    // MOODUL 4: Mängud & Interaktiivsus
    {
        id: 10,
        number: "Sessioon 10",
        title: "Lihtsad Mängud AI-ga",
        category: "mangud",
        module: "Moodul 4: Mängud & Interaktiivsus",
        description: "Scratch + AI ja lihtsad mängud.",
        topics: ["Scratch", "Mängud", "AI NPC"],
        duration: "2x 45 min",
        details: {
            goal: "Luua lihtsaid mänge AI abiga",
            activities: [
                "Scratch + AI laiendused",
                "ChatGPT kui mängude idee generaator",
                "Lihtsad küsimused-vastuste mängud",
                "AI NPC (mittemängjategelase) käitumine",
                "Praktiline projekt: Looge lihtsam viktoriini mäng oma teemast"
            ],
            tools: ["Scratch", "AI2Scratch", "ChatGPT"],
            homework: "Looge 5-küsimuse viktoriini mäng oma lemmikteemast"
        }
    },
    {
        id: 11,
        number: "Sessioon 11",
        title: "Lugude & RPG Loomine",
        category: "mangud",
        module: "Moodul 4: Mängud & Interaktiivsus",
        description: "Interaktiivsed lood ja AI kui Dungeon Master.",
        topics: ["Lood", "RPG", "Dialoogid"],
        duration: "2x 45 min",
        details: {
            goal: "Luua interaktiivseid lugusid ja rollimänge",
            activities: [
                "Interaktiivsed lood (vali oma seiklus)",
                "AI kui Dungeon Master",
                "Karakterite dialoogid",
                "Süžee genereerimine",
                "Praktiline projekt: Kirjutage 5-sammune lugu, kus lugeja valib teed"
            ],
            tools: ["ChatGPT", "Google AI Studio", "Twine"],
            homework: "Looge 10-sammune interaktiivne lugu"
        }
    },
    {
        id: 12,
        number: "Sessioon 12",
        title: "Koodimise Põhitõed AI Abiga",
        category: "mangud",
        module: "Moodul 4: Mängud & Interaktiivsus",
        description: "Lihtne HTML ja Python AI juhendamisel.",
        topics: ["HTML", "Python", "Kood"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida koodimise põhitõdesid AI abiga",
            activities: [
                "GitHub Copilot / Replit AI tutvustus",
                "Lihtne HTML leht AI abil",
                "Python põhitõed AI juhendamisel",
                "'Seleta mulle seda koodi' – õppimine",
                "Praktiline projekt: Looge lihtne veebileht oma huvidest"
            ],
            tools: ["Replit", "GitHub Copilot (free for students)", "ChatGPT"],
            homework: "Looge oma veebileht, kus on 3 lehekülge"
        }
    },
    
    // MOODUL 5: Audio & Muusika
    {
        id: 13,
        number: "Sessioon 13",
        title: "AI Muusika & Helid",
        category: "audio",
        module: "Moodul 5: Audio & Muusika",
        description: "AI muusika generaatorid ja heliefektid.",
        topics: ["Muusika", "Helid", "Miksing"],
        duration: "2x 45 min",
        details: {
            goal: "Luua AI abil muusikat ja heliefekte",
            activities: [
                "AI muusika generaatorid (Suno, Udio)",
                "Taustamuusika video jaoks",
                "Heliefektid",
                "Automaatne miksing",
                "Praktiline projekt: Looge 30-sekundiline laul oma lemmikloomast"
            ],
            tools: ["Suno AI (free)", "Udio (free)", "Soundraw"],
            homework: "Looge laul oma hobist või lemmiktegevusest"
        }
    },
    {
        id: 14,
        number: "Sessioon 14",
        title: "Podcast & Raadiosaated",
        category: "audio",
        module: "Moodul 5: Audio & Muusika",
        description: "AI-häälde stsenaariumi lugemine ja podcast.",
        topics: ["Podcast", "Hääled", "Dialoogid"],
        duration: "2x 45 min",
        details: {
            goal: "Luua podcast ja raadiosaateid AI abiga",
            activities: [
                "AI-häälde stsenaariumi lugemine",
                "Dialoogid kahe AI-hääle vahel",
                "Intervjuude simuleerimine",
                "Audio redigeerimine AI-ga",
                "Praktiline projekt: 2-minutiline 'raadiosaade' kohalikust teemast"
            ],
            tools: ["ElevenLabs (free)", "Google TTS", "Audacity"],
            homework: "Looge 3-minutiline podcast oma lemmikteemast"
        }
    },
    
    // MOODUL 6: Praktilised Oskused
    {
        id: 15,
        number: "Sessioon 15",
        title: "AI Tööriistakast Koolis",
        category: "praktiline",
        module: "Moodul 6: Praktilised Oskused",
        description: "Referaatide struktuurimine ja õppimine AI-ga.",
        topics: ["Õppimine", "Struktuur", "Keeled"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida kasutama AI-d koolis praktiliselt",
            activities: [
                "Referaatide struktuurimine (MITTE kirjutamine!)",
                "Ideede ajurünnak",
                "Matemaatikaülesannete selgitamine",
                "Võõrkeelte õppimine",
                "Praktiline projekt: Vali 3 kooli ülesannet, lahenda AI abiga ja selgita"
            ],
            tools: ["ChatGPT", "Google AI Studio", "Khan Academy Khanmigo"],
            homework: "Kasutage AI-d 5 erinevat kooli ülesannet lahendamisel"
        }
    },
    {
        id: 16,
        number: "Sessioon 16",
        title: "Andmed & Visualiseerimine",
        category: "praktiline",
        module: "Moodul 6: Praktilised Oskused",
        description: "AI tabelite analüüsimine ja visualiseerimine.",
        topics: ["Andmed", "Visualiseerimine", "Analüüs"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida töötama andmetega ja neid visualiseerima",
            activities: [
                "AI tabelite analüüsimine",
                "Lihtne andmete visualiseerimine",
                "Küsitluste loomine",
                "ChatGPT kui kalkulaator",
                "Praktiline projekt: Tehke küsitlus klassis, analüüsige AI-ga"
            ],
            tools: ["ChatGPT", "Google Sheets + AI", "Canva Charts"],
            homework: "Looge küsitlus ja analüüsige tulemusi AI abil"
        }
    },
    {
        id: 17,
        number: "Sessioon 17",
        title: "Prezentatsiooni Võlud",
        category: "praktiline",
        module: "Moodul 6: Praktilised Oskused",
        description: "Slaidide loomine ja struktureeritud esinemised.",
        topics: ["Esitlused", "Slaidid", "Visuaalid"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida looma professionaalseid esitlusi AI abiga",
            activities: [
                "Slaidide loomine AI-ga",
                "Gamma AI, Canva AI",
                "Struktureeritud esinemised",
                "Visuaalse materjali genereerimine",
                "Praktiline projekt: 5-slaidiline esitlus 'Minu lemmik hobi'"
            ],
            tools: ["Gamma AI", "Canva", "ChatGPT"],
            homework: "Looge 10-slaidiline esitlus oma lemmikteemast"
        }
    },
    
    // MOODUL 7: Eetika & Tuleviku Oskused
    {
        id: 18,
        number: "Sessioon 18",
        title: "AI Pimedapool",
        category: "eetika",
        module: "Moodul 7: Eetika & Tuleviku Oskused",
        description: "Deepfake'id, privaatsus ja autoriõigused.",
        topics: ["Deepfake", "Privaatsus", "Autoriõigus"],
        duration: "2x 45 min",
        details: {
            goal: "Mõista AI ohtusid ja eetikat",
            activities: [
                "Deepfake'id ja ohtud",
                "Privaatsus ja andmekaitse",
                "Kuidas tuvastada AI-loodut?",
                "Autoriõigused",
                "Praktiline projekt: 'AI detektiiv' – Mäng, tuvastage võltsitud pildid"
            ],
            tools: ["AI detektorid", "ChatGPT", "Näitepildid"],
            homework: "Leidke 5 AI-loodud pilti internetist ja selgitage, kuidas teadsite"
        }
    },
    {
        id: 19,
        number: "Sessioon 19",
        title: "Ametid Tulevikus",
        category: "eetika",
        module: "Moodul 7: Eetika & Tuleviku Oskused",
        description: "Millised tööd muutuvad ja AI + Inimene.",
        topics: ["Tuleviku ametid", "Oskused", "Karjäär"],
        duration: "2x 45 min",
        details: {
            goal: "Mõista AI mõju tulevikule ja ametitele",
            activities: [
                "Millised tööd muutuvad?",
                "AI + Inimene = Võimas meeskond",
                "Oskused, mida AI ei asenda",
                "Kuidas õppida koos AI-ga",
                "Praktiline projekt: Intervjuu AI-ga: 'Mis ameti sa mulle soovitad?'"
            ],
            tools: ["ChatGPT", "Google AI Studio"],
            homework: "Küsige AI-lt 3 erinevat karjäärinõu"
        }
    },
    {
        id: 20,
        number: "Sessioon 20",
        title: "Lõpuprojekt – Portfoolio",
        category: "eetika",
        module: "Moodul 7: Eetika & Tuleviku Oskused",
        description: "Loo oma AI-projektide näitus.",
        topics: ["Portfoolio", "Näitus", "Refleksioon"],
        duration: "2x 45 min",
        details: {
            goal: "Luua oma AI-projektide portfoolio ja esitleda",
            activities: [
                "Loo oma AI-projektide näitus",
                "Vali parim töö igast kategooriast",
                "Esitle vanematele/kogukonnale",
                "Refleksioon: Mida õppisin?",
                "Tunnistuste jagamine"
            ],
            tools: ["Canva", "Google Slides", "Kõik varasemad tööriistad"],
            homework: "Jätka AI-ga eksperimenteerimist!"
        }
    },
    
    // LISAMOODULID (Valikulised)
    {
        id: 21,
        number: "Sessioon 21",
        title: "AI & Robootika",
        category: "eetika",
        module: "Lisamoodul: Täiendavad Teemad",
        description: "Kuidas AI juhib roboteid.",
        topics: ["Robootika", "Andurid", "Simulatsioon"],
        duration: "2x 45 min",
        details: {
            goal: "Mõista AI rolli robootikas",
            activities: [
                "Kuidas AI juhib roboteid",
                "Lihtsad simulatsioonid (Scratch robotid)",
                "Andurid ja AI kombinatsioon",
                "Tuleviku robotid",
                "Praktiline projekt: Disaini oma robot ja kirjelda, kuidas ta töötab"
            ],
            tools: ["Scratch", "ChatGPT", "Tinkercad"],
            homework: "Disaini oma roboti plaan koos selgitusega"
        }
    },
    {
        id: 22,
        number: "Sessioon 22",
        title: "AI Sotsiaalmeesias",
        category: "praktiline",
        module: "Lisamoodul: Täiendavad Teemad",
        description: "Sisuloomise automatiseerimine.",
        topics: ["Sotsiaalmedia", "Sisu", "Planeerimine"],
        duration: "2x 45 min",
        details: {
            goal: "Õppida kasutama AI-d sotsiaalmeedia sisu loomisel",
            activities: [
                "Sisuloomise automatiseerimine",
                "Hashtag'ide genereerimine",
                "Sisu planeerimine AI-ga",
                "Influuencerite tööriistad",
                "Praktiline projekt: Looge 1-nädalane sisu plaan oma huviteemale"
            ],
            tools: ["ChatGPT", "Canva", "CapCut"],
            homework: "Looge 7 postituse ideed koos piltidega"
        }
    },
    {
        id: 23,
        number: "Sessioon 23",
        title: "AI Teaduses",
        category: "praktiline",
        module: "Lisamoodul: Täiendavad Teemad",
        description: "Kuidas teadlased kasutavad AI-d.",
        topics: ["Teadus", "Uuringud", "Avastused"],
        duration: "2x 45 min",
        details: {
            goal: "Mõista AI rolli teaduses",
            activities: [
                "Kuidas teadlased kasutavad AI-d?",
                "Haiguste diagnoosimine",
                "Kliimamudelid",
                "Kosmoseavastused",
                "Praktiline projekt: Uurige AI abil üht teaduslikku teemat"
            ],
            tools: ["ChatGPT", "Google AI Studio", "Google Scholar"],
            homework: "Kirjutage lühike raport AI rollist teaduses"
        }
    },
    {
        id: 24,
        number: "Sessioon 24",
        title: "Loo Oma AI",
        category: "mangud",
        module: "Lisamoodul: Täiendavad Teemad",
        description: "Lihtsa chatbot'i treenimine.",
        topics: ["Chatbot", "Custom GPT", "Treenimine"],
        duration: "2x 45 min",
        details: {
            goal: "Luua oma AI abiline",
            activities: [
                "Lihtsa chatbot'i treenimine",
                "Custom GPT loomine (ChatGPT)",
                "Oma AI abilise disain",
                "AI personaliseerimine",
                "Praktiline projekt: Looge oma AI abiline konkreetse ülesande jaoks"
            ],
            tools: ["ChatGPT (Custom GPT)", "Google AI Studio"],
            homework: "Täiustage oma AI abilist ja testage sõpradega"
        }
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sessionsData;
}