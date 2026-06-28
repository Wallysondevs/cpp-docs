# std::condition_variable::wait_until

```cpp
template< class Clock, class Duration >
std::cv_status
wait_until( std::unique_lock<std::mutex>& lock,
const std::chrono::time_point<Clock, Duration>& abs_time );  // (1) (desde C++11)
template< class Clock, class Duration, class Predicate >
bool wait_until( std::unique_lock<std::mutex>& lock,
const std::chrono::time_point<Clock, Duration>& abs_time,
Predicate pred );  // (2) (desde C++11)
```

  
`wait_until` faz com que a thread atual seja bloqueada até que a condition variable seja notificada, o ponto no tempo fornecido seja atingido, ou ocorra um despertar espúrio. `pred` pode ser opcionalmente fornecido para detectar despertares espúrios.

1) Chama atomicamente `lock.unlock()` e bloqueia em `*this`.

A thread será desbloqueada quando [notify_all()](<#/doc/thread/condition_variable/notify_all>) ou [notify_one()](<#/doc/thread/condition_variable/notify_one>) for executado, ou `abs_time` for atingido. Ela também pode ser desbloqueada de forma espúria.

Quando desbloqueada, chama `lock.lock()` (possivelmente bloqueando no lock), e então retorna.

2) Equivalente a `while (!pred())`  
`if (wait_until(lock, abs_time) == [std::cv_status::timeout](<#/doc/thread/cv_status>))`  
`return pred();`  
`return true;`.

Esta sobrecarga pode ser usada para ignorar despertares espúrios enquanto se espera que uma condição específica se torne verdadeira.

Logo após `wait_until` retornar, `lock.owns_lock()` é verdadeiro, e `lock.mutex()` está bloqueado pela thread chamadora. Se estas pós-condições não puderem ser satisfeitas[1](<#/doc/thread/condition_variable/wait_until>), chama [std::terminate](<#/doc/error/terminate>).

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido: 

  * `lock.owns_lock()` é falso. 
  * `lock.mutex()` não está bloqueado pela thread chamadora. 
  * Se outras threads também estiverem esperando em `*this`, `lock.mutex()` é diferente do mutex desbloqueado pelas funções de espera ([wait](<#/doc/thread/condition_variable/wait>), [wait_for](<#/doc/thread/condition_variable/wait_for>) e `wait_until`) chamadas em `*this` por essas threads. 

  1. [↑](<#/doc/thread/condition_variable/wait_until>) Isso pode acontecer se o re-bloqueio do mutex lançar uma exceção.

### Parâmetros

lock  |  \-  |  um lock que deve estar bloqueado pela thread chamadora   
---|---|---
abs_time  |  \-  |  o ponto no tempo onde a espera expira   
pred  |  \-  |  o predicado para verificar se a espera pode ser concluída   
Requisitos de tipo   
-`Predicate` deve atender aos requisitos de [FunctionObject](<#/doc/named_req/FunctionObject>).   
-`pred()` deve ser uma expressão válida, e seu tipo e categoria de valor devem atender aos requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>).   
  
### Valor de retorno

1) [std::cv_status::timeout](<#/doc/thread/cv_status>) se `abs_time` tiver sido atingido, caso contrário [std::cv_status::no_timeout](<#/doc/thread/cv_status>).

2) O último resultado de `pred()` antes de retornar ao chamador.

### Exceções

1) Exceções relacionadas a timeout.

2) Exceções relacionadas a timeout, e qualquer exceção lançada por `pred`.

### Notas

O padrão recomenda que o clock associado a `abs_time` seja usado para medir o tempo; esse clock não é exigido ser um clock monotônico. Não há garantias quanto ao comportamento desta função se o clock for ajustado de forma descontínua, mas as implementações existentes convertem `abs_time` de `Clock` para [std::chrono::system_clock](<#/doc/chrono/system_clock>) e delegam a POSIX [`pthread_cond_timedwait`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_cond_timedwait.html>) para que a espera respeite os ajustes ao clock do sistema, mas não ao `Clock` fornecido pelo usuário. Em qualquer caso, a função também pode esperar por mais tempo do que até `abs_time` ter sido atingido devido a atrasos de agendamento ou contenção de recursos. 

Mesmo que o clock em uso seja [std::chrono::steady_clock](<#/doc/chrono/steady_clock>) ou outro clock monotônico, um ajuste do clock do sistema pode induzir um despertar espúrio. 

Os efeitos de `notify_one()`/`notify_all()` e cada uma das três partes atômicas de `wait()`/`wait_for()`/`wait_until()` (desbloquear+esperar, despertar e bloquear) ocorrem em uma única ordem total que pode ser vista como [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para esta `condition variable` individual. Isso torna impossível para `notify_one()`, por exemplo, ser atrasado e desbloquear uma thread que começou a esperar logo após a chamada para `notify_one()` ter sido feita. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <condition_variable>
    #include <iostream>
    #include <thread>
     
    std::condition_variable cv;
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

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2093](<https://cplusplus.github.io/LWG/issue2093>) | C++11  | exceções relacionadas a timeout estavam ausentes na especificação  | menciona essas exceções   
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)  
([P2167R3](<https://wg21.link/P2167R3>))  | C++11  | a convertibilidade para bool era muito fraca para refletir a expectativa das implementações  | requisitos fortalecidos   
---|---|---|---
[LWG 2135](<https://cplusplus.github.io/LWG/issue2135>) | C++11  | o comportamento era incerto se `lock.lock()` lançasse uma exceção  | chama [std::terminate](<#/doc/error/terminate>) neste caso   
  
### Veja também

[ wait](<#/doc/thread/condition_variable/wait>) |  bloqueia a thread atual até que a condition variable seja despertada   
(função membro pública)  
[ wait_for](<#/doc/thread/condition_variable/wait_for>) |  bloqueia a thread atual até que a condition variable seja despertada ou após a duração de timeout especificada   
(função membro pública)