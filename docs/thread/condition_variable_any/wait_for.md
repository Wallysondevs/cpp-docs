# std::condition_variable_any::wait_for

```cpp
template< class Lock, class Rep, class Period >
std::cv_status wait_for( Lock& lock,
const std::chrono::duration<Rep, Period>& rel_time );  // (1) (desde C++11)
template< class Lock, class Rep, class Period, class Predicate >
bool wait_for( Lock& lock, const std::chrono::duration<Rep, Period>& rel_time,
Predicate pred );  // (2) (desde C++11)
template< class Lock, class Rep, class Period, class Predicate >
bool wait_for( Lock& lock, std::stop_token stoken,
const std::chrono::duration<Rep, Period>& rel_time,
Predicate pred );  // (3) (desde C++20)
```

  
`wait_for` faz com que a thread atual seja bloqueada até que a variável de condição seja notificada, a duração fornecida tenha decorrido, ou ocorra um *spurious wakeup*. `pred` pode ser opcionalmente fornecido para detectar *spurious wakeup*.

1) Equivalente a `return wait_until(lock, [std::chrono::steady_clock::now](<#/doc/chrono/steady_clock/now>)() + rel_time);`.

2,3) Espera por uma condição específica se tornar verdadeira, pode ser usado para ignorar *spurious awakenings*.

2) Equivalente a `return wait_until(lock, [std::chrono::steady_clock::now](<#/doc/chrono/steady_clock/now>)() + rel_time, std::move(pred));`.

3) Registra `*this` pela duração desta chamada, para ser notificado se uma requisição de parada for feita no *stop-state* associado de `stoken`; é então equivalente a `return wait_until(lock, std::move(stoken), [std::chrono::steady_clock::now](<#/doc/chrono/steady_clock/now>)() + rel_time, std::move(pred));`.

Logo após `wait_for` retornar, `lock` é bloqueado pela thread chamadora. Se esta pós-condição não puder ser satisfeita[1](<#/doc/thread/condition_variable_any/wait_for>), chama [std::terminate](<#/doc/error/terminate>).

  1. [↑](<#/doc/thread/condition_variable_any/wait_for>) Isso pode acontecer se o re-bloqueio do mutex lançar uma exceção.

### Parâmetros

lock  |  \-  |  um lock que deve ser bloqueado pela thread chamadora   
---|---|---
stoken  |  \-  |  um stop token para registrar interrupção   
rel_time  |  \-  |  a duração máxima para esperar   
pred  |  \-  |  o predicado para verificar se a espera pode ser concluída   
Requisitos de tipo   
-`Lock` deve atender aos requisitos de [BasicLockable](<#/doc/named_req/BasicLockable>).   
-`Predicate` deve atender aos requisitos de [FunctionObject](<#/doc/named_req/FunctionObject>).   
-`pred()` deve ser uma expressão válida, e seu tipo e categoria de valor devem atender aos requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>).   
  
### Valor de retorno

1) [std::cv_status::timeout](<#/doc/thread/cv_status>) se `rel_time` tiver decorrido desde o início desta chamada, caso contrário [std::cv_status::no_timeout](<#/doc/thread/cv_status>).

2,3) O último resultado de `pred()` antes de retornar ao chamador.

### Exceções

1) Exceções relacionadas a timeout.

2,3) Exceções relacionadas a timeout, e qualquer exceção lançada por `pred`.

### Notas

Mesmo se notificado sob lock, a sobrecarga (1) não oferece garantias sobre o estado do predicado associado ao retornar devido a um timeout.

Os efeitos de `notify_one()`/`notify_all()` e cada uma das três partes atômicas de `wait()`/`wait_for()`/`wait_until()` (desbloquear+esperar, despertar e bloquear) ocorrem em uma única ordem total que pode ser vista como [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para esta variável de condição individual. Isso torna impossível para `notify_one()`, por exemplo, ser atrasado e desbloquear uma thread que começou a esperar logo após a chamada para `notify_one()` ter sido feita.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <thread>
    
    std::condition_variable_any cv;
    std::mutex cv_m; // This mutex is used for three purposes:
                     // 1) to synchronize accesses to i
                     // 2) to synchronize accesses to std::cerr
                     // 3) for the condition variable cv
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

DR  | Applied to  | Behavior as published  | Correct behavior   
---|---|---|---
[LWG 2093](<https://cplusplus.github.io/LWG/issue2093>) | C++11  | exceções relacionadas a timeout estavam ausentes na especificação  | menciona estas exceções   
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)  
([P2167R3](<https://wg21.link/P2167R3>))  | C++11  | a convertibilidade para bool era muito fraca para refletir a expectativa das implementações  | requisitos fortalecidos   
---|---|---|---
[LWG 2135](<https://cplusplus.github.io/LWG/issue2135>) | C++11  | o comportamento era incerto se lock.lock() lançasse uma exceção  | chama [std::terminate](<#/doc/error/terminate>) neste caso   
  
### Veja também

[ wait](<#/doc/thread/condition_variable_any/wait>) |  bloqueia a thread atual até que a variável de condição seja despertada   
(função membro pública)  
[ wait_until](<#/doc/thread/condition_variable_any/wait_until>) |  bloqueia a thread atual até que a variável de condição seja despertada ou até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)