# std::chrono::system_clock::from_time_t

```cpp
static std::chrono::system_clock::time_point from_time_t( std::time_t t ) noexcept;  // (desde C++11)
```

Converte t para um tipo time point, usando a precisão mais grosseira dos dois tipos.

Se `time_point` tiver precisão menor, é definido pela implementação se o valor é arredondado ou truncado.

### Parâmetros

- **t** — valor [std::time_t](<#/doc/chrono/c/time_t>) a ser convertido

### Valor de retorno

Um valor do tipo [`std::chrono::system_clock::time_point`](<#/doc/chrono/system_clock>) representando t.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <ctime>
    #include <iostream>
    #include <thread>
    
    int main()
    {
        using namespace std::chrono_literals;
    
        const std::time_t t = std::time(nullptr); // geralmente tem precisão de "1 segundo"
    
        const auto from = std::chrono::system_clock::from_time_t(t);
    
        std::this_thread::sleep_for(500ms);
    
        const auto diff = std::chrono::system_clock::now() - from;
    
        std::cout << diff << " ("
                  << std::chrono::round<std::chrono::milliseconds>(diff)
                  << ")\n";
    }
```

Saída possível:
```
    987654321ns (987ms)
```

### Veja também

[ to_time_t](<#/doc/chrono/system_clock/to_time_t>)[static] | converte um time point de system clock para [std::time_t](<#/doc/chrono/c/time_t>)
(função membro estática pública)