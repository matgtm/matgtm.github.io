import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_FILE = path.join(ROOT, "Lista.txt");
const OUTPUT_DIR = path.join(ROOT, "src", "content", "papers");

const TOPIC_MAP = {
  "NLP clasico / antes de deep learning": "nlp-clasico-antes-de-deep-learning",
  "Representaciones distribucionales / embeddings":
    "representaciones-distribucionales-embeddings",
  "RNN / LSTM / secuencias": "rnn-lstm-secuencias",
  "Tokenizacion / subwords": "tokenizacion-subwords",
  "Transformer y embeddings contextuales": "transformer-y-embeddings-contextuales",
  "GPT / LLMs modernos": "gpt-llms-modernos",
  "Fine-tuning / instruction tuning / alignment":
    "fine-tuning-instruction-tuning-alignment",
  "Reasoning / prompting": "reasoning-prompting",
  "Interpretabilidad / semantica": "interpretabilidad-semantica"
};

const METADATA = {
  "Class-Based n-gram Models of Natural Language": {
    authors: "Peter F. Brown, Vincent J. Della Pietra, Peter V. deSouza, Jenifer C. Lai, Robert L. Mercer",
    venue: "Computational Linguistics, 1992",
    sourceUrl: "https://aclanthology.org/J92-4003/"
  },
  "An Empirical Study of Smoothing Techniques for Language Modeling": {
    authors: "Stanley F. Chen, Joshua Goodman",
    venue: "Computer Speech and Language, 1999",
    sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0885230899901286"
  },
  "Conditional Random Fields": {
    authors: "John Lafferty, Andrew McCallum, Fernando Pereira",
    venue: "ICML 2001",
    sourceUrl: "https://repository.upenn.edu/handle/20.500.14332/6188"
  },
  "BLEU: a Method for Automatic Evaluation of Machine Translation": {
    authors: "Kishore Papineni, Salim Roukos, Todd Ward, Wei-Jing Zhu",
    venue: "ACL 2002",
    sourceUrl: "https://aclanthology.org/P02-1040/"
  },
  "Efficient Estimation of Word Representations in Vector Space": {
    authors: "Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean",
    venue: "arXiv 2013",
    sourceUrl: "https://arxiv.org/abs/1301.3781"
  },
  "GloVe: Global Vectors for Word Representation": {
    authors: "Jeffrey Pennington, Richard Socher, Christopher Manning",
    venue: "EMNLP 2014",
    sourceUrl: "https://aclanthology.org/D14-1162/"
  },
  "Neural Word Embedding as Implicit Matrix Factorization": {
    authors: "Omer Levy, Yoav Goldberg",
    venue: "NeurIPS 2014",
    sourceUrl: "https://papers.nips.cc/paper/5477-neural-word-embedding-as-implicit-matrix-factorization"
  },
  "Recurrent Neural Network Based Language Model": {
    authors: "Tomas Mikolov, Martin Karafiat, Lukas Burget, Jan Cernocky, Sanjeev Khudanpur",
    venue: "Interspeech 2010",
    sourceUrl: "https://www.isca-archive.org/interspeech_2010/mikolov10_interspeech.html"
  },
  "Long Short-Term Memory": {
    authors: "Sepp Hochreiter, Jurgen Schmidhuber",
    venue: "Neural Computation, 1997",
    sourceUrl: "https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory"
  },
  "Natural Language Processing (Almost) from Scratch": {
    authors: "Ronan Collobert, Jason Weston, Leon Bottou, Michael Karlen, Koray Kavukcuoglu, Pavel Kuksa",
    venue: "JMLR 2011",
    sourceUrl: "https://jmlr.org/papers/v12/collobert11a.html"
  },
  "Sequence to Sequence Learning with Neural Networks": {
    authors: "Ilya Sutskever, Oriol Vinyals, Quoc V. Le",
    venue: "NeurIPS 2014",
    sourceUrl: "https://papers.nips.cc/paper/5346-sequence-to-sequence-learning-with-neural"
  },
  "Neural Machine Translation by Jointly Learning to Align and Translate": {
    authors: "Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio",
    venue: "arXiv 2014",
    sourceUrl: "https://arxiv.org/abs/1409.0473"
  },
  "Neural Machine Translation of Rare Words with Subword Units": {
    authors: "Rico Sennrich, Barry Haddow, Alexandra Birch",
    venue: "ACL 2016",
    sourceUrl: "https://aclanthology.org/P16-1162/"
  },
  "Attention Is All You Need": {
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
    venue: "NeurIPS 2017",
    sourceUrl: "https://papers.nips.cc/paper/7181-attention-is-all-you-need"
  },
  "Deep Contextualized Word Representations": {
    authors: "Matthew E. Peters, Mark Neumann, Mohit Iyyer, Matt Gardner, Christopher Clark, Kenton Lee, Luke Zettlemoyer",
    venue: "NAACL 2018",
    sourceUrl: "https://aclanthology.org/N18-1202/"
  },
  "Universal Language Model Fine-tuning for Text Classification": {
    authors: "Jeremy Howard, Sebastian Ruder",
    venue: "ACL 2018",
    sourceUrl: "https://aclanthology.org/P18-1031/"
  },
  "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding": {
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
    venue: "NAACL 2019",
    sourceUrl: "https://aclanthology.org/N19-1423/"
  },
  "Improving Language Understanding by Generative Pre-Training": {
    authors: "Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever",
    venue: "OpenAI Technical Report, 2018",
    sourceUrl:
      "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf"
  },
  "Language Models are Unsupervised Multitask Learners": {
    authors: "Alec Radford, Jeffrey Wu, Rewon Child, David Luan, Dario Amodei, Ilya Sutskever",
    venue: "OpenAI Technical Report, 2019",
    sourceUrl: "https://cdn.openai.com/better-language-models/language-models.pdf"
  },
  "Language Models are Few-Shot Learners": {
    authors: "Tom Brown et al.",
    venue: "NeurIPS 2020",
    sourceUrl:
      "https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html"
  },
  "Finetuned Language Models Are Zero-Shot Learners": {
    authors: "Jason Wei et al.",
    venue: "ICLR 2022",
    sourceUrl: "https://openreview.net/forum?id=gEZrGCozdqR"
  },
  "Training language models to follow instructions with human feedback": {
    authors: "Long Ouyang et al.",
    venue: "arXiv 2022",
    sourceUrl: "https://arxiv.org/abs/2203.02155"
  },
  "Self-Instruct: Aligning Language Models with Self-Generated Instructions": {
    authors: "Yizhong Wang, Yeganeh Kordi, Swaroop Mishra, Alisa Liu, Noah A. Smith, Daniel Khashabi, Hannaneh Hajishirzi",
    venue: "ACL 2023",
    sourceUrl: "https://aclanthology.org/2023.acl-long.754/"
  },
  "LoRA: Low-Rank Adaptation of Large Language Models": {
    authors: "Edward J. Hu et al.",
    venue: "ICLR 2022",
    sourceUrl: "https://openreview.net/forum?id=nZeVKeeFYf9"
  },
  "Direct Preference Optimization: Your Language Model is Secretly a Reward Model": {
    authors: "Rafael Rafailov, Archit Sharma, Eric Mitchell, Christopher D. Manning, Stefano Ermon, Chelsea Finn",
    venue: "NeurIPS 2023",
    sourceUrl:
      "https://proceedings.neurips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html"
  },
  "Proximal Policy Optimization Algorithms": {
    authors: "John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov",
    venue: "arXiv 2017",
    sourceUrl: "https://arxiv.org/abs/1707.06347"
  },
  "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models": {
    authors: "Jason Wei et al.",
    venue: "NeurIPS 2022",
    sourceUrl: "https://arxiv.org/abs/2201.11903"
  },
  "Large Language Models are Zero-Shot Reasoners": {
    authors: "Takeshi Kojima, Shixiang Shane Gu, Machel Reid, Yutaka Matsuo, Yusuke Iwasawa",
    venue: "NeurIPS 2022",
    sourceUrl: "https://openreview.net/forum?id=e2TBb5y0yFf"
  },
  "Self-Consistency Improves Chain of Thought Reasoning in Language Models": {
    authors: "Xuezhi Wang et al.",
    venue: "ICLR 2023",
    sourceUrl:
      "https://research.google/pubs/self-consistency-improves-chain-of-thought-reasoning-in-language-models/"
  },
  "ReAct: Synergizing Reasoning and Acting in Language Models": {
    authors: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao",
    venue: "ICLR 2023",
    sourceUrl: "https://arxiv.org/abs/2210.03629"
  },
  "Tree of Thoughts: Deliberate Problem Solving with Large Language Models": {
    authors: "Shunyu Yao, Dian Yu, Jeffrey Zhao, Izhak Shafran, Thomas L. Griffiths, Yuan Cao, Karthik Narasimhan",
    venue: "NeurIPS 2023",
    sourceUrl: "https://arxiv.org/abs/2305.10601"
  },
  "Transformer Feed-Forward Layers Are Key-Value Memories": {
    authors: "Mor Geva, Roei Schuster, Jonathan Berant, Omer Levy",
    venue: "EMNLP 2021",
    sourceUrl: "https://aclanthology.org/2021.emnlp-main.446/"
  },
  "Language Models Implement Simple Word2Vec-Style Vector Arithmetic": {
    authors: "Jack Merullo, Carsten Eickhoff, Ellie Pavlick",
    venue: "Conference paper / arXiv",
    sourceUrl: "https://arxiv.org/abs/2305.16130"
  }
};

const SECTION_TITLES = [
  "Resumen",
  "Que aporta",
  "Que problema resuelve",
  "Metodo",
  "Dataset y evaluacion",
  "Que me llamo la atencion"
];

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeTopicLabel = (value) =>
  value
    .replace(/\u2028/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const extractKeyword = (description) => {
  const firstSentence = description.split(".")[0]?.trim();
  if (!firstSentence) return [];
  return firstSentence
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
};

const escapeYaml = (value) => `"${value.replaceAll('"', '\\"')}"`;

const renderBody = () =>
  SECTION_TITLES.map(
    (section) =>
      `## ${section}\n\nPendiente de completar.\n`
  ).join("\n");

const parseList = (rawText) => {
  const text = rawText.replace(/\u2028/g, "\n");
  const lines = text.split("\n");
  const papers = [];

  let currentTopic = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    const topicMatch = line.match(/^(\d+)\)\s+(.+)$/);
    if (topicMatch) {
      currentTopic = normalizeTopicLabel(topicMatch[2]);
      continue;
    }

    const paperMatch = line.match(/^(\d+)\s+(.+?)\s+\((\d{4})\)\s+—\s+(.+)$/);
    if (!paperMatch || !currentTopic) continue;

    const description = lines[index + 1]?.trim() ?? "";
    const title = paperMatch[4].trim();
    const metadata = METADATA[title];
    if (!metadata) {
      throw new Error(`Falta metadata para "${title}"`);
    }

    const topicId = TOPIC_MAP[currentTopic];
    if (!topicId) {
      throw new Error(`Tema no reconocido: "${currentTopic}"`);
    }

    papers.push({
      title,
      slug: slugify(title),
      topic: topicId,
      year: Number(paperMatch[3]),
      authors: metadata.authors,
      venue: metadata.venue,
      sourceUrl: metadata.sourceUrl,
      status: "pendiente",
      keywords: extractKeyword(description)
    });
  }

  return papers;
};

const renderFrontmatter = (paper) => {
  const keywords =
    paper.keywords.length === 0
      ? "[]"
      : `\n${paper.keywords.map((keyword) => `  - ${escapeYaml(keyword)}`).join("\n")}`;

  return `---\ntitle: ${escapeYaml(paper.title)}\nslug: ${escapeYaml(
    paper.slug
  )}\ntopic: ${escapeYaml(paper.topic)}\nyear: ${paper.year}\nauthors: ${escapeYaml(
    paper.authors
  )}\nvenue: ${escapeYaml(paper.venue)}\nsourceUrl: ${escapeYaml(
    paper.sourceUrl
  )}\nstatus: ${escapeYaml(paper.status)}\nkeywords:${keywords}\n---\n`;
};

const source = await import("node:fs/promises").then(({ readFile }) => readFile(SOURCE_FILE, "utf8"));
const papers = parseList(source);

await mkdir(OUTPUT_DIR, { recursive: true });

for (const paper of papers) {
  const filePath = path.join(OUTPUT_DIR, `${paper.slug}.md`);
  const content = `${renderFrontmatter(paper)}\n${renderBody()}`;
  await writeFile(filePath, content, "utf8");
}

console.log(`Seed completo: ${papers.length} papers generados en ${OUTPUT_DIR}`);
