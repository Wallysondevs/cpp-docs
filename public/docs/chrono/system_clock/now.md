# std::chrono::system_clock::now

```cpp
static std::chrono::time_point<std::chrono::system_clock> now() noexcept;  // (desde C++11)
```

Retorna um time point representando o ponto atual no tempo.

### Valor de retorno

Um time point representando o tempo atual.

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        const auto now = std::chrono::system_clock::now();
        const std::time_t t_c = std::chrono::system_clock::to_time_t(now);
        std::cout << "The system clock is currently at " << std::ctime(&t_c);
    }
```

Saída possível:
```
    The system clock is currently at Thu Mar 30 13:28:27 2023
```