# std::chrono::system_clock::to_time_t

```cpp
static std::time_t to_time_t( const time_point& t ) noexcept;  // (desde C++11)
```

  
Converte t para um tipo [std::time_t](<#/doc/chrono/c/time_t>).

Se [std::time_t](<#/doc/chrono/c/time_t>) tiver menor precisão, é definido pela implementação se o valor é arredondado ou truncado.

### Parâmetros

t  |  \-  |  ponto no tempo do system clock para converter   
  
### Valor de retorno

Um valor [std::time_t](<#/doc/chrono/c/time_t>) representando t.

### Exemplo

Obtém a hora atual como um [std::time_t](<#/doc/chrono/c/time_t>) de duas maneiras.

Execute este código
```cpp
    #include <chrono>
    #include <ctime>
    #include <iostream>
    #include <thread>
    using namespace std::chrono_literals;
    
    int main()
    {
        // A maneira antiga
        std::time_t oldt = std::time({});
    
        std::this_thread::sleep_for(2700ms);
    
        // A maneira nova
        auto const now = std::chrono::system_clock::now();
        std::time_t newt = std::chrono::system_clock::to_time_t(now);
    
        std::cout << "newt - oldt == " << newt - oldt << " s\n";
    }
```

Saída possível:
```
    newt - oldt == 3 s
```

### Veja também

[ from_time_t](<#/doc/chrono/system_clock/from_time_t>)[static] |  converte [std::time_t](<#/doc/chrono/c/time_t>) para um ponto no tempo do system clock   
(função membro estática pública)  