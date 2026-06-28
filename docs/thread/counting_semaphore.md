# std::counting_semaphore, std::binary_semaphore

Definido no cabeçalho `[<semaphore>](<#/doc/header/semaphore>)`

```c
template< std::ptrdiff_t LeastMaxValue = /* implementation-defined */ >
class counting_semaphore;
using binary_semaphore = std::counting_semaphore<1>;
```

1) Um `counting_semaphore` é uma primitiva de sincronização leve que pode controlar o acesso a um recurso compartilhado. Ao contrário de um [std::mutex](<#/doc/thread/mutex>), um `counting_semaphore` permite mais de um acesso concorrente ao mesmo recurso, para pelo menos `LeastMaxValue` acessadores concorrentes. O programa é malformado se `LeastMaxValue` for negativo.

2) `binary_semaphore` é um alias para uma especialização de `std::counting_semaphore` com `LeastMaxValue` sendo 1. As implementações podem implementar `binary_semaphore` de forma mais eficiente do que a implementação padrão de `std::counting_semaphore`.

Um `counting_semaphore` contém um contador interno inicializado pelo construtor. Este contador é decrementado por chamadas a acquire() e métodos relacionados, e é incrementado por chamadas a release(). Quando o contador é zero, acquire() bloqueia até que o contador seja incrementado, mas try_acquire() não bloqueia; try_acquire_for() e try_acquire_until() bloqueiam até que o contador seja incrementado ou um tempo limite seja atingido.

Similar a [std::condition_variable::wait()](<#/doc/thread/condition_variable/wait>), o try_acquire() de `counting_semaphore` pode falhar espuriamente.

Especializações de `std::counting_semaphore` não são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [MoveConstructible](<#/doc/named_req/MoveConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), ou [MoveAssignable](<#/doc/named_req/MoveAssignable>).

### Membros de Dados

Nome do membro | Definição
---|---
`_counter_` (privado) | O contador interno do tipo [std::ptrdiff_t](<#/doc/types/ptrdiff_t>).
(objeto membro apenas para exposição*)

### Funções Membro

[ (construtor)](<#/doc/thread/counting_semaphore/counting_semaphore>) | constrói um `counting_semaphore`
(função membro pública)
[ (destrutor)](<#/doc/thread/counting_semaphore/~counting_semaphore>) | destrói o `counting_semaphore`
(função membro pública)
operator=[deleted] | `counting_semaphore` não é atribuível
(função membro pública)

##### Operações

[ release](<#/doc/thread/counting_semaphore/release>) | incrementa o contador interno e desbloqueia os adquirentes
(função membro pública)
[ acquire](<#/doc/thread/counting_semaphore/acquire>) | decrementa o contador interno ou bloqueia até que possa
(função membro pública)
[ try_acquire](<#/doc/thread/counting_semaphore/try_acquire>) | tenta decrementar o contador interno sem bloquear
(função membro pública)
[ try_acquire_for](<#/doc/thread/counting_semaphore/try_acquire_for>) | tenta decrementar o contador interno, bloqueando por até um tempo de duração
(função membro pública)
[ try_acquire_until](<#/doc/thread/counting_semaphore/try_acquire_until>) | tenta decrementar o contador interno, bloqueando até um ponto no tempo
(função membro pública)

##### Constantes

[ max](<#/doc/thread/counting_semaphore/max>)[static] | retorna o valor máximo possível do contador interno
(função membro pública)

### Notas

Como o nome indica, `LeastMaxValue` é o valor máximo _mínimo_, não o valor máximo _real_. Assim, max() pode retornar um número maior que `LeastMaxValue`.

Ao contrário de [std::mutex](<#/doc/thread/mutex>), um `counting_semaphore` não está vinculado a threads de execução - adquirir um semáforo pode ocorrer em uma thread diferente da que o libera, por exemplo. Todas as operações em `counting_semaphore` podem ser realizadas concorrentemente e sem qualquer relação com threads de execução específicas, com exceção do destrutor que não pode ser realizado concorrentemente, mas pode ser realizado em uma thread diferente.

Semáforos também são frequentemente usados para a semântica de sinalização/notificação em vez de exclusão mútua, inicializando o semáforo com 0 e, assim, bloqueando o(s) receptor(es) que tentam acquire(), até que o notificador "sinalize" invocando release(n). Nesse aspecto, os semáforos podem ser considerados alternativas a [std::condition_variable](<#/doc/thread/condition_variable>)s, frequentemente com melhor desempenho.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_semaphore`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::counting_semaphore`, `std::binary_semaphore`

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <semaphore>
    #include <thread>
    
    // global binary semaphore instances
    // object counts are set to zero
    // objects are in non-signaled state
    std::binary_semaphore
        smphSignalMainToThread{0},
        smphSignalThreadToMain{0};
    
    void ThreadProc()
    {
        // wait for a signal from the main proc
        // by attempting to decrement the semaphore
        smphSignalMainToThread.acquire();
    
        // this call blocks until the semaphore's count
        // is increased from the main proc
    
        std::cout << "[thread] Got the signal\n"; // response message
    
        // wait for 3 seconds to imitate some work
        // being done by the thread
        using namespace std::literals;
        std::this_thread::sleep_for(3s);
    
        std::cout << "[thread] Send the signal\n"; // message
    
        // signal the main proc back
        smphSignalThreadToMain.release();
    }
    
    int main()
    {
        // create some worker thread
        std::thread thrWorker(ThreadProc);
    
        std::cout << "[main] Send the signal\n"; // message
    
        // signal the worker thread to start working
        // by increasing the semaphore's count
        smphSignalMainToThread.release();
    
        // wait until the worker thread is done doing the work
        // by attempting to decrement the semaphore's count
        smphSignalThreadToMain.acquire();
    
        std::cout << "[main] Got the signal\n"; // response message
        thrWorker.join();
    }
```

Saída:
```
    [main] Send the signal
    [thread] Got the signal
    [thread] Send the signal
    [main] Got the signal
```