---
title: "Efficient Estimation of Word Representations in Vector Space"
topic: "representaciones-distribucionales-embeddings"
year: 2013
authors: "Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean"
venue: "arXiv 2013"
sourceUrl: "https://arxiv.org/abs/1301.3781"
status: "leido"
memoryCue: "word2vec: embeddings densos con CBOW y skip-gram."
core: true
sectionAuthors:
  resumen: codex
  que-aporta: humano
  que-problema-resuelve: humano
  metodo: humano
  dataset-y-evaluacion: codex
  que-me-llamo-la-atencion: humano
keywords:
  - "word2vec"
---

## Resumen

Este paper presenta dos arquitecturas simples para aprender representaciones densas de palabras a gran escala: CBOW y skip-gram. La idea central es abandonar modelos neuronales más pesados, con capas ocultas costosas, y quedarse con modelos log-lineales que puedan entrenarse sobre muchísimos más datos.

La apuesta es pragmática: aunque el modelo individual sea más simple, la eficiencia permite usar corpus enormes y vectores de mayor dimensionalidad. Con eso, los embeddings capturan regularidades sintácticas y semánticas que después aparecen en operaciones vectoriales del tipo analogía.

## Qué aporta

Principalmente introduce un método eficiente para generar la semántica distribuida a gran escala. Introducen la idea de representación distribuida de palabras? No. Bengio ya lo había hecho a principios de los 2000 (Bengio et al, 2003), y Hinton ya lo había mencionado en los 80's en el libro Parallel Processing (Hinton, 1986).
Otra cosa que no aporta este paper es la aritmética de vectores (king - man + woman = queen), lo que ya lo había introducido el propio Mikolov antes. Este paper es una profundización de ese camino (exploitation), para llevar al máximo la eficiencia y escalabilidad. 
Diseñan un test para encontrar similaridades sintácticas y semánticas de palabras. 
Respecto a la NNLM de Bengio, lo que aporta es simplicidad, sacando la capa oculta del medio. En el paper admiten que perder esa linealidad hace que el modelo pierda riqueza, pero que esperan ganar en cantidad de datos que pueden entrenar. Así que en cierto sentido, lo que aportan es principalmente escalabilidad, o sea, la capacidad de procesar más datos de entrenamiento. 
También aportan el test de accuracy que consiste en poder hacer una regla de tres con palabras. La idea es que lo que el dólar es a EEUU, es lo que el yuan es a China, entonces si dado (EEUU, dólar, China) predecimos "yuan" (el vecino más cercano es yuan), entonces mejora el accuracy. Este test es novedoso, y con esto se comparan con métodos anteriores de representación distribucional. 

## Qué problema resuelve

Los modelos anteriores como N-grams tienen el problema de que no ven qué tan parecidas son dos palabras, porque son índices en un vocabulario. Entonces "casa", "puerta" y "maldecir" pueden estar en los índices 34, 1400 y 1402 respectivamente, sin que esos índices te digan nada respecto a sus significados. Estos aprendían a gran escala por su eficiencia, pero no entendían semántica. 
La ineficiencia de los modelos que aprendían representación distribuida, que llegaban a entrenar sobre pocos millones de palabras y solo con 50 a 100 dimensiones. 

## Método

En skip-gram, el modelo toma una palabra central como vector one-hot. Ese vector funciona como selector: activa una fila de la matriz de embeddings, obtiene una representación densa, y desde ahí intenta predecir las palabras que aparecen alrededor en el contexto. La pérdida compara esas probabilidades con las palabras vecinas reales y ajusta las matrices del modelo.

<figure class="paper-figure">
  <img src="/images/word2vec-skipgram-loss-codex.png" alt="Apunte dibujado a mano que explica la arquitectura skip-gram de word2vec, desde el one-hot encoding hasta la loss." />
  <figcaption>Imagen generada por Codex Images v2 para clarificar la arquitectura skip-gram de word2vec.</figcaption>
</figure>

## Dataset y evaluación

Usan corpus grandes, especialmente Google News, con alrededor de 6B tokens y vocabulario restringido al millón de palabras más frecuentes. También comparan arquitecturas sobre corpus LDC más chicos, de 320M palabras y 82K de vocabulario, para contrastar contra modelos anteriores como RNNLM.

La evaluación principal es un test de analogías sintácticas y semánticas: dadas tres palabras, el modelo tiene que completar la cuarta usando operaciones vectoriales. El resultado importante es que CBOW y skip-gram logran buena accuracy con mucho menor costo computacional; skip-gram suele rendir mejor en semántica, mientras CBOW entrena más rápido.

## Qué me llamó la atención

Que se encuentren similaridades sintácticas entre palabras. 
