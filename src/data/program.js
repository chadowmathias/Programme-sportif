export const WORKOUT_PROGRAM = {
  1: {
    id: 1,
    name: "PUSH",
    description: "Pectoraux, Épaules antérieures, Triceps",
    restDay: false,
    exercises: [
      { id: "p1_ex1", name: "Développé Incliné", sets: 3, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p1_ex2", name: "Chest Press", sets: 3, reps: "10-12", intensity: "RIR 1-2", rest: "1min30", targetRestSeconds: 90 },
      { id: "p1_ex3", name: "Pec Fly", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p1_ex4", name: "Élévations lat. poulie", sets: 4, reps: "12-15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p1_ex5", name: "Dips", sets: 3, reps: "Max", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p1_ex6", name: "Extension triceps", sets: 3, reps: "12-15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 }
    ]
  },
  2: {
    id: 2,
    name: "PULL",
    description: "Dos, Deltoïdes postérieurs, Biceps",
    restDay: false,
    exercises: [
      { id: "p2_ex1", name: "Tractions", sets: 3, reps: "6-10", intensity: "RIR 1", rest: "2min", targetRestSeconds: 120 },
      { id: "p2_ex2", name: "Tirage horizontal", sets: 3, reps: "10-12", intensity: "RIR 1-2", rest: "1min30", targetRestSeconds: 90 },
      { id: "p2_ex3", name: "Rowing Barre", sets: 3, reps: "8-10", intensity: "RIR 1", rest: "2min", targetRestSeconds: 120 },
      { id: "p2_ex4", name: "Oiseau poulie", sets: 4, reps: "15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p2_ex5", name: "Curl Barre", sets: 3, reps: "10-12", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p2_ex6", name: "Curl Marteau corde", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90 }
    ]
  },
  3: {
    id: 3,
    name: "LEGS",
    description: "Quadriceps, Ischios, Mollets",
    restDay: false,
    exercises: [
      { id: "p3_ex1", name: "Presse à cuisses", sets: 4, reps: "10-12", intensity: "RIR 1", rest: "2min", targetRestSeconds: 120 },
      { id: "p3_ex2", name: "Leg Extension", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p3_ex3", name: "Lying Leg Curl", sets: 4, reps: "10-12", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p3_ex4", name: "Adducteurs/Abducteurs", sets: 2, reps: "15", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p3_ex5", name: "Mollets presse", sets: 4, reps: "15-20", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 }
    ]
  },
  4: {
    id: 4,
    name: "ARNOLD (Chest/Back)",
    description: "Pectoraux, Dos, Grand dorsal",
    restDay: false,
    exercises: [
      { id: "p4_ex1", name: "Développé Couché", sets: 4, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p4_ex2", name: "Tirage vertical", sets: 4, reps: "10-12", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p4_ex3", name: "Pull-over poulie", sets: 3, reps: "12-15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p4_ex4", name: "Pec Deck", sets: 3, reps: "12-15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p4_ex5", name: "Rowing Haltère", sets: 3, reps: "10-12", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 }
    ]
  },
  5: {
    id: 5,
    name: "ARNOLD (Shoulders/Arms)",
    description: "Épaules, Biceps, Triceps",
    restDay: false,
    exercises: [
      { id: "p5_ex1", name: "Développé Militaire", sets: 4, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p5_ex2", name: "Élévations lat. haltères", sets: 4, reps: "15", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      // Superset 1
      { id: "p5_ex3", name: "Curl incliné", sets: 3, reps: "10-12", intensity: "Échec (dernière série)", rest: "Superset 1", targetRestSeconds: 90, superset: "Superset 1" },
      { id: "p5_ex4", name: "Extension nuque", sets: 3, reps: "10-12", intensity: "Échec (dernière série)", rest: "Superset 1", targetRestSeconds: 90, superset: "Superset 1" },
      // Superset 2
      { id: "p5_ex5", name: "Curl poulie basse", sets: 3, reps: "12", intensity: "Drop Set (dernière série)", rest: "Superset 2", targetRestSeconds: 90, superset: "Superset 2" },
      { id: "p5_ex6", name: "Extension triceps poulie", sets: 3, reps: "12", intensity: "Drop Set (dernière série)", rest: "Superset 2", targetRestSeconds: 90, superset: "Superset 2" }
    ]
  },
  6: {
    id: 6,
    name: "ARNOLD (Legs/Ischios)",
    description: "Ischio-jambiers, Quadriceps, Mollets",
    restDay: false,
    exercises: [
      { id: "p6_ex1", name: "Soulevé de terre J. tendues", sets: 4, reps: "8-10", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p6_ex2", name: "Presse pieds hauts", sets: 3, reps: "10-12", intensity: "RIR 1-2", rest: "2min", targetRestSeconds: 120 },
      { id: "p6_ex3", name: "Fentes", sets: 3, reps: "10/jambe", intensity: "RIR 1", rest: "1min30", targetRestSeconds: 90 },
      { id: "p6_ex4", name: "Leg Extension", sets: 3, reps: "15", intensity: "Échec (dernière série)", rest: "1min30", targetRestSeconds: 90 },
      { id: "p6_ex5", name: "Mollets assis", sets: 4, reps: "15-20", intensity: "Drop Set (dernière série)", rest: "1min30", targetRestSeconds: 90 }
    ]
  },
  7: {
    id: 7,
    name: "REPOS",
    description: "Récupération active et étirements",
    restDay: true,
    exercises: []
  }
};

export const WEEKDAYS = [
  { id: 1, label: "Jour 1", name: "PUSH" },
  { id: 2, label: "Jour 2", name: "PULL" },
  { id: 3, label: "Jour 3", name: "LEGS" },
  { id: 4, label: "Jour 4", name: "ARNOLD (Chest/Back)" },
  { id: 5, label: "Jour 5", name: "ARNOLD (Shoulders/Arms)" },
  { id: 6, label: "Jour 6", name: "ARNOLD (Legs/Ischios)" },
  { id: 7, label: "Jour 7", name: "REPOS" }
];
