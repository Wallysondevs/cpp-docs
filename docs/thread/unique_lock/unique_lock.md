# std::unique_lock&lt;Mutex&gt;::unique_lock

```cpp
unique_lock() noexcept;  // (1) (desde C++11)
unique_lock( unique_lock&& other ) noexcept;  // (2) (desde C++11)
explicit unique_lock( mutex_type& m );  // (3) (desde C++11)
unique_lock( mutex_type& m, std::defer_lock_t t ) noexcept;  // (4) (desde C++11)
unique_lock( mutex_type& m, std::try_to_lock_t t );  // (5) (desde C++11)
unique_lock( mutex_type& m, std::adopt_lock_t t );  // (6) (desde C++11)
template< class Rep, class Period >
unique_lock( mutex_type& m,
const std::chrono::duration<Rep, Period>& timeout_duration );  // (7) (desde C++11)
template< class Clock, class Duration >
unique_lock( mutex_type& m,
const std::chrono::time_point<Clock, Duration>& timeout_time );  // (8) (desde C++11)
```

Constrói um `unique_lock`, opcionalmente bloqueando o mutex fornecido.

1) Constrói um `unique_lock` sem mutex associado.

2) Construtor de movimento. Inicializa o `unique_lock` com o conteúdo de other. Deixa other sem mutex associado.

3-8) Constrói um `unique_lock` com m como o mutex associado. Adicionalmente:

3) Bloqueia o mutex associado chamando m.lock().

4) Não bloqueia o mutex associado.

5) Tenta bloquear o mutex associado sem bloquear, chamando m.try_lock(). O comportamento é indefinido se `Mutex` não satisfaz [Lockable](<#/doc/named_req/Lockable>).

6) Assume que a thread chamadora já possui um bloqueio não compartilhado (ou seja, um bloqueio adquirido por `lock`, `try_lock`, `try_lock_for` ou `try_lock_until`) em m. O comportamento é indefinido se não for o caso.

7) Tenta bloquear o mutex associado chamando m.try_lock_for(timeout_duration). Bloqueia até que o timeout_duration especificado tenha decorrido ou o bloqueio seja adquirido, o que ocorrer primeiro. Pode bloquear por mais tempo do que timeout_duration. O comportamento é indefinido se `Mutex` não satisfaz [TimedLockable](<#/doc/named_req/TimedLockable>).

8) Tenta bloquear o mutex associado chamando m.try_lock_until(timeout_time). Bloqueia até que o timeout_time especificado tenha sido atingido ou o bloqueio seja adquirido, o que ocorrer primeiro. Pode bloquear por mais tempo do que até que timeout_time tenha sido atingido. O comportamento é indefinido se `Mutex` não satisfaz [TimedLockable](<#/doc/named_req/TimedLockable>).

### Parâmetros

- **other** — outro `unique_lock` para inicializar o estado com
- **m** — mutex para associar ao bloqueio e opcionalmente adquirir sua posse
- **t** — parâmetro tag usado para selecionar construtores com diferentes estratégias de bloqueio
- **timeout_duration** — duração máxima para bloquear
- **timeout_time** — ponto no tempo máximo para bloquear até

### Exemplo

Execute este código
```
    #include <iostream>
    #include <mutex>
    #include <thread>
    #include <utility>
    #include <vector>
     
    std::mutex m_a, m_b, m_c;
    int a, b, c = 1;
     
    void update()
    {
        {   // Note: std::lock_guard or atomic<int> can be used instead
            std::unique_lock<std::mutex> lk(m_a);
            ++a;
        }
     
        {   // Note: see std::lock and std::scoped_lock for details and alternatives
            std::unique_lock<std::mutex> lk_b(m_b, std::defer_lock);
            std::unique_lock<std::mutex> lk_c(m_c, std::defer_lock);
            std::lock(lk_b, lk_c);
            b = std::exchange(c, b + c);
        }
    }
     
    int main()
    {
        std::vector<std::thread> threads;
        for (unsigned i = 0; i < 12; ++i)
            threads.emplace_back(update);
     
        for (auto& i : threads)
            i.join();
     
        std::cout << a << "'th and " << a + 1 << "'th Fibonacci numbers: "
                  << b << " and " << c << '\n';
    }
```

Output:
```
    12'th and 13'th Fibonacci numbers: 144 and 233
```