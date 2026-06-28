# std::condition_variable

Definido no cabeçalho `[<condition_variable>](<#/doc/header/condition_variable>)`

```c
class condition_variable;
```

`std::condition_variable` é uma primitiva de sincronização usada com um [std::mutex](<#/doc/thread/mutex>) para bloquear uma ou mais threads até que outra thread modifique uma variável compartilhada (a _condição_) e notifique a `std::condition_variable`.

A thread que pretende modificar a variável compartilhada deve:

1.  Adquirir um [std::mutex](<#/doc/thread/mutex>) (tipicamente via [std::lock_guard](<#/doc/thread/lock_guard>)).
2.  Modificar a variável compartilhada enquanto o lock estiver sendo mantido.
3.  Chamar [notify_one](<#/doc/thread/condition_variable/notify_one>) ou [notify_all](<#/doc/thread/condition_variable/notify_all>) na `std::condition_variable` (pode ser feito após liberar o lock).

Mesmo que a variável compartilhada seja atômica, ela deve ser modificada enquanto o mutex estiver sendo mantido para [publicar corretamente](<https://stackoverflow.com/questions/38147825/>) a modificação para a thread em espera.

Qualquer thread que pretenda esperar por uma `std::condition_variable` deve:

1.  Adquirir um [std::unique_lock](<#/doc/thread/unique_lock>)<[std::mutex](<#/doc/thread/mutex>)> no mutex usado para proteger a variável compartilhada.
2.  Fazer uma das seguintes ações:

    1.  Verificar a condição, caso ela já tenha sido atualizada e notificada.
    2.  Chamar [wait](<#/doc/thread/condition_variable/wait>), [wait_for](<#/doc/thread/condition_variable/wait_for>), ou [wait_until](<#/doc/thread/condition_variable/wait_until>) na `std::condition_variable` (libera atomicamente o mutex e suspende a execução da thread até que a variável de condição seja notificada, um timeout expire, ou um [despertar espúrio](<https://en.wikipedia.org/wiki/Spurious_wakeup> "enwiki:Spurious wakeup") ocorra, então adquire atomicamente o mutex antes de retornar).
    3.  Verificar a condição e retomar a espera se não estiver satisfeita.

    ou:

    1.  Usar a sobrecarga predicada de [wait](<#/doc/thread/condition_variable/wait>), [wait_for](<#/doc/thread/condition_variable/wait_for>), e [wait_until](<#/doc/thread/condition_variable/wait_until>), que executa os mesmos três passos.

`std::condition_variable` funciona apenas com [std::unique_lock](<#/doc/thread/unique_lock>)<[std::mutex](<#/doc/thread/mutex>)>, o que permite máxima eficiência em algumas plataformas. [std::condition_variable_any](<#/doc/thread/condition_variable_any>) fornece uma variável de condição que funciona com qualquer objeto [BasicLockable](<#/doc/named_req/BasicLockable>), como [std::shared_lock](<#/doc/thread/shared_lock>).

Variáveis de condição permitem a invocação concorrente das funções membro [wait](<#/doc/thread/condition_variable/wait>), [wait_for](<#/doc/thread/condition_variable/wait_for>), [wait_until](<#/doc/thread/condition_variable/wait_until>), [notify_one](<#/doc/thread/condition_variable/notify_one>) e [notify_all](<#/doc/thread/condition_variable/notify_all>).

A classe `std::condition_variable` é um [StandardLayoutType](<#/doc/named_req/StandardLayoutType>). Ela não é [CopyConstructible](<#/doc/named_req/CopyConstructible>), [MoveConstructible](<#/doc/named_req/MoveConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), ou [MoveAssignable](<#/doc/named_req/MoveAssignable>).

### Tipos aninhados

Nome | Definição
---|---
`native_handle_type` | definido pela implementação

### Funções membro

[ (construtor)](<#/doc/thread/condition_variable/condition_variable>) | constrói o objeto
(função membro pública)
[ (destrutor)](<#/doc/thread/condition_variable/~condition_variable>) | destrói o objeto
(função membro pública)
operator=[deleted] | não copiável por atribuição
(função membro pública)

##### Notificação

[ notify_one](<#/doc/thread/condition_variable/notify_one>) | notifica uma thread em espera
(função membro pública)
[ notify_all](<#/doc/thread/condition_variable/notify_all>) | notifica todas as threads em espera
(função membro pública)

##### Espera

[ wait](<#/doc/thread/condition_variable/wait>) | bloqueia a thread atual até que a variável de condição seja despertada
(função membro pública)
[ wait_for](<#/doc/thread/condition_variable/wait_for>) | bloqueia a thread atual até que a variável de condição seja despertada ou após a duração de timeout especificada
(função membro pública)
[ wait_until](<#/doc/thread/condition_variable/wait_until>) | bloqueia a thread atual até que a variável de condição seja despertada ou até que o ponto no tempo especificado seja atingido
(função membro pública)

##### Handle nativo

[ native_handle](<#/doc/thread/condition_variable/native_handle>) | retorna o handle nativo
(função membro pública)

### Exemplo

`std::condition_variable` é usada em combinação com um [std::mutex](<#/doc/thread/mutex>) para facilitar a comunicação entre threads.

Execute este código
```cpp
    #include <condition_variable>
    #include <iostream>
    #include <mutex>
    #include <string>
    #include <thread>
    
    std::mutex m;
    std::condition_variable cv;
    std::string data;
    bool ready = false;
    bool processed = false;
    
    void worker_thread()
    {
        // wait until main() sends data
        std::unique_lock lk(m);
        cv.wait(lk, []{ return ready; });
    
        // after the wait, we own the lock
        std::cout << "Worker thread is processing data\n";
        data += " after processing";
    
        // send data back to main()
        processed = true;
        std::cout << "Worker thread signals data processing completed\n";
    
        // manual unlocking is done before notifying, to avoid waking up
        // the waiting thread only to block again (see notify_one for details)
        lk.unlock();
        cv.notify_one();
    }
    
    int main()
    {
        std::thread worker(worker_thread);
    
        data = "Example data";
        // send data to the worker thread
        {
            std::lock_guard lk(m);
            ready = true;
            std::cout << "main() signals data ready for processing\n";
        }
        cv.notify_one();
    
        // wait for the worker
        {
            std::unique_lock lk(m);
            cv.wait(lk, []{ return processed; });
        }
        std::cout << "Back in main(), data = " << data << '\n';
    
        worker.join();
    }
```

Saída:
```
    main() signals data ready for processing
    Worker thread is processing data
    Worker thread signals data processing completed
    Back in main(), data = Example data after processing
```

### Veja também

[ condition_variable_any](<#/doc/thread/condition_variable_any>)(C++11) | fornece uma variável de condição associada a qualquer tipo de lock
(classe)
[ mutex](<#/doc/thread/mutex>)(C++11) | fornece facilidade básica de exclusão mútua
(classe)
[ lock_guard](<#/doc/thread/lock_guard>)(C++11) | implementa um wrapper de propriedade de mutex estritamente baseado em escopo
(template de classe)
[ unique_lock](<#/doc/thread/unique_lock>)(C++11) | implementa um wrapper de propriedade de mutex movível
(template de classe)