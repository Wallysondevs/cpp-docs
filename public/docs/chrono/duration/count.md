# std::chrono::duration&lt;Rep,Period&gt;::count

```cpp
constexpr rep count() const;  // (desde C++11)
```

  
Retorna o número de ticks para esta duração. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de ticks para esta duração. 

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::chrono::milliseconds ms{3}; // 3 milliseconds
        // 6000 microseconds constructed from 3 milliseconds
        std::chrono::microseconds us = 2 * ms;
        // 30Hz clock using fractional ticks
        std::chrono::duration<double, std::ratio<1, 30>> hz30(3.5);
     
        std::cout << "3 ms duration has " << ms.count() << " ticks\n"
                  << "6000 us duration has " << us.count() << " ticks\n"
                  << "3.5 30Hz duration has " << hz30.count() << " ticks\n";       
    }
```

Saída: 
```
    3 ms duration has 3 ticks
    6000 us duration has 6000 ticks
    3.5 30Hz duration has 3.5 ticks
```

### Veja também

[ duration_cast](<#/doc/chrono/duration/duration_cast>)(C++11) | converte uma duração para outra, com um intervalo de tick diferente   
(modelo de função)  