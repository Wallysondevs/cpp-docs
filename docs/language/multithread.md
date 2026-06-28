# Execuções multi-threaded e data races (desde C++11)

Uma _thread de execução_ é um fluxo de controle dentro de um programa que começa com a invocação de uma função de nível superior específica (por [std::thread](<#/doc/thread/thread>), [std::async](<#/doc/thread/async>), [std::jthread](<#/doc/thread/jthread>)(desde C++20) ou outros meios), e recursivamente incluindo cada invocação de função subsequentemente executada pela thread.

  * Quando uma thread cria outra, a chamada inicial para a função de nível superior da nova thread é executada pela nova thread, não pela thread criadora.

Qualquer thread pode potencialmente acessar qualquer objeto e função no programa:

  * Objetos com [duração de armazenamento](<#/doc/language/storage_duration>) automática e thread-local ainda podem ser acessados por outra thread através de um ponteiro ou por referência.
  * Em uma [implementação hospedada](<#/doc/freestanding>), um programa C++ pode ter mais de uma thread sendo executada concorrentemente. A execução de cada thread prossegue conforme definido pelo restante desta página. A execução do programa inteiro consiste na execução de todas as suas threads.
  * Em uma [implementação freestanding](<#/doc/freestanding>), é definido pela implementação se um programa pode ter mais de uma thread de execução.

Para um [signal handler](<#/doc/utility/program/signal>) que não é executado como resultado de uma chamada para [std::raise](<#/doc/utility/program/raise>), é não especificado qual thread de execução contém a invocação do signal handler.

### Data races

Threads de execução diferentes sempre podem acessar (ler e modificar) diferentes [localizações de memória](<#/doc/language/memory_model>) concorrentemente, sem interferência e sem requisitos de sincronização.

Duas [avaliações](<#/doc/language/eval_order>) de expressão _conflitam_ se uma delas modifica uma localização de memória ou inicia/termina o tempo de vida de um objeto em uma localização de memória, e a outra lê ou modifica a mesma localização de memória ou inicia/termina o tempo de vida de um objeto ocupando armazenamento que se sobrepõe à localização de memória.

Um programa que possui duas avaliações conflitantes tem um _data race_ a menos que

  * ambas as avaliações sejam executadas na mesma thread ou no mesmo [signal handler](<#/doc/utility/program/signal>), ou
  * ambas as avaliações conflitantes sejam operações atômicas (veja [std::atomic](<#/doc/atomic/atomic>)), ou
  * uma das avaliações conflitantes _happens-before_ a outra (veja [std::memory_order](<#/doc/atomic/memory_order>)).

Se um data race ocorrer, o comportamento do programa é indefinido.

(Em particular, a liberação de um [std::mutex](<#/doc/thread/mutex>) é _synchronized-with_ e, portanto, _happens-before_ a aquisição do mesmo mutex por outra thread, o que torna possível usar bloqueios de mutex para proteger contra data races.)
```cpp
    int cnt = 0;
    auto f = [&] { cnt++; };
    std::thread t1{f}, t2{f}, t3{f}; // undefined behavior
```
```cpp
    std::atomic<int> cnt{0};
    auto f = [&] { cnt++; };
    std::thread t1{f}, t2{f}, t3{f}; // OK
```

#### Data races em containers

Todos os [containers](<#/doc/container>) na standard library, exceto [`std`::vector&lt;bool&gt;](<#/doc/container/vector_bool>), garantem que modificações concorrentes nos conteúdos do objeto contido em elementos diferentes no mesmo container nunca resultarão em data races.
```cpp
    std::vector<int> vec = {1, 2, 3, 4};
    auto f = & { vec[index] = 5; };
    std::thread t1{f, 0}, t2{f, 1}; // OK
    std::thread t3{f, 2}, t4{f, 2}; // undefined behavior
```
```cpp
    std::vector<bool> vec = {false, false};
    auto f = & { vec[index] = true; };
    std::thread t1{f, 0}, t2{f, 1}; // undefined behavior
```

### Ordem de memória

Quando uma thread lê um valor de uma localização de memória, ela pode ver o valor inicial, o valor escrito na mesma thread ou o valor escrito em outra thread. Veja [std::memory_order](<#/doc/atomic/memory_order>) para detalhes sobre a ordem em que as escritas feitas por threads se tornam visíveis para outras threads.

### Progresso adiante

#### Obstruction freedom

Quando apenas uma thread que não está bloqueada em uma função da standard library executa uma [função atômica](<#/doc/atomic>) que é lock-free, essa execução tem garantia de ser concluída (todas as operações lock-free da standard library são [obstruction-free](<https://en.wikipedia.org/wiki/Non-blocking_algorithm#Obstruction-freedom> "enwiki:Non-blocking algorithm")).

#### Lock freedom

Quando uma ou mais funções atômicas lock-free são executadas concorrentemente, pelo menos uma delas tem garantia de ser concluída (todas as operações lock-free da standard library são [lock-free](<https://en.wikipedia.org/wiki/Non-blocking_algorithm#Lock-freedom> "enwiki:Non-blocking algorithm") — é responsabilidade da implementação garantir que elas não possam ser live-locked indefinidamente por outras threads, como por roubar continuamente a linha de cache).

#### Garantia de progresso

Em um programa C++ válido, toda thread eventualmente faz uma das seguintes coisas:

  * Termina.
  * Invoca [std::this_thread::yield](<#/doc/thread/yield>).
  * Faz uma chamada para uma função de E/S da biblioteca.
  * Realiza um acesso através de um glvalue [volatile](<#/doc/language/cv>).
  * Realiza uma operação atômica ou uma operação de sincronização.
  * Continua a execução de um loop infinito trivial (veja abaixo).

Uma thread é dita _fazer progresso_ se ela executa um dos passos de execução acima, bloqueia em uma função da standard library, ou chama uma função atômica lock-free que não é concluída por causa de uma thread concorrente não bloqueada.

Isso permite que os compiladores removam, mesclem e reordenem todos os loops que não possuem comportamento observável, sem ter que provar que eles eventualmente terminariam, pois pode-se assumir que nenhuma thread de execução pode ser executada para sempre sem realizar nenhum desses comportamentos observáveis. Uma concessão é feita para loops infinitos triviais, que não podem ser removidos nem reordenados.

#### Loops infinitos triviais

Uma _instrução de iteração trivialmente vazia_ é uma instrução de iteração que corresponde a uma das seguintes formas:

---
```cpp
`while (` condition `) ;`  // (1)
`while (` condition `) { }`  // (2)
`do ; while (` condition `) ;`  // (3)
`do { } while (` condition `) ;`  // (4)
`for (` init-statement condition ﻿(optional) `; ) ;`  // (5)
`for (` init-statement condition ﻿(optional) `; ) { }`  // (6)
```

1) Uma [instrução while](<#/doc/language/while>) cujo corpo do loop é uma instrução simples vazia.

2) Uma [instrução while](<#/doc/language/while>) cujo corpo do loop é uma instrução composta vazia.

3) Uma [instrução do-while](<#/doc/language/do>) cujo corpo do loop é uma instrução simples vazia.

4) Uma [instrução do-while](<#/doc/language/do>) cujo corpo do loop é uma instrução composta vazia.

5) Uma [instrução for](<#/doc/language/for>) cujo corpo do loop é uma instrução simples vazia, a instrução for não possui uma iteration-expression.

6) Uma [instrução for](<#/doc/language/for>) cujo corpo do loop é uma instrução composta vazia, a instrução for não possui uma iteration-expression.

A _expressão de controle_ de uma instrução de iteração trivialmente vazia é:

1-4) condition.

5,6) condition se presente, caso contrário true.

Um _loop infinito trivial_ é uma instrução de iteração trivialmente vazia para a qual a expressão de controle convertida é uma [expressão constante](<#/doc/language/constant_expression>), quando [manifestamente avaliada em tempo de compilação](<#/doc/language/constant_expression>), e avalia para true.

O corpo do loop de um loop infinito trivial é substituído por uma chamada para a função [std::this_thread::yield](<#/doc/thread/yield>). É definido pela implementação se essa substituição ocorre em [implementações freestanding](<#/doc/freestanding>).
```cpp
    for (;;); // trivial infinite loop, well defined as of P2809
    for (;;) { int x; } // undefined behavior
```

#### Progresso adiante concorrente

Se uma thread oferece _garantia de progresso adiante concorrente_, ela _fará progresso_ (conforme definido acima) em uma quantidade finita de tempo, enquanto não tiver terminado, independentemente de outras threads (se houver) estarem fazendo progresso. O padrão encoraja, mas não exige que a thread principal e as threads iniciadas por [std::thread](<#/doc/thread/thread>) e [std::jthread](<#/doc/thread/jthread>)(desde C++20) ofereçam garantia de progresso adiante concorrente.

#### Progresso adiante paralelo

Se uma thread oferece _garantia de progresso adiante paralelo_, a implementação não é obrigada a garantir que a thread eventualmente fará progresso se ainda não tiver executado nenhum passo de execução (E/S, volatile, atômico ou sincronização), mas uma vez que esta thread tenha executado um passo, ela fornece garantias de _progresso adiante concorrente_ (esta regra descreve uma thread em um pool de threads que executa tarefas em ordem arbitrária).

#### Progresso adiante fracamente paralelo

Se uma thread oferece _garantia de progresso adiante fracamente paralelo_, ela não garante que eventualmente fará progresso, independentemente de outras threads fazerem progresso ou não. Tais threads ainda podem ter garantia de fazer progresso bloqueando com delegação de garantia de progresso adiante: se uma thread `P` bloqueia dessa maneira na conclusão de um conjunto de threads `S`, então pelo menos uma thread em `S` oferecerá uma garantia de progresso adiante que é igual ou mais forte que `P`. Uma vez que essa thread seja concluída, outra thread em `S` será similarmente fortalecida. Uma vez que o conjunto esteja vazio, `P` será desbloqueada. Os [algoritmos paralelos](<#/doc/algorithm>) da standard library C++ bloqueiam com delegação de progresso adiante na conclusão de um conjunto não especificado de threads gerenciadas pela biblioteca. | (desde C++17)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1953](<https://cplusplus.github.io/CWG/issues/1953.html>) | C++11 | duas avaliações de expressão que iniciam/terminam os tempos de vida de objetos com armazenamentos sobrepostos não conflitavam | elas conflitam
[LWG 2200](<https://cplusplus.github.io/LWG/issue2200>) | C++11 | não estava claro se o requisito de data race em containers se aplicava apenas a containers de sequência | aplica-se a todos os containers
[P2809R3](<https://wg21.link/P2809R3>) | C++11 | o comportamento de executar loops infinitos “triviais”[1](<#/doc/language/multithread>) era indefinido | define corretamente “loops infinitos triviais” e tornou o comportamento bem definido

  1. [↑](<#/doc/language/multithread>) “Trivial” aqui significa que a execução do loop infinito nunca faz progresso.
