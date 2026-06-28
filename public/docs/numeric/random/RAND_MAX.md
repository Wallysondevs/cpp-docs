# RAND_MAX

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`
#define RAND_MAX /*implementation defined*/

Expande para uma expressão constante inteira igual ao valor máximo retornado pela função [std::rand](<#/doc/numeric/random/rand>). Este valor é dependente da implementação. É garantido que este valor é de pelo menos 32767.

### Exemplo

Execute este código
```cpp
    #include <climits>
    #include <cstdlib>
    #include <ctime>
    #include <iostream>
    
    int main()
    {
        // use current time as seed for random generator
        std::srand(std::time(NULL));
    
        std::cout << "RAND_MAX: " << RAND_MAX << '\n'
                  << "INT_MAX: " << INT_MAX << '\n'
                  << "Random value on [0,1]: "
                  << static_cast<double>(std::rand()) / RAND_MAX << '\n';
    }
```

Saída possível:
```
    RAND_MAX: 2147483647
    INT_MAX: 2147483647
    Random value on [0,1]: 0.618608
```

### Veja também

[ rand](<#/doc/numeric/random/rand>) | gera um número pseudoaleatório
(função)
[ srand](<#/doc/numeric/random/srand>) | inicializa o gerador de números pseudoaleatórios
(função)
[documentação C](<#/>) para RAND_MAX