# std::memory_order

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
enum memory_order
{
memory_order_relaxed,
memory_order_consume,
memory_order_acquire,
memory_order_release,
memory_order_acq_rel,
memory_order_seq_cst
};
(até C++20)
enum class memory_order : /* unspecified */
{
relaxed, consume, acquire, release, acq_rel, seq_cst
};
inline constexpr memory_order memory_order_relaxed = memory_order::relaxed;
inline constexpr memory_order memory_order_consume = memory_order::consume;
inline constexpr memory_order memory_order_acquire = memory_order::acquire;
inline constexpr memory_order memory_order_release = memory_order::release;
inline constexpr memory_order memory_order_acq_rel = memory_order::acq_rel;
inline constexpr memory_order memory_order_seq_cst = memory_order::seq_cst;
```

`std::memory_order` especifica como os acessos à memória, incluindo acessos à memória regulares e não atômicos, devem ser ordenados em torno de uma operação atômica. Na ausência de quaisquer restrições em um sistema multi-core, quando múltiplas threads simultaneamente leem e escrevem em várias variáveis, uma thread pode observar os valores mudarem em uma ordem diferente da ordem em que outra thread os escreveu. De fato, a ordem aparente das mudanças pode até diferir entre múltiplas threads leitoras. Alguns efeitos semelhantes podem ocorrer mesmo em sistemas uniprocessadores devido a transformações do compilador permitidas pelo modelo de memória.

O comportamento padrão de todas as operações atômicas na biblioteca oferece _ordenação sequencialmente consistente_ (veja a discussão abaixo). Esse padrão pode prejudicar o desempenho, mas as operações atômicas da biblioteca podem receber um argumento `std::memory_order` adicional para especificar as restrições exatas, além da atomicidade, que o compilador e o processador devem impor para essa operação.

### Constantes

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`
---
Nome | Explicação
---|---
`memory_order_relaxed` | Operação relaxada: não há restrições de sincronização ou ordenação impostas a outras leituras ou escritas, apenas a atomicidade desta operação é garantida (veja [Ordenação Relaxada](<#/doc/atomic/memory_order>) abaixo).
`memory_order_consume` | Uma operação de carregamento (load) com esta ordem de memória executa uma _operação de consumo_ na localização de memória afetada: nenhuma leitura ou escrita na thread atual dependente do valor atualmente carregado pode ser reordenada antes deste carregamento. Escritas em variáveis dependentes de dados em outras threads que liberam a mesma variável atômica são visíveis na thread atual. Na maioria das plataformas, isso afeta apenas otimizações do compilador (veja [Ordenação Release-Consume](<#/doc/atomic/memory_order>) abaixo).
`memory_order_acquire` | Uma operação de carregamento (load) com esta ordem de memória executa a _operação de aquisição_ na localização de memória afetada: nenhuma leitura ou escrita na thread atual pode ser reordenada antes deste carregamento. Todas as escritas em outras threads que liberam a mesma variável atômica são visíveis na thread atual (veja [Ordenação Release-Acquire](<#/doc/atomic/memory_order>) abaixo).
`memory_order_release` | Uma operação de armazenamento (store) com esta ordem de memória executa a _operação de liberação_: nenhuma leitura ou escrita na thread atual pode ser reordenada após este armazenamento. Todas as escritas na thread atual são visíveis em outras threads que adquirem a mesma variável atômica (veja [Ordenação Release-Acquire](<#/doc/atomic/memory_order>) abaixo) e as escritas que carregam uma dependência na variável atômica tornam-se visíveis em outras threads que consomem a mesma atômica (veja [Ordenação Release-Consume](<#/doc/atomic/memory_order>) abaixo).
`memory_order_acq_rel` | Uma operação de leitura-modificação-escrita (read-modify-write) com esta ordem de memória é tanto uma _operação de aquisição_ quanto uma _operação de liberação_. Nenhuma leitura ou escrita de memória na thread atual pode ser reordenada antes do carregamento, nem após o armazenamento. Todas as escritas em outras threads que liberam a mesma variável atômica são visíveis antes da modificação e a modificação é visível em outras threads que adquirem a mesma variável atômica.
`memory_order_seq_cst` | Uma operação de carregamento (load) com esta ordem de memória executa uma _operação de aquisição_, um armazenamento (store) executa uma _operação de liberação_, e uma leitura-modificação-escrita (read-modify-write) executa tanto uma _operação de aquisição_ quanto uma _operação de liberação_, além de existir uma única ordem total na qual todas as threads observam todas as modificações na mesma ordem (veja [Ordenação Sequencialmente Consistente](<#/doc/atomic/memory_order>) abaixo).

### Descrição Formal

A sincronização entre threads e a ordenação de memória determinam como as _avaliações_ e os _efeitos colaterais_ de expressões são ordenados entre diferentes threads de execução. Eles são definidos nos seguintes termos:

#### Sequenciado-antes

Dentro da mesma thread, a avaliação A pode ser _sequenciada-antes_ da avaliação B, conforme descrito em [ordem de avaliação](<#/doc/language/eval_order>).

#### Carrega dependência

Dentro da mesma thread, a avaliação A que é _sequenciada-antes_ da avaliação B também pode carregar uma dependência em B (ou seja, B depende de A), se qualquer um dos seguintes for verdadeiro:

1) O valor de A é usado como operando de B, **exceto**

a) se B for uma chamada para [std::kill_dependency](<#/doc/atomic/kill_dependency>),

b) se A for o operando esquerdo dos operadores embutidos &&, ||, ?:, ou ,.

2) A escreve em um objeto escalar M, B lê de M.

3) A carrega dependência em outra avaliação X, e X carrega dependência em B.

#### Ordem de modificação

Todas as modificações em qualquer variável atômica particular ocorrem em uma ordem total que é específica para esta única variável atômica.

Os quatro requisitos a seguir são garantidos para todas as operações atômicas:

1) **Coerência escrita-escrita**: Se a avaliação A que modifica algum atômico M (uma escrita) _acontece-antes_ da avaliação B que modifica M, então A aparece antes de B na _ordem de modificação_ de M.

2) **Coerência leitura-leitura**: se um cálculo de valor A de algum atômico M (uma leitura) _acontece-antes_ de um cálculo de valor B em M, e se o valor de A vem de uma escrita X em M, então o valor de B é o valor armazenado por X, ou o valor armazenado por um efeito colateral Y em M que aparece depois de X na _ordem de modificação_ de M.

3) **Coerência leitura-escrita**: se um cálculo de valor A de algum atômico M (uma leitura) _acontece-antes_ de uma operação B em M (uma escrita), então o valor de A vem de um efeito colateral (uma escrita) X que aparece antes de B na _ordem de modificação_ de M.

4) **Coerência escrita-leitura**: se um efeito colateral (uma escrita) X em um objeto atômico M _acontece-antes_ de um cálculo de valor (uma leitura) B de M, então a avaliação B deve obter seu valor de X ou de um efeito colateral Y que segue X na ordem de modificação de M.

#### Sequência de liberação

Após uma _operação de liberação_ A ser realizada em um objeto atômico M, a subsequência contínua mais longa da ordem de modificação de M que consiste em:

1) Escritas realizadas pela mesma thread que realizou A. | (até C++20)

2) Operações atômicas de leitura-modificação-escrita feitas em M por qualquer thread.

É conhecida como _sequência de liberação encabeçada por A_.

#### Sincroniza com

Se um armazenamento atômico na thread A é uma _operação de liberação_, um carregamento atômico na thread B da mesma variável é uma _operação de aquisição_, e o carregamento na thread B lê um valor escrito pelo armazenamento na thread A, então o armazenamento na thread A _sincroniza-com_ o carregamento na thread B.

Além disso, algumas chamadas de biblioteca podem ser definidas para _sincronizar-com_ outras chamadas de biblioteca em outras threads.

#### Ordenado por dependência antes

Entre threads, a avaliação A é _ordenada por dependência antes_ da avaliação B se qualquer um dos seguintes for verdadeiro:

1) A executa uma _operação de liberação_ em algum atômico M, e, em uma thread diferente, B executa uma _operação de consumo_ no mesmo atômico M, e B lê um valor escrito por qualquer parte da sequência de liberação encabeçada (até C++20) por A.

2) A é ordenada por dependência antes de X e X carrega uma dependência em B.

#### Acontece-antes entre threads

Entre threads, a avaliação A _acontece-antes entre threads_ da avaliação B se qualquer um dos seguintes for verdadeiro:

1) A _sincroniza-com_ B.

2) A é _ordenada por dependência antes_ de B.

3) A _sincroniza-com_ alguma avaliação X, e X é _sequenciada-antes_ de B.

4) A é _sequenciada-antes_ de alguma avaliação X, e X _acontece-antes entre threads_ de B.

5) A _acontece-antes entre threads_ de alguma avaliação X, e X _acontece-antes entre threads_ de B.

#### Acontece-antes

Independentemente das threads, a avaliação A _acontece-antes_ da avaliação B se qualquer um dos seguintes for verdadeiro:

1) A é _sequenciada-antes_ de B.

2) A _acontece-antes entre threads_ de B.

A implementação é obrigada a garantir que a relação _acontece-antes_ seja acíclica, introduzindo sincronização adicional se necessário (isso só pode ser necessário se uma operação de consumo estiver envolvida, veja [Batty et al](<https://www.cl.cam.ac.uk/~pes20/cpp/popl085ap-sewell.pdf>)).

Se uma avaliação modifica uma localização de memória, e a outra lê ou modifica a mesma localização de memória, e se pelo menos uma das avaliações não é uma operação atômica, o comportamento do programa é indefinido (o programa tem uma [condição de corrida de dados](<#/doc/language/memory_model>)) a menos que exista uma relação _acontece-antes_ entre essas duas avaliações.

#### Simplesmente acontece-antes

Independentemente das threads, a avaliação A _simplesmente acontece-antes_ da avaliação B se qualquer um dos seguintes for verdadeiro: 1) A é _sequenciada-antes_ de B. 2) A _sincroniza-com_ B. 3) A _simplesmente acontece-antes_ de X, e X _simplesmente acontece-antes_ de B. Nota: sem operações de consumo, as relações _simplesmente acontece-antes_ e _acontece-antes_ são as mesmas. | (desde C++20)

#### Fortemente acontece-antes

Independentemente das threads, a avaliação A _fortemente acontece-antes_ da avaliação B se qualquer um dos seguintes for verdadeiro:

1) A é _sequenciada-antes_ de B. 2) A _sincroniza-com_ B. 3) A _fortemente acontece-antes_ de X, e X _fortemente acontece-antes_ de B. | (até C++20)
---|---
1) A é _sequenciada-antes_ de B. 2) A _sincroniza-com_ B, e ambas A e B são operações atômicas sequencialmente consistentes. 3) A é _sequenciada-antes_ de X, X _simplesmente acontece-antes_ de Y, e Y é _sequenciada-antes_ de B. 4) A _fortemente acontece-antes_ de X, e X _fortemente acontece-antes_ de B. Nota: informalmente, se A _fortemente acontece-antes_ de B, então A parece ser avaliada antes de B em todos os contextos. Nota: _fortemente acontece-antes_ exclui operações de consumo. | (desde C++20)

#### Efeitos colaterais visíveis

O efeito colateral A em um escalar M (uma escrita) é _visível_ em relação ao cálculo de valor B em M (uma leitura) se ambos os seguintes forem verdadeiros:

1) A _acontece-antes_ de B.

2) Não há outro efeito colateral X em M onde A _acontece-antes_ de X e X _acontece-antes_ de B.

Se o efeito colateral A é visível em relação ao cálculo de valor B, então o subconjunto contíguo mais longo dos efeitos colaterais em M, na _ordem de modificação_, onde B não _acontece-antes_ dele é conhecido como a _sequência visível de efeitos colaterais_ (o valor de M, determinado por B, será o valor armazenado por um desses efeitos colaterais).

Nota: a sincronização entre threads se resume a prevenir condições de corrida de dados (estabelecendo relações acontece-antes) e definir quais efeitos colaterais se tornam visíveis sob quais condições.

#### Operação de consumo

Carregamento atômico (atomic load) com `memory_order_consume` ou mais forte é uma operação de consumo. Note que [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>) impõe requisitos de sincronização mais fortes do que uma operação de consumo.

#### Operação de aquisição

Carregamento atômico (atomic load) com `memory_order_acquire` ou mais forte é uma operação de aquisição. A operação `lock()` em um [Mutex](<#/doc/named_req/Mutex>) também é uma operação de aquisição. Note que [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>) impõe requisitos de sincronização mais fortes do que uma operação de aquisição.

#### Operação de liberação

Armazenamento atômico (atomic store) com `memory_order_release` ou mais forte é uma operação de liberação. A operação `unlock()` em um [Mutex](<#/doc/named_req/Mutex>) também é uma operação de liberação. Note que [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>) impõe requisitos de sincronização mais fortes do que uma operação de liberação.

### Explicação

#### Ordenação Relaxada

Operações atômicas marcadas com memory_order_relaxed não são operações de sincronização; elas não impõem uma ordem entre acessos concorrentes à memória. Elas apenas garantem atomicidade e consistência da ordem de modificação.

Por exemplo, com x e y inicialmente zero,
```cpp
    // Thread 1:
    r1 = y.load(std::memory_order_relaxed); // A
    x.store(r1, std::memory_order_relaxed); // B
    // Thread 2:
    r2 = x.load(std::memory_order_relaxed); // C 
    y.store(42, std::memory_order_relaxed); // D
```

é permitido produzir r1 == r2 == 42 porque, embora A seja _sequenciada-antes_ de B dentro da thread 1 e C seja _sequenciada-antes_ de D dentro da thread 2, nada impede que D apareça antes de A na ordem de modificação de y, e B apareça antes de C na ordem de modificação de x. O efeito colateral de D em y poderia ser visível para o carregamento A na thread 1, enquanto o efeito colateral de B em x poderia ser visível para o carregamento C na thread 2. Em particular, isso pode ocorrer se D for concluído antes de C na thread 2, seja devido a reordenação do compilador ou em tempo de execução.

Mesmo com o modelo de memória relaxado, valores "out-of-thin-air" (do nada) não são permitidos a depender circularmente de seus próprios cálculos, por exemplo, com x e y inicialmente zero,
```cpp
    // Thread 1:
    r1 = y.load(std::memory_order_relaxed);
    if (r1 == 42)
        x.store(r1, std::memory_order_relaxed);
    // Thread 2:
    r2 = x.load(std::memory_order_relaxed);
    if (r2 == 42)
        y.store(42, std::memory_order_relaxed);
```

não é permitido produzir r1 == r2 == 42, uma vez que o armazenamento de 42 em y só é possível se o armazenamento em x armazenar 42, o que depende circularmente do armazenamento em y armazenar 42. Note que até C++14, isso era tecnicamente permitido pela especificação, mas não recomendado para implementadores. | (desde C++14)

O uso típico para ordenação de memória relaxada é o incremento de contadores, como os contadores de referência de [std::shared_ptr](<#/doc/memory/shared_ptr>), já que isso requer apenas atomicidade, mas não ordenação ou sincronização (note que o decremento dos contadores de `std::shared_ptr` requer sincronização acquire-release com o destrutor).

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <thread>
    #include <vector>
    
    std::atomic<int> cnt = {0};
    
    void f()
    {
        for (int n = 0; n < 1000; ++n)
            cnt.fetch_add(1, std::memory_order_relaxed);
    }
    
    int main()
    {
        std::vector<std::thread> v;
        for (int n = 0; n < 10; ++n)
            v.emplace_back(f);
        for (auto& t : v)
            t.join();
        std::cout << "Final counter value is " << cnt << '\n';
    }
```

Saída:
```
    Final counter value is 10000
```

#### Ordenação Release-Acquire

Se um armazenamento atômico na thread A é marcado com memory_order_release, um carregamento atômico na thread B da mesma variável é marcado com memory_order_acquire, e o carregamento na thread B lê um valor escrito pelo armazenamento na thread A, então o armazenamento na thread A _sincroniza-com_ o carregamento na thread B.

Todas as escritas de memória (incluindo atômicas não atômicas e relaxadas) que _aconteceram-antes_ do armazenamento atômico do ponto de vista da thread A, tornam-se _efeitos colaterais visíveis_ na thread B. Ou seja, uma vez que o carregamento atômico é concluído, a thread B tem a garantia de ver tudo o que a thread A escreveu na memória. Esta promessa só é válida se B realmente retornar o valor que A armazenou, ou um valor posterior na sequência de liberação.

A sincronização é estabelecida apenas entre as threads que _liberam_ e _adquirem_ a mesma variável atômica. Outras threads podem ver uma ordem diferente de acessos à memória do que uma ou ambas as threads sincronizadas.

Em sistemas fortemente ordenados — x86, SPARC TSO, IBM mainframe, etc. — a ordenação release-acquire é automática para a maioria das operações. Nenhuma instrução de CPU adicional é emitida para este modo de sincronização; apenas certas otimizações do compilador são afetadas (por exemplo, o compilador é proibido de mover armazenamentos não atômicos para além do armazenamento-liberação atômico ou de realizar carregamentos não atômicos antes do carregamento-aquisição atômico). Em sistemas fracamente ordenados (ARM, Itanium, PowerPC), são usadas instruções especiais de carregamento de CPU ou de barreira de memória (memory fence).

Travas de exclusão mútua, como [std::mutex](<#/doc/thread/mutex>) ou [spinlock atômico](<#/doc/atomic/atomic_flag>), são um exemplo de sincronização release-acquire: quando a trava é liberada pela thread A e adquirida pela thread B, tudo o que ocorreu na seção crítica (antes da liberação) no contexto da thread A deve ser visível para a thread B (após a aquisição) que está executando a mesma seção crítica.

Execute este código
```cpp
    #include <atomic>
    #include <cassert>
    #include <string>
    #include <thread>
    
    std::atomic<std::string>* ptr;
    int data;
    
    void producer()
    {
        std::string* p = new std::string("Hello");
        data = 42;
        ptr.store(p, std::memory_order_release);
    }
    
    void consumer()
    {
        std::string* p2;
        while (!(p2 = ptr.load(std::memory_order_acquire)))
            ;
        assert(*p2 == "Hello"); // nunca dispara
        assert(data == 42); // nunca dispara
    }
    
    int main()
    {
        std::thread t1(producer);
        std::thread t2(consumer);
        t1.join(); t2.join();
    }
```

O exemplo a seguir demonstra a ordenação release-acquire transitiva entre três threads, usando uma sequência de liberação.

Execute este código
```cpp
    #include <atomic>
    #include <cassert>
    #include <thread>
    #include <vector>
    
    std::vector<int> data;
    std::atomic<int> flag = {0};
    
    void thread_1()
    {
        data.push_back(42);
        flag.store(1, std::memory_order_release);
    }
    
    void thread_2()
    {
        int expected = 1;
        // memory_order_relaxed é aceitável porque esta é uma RMW,
        // e RMWs (com qualquer ordenação) seguindo uma liberação formam uma sequência de liberação
        while (!flag.compare_exchange_strong(expected, 2, std::memory_order_relaxed))
        {
            expected = 1;
        }
    }
    
    void thread_3()
    {
        while (flag.load(std::memory_order_acquire) < 2)
            ;
        // se lermos o valor 2 do flag atômico, vemos 42 no vetor
        assert(data.at(0) == 42); // nunca disparará
    }
    
    int main()
    {
        std::thread a(thread_1);
        std::thread b(thread_2);
        std::thread c(thread_3);
        a.join(); b.join(); c.join();
    }
```

#### Ordenação Release-Consume

Se um armazenamento atômico na thread A é marcado com memory_order_release, um carregamento atômico na thread B da mesma variável é marcado com memory_order_consume, e o carregamento na thread B lê um valor escrito pelo armazenamento na thread A, então o armazenamento na thread A é _ordenado por dependência antes_ do carregamento na thread B.

Todas as escritas de memória (atômicas não atômicas e relaxadas) que _aconteceram-antes_ do armazenamento atômico do ponto de vista da thread A, tornam-se _efeitos colaterais visíveis_ dentro daquelas operações na thread B nas quais a operação de carregamento _carrega dependência_, ou seja, uma vez que o carregamento atômico é concluído, esses operadores e funções na thread B que usam o valor obtido do carregamento têm a garantia de ver o que a thread A escreveu na memória.

A sincronização é estabelecida apenas entre as threads que _liberam_ e _consumem_ a mesma variável atômica. Outras threads podem ver uma ordem diferente de acessos à memória do que uma ou ambas as threads sincronizadas.

Em todas as CPUs mainstream, exceto DEC Alpha, a ordenação por dependência é automática, nenhuma instrução de CPU adicional é emitida para este modo de sincronização, apenas certas otimizações do compilador são afetadas (por exemplo, o compilador é proibido de realizar carregamentos especulativos nos objetos que estão envolvidos na cadeia de dependência).

Casos de uso típicos para esta ordenação envolvem acesso de leitura a estruturas de dados concorrentes raramente escritas (tabelas de roteamento, configuração, políticas de segurança, regras de firewall, etc.) e situações de publicador-assinante com publicação mediada por ponteiro, ou seja, quando o produtor publica um ponteiro através do qual o consumidor pode acessar informações: não há necessidade de tornar todo o resto que o produtor escreveu na memória visível para o consumidor (o que pode ser uma operação cara em arquiteturas fracamente ordenadas). Um exemplo de tal cenário é [`rcu_dereference`](<https://en.wikipedia.org/wiki/Read-copy-update> "enwiki:Read-copy-update").

Veja também [std::kill_dependency](<#/doc/atomic/kill_dependency>) e `[[[carries_dependency](<#/doc/language/attributes/carries_dependency>)]]` para controle de cadeia de dependência de granularidade fina.

Note que atualmente (2/2015) nenhum compilador de produção conhecido rastreia cadeias de dependência: operações de consumo são elevadas a operações de aquisição.

A especificação da ordenação release-consume está sendo revisada, e o uso de `memory_order_consume` é temporariamente desencorajado. | (desde C++17)

Este exemplo demonstra a sincronização ordenada por dependência para publicação mediada por ponteiro: os dados inteiros não estão relacionados ao ponteiro para string por uma relação de dependência de dados, portanto, seu valor é indefinido no consumidor.

Execute este código
```cpp
    #include <atomic>
    #include <cassert>
    #include <string>
    #include <thread>
    
    std::atomic<std::string>* ptr;
    int data;
    
    void producer()
    {
        std::string* p = new std::string("Hello");
        data = 42;
        ptr.store(p, std::memory_order_release);
    }
    
    void consumer()
    {
        std::string* p2;
        while (!(p2 = ptr.load(std::memory_order_consume)))
            ;
        assert(*p2 == "Hello"); // nunca dispara: *p2 carrega dependência de ptr
        assert(data == 42); // pode ou não disparar: data não carrega dependência de ptr
    }
    
    int main()
    {
        std::thread t1(producer);
        std::thread t2(consumer);
        t1.join(); t2.join();
    }
```

#### Ordenação Sequencialmente Consistente

Operações atômicas marcadas com memory_order_seq_cst não apenas ordenam a memória da mesma forma que a ordenação release/acquire (tudo o que _aconteceu-antes_ de um armazenamento em uma thread se torna um _efeito colateral visível_ na thread que fez um carregamento), mas também estabelecem uma _única ordem total de modificação_ de todas as operações atômicas que são assim marcadas.

Formalmente, cada operação `memory_order_seq_cst` B que carrega de uma variável atômica M, observa um dos seguintes:

  * o resultado da última operação A que modificou M, que aparece antes de B na única ordem total,
  * OU, se houve tal A, B pode observar o resultado de alguma modificação em M que não é `memory_order_seq_cst` e não _acontece-antes_ de A,
  * OU, se não houve tal A, B pode observar o resultado de alguma modificação não relacionada de M que não é `memory_order_seq_cst`.

Se houve uma operação `memory_order_seq_cst` [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>) X _sequenciada-antes_ de B, então B observa um dos seguintes:

  * a última modificação `memory_order_seq_cst` de M que aparece antes de X na única ordem total,
  * alguma modificação não relacionada de M que aparece mais tarde na ordem de modificação de M.

Para um par de operações atômicas em M chamadas A e B, onde A escreve e B lê o valor de M, se houver duas [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>)s `memory_order_seq_cst` X e Y, e se A é _sequenciada-antes_ de X, Y é _sequenciada-antes_ de B, e X aparece antes de Y na Ordem Total Única, então B observa:

  * o efeito de A,
  * alguma modificação não relacionada de M que aparece depois de A na ordem de modificação de M.

Para um par de modificações atômicas de M chamadas A e B, B ocorre depois de A na ordem de modificação de M se

  * houver uma [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>) `memory_order_seq_cst` X tal que A é _sequenciada-antes_ de X e X aparece antes de B na Ordem Total Única,
  * ou, houver uma [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>) `memory_order_seq_cst` Y tal que Y é _sequenciada-antes_ de B e A aparece antes de Y na Ordem Total Única,
  * ou, houver [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>)s `memory_order_seq_cst` X e Y tal que A é _sequenciada-antes_ de X, Y é _sequenciada-antes_ de B, e X aparece antes de Y na Ordem Total Única.

Note que isso significa que: 1) assim que operações atômicas que não são marcadas com `memory_order_seq_cst` entram em cena, a consistência sequencial é perdida, 2) as barreiras sequencialmente consistentes estão apenas estabelecendo a ordenação total para as próprias barreiras, não para as operações atômicas no caso geral (_sequenciada-antes_ não é uma relação entre threads, ao contrário de _acontece-antes_). | (até C++20)
---
Formalmente, uma operação atômica A em algum objeto atômico M é _coerência-ordenada-antes_ de outra operação atômica B em M se qualquer um dos seguintes for verdadeiro: 1) A é uma modificação, e B lê o valor armazenado por A, 2) A precede B na _ordem de modificação_ de M, 3) A lê o valor armazenado por uma modificação atômica X, X precede B na _ordem de modificação_, e A e B não são a mesma operação atômica de leitura-modificação-escrita, 4) A é _coerência-ordenada-antes_ de X, e X é _coerência-ordenada-antes_ de B. Existe uma única ordem total S em todas as operações `memory_order_seq_cst`, incluindo barreiras, que satisfaz as seguintes restrições: 1) se A e B são operações `memory_order_seq_cst`, e A _fortemente acontece-antes_ de B, então A precede B em S, 2) para cada par de operações atômicas A e B em um objeto M, onde A é _coerência-ordenada-antes_ de B: a) se A e B são ambas operações `memory_order_seq_cst`, então A precede B em S, b) se A é uma operação `memory_order_seq_cst`, e B _acontece-antes_ de uma barreira `memory_order_seq_cst` Y, então A precede Y em S, c) se uma barreira `memory_order_seq_cst` X _acontece-antes_ de A, e B é uma operação `memory_order_seq_cst`, então X precede B em S, d) se uma barreira `memory_order_seq_cst` X _acontece-antes_ de A, e B _acontece-antes_ de uma barreira `memory_order_seq_cst` Y, então X precede Y em S. A definição formal garante que: 1) a única ordem total é consistente com a _ordem de modificação_ de qualquer objeto atômico, 2) um carregamento `memory_order_seq_cst` obtém seu valor da última modificação `memory_order_seq_cst`, ou de alguma modificação não-`memory_order_seq_cst` que não _acontece-antes_ das modificações `memory_order_seq_cst` precedentes. A única ordem total pode não ser consistente com _acontece-antes_. Isso permite uma implementação mais eficiente de `memory_order_acquire` e `memory_order_release` em algumas CPUs. Pode produzir resultados surpreendentes quando `memory_order_acquire` e `memory_order_release` são misturados com `memory_order_seq_cst`. Por exemplo, com `x` e `y` inicialmente zero,
```cpp
    // Thread 1:
    x.store(1, std::memory_order_seq_cst); // A
    y.store(1, std::memory_order_release); // B
    // Thread 2:
    r1 = y.fetch_add(1, std::memory_order_seq_cst); // C
    r2 = y.load(std::memory_order_relaxed); // D
    // Thread 3:
    y.store(3, std::memory_order_seq_cst); // E
    r3 = x.load(std::memory_order_seq_cst); // F
```

é permitido produzir r1 == 1 && r2 == 3 && r3 == 0, onde A _acontece-antes_ de C, mas C precede A na única ordem total C-E-F-A de `memory_order_seq_cst` (veja [Lahav et al](<https://plv.mpi-sws.org/scfix/paper.pdf>)). Note que: 1) assim que operações atômicas que não são marcadas com `memory_order_seq_cst` entram em cena, a garantia de consistência sequencial para o programa é perdida, 2) em muitos casos, operações atômicas `memory_order_seq_cst` são reordenáveis em relação a outras operações atômicas realizadas pela mesma thread. | (desde C++20)

A ordenação sequencial pode ser necessária para situações de múltiplos produtores-múltiplos consumidores onde todos os consumidores devem observar as ações de todos os produtores ocorrendo na mesma ordem.

A ordenação sequencial total requer uma instrução de barreira de memória (memory fence) completa da CPU em todos os sistemas multi-core. Isso pode se tornar um gargalo de desempenho, pois força os acessos à memória afetados a se propagarem para cada núcleo.

Este exemplo demonstra uma situação onde a ordenação sequencial é necessária. Qualquer outra ordenação pode disparar o assert porque seria possível para as threads `c` e `d` observarem as mudanças nos atômicos `x` e `y` em ordem oposta.

Execute este código
```cpp
    #include <atomic>
    #include <cassert>
    #include <thread>
    
    std::atomic<bool> x = {false};
    std::atomic<bool> y = {false};
    std::atomic<int> z = {0};
    
    void write_x()
    {
        x.store(true, std::memory_order_seq_cst);
    }
    
    void write_y()
    {
        y.store(true, std::memory_order_seq_cst);
    }
    
    void read_x_then_y()
    {
        while (!x.load(std::memory_order_seq_cst))
            ;
        if (y.load(std::memory_order_seq_cst))
            ++z;
    }
    
    void read_y_then_x()
    {
        while (!y.load(std::memory_order_seq_cst))
            ;
        if (x.load(std::memory_order_seq_cst))
            ++z;
    }
    
    int main()
    {
        std::thread a(write_x);
        std::thread b(write_y);
        std::thread c(read_x_then_y);
        std::thread d(read_y_then_x);
        a.join(); b.join(); c.join(); d.join();
        assert(z.load() != 0); // nunca acontecerá
    }
```

### Relação com volatile

Dentro de uma thread de execução, acessos (leituras e escritas) através de [glvalues volatile](<#/doc/language/cv>) não podem ser reordenados para além de efeitos colaterais observáveis (incluindo outros acessos volatile) que são _sequenciados-antes_ ou _sequenciados-depois_ dentro da mesma thread, mas esta ordem não é garantida para ser observada por outra thread, já que o acesso volatile não estabelece sincronização entre threads.

Além disso, acessos volatile não são atômicos (leitura e escrita concorrentes são uma [condição de corrida de dados](<#/doc/language/memory_model>)) e não ordenam a memória (acessos à memória não-volatile podem ser livremente reordenados em torno do acesso volatile).

Uma exceção notável é o Visual Studio, onde, com as configurações padrão, cada escrita volatile tem semântica de liberação e cada leitura volatile tem semântica de aquisição ([Microsoft Docs](<https://learn.microsoft.com/en-us/cpp/cpp/volatile-cpp>)), e assim os volatiles podem ser usados para sincronização entre threads. A semântica volatile padrão não é aplicável à programação multi-threaded, embora seja suficiente, por exemplo, para comunicação com um manipulador de [std::signal](<#/doc/utility/program/signal>) que é executado na mesma thread quando aplicada a variáveis sig_atomic_t.

### Veja também
[documentação C](<#/>) para ordem de memória
---

### Links externos

1.  | [MOESI protocol](<https://en.wikipedia.org/wiki/MOESI_protocol> "enwiki:MOESI protocol")
---|---
2.  | [x86-TSO: Um Modelo de Programador Rigoroso e Utilizável para Multiprocessadores x86](<https://www.cl.cam.ac.uk/~pes20/weakmemory/cacm.pdf>) P. Sewell et. al., 2010
3.  | [Uma Introdução Tutorial aos Modelos de Memória Relaxados ARM e POWER](<https://www.cl.cam.ac.uk/~pes20/ppc-supplemental/test7.pdf>) P. Sewell et al, 2012
4.  | [MESIF: Um Protocolo de Coerência de Cache de Dois Saltos para Interconexões Ponto a Ponto](<https://researchspace.auckland.ac.nz/bitstream/handle/2292/11594/MESIF-2009.pdf?sequence=6>) J.R. Goodman, H.H.J. Hum, 2009
5.  | [Modelos de Memória](<https://research.swtch.com/mm>) Russ Cox, 2021
| Esta seção está incompleta
Razão: Vamos encontrar boas referências sobre QPI, MOESI e talvez Dragon.