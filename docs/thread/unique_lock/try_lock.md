# std::unique_lock&lt;Mutex&gt;::try_lock

```cpp
bool try_lock();  // (desde C++11)
```

  
Tenta bloquear (isto é, assume a posse de) o mutex associado sem bloquear. Efetivamente chama mutex()->try_lock(). 

[std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex já estiver bloqueado por este [std::unique_lock](<#/doc/thread/unique_lock>). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se a posse do mutex foi adquirida com sucesso, false caso contrário. 

### Exceções

  * Quaisquer exceções lançadas por mutex()->try_lock() (tipos [Mutex](<#/doc/named_req/Mutex>) não lançam exceções em `try_lock`, mas um [Lockable](<#/doc/named_req/Lockable>) personalizado pode). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

  * Se o mutex já estiver bloqueado por este `std::unique_lock`, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>). 

### Exemplo

Os exemplos a seguir tentam adquirir um mutex que foi bloqueado e desbloqueado.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <mutex>
    #include <thread>
    #include <vector>
    
    using namespace std::chrono_literals;
    
    int main()
    {
        std::mutex counter_mutex;
        std::vector<std::thread> threads;
        using Id = int;
    
        auto worker_task = &
        {
            // wait for a few seconds before acquiring lock.
            std::this_thread::sleep_for(wait);
    
            std::unique_lock<std::mutex> lock(counter_mutex, std::defer_lock);
            if (lock.try_lock())
                std::cout << '#' << id << ", lock acquired.\n";
            else
            {
                std::cout << '#' << id << ", failed acquiring lock.\n";
                return;
            }
    
            // keep the lock for a while.
            std::this_thread::sleep_for(acquire);
    
            std::cout << '#' << id << ", releasing lock (via destructor).\n";
        };
    
        threads.emplace_back(worker_task, Id{0}, 0s, 2s);
        threads.emplace_back(worker_task, Id{1}, 1s, 0s);
        threads.emplace_back(worker_task, Id{2}, 3s, 0s);
    
        for (auto& thread : threads)
            thread.join();
    }
```

Saída: 
```
    #0, lock acquired.
    #1, failed acquiring lock.
    #0, releasing lock (via destructor).
    #2, lock acquired.
    #2, releasing lock (via destructor).
```

### Veja também

[ lock](<#/doc/thread/unique_lock/lock>) |  bloqueia (isto é, assume a posse de) o mutex associado   
(função membro pública)  
[ try_lock_for](<#/doc/thread/unique_lock/try_lock_for>) |  tenta bloquear (isto é, assume a posse de) o mutex associado [TimedLockable](<#/doc/named_req/TimedLockable>), retorna se o mutex esteve indisponível pela duração de tempo especificada   
(função membro pública)  
[ try_lock_until](<#/doc/thread/unique_lock/try_lock_until>) |  tenta bloquear (isto é, assume a posse de) o mutex associado [TimedLockable](<#/doc/named_req/TimedLockable>), retorna se o mutex esteve indisponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)  
[ unlock](<#/doc/thread/unique_lock/unlock>) |  desbloqueia (isto é, libera a posse de) o mutex associado   
(função membro pública)