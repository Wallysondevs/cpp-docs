# std::difftime

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
double difftime( std::time_t time_end, std::time_t time_beg );
```

Calcula a diferença entre dois tempos de calendário como objetos [std::time_t](<#/doc/chrono/c/time_t>) (time_end - time_beg) em segundos. Se time_end se refere a um ponto no tempo anterior a time_beg, o resultado é negativo.

### Parâmetros

- **time_beg, time_end** — tempos a comparar

### Valor de retorno

Diferença entre dois tempos em segundos.

### Notas

Em sistemas POSIX, [std::time_t](<#/doc/chrono/c/time_t>) é medido em segundos, e `difftime` é equivalente à subtração aritmética, mas C e C++ permitem unidades fracionárias para `time_t`.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
    
    int main()
    {
        std::time_t start = std::time(nullptr);
        volatile double d = 1.0;
    
        // some time-consuming operation
        for (int p = 0; p < 10000; ++p)
            for (int q = 0; q < 100000; ++q)
                d = d + p * d * q + d;
    
        std::cout << "Wall time passed: "
                  << std::difftime(std::time(nullptr), start) << " s.\n";
    }
```

Saída possível:
```
    Wall time passed: 9 s.
```

### Veja também

[ duration](<#/doc/chrono/duration>)(desde C++11) | um intervalo de tempo
(modelo de classe)
[Documentação C](<#/>) para difftime