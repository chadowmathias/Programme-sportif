export const WORKOUT_PROGRAM = {
  1: {
    id: 1,
    name: "PUSH",
    description: "Pectoraux, Épaules, Triceps",
    restDay: false,
    exercises: [
      { id: "p1_ex1", name: "Développé incliné (Haltères)", sets: 3, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120, note: "Prends tes 26-30 kg, descends lentement." },
      { id: "p1_ex2", name: "Machine Chest Press", sets: 3, reps: "10-12", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p1_ex3", name: "Pec Fly (Poulie vis-à-vis)", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 3ème série se termine en Drop Set (baisse le poids 2 fois)." },
      { id: "p1_ex4", name: "Élévations latérales à la poulie basse", sets: 4, reps: "12-15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 4ème série se termine à l'Échec total." },
      { id: "p1_ex5", name: "Dips (Buste penché)", sets: 3, reps: "Max", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90, note: "Ne va pas jusqu'à rester bloqué en bas." },
      { id: "p1_ex6", name: "Extension triceps corde", sets: 3, reps: "12-15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 3ème série se termine à l'Échec total." }
    ]
  },
  2: {
    id: 2,
    name: "PULL",
    description: "Dos, Arrière d'épaule, Biceps",
    restDay: false,
    exercises: [
      { id: "p2_ex1", name: "Tractions", sets: 3, reps: "6-10", intensity: "RIR 1", rest: "2min", targetRestSeconds: 120, note: "Si tu dépasses 10, leste-toi." },
      { id: "p2_ex2", name: "Tirage horizontal", sets: 3, reps: "10-12", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p2_ex3", name: "Rowing Barre (Buste penché)", sets: 3, reps: "8-10", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p2_ex4", name: "Oiseau à la poulie", sets: 4, reps: "15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 4ème série se termine à l'Échec total." },
      { id: "p2_ex5", name: "Curl Biceps Barre (EZ/Droite)", sets: 3, reps: "10-12", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p2_ex6", name: "Curl Marteau poulie basse (Corde)", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 3ème série se termine en Drop Set (baisse le poids 2 fois)." }
    ]
  },
  3: {
    id: 3,
    name: "LEGS",
    description: "Focus Quadriceps",
    restDay: false,
    exercises: [
      { id: "p3_ex1", name: "Presse à cuisses (Pieds au milieu)", sets: 4, reps: "10-12", intensity: "RIR 1", rest: "2min", targetRestSeconds: 120 },
      { id: "p3_ex2", name: "Leg Extension", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "2min", targetRestSeconds: 120, note: "La 3ème série se termine en Drop Set (baisse le poids 2 fois)." },
      { id: "p3_ex3", name: "Lying Leg Curl (Ischios)", sets: 4, reps: "10-12", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 4ème série se termine à l'Échec total." },
      { id: "p3_ex4", name: "Machine Adducteurs / Abducteurs", sets: 2, reps: "15 de chaque", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p3_ex5", name: "Mollets (Presse à cuisses)", sets: 4, reps: "15-20", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 4ème série se termine à l'Échec total." }
    ]
  },
  4: {
    id: 4,
    name: "ARNOLD - CHEST & BACK",
    description: "Pecs et Dos",
    restDay: false,
    exercises: [
      { id: "p4_ex1", name: "Développé couché (Barre/Haltères)", sets: 4, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p4_ex2", name: "Tirage vertical poulie haute", sets: 4, reps: "10-12", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p4_ex3", name: "Pull-over à la poulie haute", sets: 3, reps: "12-15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 3ème série se termine à l'Échec total." },
      { id: "p4_ex4", name: "Écartés machine (Pec Deck)", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 3ème série se termine en Drop Set." },
      { id: "p4_ex5", name: "Rowing Haltère à 1 bras (Bûcheron)", sets: 3, reps: "10-12 par bras", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 }
    ]
  },
  5: {
    id: 5,
    name: "ARNOLD - SHOULDERS & ARMS",
    description: "Épaules et Bras",
    restDay: false,
    exercises: [
      { id: "p5_ex1", name: "Développé militaire (Haltères)", sets: 4, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p5_ex2", name: "Élévations latérales haltères", sets: 4, reps: "15", intensity: "Drop Set (dernière série)", rest: "2min", targetRestSeconds: 120, note: "La 4ème série se termine en Drop Set." },
      // Superset 1
      { id: "p5_ex3", name: "Curl incliné haltères", sets: 3, reps: "10-12", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, superset: "Superset 1", note: "Enchaîné avec Extension triceps assis. Sur la 3ème série, aller jusqu'à l'Échec total." },
      { id: "p5_ex4", name: "Extension triceps assis (2 mains)", sets: 3, reps: "10-12", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, superset: "Superset 1", note: "Enchaîné après Curl incliné. Sur la 3ème série, aller jusqu'à l'Échec total." },
      // Superset 2
      { id: "p5_ex5", name: "Curl Biceps poulie basse", sets: 3, reps: "12", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90, superset: "Superset 2", note: "Enchaîné avec Extension Triceps. Sur la 3ème série, faire un Drop Set." },
      { id: "p5_ex6", name: "Extension Triceps poulie haute", sets: 3, reps: "12", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90, superset: "Superset 2", note: "Enchaîné après Curl Biceps. Sur la 3ème série, faire un Drop Set." }
    ]
  },
  6: {
    id: 6,
    name: "ARNOLD - LEGS",
    description: "Focus Ischios & Fessiers",
    restDay: false,
    exercises: [
      { id: "p6_ex1", name: "Soulevé de terre jambes tendues", sets: 4, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120, note: "Garde le dos droit, étire bien l'arrière des cuisses." },
      { id: "p6_ex2", name: "Presse à cuisses (Pieds hauts)", sets: 3, reps: "10-12", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p6_ex3", name: "Fentes marchées ou Bulgares (Haltères)", sets: 3, reps: "10 par jambe", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p6_ex4", name: "Leg Extension", sets: 3, reps: "15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "La 3ème série se termine à l'Échec total." },
      { id: "p6_ex5", name: "Mollets Assis (Système D)", sets: 4, reps: "15-20", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90, note: "Sur banc, pieds sur step, haltères sur les genoux. La 4ème série se termine en Drop Set." }
    ]
  },
  7: {
    id: 7,
    name: "REPOS TOTAL",
    description: "Pas de musculation. Récupération nerveuse et musculaire.",
    restDay: true,
    exercises: []
  }
};

export const WEEKDAYS = [
  { id: 1, label: "Jour 1", name: "PUSH" },
  { id: 2, label: "Jour 2", name: "PULL" },
  { id: 3, label: "Jour 3", name: "LEGS" },
  { id: 4, label: "Jour 4", name: "ARNOLD - CHEST & BACK" },
  { id: 5, label: "Jour 5", name: "ARNOLD - SHOULDERS & ARMS" },
  { id: 6, label: "Jour 6", name: "ARNOLD - LEGS" },
  { id: 7, label: "Jour 7", name: "REPOS TOTAL" }
];
