# std::shared_future&lt;T&gt;::wait_for

```cpp
template< class Rep, class Period >
std::future_status wait_for( const std::chrono::duration<Rep,Period>& timeout_duration ) const;  // (desde C++11)
```

  
Aguarda o resultado ficar disponível. Bloqueia até que a `timeout_duration` especificada tenha decorrido ou o resultado se torne disponível, o que ocorrer primeiro. O valor de retorno identifica o estado do resultado.

Se o future for o resultado de uma chamada para [std::async](<#/doc/thread/async>) que usou avaliação preguiçosa (lazy evaluation), esta função retorna imediatamente sem esperar.

Esta função pode bloquear por mais tempo do que `timeout_duration` devido a atrasos de agendamento ou contenção de recursos.

O padrão recomenda que um `steady clock` seja usado para medir a duração. Se uma implementação usar um `system clock` em vez disso, o tempo de espera também pode ser sensível a ajustes de relógio.

O comportamento é indefinido se [`valid()`](<#/doc/thread/future/valid>) for `false` antes da chamada a esta função.

### Parameters

timeout_duration  |  \-  |  duração máxima para bloquear   
  
### Return value

Constante  |  Explicação   
---|---
[`future_status::deferred`](<#/doc/thread/future_status>) |  O estado compartilhado contém uma função adiada usando avaliação preguiçosa, então o resultado será computado apenas quando explicitamente solicitado   
[`future_status::ready`](<#/doc/thread/future_status>) |  O resultado está pronto   
[`future_status::timeout`](<#/doc/thread/future_status>) |  O tempo limite expirou   
  
### Exceptions

Qualquer exceção lançada por `clock`, `time_point` ou `duration` durante a execução (`clocks`, `time points` e `durations` fornecidos pela `standard library` nunca lançam).

### Notes

As implementações são encorajadas a detectar o caso em que `valid == false` antes da chamada e lançar uma [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [std::future_errc::no_state](<#/doc/thread/future_errc>).

### Example

Execute este código
```cpp
    #include <chrono>
    #include <future>
    #include <iostream>
    #include <thread>
    using namespace std::chrono_literals;
    
    int main()
    {
        std::shared_future<int> future = std::async(std::launch::async, 
        {
            std::this_thread::sleep_for(3s);
            return 8;
        });
    
        std::cout << "waiting...\n";
        std::future_status status;
    
        do
        {
            switch (status = future.wait_for(1s); status)
            {
                case std::future_status::deferred:
                    std::cout << "deferred\n";
                    break;
                case std::future_status::timeout:
                    std::cout << "timeout\n";
                    break;
                case std::future_status::ready:
                    std::cout << "ready!\n";
                    break;
            }
        }
        while (status != std::future_status::ready);
    
        std::cout << "result is " << future.get() << '\n';
    }
```

Saída possível:
```
    waiting...
    timeout
    timeout
    timeout
    ready!
    result is 8
```

### See also

[ wait](<#/doc/thread/shared_future/wait>) |  aguarda o resultado ficar disponível   
(função membro pública)  
[ wait_until](<#/doc/thread/shared_future/wait_until>) |  aguarda o resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido   
(função membro pública)