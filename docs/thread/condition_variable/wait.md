# std::condition_variable::wait

```cpp
void wait( std::unique_lock<std::mutex>& lock );  // (1) (desde C++11)
template< class Predicate >
void wait( std::unique_lock<std::mutex>& lock, Predicate pred );  // (2) (desde C++11)
```

`wait` faz com que a thread atual seja bloqueada até que a condition variable seja notificada ou ocorra um spurious wakeup. `pred` pode ser opcionalmente fornecido para detectar spurious wakeup.

1) Chama atomicamente `lock.unlock()` e bloqueia em `*this`.

A thread será desbloqueada quando [notify_all()](<#/doc/thread/condition_variable/notify_all>) ou [notify_one()](<#/doc/thread/condition_variable/notify_one>) for executado. Ela também pode ser desbloqueada de forma espúria.

Quando desbloqueada, chama `lock.lock()` (possivelmente bloqueando no lock), então retorna.

2) Equivalente a

```cpp
while (!pred())
wait(lock);
```

Esta sobrecarga pode ser usada para ignorar awakenings espúrios enquanto espera que uma condição específica se torne verdadeira.

Logo após `wait` retornar, `lock.owns_lock()` é verdadeiro, e `lock.mutex()` está bloqueado pela thread chamadora. Se estas pós-condições não puderem ser satisfeitas[1](<#/doc/thread/condition_variable/wait>), chama [std::terminate](<#/doc/error/terminate>).

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   `lock.owns_lock()` é falso.
*   `lock.mutex()` não está bloqueado pela thread chamadora.
*   Se outras threads também estiverem esperando em `*this`, `lock.mutex()` é diferente do mutex desbloqueado pelas funções de espera (`wait`, [wait_for](<#/doc/thread/condition_variable/wait_for>) e [wait_until](<#/doc/thread/condition_variable/wait_until>)) chamadas em `*this` por essas threads.

1.  [↑](<#/doc/thread/condition_variable/wait>) Isso pode acontecer se o re-bloqueio do mutex lançar uma exceção.

### Parâmetros

- **lock** — um lock que deve estar bloqueado pela thread chamadora
- **pred** — o predicado para verificar se a espera pode ser concluída
Requisitos de tipo
-`Predicate` deve atender aos requisitos de [FunctionObject](<#/doc/named_req/FunctionObject>).
-`pred()` deve ser uma expressão válida, e seu tipo e categoria de valor devem atender aos requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>).

### Exceções

1) Não lança nada.

2) Qualquer exceção lançada por `pred`.

### Notas

Os efeitos de `notify_one()`/`notify_all()` e cada uma das três partes atômicas de `wait()`/`wait_for()`/`wait_until()` (unlock+wait, wakeup e lock) ocorrem em uma única ordem total que pode ser vista como [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para esta condition variable individual. Isso torna impossível para `notify_one()`, por exemplo, ser atrasado e desbloquear uma thread que começou a esperar logo após a chamada para `notify_one()` ter sido feita.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <thread>
    
    std::condition_variable cv;
    std::mutex cv_m; // Este mutex é usado para três propósitos:
                     // 1) para sincronizar acessos a i
                     // 2) para sincronizar acessos a std::cerr
                     // 3) para a condition variable cv
    int i = 0;
    
    void waits()
    {
        std::unique_lock<std::mutex> lk(cv_m);
        std::cerr << "Waiting... \n";
        cv.wait(lk, []{ return i == 1; });
        std::cerr << "...finished waiting. i == 1\n";
    }
    
    void signals()
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        {
            std::lock_guard<std::mutex> lk(cv_m);
            std::cerr << "Notifying...\n";
        }
        cv.notify_all();
    
        std::this_thread::sleep_for(std::chrono::seconds(1));
    
        {
            std::lock_guard<std::mutex> lk(cv_m);
            i = 1;
            std::cerr << "Notifying again...\n";
        }
        cv.notify_all();
    }
    
    int main()
    {
        std::thread t1(waits), t2(waits), t3(waits), t4(signals);
        t1.join();
        t2.join();
        t3.join();
        t4.join();
    }
```

Saída possível:
```
    Waiting...
    Waiting...
    Waiting...
    Notifying...
    Notifying again...
    ...finished waiting. i == 1
    ...finished waiting. i == 1
    ...finished waiting. i == 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++11 | a convertibilidade para bool era muito fraca para refletir a expectativa das implementações | requisitos fortalecidos
---|---|---|---
[LWG 2135](<https://cplusplus.github.io/LWG/issue2135>) | C++11 | o comportamento era incerto se `lock.lock()` lançasse uma exceção | chama [std::terminate](<#/doc/error/terminate>) neste caso

### Veja também

[ wait_for](<#/doc/thread/condition_variable/wait_for>) | bloqueia a thread atual até que a condition variable seja despertada ou após a duração de timeout especificada
(função membro pública)
[ wait_until](<#/doc/thread/condition_variable/wait_until>) | bloqueia a thread atual até que a condition variable seja despertada ou até que o ponto de tempo especificado tenha sido atingido
(função membro pública)
[Documentação C](<#/>) para cnd_wait

### Links externos

[Artigo The Old New Thing](<https://devblogs.microsoft.com/oldnewthing/20180201-00/?p=97946>): Spurious wake-ups em condition variables Win32.
---