# std::future&lt;T&gt;::wait_until

```cpp
template< class Clock, class Duration >
std::future_status wait_until( const std::chrono::time_point<Clock,Duration>& timeout_time ) const;  // (desde C++11)
```

  
`wait_until` aguarda que um resultado se torne disponível. Ele bloqueia até que o `timeout_time` especificado seja atingido ou o resultado se torne disponível, o que ocorrer primeiro. O valor de retorno indica por que `wait_until` retornou.

Se o future for o resultado de uma chamada para [async](<#/doc/thread/async>) que usou avaliação preguiçosa (lazy evaluation), esta função retorna imediatamente sem esperar.

O comportamento é indefinido se [valid()](<#/doc/thread/future/valid>) for falso antes da chamada a esta função, ou se `Clock` não atender aos requisitos de [Clock](<#/doc/named_req/Clock>). O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for falso. (desde C++20)

### Parâmetros

timeout_time  |  \-  |  ponto no tempo máximo para bloquear até   
  
### Valor de retorno

Constante  |  Explicação   
---|---
[`future_status::deferred`](<#/doc/thread/future_status>) |  O estado compartilhado contém uma função adiada usando avaliação preguiçosa (lazy evaluation), então o resultado será computado apenas quando explicitamente solicitado   
[`future_status::ready`](<#/doc/thread/future_status>) |  O resultado está pronto   
[`future_status::timeout`](<#/doc/thread/future_status>) |  O timeout expirou   
  
### Exceções

Qualquer exceção lançada por clock, time_point ou duration durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

### Notas

As implementações são encorajadas a detectar o caso em que valid() == false antes da chamada e lançar uma [std::future_error](<#/doc/thread/future_error>) com uma condição de erro de [`future_errc::no_state`](<#/doc/thread/future_errc>).

O padrão recomenda que o clock associado a `timeout_time` seja usado para medir o tempo; esse clock não é obrigado a ser um clock monotônico. Não há garantias quanto ao comportamento desta função se o clock for ajustado de forma descontínua, mas as implementações existentes convertem `timeout_time` de `Clock` para [std::chrono::system_clock](<#/doc/chrono/system_clock>) e delegam a POSIX [`pthread_cond_timedwait`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_cond_timedwait.html>) para que a espera respeite os ajustes ao clock do sistema, mas não ao `Clock` fornecido pelo usuário. Em qualquer caso, a função também pode esperar por mais tempo do que até que `timeout_time` tenha sido atingido devido a atrasos de agendamento ou contenção de recursos.

  

### Exemplo

Execute este código
```
    #include <chrono>
    #include <future>
    #include <iostream>
    #include <thread>
     
    int main()
    {
        std::chrono::system_clock::time_point two_seconds_passed
            = std::chrono::system_clock::now() + std::chrono::seconds(2);
     
        // Make a future that takes 1 second to complete
        std::promise<int> p1;
        std::future<int> f_completes = p1.get_future();
        std::thread(<int> p1)
                    { 
                        std::this_thread::sleep_for(std::chrono::seconds(1)); 
                        p1.set_value_at_thread_exit(9); 
                    }, 
                    std::move(p1)
        ).detach();
     
        // Make a future that takes 5 seconds to complete
        std::promise<int> p2;
        std::future<int> f_times_out = p2.get_future();
        std::thread(<int> p2)
                    { 
                        std::this_thread::sleep_for(std::chrono::seconds(5)); 
                        p2.set_value_at_thread_exit(8); 
                    }, 
                    std::move(p2)
        ).detach();
     
        std::cout << "Waiting for 2 seconds..." << std::endl;
     
        if (std::future_status::ready == f_completes.wait_until(two_seconds_passed))
            std::cout << "f_completes: " << f_completes.get() << "\n";
        else
            std::cout << "f_completes did not complete!\n";
     
        if (std::future_status::ready == f_times_out.wait_until(two_seconds_passed))
            std::cout << "f_times_out: " << f_times_out.get() << "\n";
        else
            std::cout << "f_times_out did not complete!\n";
     
        std::cout << "Done!\n";
    }
```

Saída possível: 
```
    Waiting for 2 seconds...
    f_completes: 9
    f_times_out did not complete!
    Done!
```

### Veja também

[ wait](<#/doc/thread/future/wait>) |  aguarda que o resultado se torne disponível   
(função membro pública)  
[ wait_for](<#/doc/thread/future/wait_for>) |  aguarda o resultado, retorna se não estiver disponível pela duração de timeout especificada   
(função membro pública)