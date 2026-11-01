/* i18n: castellà (es) ↔ valencià normatiu AVL (va)
   Estratègia: els arrays de contingut es substituïxen a l'arrencada (js/va-datos*.js)
   i el text estàtic es tradueix amb aquest diccionari (text nodes + atributs). */
(function () {
  'use strict';

  var LANG = 'es';

  /* ---------- diccionari ES → VA ---------- */
  var DICT = {
    /* capçalera i navegació */
    "Atajos de la página": `Atalls de la pàgina`,
    "Ir al contenido": `Anar al contingut`,
    "Ir a los sesgos": `Anar als biaixos`,
    "Ir al detector": `Anar al detector`,
    "Ir a los tests": `Anar als tests`,
    "Saltar al contenido": `Saltar al contingut`,
    "Secciones de la guía": `Seccions de la guia`,
    "Marco": `Marc`,
    "Sesgos": `Biaixos`,
    "Falacias": `Fal·làcies`,
    "Conexiones": `Connexions`,
    "Antídotos": `Antídots`,
    "Fuentes": `Fonts`,
    "El marco": `El marc`,
    "Sesgos cognitivos": `Biaixos cognitius`,
    "Falacias lógicas": `Fal·làcies lògiques`,
    "Más allá": `Més enllà`,
    "Modo estudio": `Mode estudi`,
    "Progreso de lectura": `Progrés de lectura`,
    "Sesgos & Falacias": `Biaixos & Fal·làcies`,

    /* hero */
    "Guía interactiva con evidencia": `Guia interactiva amb evidència`,
    "Tu cerebro te miente.": `El teu cervell et ment.`,
    "La evidencia lo demuestra.": `L'evidència ho demostra.`,
    "Sesgos cognitivos y falacias lógicas explicados con estudios citados, un detector de manipulación en 60 segundos y tres tests para comprobar si distingues un argumento de un truco.": `Biaixos cognitius i fal·làcies lògiques explicats amb estudis citats, un detector de manipulació en 60 segons i tres tests per a comprovar si distingeixes un argument d'un truc.`,
    "Fuentes con DOI": `Fonts amb DOI`,
    "Detector en 60 s": `Detector en 60 s`,
    "12 preguntas clave": `12 preguntes clau`,
    "3 tests": `3 tests`,
    "Empezar por los sesgos": `Començar pels biaixos`,
    "Probar el detector": `Provar el detector`,
    "Tests": `Tests`,
    "Cómo se usa": `Com s'usa`,
    "Entiende el mecanismo": `Entén el mecanisme`,
    "en el marco: Sistema 1, metacognición y debiasing.": `en el marc: Sistema 1, metacognició i debiasing.`,
    "Reconoce el patrón": `Reconeix el patró`,
    "en las fichas de sesgos y falacias, con su fuente.": `en les fitxes de biaixos i fal·làcies, amb la seua font.`,
    "Ponlo a prueba": `Posa-ho a prova`,
    "con el detector de 60 segundos y los tres tests.": `amb el detector de 60 segons i els tres tests.`,
    "analiza --mensaje \"todos lo dicen, es obvio\"": `analitza --missatge "tots ho diuen, és obvi"`,
    "→ apelación a la mayoría (ad populum)": `→ apel·lació a la majoria (ad populum)`,
    "→ sesgo de falso consenso": `→ biaix de fals consens`,
    "⚠ sin fuente · sin dato · presión social": `⚠ sense font · sense dada · pressió social`,
    "✓ 3 antídotos disponibles más abajo": `✓ 3 antídots disponibles més avall`,

    /* marc */
    "Fundamentos con evidencia": `Fonaments amb evidència`,
    "El marco: por qué tu mente falla": `El marc: per què la teua ment falla`,
    "Los sesgos no son defectos de carácter: son el resultado de cómo está cableado el cerebro. La distinción entre Sistema 1 y Sistema 2 tiene correlatos neuronales medibles, y la investigación sobre debiasing muestra que se pueden reducir con entrenamiento.": `Els biaixos no són defectes de caràcter: són el resultat de com està cablejat el cervell. La distinció entre Sistema 1 i Sistema 2 té correlats neuronals mesurables, i la investigació sobre debiasing mostra que es poden reduir amb entrenament.`,
    "Doble proceso: Sistema 1 y Sistema 2": `Doble procés: Sistema 1 i Sistema 2`,
    "Sistema 1:": `Sistema 1:`,
    "Sistema 2:": `Sistema 2:`,
    "Firmas neuronales distintas": `Firmes neuronals distintes`,
    "El Sistema 1 se asocia con": `El Sistema 1 s'associa amb`,
    "potencia alfa parietal": `potència alfa parietal`,
    "el Sistema 2, con": `el Sistema 2, amb`,
    "potencia theta frontal": `potència theta frontal`,
    "El efecto encuadre correlaciona con la": `L'efecte emmarcament correlaciona amb l'`,
    "amígdala": `amígdala`,
    "la corteza prefrontal orbital/medial predice menor susceptibilidad.": `l'escorça prefrontal orbital/medial prediu menor susceptibilitat.`,
    "Metacognición: la base del pensamiento crítico": `Metacognició: la base del pensament crític`,
    "La metacognición regula la conciencia intelectual: planificar, monitorear y evaluar el propio pensamiento. Pensamiento crítico y metacognición son competencias interdependientes que deben entrenarse juntas.": `La metacognició regula la consciència intel·lectual: planificar, monitorar i avaluar el propi pensament. Pensament crític i metacognició són competències interdependents que s'han d'entrenar juntes.`,
    "Debiasing: ¿se puede entrenar?": `Debiasing: es pot entrenar?`,
    "Sí, con matices. Un meta-análisis de 2025 (53 estudios) encontró una": `Sí, amb matisos. Una meta-anàlisi de 2025 (53 estudis) va trobar una`,
    "mejora pequeña pero significativa": `millora xicoteta però significativa`,
    "Las intervenciones más efectivas incluyen \"considerar lo opuesto\" y feedback.": `Les intervencions més efectives inclouen "considerar el contrari" i feedback.`,

    /* seccions */
    "El enemigo interno · Evidencia académica": `L'enemic intern · Evidència acadèmica`,
    "Cada tarjeta incluye": `Cada fitxa inclou`,
    "evidencia académica": `evidència acadèmica`,
    "con enlace clicable a la fuente. Haz clic para desplegar el análisis, el antídoto y la cita.": `amb enllaç clicable a la font. Fes clic per a desplegar l'anàlisi, l'antídot i la cita.`,
    "Buscar sesgo…": `Buscar biaix…`,
    "Buscar sesgo por nombre o descripción": `Buscar biaix per nom o descripció`,
    "Todos": `Tots`,
    "Todas": `Totes`,
    "Creencia": `Creença`,
    "Memoria": `Memòria`,
    "Decisión": `Decisió`,
    "Grupo": `Grup`,
    "Relevancia": `Rellevància`,
    "Lenguaje": `Llenguatge`,
    "Inducción": `Inducció`,
    "Presunción": `Presumpció`,
    "Modo estudio: definiciones y ejemplos difuminados.": `Mode estudi: definicions i exemples difuminats.`,
    "Pasa el cursor para revelarlos.": `Passa el cursor per a revelar-los.`,
    "Toca la tarjeta para revelarlos.": `Toca la fitxa per a revelar-los.`,
    "Modo estudio activo.": `Mode estudi actiu.`,
    "El enemigo externo · Lógica informal": `L'enemic extern · Lògica informal`,
    "La tradición de Hamblin (1970) y Walton (1995) muestra que una falacia es una técnica de argumentación mal utilizada que obstaculiza el diálogo. Walton advierte que el": `La tradició de Hamblin (1970) i Walton (1995) mostra que una fal·làcia és una tècnica d'argumentació mal utilitzada que obstaculitza el diàleg. Walton adverteix que l'`,
    "no siempre es falaz; lo es cuando desplaza la carga de la prueba.": `no sempre és fal·laç; ho és quan desplaça la càrrega de la prova.`,
    "Buscar falacia…": `Buscar fal·làcia…`,
    "Buscar falacia por nombre o descripción": `Buscar fal·làcia per nom o descripció`,
    "La fórmula del canal": `La fórmula del canal`,
    "Conexiones: el sesgo abre la puerta, la falacia entra": `Connexions: el biaix obri la porta, la fal·làcia entra`,
    "Los manipuladores diseñan falacias para activar tus sesgos. Estas son las parejas con mayor respaldo en la literatura sobre desinformación y polarización.": `Els manipuladors dissenyen fal·làcies per a activar els teus biaixos. Estes són les parelles amb més suport en la literatura sobre desinformació i polarització.`,

    /* detector */
    "Herramienta práctica": `Eina pràctica`,
    "Detector: cómo saber si te están manipulando": `Detector: com saber si t'estan manipulant`,
    "Protocolo de 60 segundos, 12 preguntas universales, señales de alarma, detector por concepto y analizador interactivo.": `Protocol de 60 segons, 12 preguntes universals, senyals d'alarma, detector per concepte i analitzador interactiu.`,
    "⏱️ Protocolo de 60 segundos": `⏱️ Protocol de 60 segons`,
    "Aplícalo ante cualquier mensaje que te provoque una reacción fuerte o que vayas a compartir.": `Aplica'l davant de qualsevol missatge que et provoque una reacció forta o que vages a compartir.`,
    "Pausa emocional": `Pausa emocional`,
    "¿Qué emoción siento? Si es fuerte (ira, miedo, satisfacción), es señal de alarma.": `Quina emoció sent? Si és forta (ràbia, por, satisfacció), és senyal d'alarma.`,
    "Fuente": `Font`,
    "¿Quién lo dice? ¿Es experto en AQUEST tema? ¿Qué gana si le creo?": `Qui ho diu? És expert en AQUEST tema? Què guanya si li crec?`,
    "Evidencia": `Evidència`,
    "¿Dónde están los datos? ¿Qué falta? ¿Se ataca a alguien en vez del argumento?": `On estan les dades? Què falta? S'ataca algú en compte de l'argument?`,
    "Inversión": `Inversió`,
    "¿Qué evidencia me haría cambiar de opinión? ¿La he buscado?": `Quina evidència em faria canviar d'opinió? L'he buscada?`,
    "Metacognición": `Metacognició`,
    "¿Busco la verdad o solo tener razón? ¿Proceso o reacciono?": `Busque la veritat o només tindre raó? Processe o reaccione?`,
    "✅ Las 12 preguntas universales": `✅ Les 12 preguntes universals`,
    "Marca las que te hayas hecho antes de aceptar o compartir un mensaje.": `Marca les que t'hages fet abans d'acceptar o compartir un missatge.`,
    "← Atrás": `← Arrere`,
    "Siguiente →": `Següent →`,
    "Repetir el cuestionario": `Repetir el qüestionari`,
    "🚩 Señales de alarma universales": `🚩 Senyals d'alarma universals`,
    "Si detectas varias en un mismo mensaje, sospecha y verifica.": `Si en detectes diverses en un mateix missatge, sospita i verifica.`,
    "Emoción intensa": `Emoció intensa`,
    "Miedo, indignación, urgencia o euforia. El Sistema 1 secuestra el juicio.": `Por, indignació, urgència o eufòria. El Sistema 1 segresta el juí.`,
    "\"Todos\", \"nadie\", \"es obvio\"": `"Tots", "ningú", "és obvi"`,
    "Apelación a la mayoría o al sentido común sin evidencia.": `Apel·lació a la majoria o al sentit comú sense evidència.`,
    "Ataques personales": `Atacs personals`,
    "Se ataca a la persona o al grupo en vez de al argumento.": `S'ataca la persona o el grup en compte de l'argument.`,
    "Exageración del rival": `Exageració del rival`,
    "\"Así que quieres...\". Distorsión de la posición contraria.": `"Així que vols...". Distorsió de la posició contrària.`,
    "Autoridades irrelevantes": `Autoritats irrellevants`,
    "Un actor, un deportista o un experto fuera de su campo.": `Un actor, un esportista o un expert fora del seu camp.`,
    "Datos sin fuente": `Dades sense font`,
    "\"Estudios dicen\", \"expertos afirman\", cifras sin origen.": `"Estudis diuen", "experts afirmen", xifres sense origen.`,
    "Urgencia para decidir": `Urgència per a decidir`,
    "\"Solo hoy\", \"comparte antes de que lo borren\".": `"Només hui", "comparteix abans que ho esborren".`,
    "Anécdota como prueba": `Anècdota com a prova`,
    "Un caso personal presentado como evidencia general.": `Un cas personal presentat com a evidència general.`,
    "\"Siempre se ha hecho así\"": `"Sempre s'ha fet així"`,
    "Tradición como argumento de autoridad.": `Tradició com a argument d'autoritat.`,
    "Preguntas con presuposición": `Preguntes amb pressuposició`,
    "\"¿Por qué X es tan malo?\" asume que X es malo.": `"Per què X és tan roín?" assumeix que X és roín.`,
    "Solo datos que confirman": `Només dades que confirmen`,
    "Se omite la evidencia contraria. Cherry picking.": `S'omet l'evidència contrària. Cherry picking.`,
    "Conclusión repetida como prueba": `Conclusió repetida com a prova`,
    "El argumento es circular: asume lo que quiere demostrar.": `L'argument és circular: assumeix el que vol demostrar.`,
    "🔬 Detector por concepto": `🔬 Detector per concepte`,
    "Señales específicas y pregunta clave para cada sesgo y falacia.": `Senyals específiques i pregunta clau per a cada biaix i fal·làcia.`,
    "Buscar en el detector…": `Buscar en el detector…`,
    "Buscar en el detector por concepto o señal": `Buscar en el detector per concepte o senyal`,
    "🧪 Analizador interactivo de mensajes": `🧪 Analitzador interactiu de missatges`,
    "Piensa en un mensaje concreto. Marca las señales que detectes y obtén una evaluación del riesgo de manipulación.": `Pensa en un missatge concret. Marca els senyals que detectes i obtín una avaluació del risc de manipulació.`,
    "El resultado es orientativo: no prueba que el mensaje sea falso, pero indica cuánta cautela deberías aplicar.": `El resultat és orientatiu: no prova que el missatge siga fals, però indica quanta cautela hauries d'aplicar.`,
    "Señales de manipulación": `Senyals de manipulació`,
    "🔄 Reiniciar análisis": `🔄 Reiniciar l'anàlisi`,

    /* antídots */
    "Defensa basada en evidencia": `Defensa basada en evidència`,
    "Antídotos: qué funciona según la investigación": `Antídots: què funciona segons la investigació`,
    "No puedes \"desactivar\" los sesgos, pero la evidencia meta-analítica muestra que el entrenamiento con estrategias concretas produce mejoras medibles.": `No pots "desactivar" els biaixos, però l'evidència meta-analítica mostra que l'entrenament amb estratègies concretes produeix millores mesurables.`,
    "Tipos de antídoto": `Tipus d'antídot`,
    "🧠 Entrenar la mente": `🧠 Entrenar la ment`,
    "🌍 Entrenar el entorno": `🌍 Entrenar l'entorn`,
    "🛠️ Práctica diaria": `🛠️ Pràctica diària`,
    "1. \"Considerar lo opuesto\"": `1. "Considerar el contrari"`,
    "Obliga al Sistema 2 a generar razones contra la propia posición, contrarrestando el": `Obliga el Sistema 2 a generar raons contra la pròpia posició, contrarestant el`,
    "Es una de las estrategias con mayor efecto en el meta-análisis de 2025.": `És una de les estratègies amb major efecte en la meta-anàlisi de 2025.`,
    "Escribe tu opinión y tres razones por las que podrías estar equivocado.": `Escriu la teua opinió i tres raons per les quals podries estar equivocat.`,
    "2. Dar tiempo para deliberar": `2. Donar temps per a deliberar`,
    "El pensamiento rápido es un motor de la creencia en desinformación. Dar tiempo reduce la creencia en titulares falsos.": `El pensament ràpid és un motor de la creença en desinformació. Donar temps redueix la creença en titulars falsos.`,
    "Regla de los 10 minutos antes de compartir algo que te indigna.": `Regla dels 10 minuts abans de compartir alguna cosa que t'indigne.`,
    "3. Recordatorios de precisión": `3. Recordatoris de precisió`,
    "Simples recordatorios sobre la importancia de la precisión mejoran la distinción verdad/falsedad, incluso en experimentos de campo en Twitter.": `Simples recordatoris sobre la importància de la precisió milloren la distinció veritat/falsedat, fins i tot en experiments de camp en Twitter.`,
    "Antes de compartir: \"¿Es esto preciso? ¿Lo he verificado?\".": `Abans de compartir: "És açò precís? Ho he verificat?".`,
    "1. Discernimiento de fuentes": `1. Discerniment de fonts`,
    "No aceptes información sin verificar su origen. La fuente primaria siempre es mejor que la interpretación.": `No acceptes informació sense verificar-ne l'origen. La font primària sempre és millor que la interpretació.`,
    "¿Quién lo dice? ¿Es fuente primaria? ¿Cuál es su interés? ¿Qué dicen fuentes opuestas?": `Qui ho diu? És font primària? Quin és el seu interés? Què diuen fonts oposades?`,
    "2. Escapar de la burbuja de filtro": `2. Escapar de la bambolla de filtre`,
    "Los algoritmos amplifican el sesgo de confirmación. La exposición selectiva es casi el doble de probable hacia información congenial.": `Els algorismes amplifiquen el biaix de confirmació. L'exposició selectiva és quasi el doble de probable cap a informació congenial.`,
    "Sigue a personas rigurosas con puntos de vista diferentes.": `Segueix persones rigoroses amb punts de vista diferents.`,
    "3. Diario de sesgos": `3. Diari de biaixos`,
    "La autoobservación entrena la metacognición, la base del pensamiento crítico.": `L'autoobservació entrena la metacognició, la base del pensament crític.`,
    "Cada noche, anota una situación y el sesgo que pudo operar.": `Cada nit, anota una situació i el biaix que va poder operar.`,
    "1. La regla de las tres fuentes": `1. La regla de les tres fonts`,
    "Antes de formarte una opinión importante, consulta al menos tres fuentes con perspectivas distintas.": `Abans de formar-te una opinió important, consulta almenys tres fonts amb perspectives distintes.`,
    "Medio afín, medio contrario y medio internacional. Compara hechos e interpretaciones.": `Mitjà afí, mitjà contrari i mitjà internacional. Compara fets i interpretacions.`,
    "2. El test de la inversión": `2. El test de la inversió`,
    "Pregúntate qué tendría que ser verdad para que tu decisión sea un error.": `Pregunta't què hauria de ser veritat perquè la teua decisió siga un error.`,
    "Si vas a comprar por impulso, espera 48 horas. Si ya no lo quieres, era un sesgo.": `Si vas a comprar per impuls, espera 48 hores. Si ja no ho vols, era un biaix.`,
    "3. Etiquetar la falacia en voz alta": `3. Etiquetar la fal·làcia en veu alta`,
    "Ponerle nombre a la falacia activa el Sistema 2 y te da distancia crítica. La teoría de Walton permite distinguir cuándo un ataque es legítimo y cuándo es falaz.": `Posar-li nom a la fal·làcia activa el Sistema 2 i et dóna distància crítica. La teoria de Walton permet distingir quan un atac és legítim i quan és fal·laç.`,
    "\"Eso es un ad hominem\", \"Eso es cherry picking\".": `"Això és un ad hominem", "Això és cherry picking".`,

    /* fonts */
    "Referencias": `Referències`,
    "Fuentes académicas citadas": `Fonts acadèmiques citades`,
    "Cada referencia incluye un enlace clicable a DOI, PDF o página del editor.": `Cada referència inclou un enllaç clicable a DOI, PDF o pàgina de l'editor.`,
    "Concepto": `Concepte`,
    "Referencia": `Referència`,
    "Heurísticos y sesgos": `Heurístics i biaixos`,
    "Doble proceso (S1/S2)": `Doble procés (S1/S2)`,
    "Base neurocientífica S1/S2": `Base neurocientífica S1/S2`,
    "Encuadre y amígdala": `Emmarcament i amígdala`,
    "Confirmación (meta-análisis)": `Confirmació (meta-anàlisi)`,
    "Razonamiento motivado": `Raonament motivat`,
    "Dunning-Kruger (original)": `Dunning-Kruger (original)`,
    "Dunning-Kruger (crítica)": `Dunning-Kruger (crítica)`,
    "Efecto de negatividad": `Efecte de negativitat`,
    "Coste hundido": `Cost irrecuperable`,
    "Falacias (tratamiento estándar)": `Fal·làcies (tractament estàndard)`,
    "Falacias (pragma-dialéctica)": `Fal·làcies (pragma-dialèctica)`,
    "Debiasing (meta-análisis)": `Debiasing (meta-anàlisi)`,
    "Desinformación y redes": `Desinformació i xarxes`,

    /* tests */
    "Autoevaluación": `Autoavaluació`,
    "Tests: ¿detectarías la manipulación?": `Tests: detectaries la manipulació?`,
    "Elige el modo. Cada test tiene preguntas distintas, retroalimentación explicada y referencias clicables.": `Triu el mode. Cada test té preguntes distintes, retroalimentació explicada i referències clicables.`,
    "Elige un test": `Triu un test`,
    "🧠 Test de Sesgos": `🧠 Test de Biaixos`,
    "⚖️ Test de Falacias": `⚖️ Test de Fal·làcies`,
    "🕵️ Test de Detección": `🕵️ Test de Detecció`,
    "Opciones de respuesta": `Opcions de resposta`,
    "🔄 Repetir test": `🔄 Repetir test`,

    /* peu */
    "Paz mental en tu mundo digital.": `Pau mental en el teu món digital.`,
    "Guía educativa sobre sesgos cognitivos y falacias lógicas. Cada tarjeta cita su fuente académica: la credibilidad también se construye con evidencia.": `Guia educativa sobre biaixos cognitius i fal·làcies lògiques. Cada fitxa cita la seua font acadèmica: la credibilitat també es construeix amb evidència.`,
    "Guía": `Guia`,
    "Contacto": `Contacte`,
    "Cuéntame qué necesitas": `Conta'm què necessites`,
    "Escribe tu mensaje…": `Escriu el teu missatge…`,
    "Enviar mensaje": `Enviar missatge`,
    "Contenido educativo · no sustituye asesoramiento profesional": `Contingut educatiu · no substituïx l'assessorament professional`,
    "Volver arribar arriba": `Tornar a dalt`,
    "Volver arriba": `Tornar a dalt`,

    /* dinàmics del JS */
    "Ver análisis completo y fuente": `Veure anàlisi completa i font`,
    "Ocultar análisis": `Ocultar anàlisi`,
    "Ver la fuente en la bibliografía →": `Veure la font en la bibliografia →`,
    "Copiar enlace para compartir": `Copiar enllaç per a compartir`,
    "✓ Enlace copiado": `✓ Enllaç copiat`,
    "🎲 Al azar": `🎲 A l'atzar`,
    "Pregunta 1 de 12": `Pregunta 1 de 12`,
    "Resultado final": `Resultat final`,
    "Toca la tarjeta si ya te la has hecho": `Toca la fitxa si ja t'ho has fet`,
    "✓ Marcada como hecha": `✓ Marcada com a feta`,
    "Reiniciar progreso": `Reiniciar progrés`,
    "Progreso borrado ✓": `Progrés esborrat ✓`,
    "Las has comprobado todas. Ese es el hábito que protege del sesgo.": `Les has comprovades totes. Eixe és l'hàbit que protegeix del biaix.`,
    "Vas por buen camino: repasa las que te faltan antes de compartir.": `Vas pel bon camí: repassa les que et falten abans de compartir.`,
    "Te faltan bastantes. Con un mensaje que te indigne, haz al menos las seis primeras.": `Te'n falten bastantes. Amb un missatge que t'indigne, fes almenys les sis primeres.`,
    "Preguntas marcadas": `Preguntes marcades`,
    "Navegación entre secciones": `Navegació entre seccions`,
    "Necesitas repasar. Vuelve a las tarjetas y al modo estudio.": `Necessites repassar. Torna a les fitxes i al mode estudi.`,
    "¡Perfecto! Tienes ojo crítico.": `Perfecte! Tens bon ull crític.`,
    "Muy bien. Te queda un detalle por pulir.": `Molt bé. Et queda un detall per polir.`,
    "Aprobado justo. Repasa los conceptos donde fallaste.": `Aprovat just. Repassa els conceptes on vas fallar.`,
  };

  /* regles per a textos dinàmics amb números */
  var RULES = [
    [/^(\d+) conceptos?$/, `$1 conceptes`],
    [/^(\d+) de (\d+) conceptos?$/, `$1 de $2 conceptes`],
    [/^(\d+) de (\d+) señales marcadas$/, `$1 de $2 senyals marcades`],
    [/^(\d+) de (\d+) preguntas hechas$/, `$1 de $2 preguntes fetes`],
    [/^Pregunta (\d+) de (\d+)$/, `Pregunta $1 de $2`],
    [/^Resultado final · (\d+) preguntas$/, `Resultat final · $1 preguntes`],
    [/^Concepto (\d+) de (\d+)(.*)$/, `Concepte $1 de $2`],
    [/^Ningún concepto coincide\. Prueba otra palabra o quita el filtro\.$/, `Cap concepte coincideix. Prova una altra paraula o lleva el filtre.`]
  ];

  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

  function translateValue(value) {
    if (!value) return null;
    var key = value.trim();
    if (!key) return null;
    if (DICT[key]) return value.replace(key, DICT[key]);
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(key)) return value.replace(key, key.replace(RULES[i][0], RULES[i][1]));
    }
    return null;
  }

  var observer = null;
  var pending = false;

  function translateTree(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === 'SCRIPT' || p === 'STYLE' || p === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var out = translateValue(n.nodeValue);
      if (out !== null) n.nodeValue = out;
    }
    if (root.nodeType === 1) {
      ATTRS.forEach(function (a) {
        var v = root.getAttribute && root.getAttribute(a);
        var out = translateValue(v);
        if (out !== null) root.setAttribute(a, out);
      });
      root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(function (el) {
        ATTRS.forEach(function (a) {
          var v = el.getAttribute(a);
          var out = translateValue(v);
          if (out !== null) el.setAttribute(a, out);
        });
      });
    }
  }

  function startObserver() {
    if (observer) return;
    observer = new MutationObserver(function (muts) {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        muts.forEach(function (m) {
          if (m.type === 'characterData') {
            var out = translateValue(m.target.nodeValue);
            if (out !== null) m.target.nodeValue = out;
          } else {
            m.addedNodes.forEach(function (nd) {
              if (nd.nodeType === 1) translateTree(nd);
              else if (nd.nodeType === 3) {
                var o = translateValue(nd.nodeValue);
                if (o !== null) nd.nodeValue = o;
              }
            });
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function setLangAria(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  window.SF_I18N = {
    lang: function () { return LANG; },
    isVA: function () { return LANG === 'va'; },
    t: function (s) {
      if (LANG !== 'va') return s;
      var out = translateValue(s);
      return out === null ? s : out;
    },
    apply: function () {
      LANG = 'va';
      document.documentElement.lang = 'va';
      var tm = document.querySelector('meta[property="og:locale"]');
      if (tm) tm.setAttribute('content', 'ca_ES');
      document.title = `Biaixos i fal·làcies · Guia interactiva amb evidència | AndreuMatic`;
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute('content', `Guia interactiva de biaixos cognitius i fal·làcies lògiques amb estudis citats, detector de manipulació en 60 segons, 12 preguntes clau i tres tests.`);
      var ogt = document.querySelector('meta[property="og:title"]');
      if (ogt) ogt.setAttribute('content', `Biaixos i fal·làcies · Guia interactiva amb evidència`);
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) ogd.setAttribute('content', `El teu cervell et ment. L'evidència ho demostra. Biaixos cognitius i fal·làcies lògiques amb fonts acadèmiques, detector de manipulació i tests.`);
      var twt = document.querySelector('meta[name="twitter:title"]');
      if (twt) twt.setAttribute('content', `Biaixos i fal·làcies · Guia interactiva amb evidència`);
      var twd = document.querySelector('meta[name="twitter:description"]');
      if (twd) twd.setAttribute('content', `El teu cervell et ment. L'evidència ho demostra. 19 biaixos, 16 fal·làcies i detector de manipulació.`);
      translateTree(document.body);
      setLangAria('va');
      startObserver();
    },
    wire: function (active) {
      setLangAria(active || LANG);
      var btns = document.querySelectorAll('.lang-btn');
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          var lang = b.getAttribute('data-lang');
          try { localStorage.setItem('sf:lang', lang); } catch (e) {}
          var url = new URL(location.href);
          url.searchParams.set('lang', lang);
          location.href = url.toString();
        });
      });
    }
  };
})();
