import { MotivationalQuote } from '../types';

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    id: 1,
    quote: "No estudies para saber una cosa más, sino para saberla mejor.",
    author: "Séneca",
    tag: "Profundidad"
  },
  {
    id: 2,
    quote: "La disciplina tarde o temprano vencerá a la inteligencia.",
    author: "Proverbio Japonés",
    tag: "Disciplina"
  },
  {
    id: 3,
    quote: "Un día a la vez. Cada sesión de estudio es un ladrillo en el castillo de tu futuro.",
    author: "Anónimo",
    tag: "Constancia"
  },
  {
    id: 4,
    quote: "Somos lo que hacemos repetidamente. La excelencia, por tanto, no es un acto sino un hábito.",
    author: "Aristóteles",
    tag: "Hábito"
  },
  {
    id: 5,
    quote: "El dolor de la disciplina pesa gramos; el dolor del arrepentimiento pesa toneladas.",
    author: "Jim Rohn",
    tag: "Enfoque"
  },
  {
    id: 6,
    quote: "Las raíces del estudio son amargas, pero los frutos son dulces.",
    author: "Aristóteles",
    tag: "Superación"
  },
  {
    id: 7,
    quote: "No tienes que ser extremo, solo tienes que ser consistente.",
    author: "James Clear",
    tag: "Constancia"
  },
  {
    id: 8,
    quote: "El secreto para salir adelante es simplemente empezar.",
    author: "Mark Twain",
    tag: "Acción"
  },
  {
    id: 9,
    quote: "La mente que se abre a una nueva idea jamás volverá a su tamaño original.",
    author: "Albert Einstein",
    tag: "Curiosidad"
  },
  {
    id: 10,
    quote: "No cuentes los días, haz que los días cuenten.",
    author: "Muhammad Ali",
    tag: "Motivación"
  },
  {
    id: 11,
    quote: "La constancia es la virtud por la cual todas las otras virtudes dan fruto.",
    author: "Arturo Graf",
    tag: "Disciplina"
  },
  {
    id: 12,
    quote: "Estudiar hoy lo que otros no quieren para vivir mañana como otros no pueden.",
    author: "Principio de Rendimiento",
    tag: "Visión"
  },
  {
    id: 13,
    quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    author: "Robert Collier",
    tag: "Racha"
  },
  {
    id: 14,
    quote: "No dejes para mañana lo que tu mente puede conquistar hoy.",
    author: "Proverbio",
    tag: "Foco"
  },
  {
    id: 15,
    quote: "El conocimiento es el único tesoro que crece cuando se comparte y se practica.",
    author: "Leonardo da Vinci",
    tag: "Sabiduría"
  },
  {
    id: 16,
    quote: "La racha no es solo un número; es la prueba irrefutable de tu compromiso.",
    author: "Filosofía RACHA",
    tag: "Identidad"
  },
  {
    id: 17,
    quote: "Nada en este mundo puede tomar el lugar de la persistencia.",
    author: "Calvin Coolidge",
    tag: "Persistencia"
  },
  {
    id: 18,
    quote: "Haz que cada hora frente a tus libros sea sagrada. El mundo recompensa a quienes dominan su atención.",
    author: "Cal Newport",
    tag: "Deep Work"
  },
  {
    id: 19,
    quote: "El cansancio pasa, la satisfacción de haber cumplido permanece.",
    author: "San Jerónimo",
    tag: "Cumplimiento"
  },
  {
    id: 20,
    quote: "Quien tiene un porqué para vivir y estudiar puede soportar casi cualquier cómo.",
    author: "Friedrich Nietzsche",
    tag: "Propósito"
  },
  {
    id: 21,
    quote: "La motivación te pone en marcha, pero la disciplina te mantiene en la cima.",
    author: "John C. Maxwell",
    tag: "Compromiso"
  },
  {
    id: 22,
    quote: "No busques el momento perfecto para estudiar; toma el momento y hazlo perfecto.",
    author: "Anónimo",
    tag: "Iniciativa"
  },
  {
    id: 23,
    quote: "Poco a poco, hilo a hilo, se teje la tela más resistente. Sigue adelante.",
    author: "Proverbio Latino",
    tag: "Paciencia"
  },
  {
    id: 24,
    quote: "Tu competencia está descansando o estudiando. La diferencia la marcas hoy.",
    author: "Mentalidad Ganadora",
    tag: "Dedicación"
  },
  {
    id: 25,
    quote: "El cerebro es un músculo: cuanto más lo desafías, más se expande.",
    author: "Carol Dweck",
    tag: "Crecimiento"
  },
  {
    id: 26,
    quote: "Invertir en conocimientos produce los mejores intereses.",
    author: "Benjamin Franklin",
    tag: "Inversión"
  },
  {
    id: 27,
    quote: "La suerte favorece a la mente preparada.",
    author: "Louis Pasteur",
    tag: "Preparación"
  },
  {
    id: 28,
    quote: "No mires atrás a menos que sea para ver lo lejos que has llegado en tu racha.",
    author: "Anónimo",
    tag: "Progreso"
  },
  {
    id: 29,
    quote: "Dormirás mejor sabiendo que hoy cumpliste con tu mente.",
    author: "Marco Aurelio",
    tag: "Paz mental"
  },
  {
    id: 30,
    quote: "El dominio requiere paciencia infinita y repetición constante.",
    author: "Robert Greene",
    tag: "Maestría"
  }
];

export function getRandomQuote(excludeId?: number): MotivationalQuote {
  const filtered = excludeId 
    ? MOTIVATIONAL_QUOTES.filter(q => q.id !== excludeId)
    : MOTIVATIONAL_QUOTES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex] || MOTIVATIONAL_QUOTES[0];
}
