# EXIT_SUCCESS, EXIT_FAILURE

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
#define EXIT_SUCCESS /*implementation defined*/
#define EXIT_FAILURE /*implementation defined*/
```

As macros `EXIT_SUCCESS` e `EXIT_FAILURE` expandem-se para expressões constantes integrais que podem ser usadas como argumentos para a função [std::exit](<#/doc/utility/program/exit>) (e, portanto, como os valores a serem retornados da [função main](<#/doc/language/main_function>)), e indicam o status de execução do programa.

Uma implementação autônoma é obrigada a fornecer `EXIT_SUCCESS` e `EXIT_FAILURE`. | (desde C++23)
---|---
Constante | Descrição
`EXIT_SUCCESS` | execução bem-sucedida de um programa
`EXIT_FAILURE` | execução mal-sucedida de um programa

### Notas

Tanto `EXIT_SUCCESS` quanto o valor zero indicam status de execução bem-sucedida do programa (veja [std::exit](<#/doc/utility/program/exit>)), embora não seja exigido que `EXIT_SUCCESS` seja igual a zero.

Embora `EXIT_SUCCESS` e `EXIT_FAILURE` sejam exigidos em implementações autônomas desde C++23, eles não são exigidos como disponíveis em uma implementação C autônoma.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
    
    int main(int argc, char* argv[])
    {
        if (argc <= 1)
        {
            std::cout << "At least one command-line argument required\n";
            return EXIT_FAILURE;
        }
    
        std::cout << argv[1] << '\n';
        return EXIT_SUCCESS;
    }
```

Saída possível:
```
    The quick brown fox jumps over the lazy cat
```

### Veja também

[Documentação C](<#/>) para EXIT_SUCCESS, EXIT_FAILURE
---