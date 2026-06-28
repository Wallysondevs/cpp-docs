# std::mutex::try_lock

```cpp
bool try_lock();  // (desde C++11)
```

Tenta bloquear o mutex. Retorna imediatamente. Em caso de aquisição bem-sucedida do bloqueio, retorna true, caso contrário, retorna false.

Esta função pode falhar espuriamente e retornar false mesmo que o mutex não esteja atualmente bloqueado por nenhuma outra thread.

Se `try_lock` for chamada por uma thread que já possui o `mutex`, o comportamento é indefinido.

Uma operação [unlock()](<#/doc/thread/mutex/unlock>) anterior no mesmo mutex _sincroniza-se-com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar true. Note que um [lock()](<#/doc/thread/mutex/lock>) anterior não sincroniza com esta operação se ela retornar false.

### Parâmetros

(nenhum)

### Valor de retorno

true se o bloqueio foi adquirido com sucesso, caso contrário, false.

### Exceções

Não lança exceções.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream> // std::cout
    #include <mutex>
    #include <thread>
    
    std::chrono::milliseconds interval(100);
    
    std::mutex mutex;
    int job_shared = 0; // ambas as threads podem modificar 'job_shared',
                        // mutex protegerá esta variável
    
    int job_exclusive = 0; // apenas uma thread pode modificar 'job_exclusive'
                           // nenhuma proteção é necessária
    
    // esta thread pode modificar 'job_shared' e 'job_exclusive'
    void job_1() 
    {
        std::this_thread::sleep_for(interval); // permite que 'job_2' adquira um bloqueio
    
        while (true)
        {
            // tenta bloquear o mutex para modificar 'job_shared'
            if (mutex.try_lock())
            {
                std::cout << "job shared (" << job_shared << ")\n";
                mutex.unlock();
                return;
            }
            else
            {
                // não consegue obter o bloqueio para modificar 'job_shared'
                // mas há outro trabalho a fazer
                ++job_exclusive;
                std::cout << "job exclusive (" << job_exclusive << ")\n";
                std::this_thread::sleep_for(interval);
            }
        }
    }
    
    // esta thread pode modificar apenas 'job_shared'
    void job_2() 
    {
        mutex.lock();
        std::this_thread::sleep_for(5 * interval);
        ++job_shared;
        mutex.unlock();
    }
    
    int main() 
    {
        std::thread thread_1(job_1);
        std::thread thread_2(job_2);
    
        thread_1.join();
        thread_2.join();
    }
```

Saída possível:
```
    job exclusive (1)
    job exclusive (2)
    job exclusive (3)
    job exclusive (4)
    job shared (1)
```

### Veja também

[ lock](<#/doc/thread/mutex/lock>) | bloqueia o mutex, bloqueia se o mutex não estiver disponível
(função membro pública)
[ unlock](<#/doc/thread/mutex/unlock>) | desbloqueia o mutex
(função membro pública)
[documentação C](<#/>) para mtx_trylock