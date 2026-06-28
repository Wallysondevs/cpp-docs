# std::unique_lock&lt;Mutex&gt;::lock

```cpp
void lock();  // (desde C++11)
```

  
Bloqueia (isto é, adquire a posse de) o mutex associado. Efetivamente chama mutex()->lock(). 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

  * Quaisquer exceções lançadas por mutex()->lock(). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

  * Se o mutex já estiver bloqueado por este `unique_lock` (em outras palavras, [owns_lock()](<#/doc/thread/unique_lock/owns_lock>) for true), [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>). 

### Exemplo

O exemplo a seguir usa `lock` para readquirir um mutex que foi desbloqueado.

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <mutex>
    #include <thread>
    #include <vector>
     
    int main()
    {
        int counter = 0;
        std::mutex counter_mutex;
        std::vector<std::thread> threads;
     
        auto worker_task = &
        {
            std::unique_lock<std::mutex> lock(counter_mutex);
            ++counter;
            std::cout << id << ", initial counter: " << counter << '\n';
            lock.unlock();
     
            // don't hold the lock while we simulate an expensive operation
            std::this_thread::sleep_for(std::chrono::seconds(1));
     
            lock.lock();
            ++counter;
            std::cout << id << ", final counter: " << counter << '\n';
        };
     
        for (int i = 0; i < 10; ++i)
            threads.emplace_back(worker_task, i);
     
        for (auto& thread : threads)
            thread.join();
    }
```

Saída possível: 
```
    0, initial counter: 1
    1, initial counter: 2
    2, initial counter: 3
    3, initial counter: 4
    4, initial counter: 5
    5, initial counter: 6
    6, initial counter: 7
    7, initial counter: 8
    8, initial counter: 9
    9, initial counter: 10
    6, final counter: 11
    3, final counter: 12
    4, final counter: 13
    2, final counter: 14
    5, final counter: 15
    0, final counter: 16
    1, final counter: 17
    7, final counter: 18
    9, final counter: 19
    8, final counter: 20
```

### Ver também

[ try_lock](<#/doc/thread/unique_lock/try_lock>) |  tenta bloquear (isto é, adquirir a posse de) o mutex associado sem bloquear   
(função membro pública)  
[ unlock](<#/doc/thread/unique_lock/unlock>) |  desbloqueia (isto é, libera a posse de) o mutex associado   
(função membro pública)