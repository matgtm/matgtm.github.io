---
title: "GloVe: Global Vectors for Word Representation"
topic: "representaciones-distribucionales-embeddings"
year: 2014
authors: "Jeffrey Pennington, Richard Socher, Christopher Manning"
venue: "EMNLP 2014"
sourceUrl: "https://aclanthology.org/D14-1162/"
status: "leido"
memoryCue: "Embeddings desde co-ocurrencias globales y ratios semanticos."
core: false
sectionAuthors:
  resumen: codex
  que-aporta: humano
  que-problema-resuelve: humano
  metodo: humano
  dataset-y-evaluacion: codex
  que-me-llamo-la-atencion: humano
keywords:
  - "GloVe"
---

## Resumen

GloVe propone aprender embeddings estáticos a partir de una matriz global de co-ocurrencias del corpus. En vez de mirar solo ejemplos locales de una ventana, como en skip-gram, resume primero cuántas veces aparece cada palabra cerca de cada otra y después entrena vectores para que sus productos punto reconstruyan, de forma aproximada, el logaritmo de esas co-ocurrencias.

La intuición del paper es que la semántica no está solo en que dos palabras aparezcan juntas, sino en los ratios de co-ocurrencia con otras palabras. Por eso GloVe combina una mirada global, más cercana a la factorización matricial, con un entrenamiento eficiente de embeddings densos.

## Qué aporta

Combina los métodos de factorización matricial y de ventana de contexto tipo word2vec. Lo que aporta es tener la estadística global del corpus, y no solo la ventana local, como w2v. La idea es así: querés averiguar cuánto fumar depende de si las personas con las que pasás más tiempo fuman. Los de word2vec salen a hacer el censo de un pueblo y a cada persona le van preguntando si fuma, con quién se vincula y quiénes de sus vínculos fuman, y va sacando conclusiones a medida que la encuesta avanza. Los de Glove te dicen: hacé una encuesta preguntando quién fuma y quiénes se vinculan, armemos un grafo de vínculos del pueblo entero, y con todo el grafo a la vista, saquemos conclusiones. La promesa es que esto último no solo es más eficiente sino que te da una estructura que te permita sacar mejores conclusiones sobre la influencia del fumar.

Otra ventaja, según los autores, que te da el tener la estadística global en la matriz de co-ocurrencias, es que te permite ver los ratios. Por ejemplo, entre perro y mascota, y gato y mascota, hay muchas co-ocurrencias, pero con "ladrar" solo "perro" las tiene, lo que permite ver en qué sentidos (dimensiones?) perro y gato se acercan y en qué sentidos se alejan. Eso, según ellos, te ofrece la estructura semántica de las palabras, ya servida arriba de la mesa. Con w2v, no podías ver eso, porque siempre estás mirando tu ventana local, o sea, cuando estás mirando "gato" el modelo no capta cómo "ladrar" lo diferencia de "perro" a pesar de que "mascota" lo acerca.

## Que problema resuelve

word2vec busca co-ocurrencias locales de palabras dentro de un sliding window, y según los autores eso no aprovecha la ventaja de tener una estadística global del corpus, o sea, las repeticiones cuando tenés el global. Por ejemplo, ves que "perro" y "collar" aparecen 300 veces juntas, pero lo ves una por vez sin saber el total de veces que aparecen juntas, cuando en Glove, ya tenés el número total de co-ocurrencias. 

Resuelve otro problema de w2v: si querés agregar más corpus, actualizás la matriz de co-ocurrencias y volver a calcular el modelo regresivo. Con w2v, tendrías que recalcular todo el modelo desde cero.

## Método

Se arma matriz de co-ocurrencias X, con cadaa entrada X_ij siendo la cantidad de veces que la palabra j aparece en el contexto de la palabra i. Por ejemplo si "perro" está en la fila 100 y "collar" está en la columna 200, entonces X_100,200 es la cantidad de veces que "collar" aparece en el contexto de "perro". Primera pregunta que me surge es: esta matriz simétrica? O sea, X_ij = X_ji? 
Luego se arman dos matrices W y W_tilde, que son los parámetros que vamos a entrenar, o sea, los embeddings finales de las palabras que queremos hallar. Hay un poco de matemática pesada en el paper, pero básicamente quieren que el producto punto entre W_i y W_j_tilde sea igual a log(X_ij). O sea, el producto punto entre los embeddings de las palabras i y j debería ser igual al logaritmo de la cantidad de veces que aparecen juntas en el corpus. Cuanto más co-ocurrencia, más cercanos los vectores. Hay varios matices en el medio. 

<figure class="paper-figure">
  <img src="/images/glove-pipeline-chalkboard-codex.png" alt="Diagrama en pizarrón que explica el pipeline general de GloVe, desde el corpus y la matriz de co-ocurrencias hasta la pérdida ponderada y los embeddings finales." />
  <figcaption>Imagen generada por Codex Images v2 para clarificar el pipeline general del método GloVe.</figcaption>
</figure>

## Dataset y evaluación

Entrenan sobre corpus de distintos tamaños, incluyendo Wikipedia, Gigaword y Common Crawl. La evaluación principal compara embeddings en tareas de analogías semánticas y sintácticas, similitud entre palabras y reconocimiento de entidades nombradas.

El resultado central es que GloVe compite muy bien contra métodos de ventana local como skip-gram y contra métodos de factorización matricial tradicionales. En particular, muestra buen rendimiento en analogías y similitud semántica, reforzando la idea de que la matriz global de co-ocurrencias contiene una estructura útil para aprender representaciones.

## Qué me llamó la atención

Que no veo cómo aprovechan el tener las estadísticas ya precalculadas para entender la estructura semántica del corpus. Presentan los ratios como algo importante, y no veo cómo los aprovechan en el entrenamiento (y cómo word2vec no lo hace). Varios papers posteriores (Levy et al., 2014; Levy, 2015; Kenyon-Dean et al., 2020) insisten en la similitud profunda que hay entre w2v y Glove, lo que da indicio de que matemáticamente hacen prácticamente lo mismo. 
