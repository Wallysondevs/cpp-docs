# std::chrono::year::max

```cpp
static constexpr year max() noexcept;  // (desde C++20)
```

Retorna o maior `year` possível, ou seja, [std::chrono::year](<#/doc/chrono/year>)(32767).

### Valor de retorno

[std::chrono::year](<#/doc/chrono/year>)(32767)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::cout << "The maximum year is: " << (int)std::chrono::year::max() << '\n';
    }
```

Saída:
```
    The maximum year is: 32767
```