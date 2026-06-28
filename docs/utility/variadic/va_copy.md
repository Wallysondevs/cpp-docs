# va_copy

Definido no cabeçalho `[<cstdarg>](<#/doc/header/cstdarg>)`

```c
void va_copy( std::va_list dest, std::va_list src );
```

A macro `va_copy` copia src para dest.

[va_end](<#/doc/utility/variadic/va_end>) deve ser chamada em dest antes que a função retorne ou qualquer reinicialização subsequente de dest (através de chamadas para [va_start](<#/doc/utility/variadic/va_start>) ou **va_copy**).

### Parâmetros

- **dest** — uma instância do tipo [va_list](<#/doc/utility/variadic/va_list>) a ser inicializada
- **src** — o [va_list](<#/doc/utility/variadic/va_list>) de origem que será usado para inicializar dest

### Valor expandido

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <cstdarg>
    #include <iostream>
    
    double sample_stddev(int count, ...) 
    {
        double sum = 0;
        std::va_list args1;
        va_start(args1, count);
        std::va_list args2;
        va_copy(args2, args1);
        for (int i = 0; i < count; ++i)
        {
            double num = va_arg(args1, double);
            sum += num;
        }
        va_end(args1);
        double mean = sum / count;
    
        double sum_sq_diff = 0;
        for (int i = 0; i < count; ++i)
        {
            double num = va_arg(args2, double);
            sum_sq_diff += (num - mean) * (num - mean);
        }
        va_end(args2);
        return std::sqrt(sum_sq_diff / count);
    }
    
    int main() 
    {
        std::cout << sample_stddev(4, 25.0, 27.3, 26.9, 25.7) << '\n';
    }
```

Saída:
```
    0.920258
```

### Veja também

[ va_start](<#/doc/utility/variadic/va_start>) | permite acesso a argumentos de função variádicos
(macro de função)
[ va_arg](<#/doc/utility/variadic/va_arg>) | acessa o próximo argumento de função variádico
(macro de função)
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádicos
(macro de função)
[Documentação C](<#/>) para va_copy