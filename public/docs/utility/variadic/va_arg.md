# va_arg

Definido no header `[<cstdarg>](<#/doc/header/cstdarg>)`

```cpp
T va_arg( std::va_list ap, T );
```

  
A macro `va_arg` expande para uma expressão do tipo T que corresponde ao próximo parâmetro da [va_list](<#/doc/utility/variadic/va_list>) ap.

Antes de chamar `va_arg`, ap deve ser inicializado por uma chamada para [va_start](<#/doc/utility/variadic/va_start>) ou [va_copy](<#/doc/utility/variadic/va_copy>), sem nenhuma chamada intermediária para [va_end](<#/doc/utility/variadic/va_end>). Cada invocação da macro `va_arg` modifica ap para apontar para o próximo argumento variável.

Se o tipo do próximo argumento em ap (após promoções) não for [compatível](<#/>) com T, o comportamento é indefinido, a menos que:

  * um tipo seja um tipo inteiro com sinal, o outro tipo seja o tipo inteiro sem sinal correspondente, e o valor seja representável em ambos os tipos; ou
  * um tipo seja um ponteiro para void e o outro seja um ponteiro para um tipo de caractere (char, signed char, ou unsigned char).

Se `va_arg` for chamado quando não houver mais argumentos em ap, o comportamento é indefinido.

### Parâmetros

ap  |  \-  |  uma instância do tipo [va_list](<#/doc/utility/variadic/va_list>)   
---|---|---
T  |  \-  |  o tipo do próximo parâmetro em ap  
  
### Valor expandido

O próximo parâmetro variável em ap.

### Exemplo

Execute este código
```cpp
    #include <cstdarg>
    #include <cstdio>
    #include <iostream>
     
    void print_variance(std::size_t count, const char* fmt, ...)
    {
        double sum = 0;
        double sum_sq = 0;
        std::va_list args;
        va_start(args, fmt);
        for (std::size_t i = count; i--;)
        {
            double num = va_arg(args, double);
            sum += num;
            sum_sq += num*num;
        }
        va_end(args);
        std::printf(fmt, sum_sq / count - (sum / count) * (sum / count));
    }
     
    void nano_printf(const char* fmt, ...)
    {
        std::va_list args;
        va_start(args, fmt);
     
        for (const char* p = fmt; *p != '\0'; ++p)
        {
            switch (*p)
            {
            case '%':
                switch (*++p) // read format symbol
                {
                    case 'i':
                        std::cout << va_arg(args, int);
                        continue;
                    case 'f':
                        std::cout << va_arg(args, double);
                        continue;
                    case 's':
                        std::cout << va_arg(args, const char*);
                        continue;
                    case 'c':
                        std::cout << static_cast<char>(va_arg(args, int));
                        continue;
                    case '%':
                        std::cout << '%';
                        continue;
                    /* ...more cases... */
                }
                break; // format error...
            case '\n':
                std::cout << '\n';
                continue;
            case '\t':
                std::cout << '\t';
                continue;
            /* ...more cases... */
            }
            std::cout << *p;
        }
     
        va_end(args);
    }
     
    int main()
    {
        print_variance(4, "%f\n", 25.0, 27.3, 26.9, 25.7);
        nano_printf("Args: %i%% %c%f %s\n", 42, '#', 3.14, "C++");
    }
```

Saída:
```
    0.846875
    Args: 42% #3.14 C++
```

### Veja também

[ va_start](<#/doc/utility/variadic/va_start>) | permite acesso a argumentos de função variádicos   
(macro de função)  
[ va_copy](<#/doc/utility/variadic/va_copy>)(C++11) | faz uma cópia dos argumentos de função variádicos   
(macro de função)  
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádicos   
(macro de função)  
[Documentação C](<#/>) para va_arg