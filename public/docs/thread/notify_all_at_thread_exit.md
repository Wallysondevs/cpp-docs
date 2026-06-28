# std::notify_all_at_thread_exit

Definido no cabeçalho `[<condition_variable>](<#/doc/header/condition_variable>)`

```c
void notify_all_at_thread_exit( std::condition_variable& cond,
std::unique_lock<std::mutex> lk );
```

`notify_all_at_thread_exit` fornece um mecanismo para notificar outras threads de que uma determinada thread foi completamente finalizada, incluindo a destruição de todos os objetos [`thread_local`](<#/doc/keyword/thread_local>). Ele opera da seguinte forma:

*   A propriedade do lock lk previamente adquirido é transferida para um armazenamento interno.

*   O ambiente de execução é modificado de tal forma que, quando a thread atual é encerrada, a condition variable cond é notificada como se por lk.unlock();
    cond.notify_all();.

O lk.unlock() implícito é [sequenciado após](<#/doc/atomic/memory_order>) a destruição de todos os objetos com [duração de armazenamento thread local](<#/doc/keyword/thread_local>) associados à thread atual.

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

*   lk não está bloqueado pela thread chamadora.
*   Se algumas outras threads também estiverem esperando em cond, lk.mutex() é diferente do mutex desbloqueado pelas funções de espera (`wait`, wait_for e wait_until) chamadas em cond por essas threads.

### Notas

Um efeito equivalente pode ser alcançado com as facilidades fornecidas por [std::promise](<#/doc/thread/promise>) ou [std::packaged_task](<#/doc/thread/packaged_task>).

O lock lk fornecido é mantido até que a thread seja encerrada. Uma vez que esta função tenha sido chamada, nenhuma outra thread pode adquirir o mesmo lock para esperar em cond. Se algumas threads estiverem esperando nesta condition variable, certifique-se de que a condição esperada seja satisfeita enquanto o lock em lk é mantido, e que este lock não seja liberado e readquirido antes de chamar `notify_all_at_thread_exit` para evitar confusão de despertadas espúrias em outras threads.

Em casos de uso típicos, esta função é a última coisa chamada por uma thread destacada.

### Parâmetros

- **cond** — a condition variable a ser notificada na saída da thread
- **lk** — o lock associado à condition variable cond

### Valor de retorno

(nenhum)

### Exemplo

Este fragmento de código parcial ilustra como `notify_all_at_thread_exit` pode ser usado para evitar o acesso a dados que dependem de thread locals enquanto esses thread locals estão em processo de destruição:

Run this code
```cpp
    #include <cassert>
    #include <condition_variable>
    #include <mutex>
    #include <string>
    #include <thread>
    
    std::mutex m;
    std::condition_variable cv;
    
    bool ready = false;
    std::string result; // some arbitrary type
    
    void thread_func()
    {
        thread_local std::string thread_local_data = "42";
    
        std::unique_lock<std::mutex> lk(m);
    
        // assign a value to result using thread_local data
        result = thread_local_data;
        ready = true;
    
        std::notify_all_at_thread_exit(cv, std::move(lk));
    
    }   // 1. destrói thread_locals;
        // 2. desbloqueia mutex;
        // 3. notifica cv.
    
    int main()
    {
        std::thread t(thread_func);
        t.detach();
    
        // do other work
        // ...
    
        // wait for the detached thread
        std::unique_lock<std::mutex> lk(m);
        cv.wait(lk, []{ return ready; });
    
        // o resultado está pronto e os destrutores thread_local terminaram, sem UB
        assert(result == "42");
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2140](<https://cplusplus.github.io/LWG/issue2140>) | C++11 | a chamada para `notify_all_at_thread_exit`
sincronizada com chamadas para funções esperando em cond | atualizou o requisito de sincronização

### Veja também

[ set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>) | define o resultado para um valor específico enquanto entrega a notificação apenas na saída da thread
(função membro pública de `std::promise<R>`)
[ make_ready_at_thread_exit](<#/doc/thread/packaged_task/make_ready_at_thread_exit>) | executa a função garantindo que o resultado esteja pronto somente quando a thread atual for encerrada
(função membro pública de `std::packaged_task<R(Args...)>`)