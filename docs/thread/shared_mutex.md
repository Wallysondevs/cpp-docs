# std::shared_mutex

Definido no cabeçalho `[<shared_mutex>](<#/doc/header/shared_mutex>)`

```c
class shared_mutex;
```

A classe `shared_mutex` é uma primitiva de sincronização que pode ser usada para proteger dados compartilhados de serem acessados simultaneamente por múltiplas threads. Em contraste com outros tipos de mutex que facilitam o acesso exclusivo, um shared_mutex possui dois níveis de acesso:

*   _compartilhado_ \- várias threads podem compartilhar a posse do mesmo mutex.
*   _exclusivo_ \- apenas uma thread pode possuir o mutex.

Se uma thread adquiriu o bloqueio _exclusivo_ (através de [lock](<#/doc/thread/shared_mutex/lock>), [try_lock](<#/doc/thread/shared_mutex/try_lock>)), nenhuma outra thread pode adquirir o bloqueio (incluindo o _compartilhado_).

Se uma thread adquiriu o bloqueio _compartilhado_ (através de [lock_shared](<#/doc/thread/shared_mutex/lock_shared>), [try_lock_shared](<#/doc/thread/shared_mutex/try_lock_shared>)), nenhuma outra thread pode adquirir o bloqueio _exclusivo_, mas pode adquirir o bloqueio _compartilhado_.

Somente quando o bloqueio _exclusivo_ não foi adquirido por nenhuma thread, o bloqueio _compartilhado_ pode ser adquirido por múltiplas threads.

Dentro de uma thread, apenas um bloqueio (_compartilhado_ ou _exclusivo_) pode ser adquirido ao mesmo tempo.

Mutexes compartilhados são especialmente úteis quando dados compartilhados podem ser lidos com segurança por qualquer número de threads simultaneamente, mas uma thread só pode escrever os mesmos dados quando nenhuma outra thread está lendo ou escrevendo ao mesmo tempo.

A classe `shared_mutex` satisfaz todos os requisitos de [SharedMutex](<#/doc/named_req/SharedMutex>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Tipos de membros

Tipo de membro | Definição
---|---
`native_handle_type` (opcional*) | definido pela implementação

### Funções de membro

[ (construtor)](<#/doc/thread/shared_mutex/shared_mutex>) | constrói o mutex
(função de membro pública)
[ (destrutor)](<#/doc/thread/shared_mutex/~shared_mutex>) | destrói o mutex
(função de membro pública)
operator=[deleted] | não atribuível por cópia
(função de membro pública)

##### Bloqueio exclusivo

[ lock](<#/doc/thread/shared_mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível
(função de membro pública)
[ try_lock](<#/doc/thread/shared_mutex/try_lock>) | tenta bloquear o mutex, retorna se o mutex não estiver disponível
(função de membro pública)
[ unlock](<#/doc/thread/shared_mutex/unlock>) | desbloqueia o mutex
(função de membro pública)

##### Bloqueio compartilhado

[ lock_shared](<#/doc/thread/shared_mutex/lock_shared>) | bloqueia o mutex para posse compartilhada, bloqueia se o mutex não estiver disponível
(função de membro pública)
[ try_lock_shared](<#/doc/thread/shared_mutex/try_lock_shared>) | tenta bloquear o mutex para posse compartilhada, retorna se o mutex não estiver disponível
(função de membro pública)
[ unlock_shared](<#/doc/thread/shared_mutex/unlock_shared>) | desbloqueia o mutex (posse compartilhada)
(função de membro pública)

##### Handle nativo

[ native_handle](<#/doc/thread/shared_mutex/native_handle>) | retorna o objeto handle nativo subjacente definido pela implementação
(função de membro pública)

### Exemplo

A saída abaixo foi gerada em uma máquina de núcleo único. Quando `thread1` inicia, ela entra no loop pela primeira vez e chama `increment()` seguido por `get()`. No entanto, antes que possa imprimir o valor retornado para [std::cout](<#/doc/io/cout>), o escalonador coloca `thread1` para dormir e acorda `thread2`, que obviamente tem tempo suficiente para executar todas as três iterações do loop de uma vez. De volta a `thread1`, ainda na primeira iteração do loop, ela finalmente imprime sua cópia local do valor do contador, que é 1, para `std::cout` e então executa as duas iterações restantes do loop. Em uma máquina multi-core, nenhuma das threads é colocada para dormir e a saída é mais provável de estar em ordem crescente.

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    #include <shared_mutex>
    #include <syncstream>
    #include <thread>
     
    class ThreadSafeCounter
    {
    public:
        ThreadSafeCounter() = default;
     
        // Multiple threads/readers can read the counter's value at the same time.
        unsigned int get() const
        {
            std::shared_lock lock(mutex_);
            return value_;
        }
     
        // Only one thread/writer can increment/write the counter's value.
        void increment()
        {
            std::unique_lock lock(mutex_);
            ++value_;
        }
     
        // Only one thread/writer can reset/write the counter's value.
        void reset()
        {
            std::unique_lock lock(mutex_);
            value_ = 0;
        }
     
    private:
        mutable std::shared_mutex mutex_;
        unsigned int value_{};
    };
     
    int main()
    {
        ThreadSafeCounter counter;
     
        auto increment_and_print = &counter
        {
            for (int i{}; i != 3; ++i)
            {
                counter.increment();
                std::osyncstream(std::cout)
                    << std::this_thread::get_id() << ' ' << counter.get() << '\n';
            }
        };
     
        std::thread thread1(increment_and_print);
        std::thread thread2(increment_and_print);
     
        thread1.join();
        thread2.join();
    }
```

Saída possível:
```
    123084176803584 2
    123084176803584 3
    123084176803584 4
    123084185655040 1
    123084185655040 5
    123084185655040 6
```

### Veja também

[ shared_timed_mutex](<#/doc/thread/shared_timed_mutex>)(C++14) | fornece facilidade de exclusão mútua compartilhada e implementa bloqueio com um tempo limite
(classe)
[ shared_lock](<#/doc/thread/shared_lock>)(C++14) | implementa um wrapper de posse de mutex compartilhado móvel
(modelo de classe)
[ unique_lock](<#/doc/thread/unique_lock>)(C++11) | implementa um wrapper de posse de mutex móvel
(modelo de classe)