export type Topic = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
};

export const TOPICS: Topic[] = [
  {
    id: "nlp-clasico-antes-de-deep-learning",
    label: "NLP clasico / antes de deep learning",
    shortLabel: "NLP clasico",
    description: "Origenes del modelado probabilistico, evaluacion y sequence labeling previo al salto neural."
  },
  {
    id: "representaciones-distribucionales-embeddings",
    label: "Representaciones distribucionales / embeddings",
    shortLabel: "Embeddings",
    description: "La transicion hacia vectores densos y las intuiciones geometricas de la semantica."
  },
  {
    id: "rnn-lstm-secuencias",
    label: "RNN / LSTM / secuencias",
    shortLabel: "RNN y LSTM",
    description: "Modelos secuenciales previos al Transformer y el surgimiento del encoder-decoder."
  },
  {
    id: "tokenizacion-subwords",
    label: "Tokenizacion / subwords",
    shortLabel: "Subwords",
    description: "La pieza que hace escalable el modelado abierto de vocabulario."
  },
  {
    id: "transformer-y-embeddings-contextuales",
    label: "Transformer y embeddings contextuales",
    shortLabel: "Transformer",
    description: "El giro hacia representaciones contextuales y arquitecturas basadas en atencion."
  },
  {
    id: "gpt-llms-modernos",
    label: "GPT / LLMs modernos",
    shortLabel: "GPT y LLMs",
    description: "La linea generativa que empuja el escalado y el in-context learning."
  },
  {
    id: "fine-tuning-instruction-tuning-alignment",
    label: "Fine-tuning / instruction tuning / alignment",
    shortLabel: "Alignment",
    description: "Como adaptar, alinear y abaratar el ajuste de modelos grandes."
  },
  {
    id: "reasoning-prompting",
    label: "Reasoning / prompting",
    shortLabel: "Reasoning",
    description: "Trabajos sobre prompting, razonamiento paso a paso y uso deliberado de trayectorias."
  },
  {
    id: "interpretabilidad-semantica",
    label: "Interpretabilidad / semantica",
    shortLabel: "Interpretabilidad",
    description: "Papers para pensar que guardan los modelos y como reaparecen estructuras semanticas."
  }
];

export const TOPIC_LABELS = Object.fromEntries(
  TOPICS.map((topic, index) => [topic.id, { ...topic, index }])
);
