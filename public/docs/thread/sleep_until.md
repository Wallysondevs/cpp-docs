# std::this_thread::sleep_until

Definido no header `[<thread>](<#/doc/header/thread>)`

```cpp
template< class Clock, class Duration >
void sleep_until( const std::chrono::time_point<Clock, Duration>& sleep_time );  // (desde C++11)
```

  
Bloqueia a execução da thread atual até que o `sleep_time` especificado seja atingido.

`Clock` deve satisfazer os requisitos de [Clock](<#/doc/named_req/Clock>). O programa é malformado se [std::chrono::is_clock_v](<#/doc/chrono/is_clock>)&lt;Clock&gt; for falso.(desde C++20)

O padrão recomenda que o clock associado a `sleep_time` seja usado, caso em que ajustes do clock podem ser levados em consideração. Assim, a duração do bloqueio pode ser maior ou menor do que `sleep_time - Clock::now()` no momento da chamada, dependendo da direção do ajuste e se ele é respeitado pela implementação. A função também pode bloquear até depois que `sleep_time` tenha sido atingido devido a atrasos de agendamento de processo ou contenção de recursos.

### Parâmetros

sleep_time  |  \-  |  tempo até o qual bloquear   
  
### Valor de retorno

(nenhum)

### Exceções

Qualquer exceção lançada por `Clock` ou `Duration` (clocks e durations fornecidos pela standard library nunca lançam).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
     
    auto now() { return std::chrono::steady_clock::now(); }
     
    auto awake_time()
    {
        using std::chrono::operator""ms;
        return now() + 2000ms;
    }
     
    int main()
    {
        std::cout << "Hello, waiter...\n" << std::flush;
        const auto start{now()};
        std::this_thread::sleep_until(awake_time());
        std::chrono::duration<double, std::milli> elapsed{now() - start};
        std::cout << "Waited " << elapsed.count() << " ms\n";
    }
```

Saída possível:
```
    Hello, waiter...
    Waited 2000.17 ms
```

### Veja também

[ sleep_for](<#/doc/thread/sleep_for>)(C++11) |  interrompe a execução da thread atual por uma duração de tempo especificada   
(função)  
[Documentação C](<#/>) para thrd_sleep