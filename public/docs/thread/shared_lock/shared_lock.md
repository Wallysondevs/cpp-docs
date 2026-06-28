# std::shared_lock&lt;Mutex&gt;::shared_lock

```cpp
shared_lock() noexcept;  // (1) (desde C++14)
shared_lock( shared_lock&& other ) noexcept;  // (2) (desde C++14)
explicit shared_lock( mutex_type& m );  // (3) (desde C++14)
shared_lock( mutex_type& m, std::defer_lock_t t ) noexcept;  // (4) (desde C++14)
shared_lock( mutex_type& m, std::try_to_lock_t t );  // (5) (desde C++14)
shared_lock( mutex_type& m, std::adopt_lock_t t );  // (6) (desde C++14)
template< class Rep, class Period >
shared_lock( mutex_type& m,
const std::chrono::duration<Rep,Period>& timeout_duration );  // (7) (desde C++14)
template< class Clock, class Duration >
shared_lock( mutex_type& m,
const std::chrono::time_point<Clock,Duration>& timeout_time );  // (8) (desde C++14)
```

  
Constrói um `shared_lock`, opcionalmente bloqueando o mutex fornecido.

1) Constrói um `shared_lock` sem mutex associado.

2) Construtor de movimento. Inicializa o `shared_lock` com o conteúdo de other. Deixa other sem mutex associado.

3-8) Constrói um `shared_lock` com m como o mutex associado. Adicionalmente:

3) Bloqueia o mutex associado em modo compartilhado chamando m.lock_shared().

4) Não bloqueia o mutex associado.

5) Tenta bloquear o mutex associado em modo compartilhado sem bloquear, chamando m.try_lock_shared().

6) Assume que a thread chamadora já possui um bloqueio compartilhado (ou seja, um bloqueio adquirido por `lock_shared`, `try_lock_shared`, `try_lock_shared_for`, ou `try_lock_shared_until`) em m. O comportamento é indefinido se não for o caso.

7) Tenta bloquear o mutex associado em modo compartilhado chamando m.try_lock_shared_for(timeout_duration), que bloqueia até que a timeout_duration especificada tenha decorrido ou o bloqueio seja adquirido, o que ocorrer primeiro. Pode bloquear por mais tempo do que timeout_duration. O comportamento é indefinido se `Mutex` não atender aos requisitos [SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>).

8) Tenta bloquear o mutex associado em modo compartilhado chamando m.try_lock_shared_until(timeout_time), que bloqueia até que o timeout_time especificado tenha sido atingido ou o bloqueio seja adquirido, o que ocorrer primeiro. Pode bloquear por mais tempo do que até que o timeout_time tenha sido atingido. O comportamento é indefinido se `Mutex` não atender aos requisitos [SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>).

### Parâmetros

other  |  \-  |  outro `shared_lock` para inicializar o estado   
---|---|---
m  |  \-  |  mutex para associar ao bloqueio e opcionalmente adquirir sua posse   
t  |  \-  |  parâmetro tag usado para selecionar construtores com diferentes estratégias de bloqueio   
timeout_duration  |  \-  |  duração máxima para bloquear   
timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <shared_mutex>
    #include <syncstream>
    #include <thread>
    
    std::shared_timed_mutex m;
    int i = 10;
    
    void read_shared_var(int id)
    {
         // both the threads get access to the integer i
         std::shared_lock<std::shared_timed_mutex> slk(m);
         const int ii = i; // reads global i
    
         std::osyncstream(std::cout) << '#' << id << " read i as " << ii << "...\n";
         std::this_thread::sleep_for(std::chrono::milliseconds(10));
         std::osyncstream(std::cout) << '#' << id << " woke up..." << std::endl;
    }
    
    int main()
    {
         std::thread r1{read_shared_var, 1};
         std::thread r2{read_shared_var, 2};
    
         r1.join();
         r2.join();
    }
```

Saída possível: 
```
    #2 read i as 10...
    #1 read i as 10...
    #2 woke up...
    #1 woke up...
```