# std::shared_timed_mutex::try_lock_for

```cpp
template< class Rep, class Period >
bool try_lock_for( const std::chrono::duration<Rep, Period>& timeout_duration );  // (desde C++14)
```

  
Tenta bloquear o mutex. Bloqueia até que a duração especificada `timeout_duration` tenha decorrido (timeout) ou o bloqueio seja adquirido (possua o mutex), o que ocorrer primeiro. Em caso de aquisição bem-sucedida do bloqueio, retorna `true`, caso contrário, retorna `false`. 

Se `timeout_duration` for menor ou igual a `timeout_duration.zero()`, a função se comporta como [try_lock()](<#/doc/thread/shared_timed_mutex/try_lock>). 

Esta função pode bloquear por mais tempo do que `timeout_duration` devido a atrasos de agendamento ou contenção de recursos. 

O padrão recomenda que um `std::steady_clock` seja usado para medir a duração. Se uma implementação usar um `std::system_clock` em vez disso, o tempo de espera também pode ser sensível a ajustes de relógio. 

Assim como em [try_lock()](<#/doc/thread/shared_timed_mutex/try_lock>), esta função pode falhar espuriamente e retornar `false` mesmo que o mutex não tenha sido bloqueado por nenhuma outra thread em algum momento durante `timeout_duration`. 

Uma operação [unlock()](<#/doc/thread/shared_timed_mutex/unlock>) anterior no mesmo mutex _sincroniza-se com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) esta operação se ela retornar `true`. 

Se `try_lock_for` for chamado por uma thread que já possui o mutex em qualquer modo (compartilhado ou exclusivo), o comportamento é indefinido. 

### Parâmetros

timeout_duration  |  \-  |  duração mínima para bloquear   
  
### Valor de retorno

`true` se o bloqueio foi adquirido com sucesso, caso contrário `false`. 

### Exceções

Qualquer exceção lançada por `timeout_duration` (durações fornecidas pela standard library nunca lançam exceções). 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <mutex>
    #include <sstream>
    #include <thread>
    #include <vector>
     
    using namespace std::chrono_literals;
     
    std::mutex cout_mutex; // control access to std::cout
    std::timed_mutex mutex;
     
    void job(int id)
    {
        std::ostringstream stream;
     
        for (int i = 0; i < 3; ++i)
        {
            if (mutex.try_lock_for(100ms))
            {
                stream << "success ";
                std::this_thread::sleep_for(100ms);
                mutex.unlock();
            }
            else
                stream << "failed ";
     
            std::this_thread::sleep_for(100ms);
        }
     
        std::lock_guard<std::mutex> lock{cout_mutex};
        std::cout << '[' << id << "] " << stream.str() << '\n';
    }
     
    int main()
    {
        std::vector<std::thread> threads;
        for (int i{0}; i < 4; ++i)
            threads.emplace_back(job, i);
     
        for (auto& th : threads)
            th.join();
    }
```

Saída possível: 
```
    [0] failed failed failed 
    [3] failed failed success 
    [2] failed success failed 
    [1] success failed success
```

### Veja também

[ lock](<#/doc/thread/shared_timed_mutex/lock>) |  bloqueia o mutex, bloqueia se o mutex não estiver disponível   
(função membro pública)  
[ try_lock](<#/doc/thread/shared_timed_mutex/try_lock>) |  tenta bloquear o mutex, retorna se o mutex não estiver disponível   
(função membro pública)  
[ try_lock_until](<#/doc/thread/shared_timed_mutex/try_lock_until>) |  tenta bloquear o mutex, retorna se o mutex esteve indisponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)  
[ unlock](<#/doc/thread/shared_timed_mutex/unlock>) |  desbloqueia o mutex   
(função membro pública)