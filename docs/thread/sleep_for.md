# std::this_thread::sleep_for

Definido no header `[<thread>](<#/doc/header/thread>)`

```cpp
template< class Rep, class Period >
void sleep_for( const std::chrono::duration<Rep, Period>& sleep_duration );  // (desde C++11)
```

Bloqueia a execução da thread atual por _pelo menos_ a sleep_duration especificada.

Esta função pode bloquear por mais tempo do que sleep_duration devido a atrasos de agendamento ou contenção de recursos.

O padrão recomenda que um relógio estável (steady clock) seja usado para medir a duração. Se uma implementação usar um relógio de sistema (system clock) em vez disso, o tempo de espera também pode ser sensível a ajustes de relógio.

### Parâmetros

- **sleep_duration** — duração de tempo para dormir

### Valor de retorno

(nenhum)

### Exceções

Qualquer exceção lançada por `clock`, `time_point`, ou `duration` durante a execução (clocks, time points e durations fornecidos pela standard library nunca lançam exceções).

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    
    int main()
    {
        using namespace std::chrono_literals;
    
        std::cout << "Hello waiter\n" << std::flush;
    
        const auto start = std::chrono::high_resolution_clock::now();
        std::this_thread::sleep_for(2000ms);
        const auto end = std::chrono::high_resolution_clock::now();
        const std::chrono::duration<double, std::milli> elapsed = end - start;
    
        std::cout << "Waited " << elapsed << '\n';
    }
```

Saída possível:
```
    Hello waiter
    Waited 2000.13 ms
```

### Veja também

[ sleep_until](<#/doc/thread/sleep_until>)(C++11) | interrompe a execução da thread atual até um ponto no tempo especificado
(função)