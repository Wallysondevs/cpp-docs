# Funções Variádicas

Funções variádicas são funções (por exemplo, [std::printf](<#/doc/io/c/printf>)) que aceitam um [número variável de argumentos](<#/doc/language/variadic_arguments>).

Para declarar uma função variádica, uma elipse aparece após a lista de parâmetros, por exemplo, `int printf(const char* format...);`, que pode ser precedida por uma vírgula opcional. Consulte [Argumentos variádicos](<#/doc/language/variadic_arguments>) para detalhes adicionais sobre a sintaxe, conversões automáticas de argumentos e as alternativas.

Para acessar os argumentos variádicos do corpo da função, as seguintes facilidades da biblioteca são fornecidas:

Definido no header `[<cstdarg>](<#/doc/header/cstdarg>)`
---
[ va_start](<#/doc/utility/variadic/va_start>) | permite o acesso aos argumentos de função variádicos
(macro de função)
[ va_arg](<#/doc/utility/variadic/va_arg>) | acessa o próximo argumento de função variádico
(macro de função)
[ va_copy](<#/doc/utility/variadic/va_copy>)(desde C++11) | cria uma cópia dos argumentos de função variádicos
(macro de função)
[ va_end](<#/doc/utility/variadic/va_end>) | finaliza a travessia dos argumentos de função variádicos
(macro de função)
[ va_list](<#/doc/utility/variadic/va_list>) | contém as informações necessárias para [va_start](<#/doc/utility/variadic/va_start>), [va_arg](<#/doc/utility/variadic/va_arg>), [va_end](<#/doc/utility/variadic/va_end>), e [va_copy](<#/doc/utility/variadic/va_copy>)
(typedef)

### Exemplo

Execute este código
```cpp
    #include <cstdarg>
    #include <iostream>
     
    void simple_printf(const char* fmt...) // O estilo C "const char* fmt, ..." também é válido
    {
        va_list args;
        va_start(args, fmt);
     
        while (*fmt != '\0')
        {
            if (*fmt == 'd')
            {
                int i = va_arg(args, int);
                std::cout << i << '\n';
            }
            else if (*fmt == 'c')
            {
                // observe a conversão automática para tipo integral
                int c = va_arg(args, int);
                std::cout << static_cast<char>(c) << '\n';
            }
            else if (*fmt == 'f')
            {
                double d = va_arg(args, double);
                std::cout << d << '\n';
            }
            ++fmt;
        }
     
        va_end(args);
    }
     
    int main()
    {
        simple_printf("dcff", 3, 'a', 1.999, 42.5); 
    }
```

Saída:
```
    3
    a
    1.999
    42.5
```

### Veja também

[Documentação C](<#/>) para Funções variádicas
---