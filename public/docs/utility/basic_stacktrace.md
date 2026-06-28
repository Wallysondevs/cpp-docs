# std::basic_stacktrace

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template< class Allocator >
class basic_stacktrace;
using stacktrace =
std::basic_stacktrace<std::allocator<std::stacktrace_entry>>;
namespace pmr {
using stacktrace =
std::basic_stacktrace<std::pmr::polymorphic_allocator<std::stacktrace_entry>>;
}
```

1) O template de classe `basic_stacktrace` representa um instantâneo do stacktrace completo ou de uma parte dele. Ele satisfaz os requisitos de [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [SequenceContainer](<#/doc/named_req/SequenceContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), exceto que apenas operações de move, atribuição, swap e operações para containers de sequência com qualificador const são suportadas, e a semântica das funções de comparação é diferente daquelas exigidas para um container.

2) Alias de tipo de conveniência para `basic_stacktrace` usando o [std::allocator](<#/doc/memory/allocator>) padrão.

3) Alias de tipo de conveniência para `basic_stacktrace` usando o [alocador polimórfico](<#/doc/memory/polymorphic_allocator>).

A _sequência de invocação_ da avaliação atual \\(\small{ {x}_{0} }\\)x0 no thread de execução atual é uma sequência \\(\small{ ({x}_{0}, \dots, {x}_{n})}\\)(x0, ..., xn) de avaliações tal que, para \\(\small{i \ge 0}\\)i≥0, \\(\small{ {x}_{i} }\\)xi está dentro da invocação de função \\(\small{ {x}_{i+1} }\\)xi+1.

Um _stacktrace_ é uma representação aproximada de uma sequência de invocação e consiste em entradas de stacktrace.

Uma _entrada de stacktrace_ representa uma avaliação em um stacktrace. Ela é representada por std::stacktrace_entry na biblioteca padrão C++.

### Parâmetros de template

Allocator | \- | Um alocador que é usado para adquirir/liberar memória e para construir/destruir os elementos nessa memória. O tipo deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>). O programa é malformado se `Allocator::value_type` não for std::stacktrace_entry.

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | std::stacktrace_entry
`const_reference` | const value_type&
`reference` | value_type&
`const_iterator` | tipo [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) const definido pela implementação que modela [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)
`iterator` | `const_iterator`
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`reverse_const_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`difference_type` | tipo inteiro com sinal definido pela implementação
`size_type` | tipo inteiro sem sinal definido pela implementação
`allocator_type` | `Allocator`

### Funções membro

[ (construtor)](<#/doc/utility/basic_stacktrace/basic_stacktrace>) | cria um novo `basic_stacktrace`
(função membro pública)
[ (destrutor)](<#/doc/utility/basic_stacktrace/~basic_stacktrace>) | destrói o `basic_stacktrace`
(função membro pública)
[ operator=](<#/>) | atribui ao `basic_stacktrace`
(função membro pública)
[ current](<#/doc/utility/basic_stacktrace/current>)[static] | obtém o stacktrace atual ou sua parte especificada
(função membro estática pública)
[ get_allocator](<#/doc/utility/basic_stacktrace/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/utility/basic_stacktrace/begin>) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/utility/basic_stacktrace/end>) | retorna um iterador para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/utility/basic_stacktrace/rbegin>) | retorna um iterador reverso para o início
(função membro pública)
[ rendcrend](<#/doc/utility/basic_stacktrace/rend>) | retorna um iterador reverso para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/utility/basic_stacktrace/empty>) | verifica se o `basic_stacktrace` está vazio
(função membro pública)
[ size](<#/doc/utility/basic_stacktrace/size>) | retorna o número de entradas de stacktrace
(função membro pública)
[ max_size](<#/doc/utility/basic_stacktrace/max_size>) | retorna o número máximo possível de entradas de stacktrace
(função membro pública)

##### Acesso a elementos

[ operator[]](<#/doc/utility/basic_stacktrace/operator_at>) | acessa a entrada de stacktrace especificada
(função membro pública)
[ at](<#/doc/utility/basic_stacktrace/at>) | acessa a entrada de stacktrace especificada com verificação de limites
(função membro pública)

##### Modificadores

[ swap](<#/doc/utility/basic_stacktrace/swap>) | troca os conteúdos
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/utility/basic_stacktrace/operator_cmp>)(C++23) | compara os tamanhos e os conteúdos de dois valores `basic_stacktrace`
(template de função)
[ std::swap(std::basic_stacktrace)](<#/doc/utility/basic_stacktrace/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ to_string](<#/doc/utility/basic_stacktrace/to_string>)(C++23) | retorna uma string com uma descrição do `basic_stacktrace`
(template de função)
[ operator<<](<#/doc/utility/basic_stacktrace/operator_ltlt>)(C++23) | realiza a saída de stream de `basic_stracktrace`
(template de função)

### Classes auxiliares

[ std::hash<std::basic_stacktrace>](<#/doc/utility/basic_stacktrace/hash>)(C++23) | suporte a hash para `std::basic_stacktrace`
(especialização de template de classe)
[ std::formatter<std::basic_stacktrace>](<#/doc/utility/basic_stacktrace/formatter>)(C++23) | suporte a formatação para `basic_stacktrace`
(especialização de template de classe)

### Notas

O suporte a alocadores personalizados é fornecido para usar `basic_stacktrace` em um caminho crítico ou em ambientes embarcados. Os usuários podem alocar objetos `stacktrace_entry` na stack ou em algum outro local, onde apropriado.

A sequência de objetos std::stacktrace_entry possuída por um `std::basic_stacktrace` é imutável e é vazia ou representa um intervalo contíguo do stacktrace completo.

boost::stacktrace::basic_stacktrace (disponível em [Boost.Stacktrace](<https://www.boost.org/doc/libs/release/doc/html/stacktrace.html>)) pode ser usado em vez disso quando `std::basic_stacktrace` não estiver disponível.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_stacktrace`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | Biblioteca [Stacktrace](<#/doc/utility/basic_stacktrace>)
[`__cpp_lib_formatters`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | Formatação de [std::thread::id](<#/doc/thread/thread/id>) e std::stacktrace

### Exemplo

A saída obtida usando Compiler Explorer: [msvc](<https://godbolt.org/z/sjxvc97a7>) e [gcc](<https://godbolt.org/z/v117ccshs>).

Execute este código
```
    #include <iostream>
    #include <stacktrace>
    
    int nested_func(int c)
    {
        std::cout << std::stacktrace::current() << '\n';
        return c + 1;
    }
    
    int func(int b)
    {
        return nested_func(b + 1);
    }
    
    int main()
    {
        std::cout << func(777);
    }
```

Saída possível:
```
    // msvc output (the lines ending with '⤶' arrows are split to fit the width):
    0> C:\Users\ContainerAdministrator\AppData\Local\Temp\compiler-explorer-compiler20221122-⤶
    31624-2ja1sf.8ytzw\example.cpp(6): output_s!nested_func+0x1F
    1> C:\Users\ContainerAdministrator\AppData\Local\Temp\compiler-explorer-compiler20221122-⤶
    31624-2ja1sf.8ytzw\example.cpp(12): output_s!func+0x15
    2> C:\Users\ContainerAdministrator\AppData\Local\Temp\compiler-explorer-compiler20221122-⤶
    31624-2ja1sf.8ytzw\example.cpp(15): output_s!main+0xE
    3> D:\a\_work\1\s\src\vctools\crt\vcstartup\src\startup\exe_common.inl(288): output_s!⤶
    __scrt_common_main_seh+0x10C
    4> KERNEL32!BaseThreadInitThunk+0x14
    5> ntdll!RtlUserThreadStart+0x21
    779
    
    gcc output:
       0# nested_func(int) at /app/example.cpp:7
       1# func(int) at /app/example.cpp:13
       2#      at /app/example.cpp:18
       3#      at :0
       4#      at :0
       5#
    
    779
```

### Veja também

[ stacktrace_entry](<#/doc/utility/stacktrace_entry>)(C++23) | representação de uma avaliação em um stacktrace
(classe)