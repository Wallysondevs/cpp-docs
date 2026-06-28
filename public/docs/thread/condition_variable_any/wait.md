# std::condition_variable_any::wait

```cpp
template< class Lock >
void wait( Lock& lock );  // (1) (desde C++11)
template< class Lock, class Predicate >
void wait( Lock& lock, Predicate pred );  // (2) (desde C++11)
template< class Lock, class Predicate >
bool wait( Lock& lock, std::stop_token stoken, Predicate pred );  // (3) (desde C++20)
```

  
`wait` faz com que a thread atual seja bloqueada até que a condition variable seja notificada ou ocorra um despertar espúrio. `pred` pode ser opcionalmente fornecido para detectar despertares espúrios.

1) Chama atomicamente `lock.unlock()` e bloqueia em `*this`.

A thread será desbloqueada quando [notify_all()](<#/doc/thread/condition_variable_any/notify_all>) ou [notify_one()](<#/doc/thread/condition_variable_any/notify_one>) for executado. Ela também pode ser desbloqueada de forma espúria.

Quando desbloqueada, chama `lock.lock()` (possivelmente bloqueando no lock), então retorna.

2,3) Esperar por uma condição específica se tornar verdadeira, pode ser usado para ignorar despertares espúrios.

2) Equivalente a

```cpp
while (!pred())  
wait(lock);
```

3) Registra `*this` pela duração desta chamada, para ser notificado se uma solicitação de parada for feita no stop-state associado de `stoken`; é então equivalente a

```cpp
while (!stoken.stop_requested())  
{  
if (pred())  
return true;  
wait(lock);  
}  
return pred();
```

Logo após `wait` retornar, `lock` é bloqueado pela thread chamadora. Se esta pós-condição não puder ser satisfeita[1](<#/doc/thread/condition_variable_any/wait>), chama [std::terminate](<#/doc/error/terminate>).

  1. [↑](<#/doc/thread/condition_variable_any/wait>) Isso pode acontecer se o re-bloqueio do mutex lançar uma exceção.

### Parameters

lock  |  \-  |  um lock que deve ser bloqueado pela thread chamadora   
---|---|---
stoken  |  \-  |  um stop token para registrar interrupção   
pred  |  \-  |  o predicado para verificar se a espera pode ser concluída   
Requisitos de tipo   
-`Lock` deve atender aos requisitos de [BasicLockable](<#/doc/named_req/BasicLockable>).   
-`Predicate` deve atender aos requisitos de [FunctionObject](<#/doc/named_req/FunctionObject>).   
-`pred()` deve ser uma expressão válida, e seu tipo e categoria de valor devem atender aos requisitos [BooleanTestable](<#/doc/named_req/BooleanTestable>).   
  
### Return value

1,2) (nenhum)

3) O último resultado de `pred()` antes de retornar ao chamador.

### Exceptions

1) Não lança exceções.

2,3) Qualquer exceção lançada por `pred`.

### Notes

O valor retornado da sobrecarga (3) indica se `pred` avaliou como verdadeiro, independentemente de ter havido uma solicitação de parada ou não.

Os efeitos de `notify_one()`/`notify_all()` e cada uma das três partes atômicas de `wait()`/`wait_for()`/`wait_until()` (unlock+wait, wakeup e lock) ocorrem em uma única ordem total que pode ser vista como [ordem de modificação](<#/doc/atomic/memory_order>) de uma variável atômica: a ordem é específica para esta condition variable individual. Isso torna impossível para `notify_one()`, por exemplo, ser atrasado e desbloquear uma thread que começou a esperar logo após a chamada para `notify_one()` ter sido feita.

### Example

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

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)  
([P2167R3](<https://wg21.link/P2167R3>))  | C++11  | a convertibilidade para bool era muito fraca para refletir a expectativa das implementações  | requisitos fortalecidos   
---|---|---|---
[LWG 2135](<https://cplusplus.github.io/LWG/issue2135>) | C++11  | o comportamento era incerto se `lock.lock()` lançasse uma exceção | chama [std::terminate](<#/doc/error/terminate>) neste caso   
  
### Veja também

[wait_for](<#/doc/thread/condition_variable_any/wait_for>) | bloqueia a thread atual até que a condition variable seja despertada ou após a duração de timeout especificada   
(função membro pública)  
[wait_until](<#/doc/thread/condition_variable_any/wait_until>) | bloqueia a thread atual até que a condition variable seja despertada ou até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)  
[Documentação C](<#/>) para cnd_wait  
  
### Links externos

Artigo [The Old New Thing](<https://devblogs.microsoft.com/oldnewthing/20180201-00/?p=97946>): Despertares espúrios em condition variables Win32.   
---