# std::to_string

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template< class Allocator >
std::string to_string( const std::basic_stacktrace<Allocator>& st );
```

Retorna uma string com uma descrição de `st`.

A descrição de um `basic_stacktrace` tipicamente contém a descrição de suas entradas, embora o número de linhas não seja necessariamente igual a [`size()`](<#/doc/utility/basic_stacktrace/size>).

### Parâmetros

- **st** — um `basic_stacktrace` cuja descrição deve ser retornada

### Valor de retorno

Uma string com uma descrição de `st`.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

O suporte a allocators personalizados para esta função não é fornecido, porque as implementações geralmente exigem alocações específicas da plataforma, chamadas de sistema e muito trabalho intensivo de CPU, enquanto um allocator personalizado não oferece benefícios para esta função, pois as operações específicas da plataforma levam uma ordem de magnitude a mais de tempo do que a alocação.

### Exemplo

Execute este código
```cpp
    #include <stacktrace>
    #include <string>
    #include <iostream>
     
    int main()
    {
        auto trace = std::stacktrace::current();
        std::cout << std::to_string(trace) << '\n';
    }
```

Saída possível:
```
     0# 0x0000000000402D97 in ./prog.exe
     1# __libc_start_main in /lib/x86_64-linux-gnu/libc.so.6
     2# 0x0000000000402CA9 in ./prog.exe
```

### Veja também

[ to_string](<#/doc/utility/stacktrace_entry/to_string>)(C++23) | retorna uma string com uma descrição da `stacktrace_entry`
(função)