# std::to_string

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
std::string to_string( const std::stacktrace_entry& f );
```

Retorna uma string com uma descrição de `f`.

O padrão recomenda que a descrição forneça informações sobre a avaliação contida, incluindo informações de f.source_file() e f.source_line().

### Parâmetros

- **f** — um `stacktrace_entry` cuja descrição deve ser retornada

### Valor de retorno

Uma string com uma descrição de `f`.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

O suporte a allocators personalizados para esta função não é fornecido, porque as implementações geralmente exigem alocações específicas da plataforma, chamadas de sistema e muito trabalho intensivo de CPU, enquanto um allocator personalizado não oferece benefícios para esta função, pois as operações específicas da plataforma levam uma ordem de magnitude mais tempo do que a alocação.

### Exemplo

Execute este código
```cpp
    #include <stacktrace>
    #include <string>
    #include <iostream>
    
    int main()
    {
        auto st = std::stacktrace::current();
        std::cout <<
            "Description of an empty stacktrace entry:\n" +
            std::to_string(std::stacktrace_entry{}) << '\n';
        if (st.size() > 0) {
            std::cout <<
                "Description of a non-empty stacktrace entry:\n" +
                std::to_string(st[0]) << '\n';
        }
    }
```

Saída possível:
```
    Description of an empty stacktrace entry:
    
    Description of a non-empty stacktrace entry:
    0x0000000000402DE9 in ./prog.exe
```

### Veja também

[ to_string](<#/doc/utility/basic_stacktrace/to_string>)(C++23) | retorna uma string com uma descrição do `basic_stacktrace`
(modelo de função)