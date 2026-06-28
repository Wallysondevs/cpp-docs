# std::chrono::year::min

```cpp
static constexpr std::chrono::year min() noexcept;  // (desde C++20)
```

  
Retorna o menor `year` possível, isto é, [std::chrono::year](<#/doc/chrono/year>)(-32767). 

### Valor de retorno

[std::chrono::year](<#/doc/chrono/year>)(-32767)

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << "The minimum year is: " << (int)std::chrono::year::min() << '\n';
    }
```

Saída: 
```
    The minimum year is: -32767
```