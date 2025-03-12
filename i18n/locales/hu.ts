export default {
  title: "Varázslatos Esti Mesék",
  subtitle: "Készíts személyre szabott esti meséket a kicsiknek. Csak add meg a részleteket, és mi megalkotunk egy varázslatos történetet, ami tökéletes az édes álmokhoz.",
  actions: {
    download: "PDF Letöltése",
    share: "Mese Megosztása"
  },
  form: {
    mainCharacter: "Főszereplő Részletei",
    characterName: "Szereplő Neve",
    age: "Életkor",
    gender: {
      label: "Nem",
      options: {
        select: "Válassz nemet...",
        male: "Fiú",
        female: "Lány",
        nonBinary: "Non-bináris",
        notSpecify: "Nem kívánom megadni"
      }
    },
    characterType: {
      label: "Szereplő Típusa",
      options: {
        select: "Válassz típust...",
        human: "Ember",
        animal: "Állat",
        robot: "Robot",
        fairy: "Tündér",
        other: "Egyéb"
      }
    },
    personalityTraits: {
      label: "Személyiségjegyek (Opcionális)",
      placeholder: "pl.: Bátor, kíváncsi, vicces"
    },
    setting: {
      title: "Történet Helyszíne",
      label: "Helyszín",
      placeholder: "pl.: Varázslatos erdő, űr"
    },
    specialLocations: {
      label: "Különleges Helyszínek (Opcionális)",
      placeholder: "pl.: Cukorka kastély, titkos barlang"
    },
    storyElements: {
      title: "Történet Elemei",
      type: {
        label: "Történet Típusa",
        options: {
          select: "Válassz típust...",
          adventure: "Kaland",
          friendship: "Barátság",
          overcomingFear: "Félelem Legyőzése",
          mystery: "Rejtély",
          other: "Egyéb"
        }
      },
      tone: {
        label: "Történet Hangulata",
        options: {
          select: "Válassz hangulatot...",
          funny: "Vicces",
          calm: "Nyugodt",
          exciting: "Izgalmas",
          mysterious: "Rejtélyes",
          other: "Egyéb"
        }
      }
    },
    morals: {
      label: "Tanulságok (Opcionális)",
      placeholder: "pl.: Kedvesség, bátorság, csapatmunka"
    },
    magicalElements: {
      label: "Varázslatos Elemek (Opcionális)",
      placeholder: "pl.: Repülés, láthatatlanság, beszélő állatok"
    },
    challenges: {
      label: "Kihívások vagy Akadályok (Opcionális)",
      placeholder: "pl.: Elveszett kincs, megoldandó rejtvény"
    },
    personalDetails: {
      title: "Személyes Részletek",
      hobbies: {
        label: "Hobbik és Érdeklődési Körök (Opcionális)",
        placeholder: "pl.: Szeret rajzolni, focizni"
      },
      realReferences: {
        label: "Valós Személyek vagy Háziállatok (Opcionális)",
        placeholder: "pl.: Szerepeljen benne Bella kutyám"
      }
    },
    preferences: {
      title: "Történet Beállításai",
      length: {
        label: "Történet Hossza",
        options: {
          select: "Válassz hosszt...",
          short: "Rövid (~5 perc)",
          medium: "Közepes (~10 perc)",
          long: "Hosszú (15+ perc)"
        }
      },
      illustration: {
        label: "Illusztráció Stílusa",
        options: {
          select: "Válassz stílust...",
          bright: "Élénk és Színes",
          dreamy: "Álomszerű és Lágy",
          other: "Egyéb"
        }
      }
    },
    additionalNotes: {
      label: "További Megjegyzések (Opcionális)",
      placeholder: "Van még valami különleges kérés vagy részlet, amit szeretnél hozzáadni?"
    },
    submit: {
      generating: "Mese Készítése...",
      generate: "Mese Generálása"
    }
  },
  history: {
    title: "Korábbi Mesék",
    storyTitle: "{{name}} Meséje"
  },
  welcome: 'Alakítsd át rajzaidat varázslatos történetekké',
  upload: 'Rajz Feltöltése',
  dropzone: 'Húzd ide a rajzodat, vagy kattints a kiválasztáshoz',
  processing: 'Varázslat folyamatban...',
  login: 'Bejelentkezés a kezdéshez',
  steps: {
    title: 'Hogyan működik',
    step1: 'Töltsd fel a rajzodat',
    step1desc: 'Oszd meg bármilyen rajzot, amit életre szeretnél kelteni',
    step2: 'Varázslatos átalakulás',
    step2desc: 'Nézd, ahogy az AI javítja a műalkotásodat',
    step3: 'Szerezd meg a történetedet',
    step3desc: 'Kapj egy egyedi történetet a rajzod alapján',
    step4: 'Hallgasd meg és oszd meg',
    step4desc: 'Élvezd az elmesélt történetet és oszd meg barátaiddal'
  },
  createPage: {
    title: "Üdvözöljük a Történet Készítőben",
    subtitle: "Válasszon egy lehetőséget a kezdéshez:",
    basicForm: {
      title: "Történet létrehozása egyszerű űrlappal",
      description: "Használjon egyszerű űrlapot a történet létrehozásához."
    },
    advancedForm: {
      title: "Történet létrehozása haladó űrlappal",
      description: "Használjon haladó űrlapot több lehetőséggel."
    },
    imageUpload: {
      title: "Történet létrehozása képfeltöltéssel",
      description: "Töltsön fel képeket a történet kiegészítéséhez."
    },
    freeType: {
      title: "Történet létrehozása szabad szöveggel",
      description: "Írja be a történetét szabadon, korlátozások nélkül."
    }
  }
};