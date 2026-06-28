# Biblioteca de suporte à concorrência (desde C++11)

C++ inclui suporte integrado para threads, operações atômicas, exclusão mútua, variáveis de condição e futures.

### Threads

Threads permitem que programas sejam executados em vários núcleos de processador.

Definido no header `[<thread>](<#/doc/header/thread>)`
---
[ thread](<#/doc/thread/thread>)(C++11) | gerencia uma thread separada
(class)
[ jthread](<#/doc/thread/jthread>)(C++20) | [std::thread](<#/doc/thread/thread>) com suporte para auto-joining e cancelamento
(class)

##### Funções que gerenciam a thread atual

Definido no namespace `this_thread`

```cpp
 yield(C++11)
(function)
 get_id(C++11)
(function)
 sleep_for(C++11)
(function)
 sleep_until(C++11)
(function)
```

### Cancelamento cooperativo (desde C++20)

Os componentes _stop source_ , _stop token_ e _stop callback_ podem ser usados para solicitar assincronamente que uma operação pare a execução de forma oportuna, tipicamente porque o resultado não é mais necessário. Tal solicitação é chamada de _stop request_.

Esses componentes especificam a semântica de acesso compartilhado a um _stop state_. Qualquer objeto que modele qualquer um desses componentes e que se refira ao mesmo stop state é um stop source, stop token ou stop callback associado, respectivamente.

Os concepts [`_stoppable-source_`](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/stoppable-source&action=edit&redlink=1> "cpp/thread/stoppable-source（página inexistente）"), [`stoppable_token`](<#/doc/thread/stoppable_token>) e [`_stoppable-callback-for_`](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/stoppable-callback-for&action=edit&redlink=1> "cpp/thread/stoppable-callback-for（página inexistente）") especificam a sintaxe e a semântica de modelo necessárias para stop source, stop token e stop callback, respectivamente. | (desde C++26)

Eles são projetados:

  * para cancelar cooperativamente a execução, como para [std::jthread](<#/doc/thread/jthread>),
  * para interromper funções de espera de [std::condition_variable_any](<#/doc/thread/condition_variable_any>),
  * para realizar a conclusão interrompida de uma operação assíncrona criada por execution::connect,

| (desde C++26)

  * ou para uma implementação personalizada de gerenciamento de execução.

Na verdade, eles nem precisam ser usados para "parar" nada, mas podem ser usados, por exemplo, como um gatilho de invocação de função(ões) única e thread-safe.

Definido no header `[<stop_token>](<#/doc/header/stop_token>)`
---

##### Tipos de stop token

[ stop_token](<#/doc/thread/stop_token>)(C++20) | uma interface para consultar se uma solicitação de cancelamento de [std::jthread](<#/doc/thread/jthread>) foi feita
(class)
[ never_stop_token](<#/doc/thread/never_stop_token>)(C++26) | fornece uma interface de stop token que indica que uma parada nunca é possível nem solicitada
(class)
[ inplace_stop_token](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/inplace_stop_token&action=edit&redlink=1> "cpp/thread/inplace stop token（página inexistente）")(C++26) | um stop token que referencia o stop state de seu objeto `std::inplace_stop_source` associado
(class)

##### Tipos de stop source

[ stop_source](<#/doc/thread/stop_source>)(C++20) | classe que representa uma solicitação para parar uma ou mais [std::jthread](<#/doc/thread/jthread>)s
(class)
[ inplace_stop_source](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/inplace_stop_source&action=edit&redlink=1> "cpp/thread/inplace stop source（página inexistente）")(C++26) | um `_stoppable-source_` que é o único proprietário do stop state
(class)

##### Tipos de stop callback

[ stop_callback](<#/doc/thread/stop_callback>)(C++20) | uma interface para registrar callbacks no cancelamento de [std::jthread](<#/doc/thread/jthread>)
(class template)
[ inplace_stop_callback](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/inplace_stop_callback&action=edit&redlink=1> "cpp/thread/inplace stop callback（página inexistente）")(C++26) | um stop callback para `std::inplace_stop_token`
(class template)
[ stop_callback_for_t](<#/doc/thread/stop_callback_for_t>)(C++26) | obtém o tipo de callback para um dado tipo de stop token
(alias template)

##### Concepts (desde C++20)

[ stoppable_token](<#/doc/thread/stoppable_token>)(C++26) | especifica a interface básica de stop tokens que permite consultas por stop requests e se a stop request é possível
(concept)
[ unstoppable_token](<#/doc/thread/unstoppable_token>)(C++26) | especifica um stop token que não permite parar
(concept)
[__stoppable-source__](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/stoppable-source&action=edit&redlink=1> "cpp/thread/stoppable-source（página inexistente）")(C++26) | especifica que um tipo é uma factory para stop tokens associados e que uma stop request pode ser feita sobre ele
(exposition-only concept*)
[__stoppable-callback-for__](<https://en.cppreference.com/mwiki/index.php?title=cpp/thread/stoppable-callback-for&action=edit&redlink=1> "cpp/thread/stoppable-callback-for（página inexistente）")(C++26) | especifica uma interface para registrar callbacks com um dado tipo de stop token
(exposition-only concept*)

### Acesso ao tamanho do cache (desde C++17)

Definido no header `[<new>](<#/doc/header/new>)`
---
[ hardware_destructive_interference_sizehardware_constructive_interference_size](<#/doc/thread/hardware_destructive_interference_size>)(C++17) | offset mínimo para evitar false sharing
offset máximo para promover true sharing
(constant)

### Operações atômicas

Esses componentes são fornecidos para operações atômicas de granularidade fina, permitindo programação concorrente sem locks. Cada operação atômica é indivisível em relação a qualquer outra operação atômica que envolva o mesmo objeto. Objetos atômicos são [livres de data races](<#/doc/language/memory_model>).

Definido no header `[<atomic>](<#/doc/header/atomic>)`
---

##### Tipos atômicos

[ atomic](<#/doc/atomic/atomic>)(C++11) | template de classe atômica e especializações para bool, integral, floating-point,(desde C++20) e tipos de ponteiro
(class template)
[ atomic_ref](<#/doc/atomic/atomic_ref>)(C++20) | fornece operações atômicas em objetos não atômicos
(class template)

##### Operações em tipos atômicos

[ atomic_is_lock_free](<#/doc/atomic/atomic_is_lock_free>)(C++11) | verifica se as operações do tipo atômico são lock-free
(function template)
[ atomic_storeatomic_store_explicit](<#/doc/atomic/atomic_store>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico
(function template)
[ atomic_loadatomic_load_explicit](<#/doc/atomic/atomic_load>)(C++11)(C++11) | obtém atomicamente o valor armazenado em um objeto atômico
(function template)
[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico e retorna o valor antigo do atômico
(function template)
[ atomic_compare_exchange_weakatomic_compare_exchange_weak_explicitatomic_compare_exchange_strongatomic_compare_exchange_strong_explicit](<#/doc/atomic/atomic_compare_exchange>)(C++11)(C++11)(C++11)(C++11) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se forem iguais ou um carregamento atômico se não forem
(function template)
[ atomic_fetch_addatomic_fetch_add_explicit](<#/doc/atomic/atomic_fetch_add>)(C++11)(C++11) | adiciona um valor não atômico a um objeto atômico e obtém o valor anterior do atômico
(function template)
[ atomic_fetch_subatomic_fetch_sub_explicit](<#/doc/atomic/atomic_fetch_sub>)(C++11)(C++11) | subtrai um valor não atômico de um objeto atômico e obtém o valor anterior do atômico
(function template)
[ atomic_fetch_andatomic_fetch_and_explicit](<#/doc/atomic/atomic_fetch_and>)(C++11)(C++11) | substitui o objeto atômico pelo resultado de um AND bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(function template)
[ atomic_fetch_oratomic_fetch_or_explicit](<#/doc/atomic/atomic_fetch_or>)(C++11)(C++11) | substitui o objeto atômico pelo resultado de um OR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(function template)
[ atomic_fetch_xoratomic_fetch_xor_explicit](<#/doc/atomic/atomic_fetch_xor>)(C++11)(C++11) | substitui o objeto atômico pelo resultado de um XOR bit a bit com um argumento não atômico e obtém o valor anterior do atômico
(function template)
[ atomic_fetch_maxatomic_fetch_max_explicit](<#/doc/atomic/atomic_fetch_max>)(C++26)(C++26) | substitui o objeto atômico pelo resultado de [std::max](<#/doc/algorithm/max>) com um argumento não atômico e obtém o valor anterior do atômico
(function template)
[ atomic_fetch_minatomic_fetch_min_explicit](<#/doc/atomic/atomic_fetch_min>)(C++26)(C++26) | substitui o objeto atômico pelo resultado de [std::min](<#/doc/algorithm/min>) com um argumento não atômico e obtém o valor anterior do atômico
(function template)
[ atomic_waitatomic_wait_explicit](<#/doc/atomic/atomic_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(function template)
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_wait
(function template)
[ atomic_notify_all](<#/doc/atomic/atomic_notify_all>)(C++20) | notifica todas as threads bloqueadas em atomic_wait
(function template)

##### Tipo e operações de flag

[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) | o tipo atômico booleano lock-free
(class)
[ atomic_flag_test_and_setatomic_flag_test_and_set_explicit](<#/doc/atomic/atomic_flag_test_and_set>)(C++11)(C++11) | define atomicamente a flag como true e retorna seu valor anterior
(function)
[ atomic_flag_clearatomic_flag_clear_explicit](<#/doc/atomic/atomic_flag_clear>)(C++11)(C++11) | define atomicamente o valor da flag como false
(function)
[ atomic_flag_testatomic_flag_test_explicit](<#/doc/atomic/atomic_flag_test>)(C++20)(C++20) | retorna atomicamente o valor da flag
(function)
[ atomic_flag_waitatomic_flag_wait_explicit](<#/doc/atomic/atomic_flag_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e a flag mudar
(function)
[ atomic_flag_notify_one](<#/doc/atomic/atomic_flag_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_flag_wait
(function)
[ atomic_flag_notify_all](<#/doc/atomic/atomic_flag_notify_all>)(C++20) | notifica todas as threads bloqueadas em atomic_flag_wait
(function)

##### Inicialização

[ atomic_init](<#/doc/atomic/atomic_init>)(C++11)(obsoleto desde C++20) | inicialização não atômica de um objeto atômico construído por padrão
(function template)
[ ATOMIC_VAR_INIT](<#/doc/atomic/ATOMIC_VAR_INIT>)(C++11)(obsoleto desde C++20) | inicialização constante de uma variável atômica com duração de armazenamento estática
(function macro)
[ ATOMIC_FLAG_INIT](<#/doc/atomic/ATOMIC_FLAG_INIT>)(C++11) | inicializa um [std::atomic_flag](<#/doc/atomic/atomic_flag>) como false
(macro constant)

##### Ordem de sincronização de memória

[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordem de memória para a operação atômica dada
(enum)
[ kill_dependency](<#/doc/atomic/kill_dependency>)(C++11) | remove o objeto especificado da árvore de dependência [std::memory_order_consume](<#/doc/atomic/memory_order>)
(function template)
[ atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>)(C++11) | primitiva de sincronização de fence genérica dependente da ordem de memória
(function)
[ atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)(C++11) | fence entre uma thread e um signal handler executado na mesma thread
(function)
Definido no header `[<stdatomic.h>](<#/doc/header/stdatomic.h>)`

##### Macros de compatibilidade C (desde C++23)

[ _Atomic](<#/doc/atomic/atomic>)(C++23) | macro de compatibilidade tal que _Atomic(T) é idêntico a [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;
(function macro)

Nem a macro `_Atomic`, nem quaisquer das declarações de namespace global não-macro são fornecidas por qualquer header da standard library C++ que não seja `<stdatomic.h>`.

### Exclusão mútua

Algoritmos de exclusão mútua impedem que múltiplas threads acessem simultaneamente recursos compartilhados. Isso previne data races e fornece suporte para sincronização entre threads.

Definido no header `[<mutex>](<#/doc/header/mutex>)`
---
[ mutex](<#/doc/thread/mutex>)(C++11) | fornece facilidade básica de exclusão mútua
(class)
[ timed_mutex](<#/doc/thread/timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que implementa travamento com um timeout
(class)
[ recursive_mutex](<#/doc/thread/recursive_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser travada recursivamente pela mesma thread
(class)
[ recursive_timed_mutex](<#/doc/thread/recursive_timed_mutex>)(C++11) | fornece facilidade de exclusão mútua que pode ser travada recursivamente
pela mesma thread e implementa travamento com um timeout
(class)
Definido no header `[<shared_mutex>](<#/doc/header/shared_mutex>)`

```cpp
 shared_mutex(C++17)
(class)
 shared_timed_mutex(C++14)
(class)
```

##### Gerenciamento genérico de mutex

Definido no header `[<mutex>](<#/doc/header/mutex>)`

```cpp
 lock_guard(C++11)
(class template)
 scoped_lock(C++17)
(class template)
 unique_lock(C++11)
(class template)
 shared_lock(C++14)
(class template)
 defer_locktry_to_lockadopt_lockdefer_lock_ttry_to_lock_tadopt_lock_t(C++11)
(tag)
```

##### Algoritmos genéricos de travamento

[ try_lock](<#/doc/thread/try_lock>)(C++11) | tenta obter a propriedade de mutexes através de chamadas repetidas a `try_lock`
(function template)
[ lock](<#/doc/thread/lock>)(C++11) | trava os mutexes especificados, bloqueia se algum estiver indisponível
(function template)

##### Chamar uma vez

[ once_flag](<#/doc/thread/once_flag>)(C++11) | objeto auxiliar para garantir que [`call_once`](<#/doc/thread/call_once>) invoque a função apenas uma vez
(class)
[ call_once](<#/doc/thread/call_once>)(C++11) | invoca uma função apenas uma vez, mesmo se chamada de múltiplas threads
(function template)

### Variáveis de condição

Uma variável de condição é uma primitiva de sincronização que permite que múltiplas threads se comuniquem entre si. Ela permite que um certo número de threads espere (possivelmente com um timeout) por uma notificação de outra thread de que elas podem prosseguir. Uma variável de condição está sempre associada a um mutex.

Definido no header `[<condition_variable>](<#/doc/header/condition_variable>)`
---
[ condition_variable](<#/doc/thread/condition_variable>)(C++11) | fornece uma variável de condição associada a um [std::unique_lock](<#/doc/thread/unique_lock>)
(class)
[ condition_variable_any](<#/doc/thread/condition_variable_any>)(C++11) | fornece uma variável de condição associada a qualquer tipo de lock
(class)
[ notify_all_at_thread_exit](<#/doc/thread/notify_all_at_thread_exit>)(C++11) | agenda uma chamada para `notify_all` a ser invocada quando esta thread estiver completamente finalizada
(function)
[ cv_status](<#/doc/thread/cv_status>)(C++11) | lista os possíveis resultados de esperas com timeout em variáveis de condição
(enum)

### Semáforos (desde C++20)

Um semáforo é uma primitiva de sincronização leve usada para restringir o acesso concorrente a um recurso compartilhado. Quando qualquer um dos dois seria suficiente, um semáforo pode ser mais eficiente do que uma variável de condição.

Definido no header `[<semaphore>](<#/doc/header/semaphore>)`
---
[ counting_semaphore](<#/doc/thread/counting_semaphore>)(C++20) | semáforo que modela uma contagem de recursos não negativa
(class template)
[ binary_semaphore](<#/doc/thread/counting_semaphore>)(C++20) | semáforo que possui apenas dois estados
(typedef)

### Latches e Barriers (desde C++20)

Latches e barriers são mecanismos de coordenação de threads que permitem que qualquer número de threads bloqueie até que um número esperado de threads chegue. Um latch não pode ser reutilizado, enquanto um barrier pode ser usado repetidamente.

Definido no header `[<latch>](<#/doc/header/latch>)`
---
[ latch](<#/doc/thread/latch>)(C++20) | barrier de thread de uso único
(class)
Definido no header `[<barrier>](<#/doc/header/barrier>)`

```cpp
 barrier(C++20)
(class template)
```

### Futures

A standard library fornece facilidades para obter valores que são retornados e para capturar exceções que são lançadas por tarefas assíncronas (isto é, funções lançadas em threads separadas). Esses valores são comunicados em um _shared state_ , no qual a tarefa assíncrona pode escrever seu valor de retorno ou armazenar uma exceção, e que pode ser examinado, aguardado e manipulado de outras formas por outras threads que possuem instâncias de [std::future](<#/doc/thread/future>) ou [std::shared_future](<#/doc/thread/shared_future>) que referenciam esse shared state.

Definido no header `[<future>](<#/doc/header/future>)`
---
[ promise](<#/doc/thread/promise>)(C++11) | armazena um valor para recuperação assíncrona
(class template)
[ packaged_task](<#/doc/thread/packaged_task>)(C++11) | empacota uma função para armazenar seu valor de retorno para recuperação assíncrona
(class template)
[ future](<#/doc/thread/future>)(C++11) | espera por um valor que é definido assincronamente
(class template)
[ shared_future](<#/doc/thread/shared_future>)(C++11) | espera por um valor (possivelmente referenciado por outros futures) que é definido assincronamente
(class template)
[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado
(function template)
[ launch](<#/doc/thread/launch>)(C++11) | especifica a política de lançamento para [std::async](<#/doc/thread/async>)
(enum)
[ future_status](<#/doc/thread/future_status>)(C++11) | especifica os resultados de esperas com timeout realizadas em [std::future](<#/doc/thread/future>) e [std::shared_future](<#/doc/thread/shared_future>)
(enum)

##### Erros de Future

[ future_error](<#/doc/thread/future_error>)(C++11) | reporta um erro relacionado a futures ou promises
(class)
[ future_category](<#/doc/thread/future_category>)(C++11) | identifica a categoria de erro de future
(function)
[ future_errc](<#/doc/thread/future_errc>)(C++11) | identifica os códigos de erro de future
(enum)

### Reclamação Segura (desde C++26)

Técnicas de reclamação segura são mais frequentemente usadas para resolver diretamente data races de acesso-exclusão.

##### Mecanismo Read-Copy-Update

---
Definido no header `[<rcu>](<#/doc/header/rcu>)`

```cpp
 rcu_obj_base(C++26)
(class template)
 rcu_domain(C++26)
(class)
 rcu_default_domain(C++26)
(function)
 rcu_synchronize(C++26)
(function)
 rcu_barrier(C++26)
(function)
 rcu_retire(C++26)
(function template)
```

##### Ponteiros de Risco

Definido no header `[<hazard_pointer>](<#/doc/header/hazard_pointer>)`

```cpp
 hazard_pointer_obj_base(C++26)
(class template)
 hazard_pointer(C++26)
(class)
 make_hazard_pointer(C++26)
(function)
```

### Veja também

[Documentação C](<#/>) para a biblioteca de suporte à concorrência
---