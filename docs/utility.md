# Biblioteca de utilidades

C++ inclui uma variedade de bibliotecas de utilidades que fornecem funcionalidades que vão desde [contagem de bits](<#/doc/utility/bitset>) até [aplicação parcial de funções](<#/doc/utility/functional/bind>). Essas bibliotecas podem ser amplamente divididas em dois grupos:

*   bibliotecas de suporte à linguagem, e
*   bibliotecas de propósito geral.

## Suporte à linguagem

As bibliotecas de suporte à linguagem fornecem classes e funções que interagem de perto com os recursos da linguagem e suportam idiomas comuns da linguagem.

### [Suporte a tipos](<#/doc/types>)

Tipos básicos (por exemplo, [std::size_t](<#/doc/types/size_t>), [std::nullptr_t](<#/doc/types/nullptr_t>)), RTTI (por exemplo, [std::type_info](<#/doc/types/type_info>))

### [Metaprogramação](<#/doc/meta>) (desde C++11)

Type traits (por exemplo, [std::is_integral](<#/doc/types/is_integral>), [std::rank](<#/doc/types/rank>)), constantes em tempo de compilação (por exemplo, [std::integer_sequence](<#/doc/utility/integer_sequence>), [std::ratio](<#/doc/numeric/ratio/ratio>))

### Contexto de avaliação constante (desde C++20)

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`
---
[ is_constant_evaluated](<#/doc/types/is_constant_evaluated>)(C++20) | detecta se a chamada ocorre dentro de um contexto de avaliação constante
(função)
[ is_within_lifetime](<#/doc/types/is_within_lifetime>)(C++26) | verifica se um ponteiro está dentro do tempo de vida do objeto em tempo de compilação
(função)

### [Propriedades de implementação](<#/doc/utility/feature_test>) (desde C++20)

O header [`<version>`](<#/doc/header/version>) fornece informações dependentes da implementação sobre a standard library C++ (como o número da versão e a data de lançamento). Ele também define as [macros de teste de recursos da biblioteca](<#/doc/utility/feature_test>).

### [Utilitários de programa](<#/doc/utility/program>)

Terminação (por exemplo, [std::abort](<#/doc/utility/program/abort>), [std::atexit](<#/doc/utility/program/atexit>)), ambiente (por exemplo, [std::system](<#/doc/utility/program/system>)), sinais (por exemplo, [std::raise](<#/doc/utility/program/raise>))

### [Gerenciamento de memória dinâmica](<#/doc/memory>)

Smart pointers (por exemplo, [std::shared_ptr](<#/doc/memory/shared_ptr>)), allocators (por exemplo, [std::allocator](<#/doc/memory/allocator>) ou [std::pmr::memory_resource](<#/doc/memory/memory_resource>)), gerenciamento de memória estilo C (por exemplo, [std::malloc](<#/doc/memory/c/malloc>))

### [Tratamento de erros](<#/doc/error>)

Exceções (por exemplo, [std::exception](<#/doc/error/exception>), [std::terminate](<#/doc/error/terminate>)), asserções (por exemplo, [assert](<#/doc/error/assert>))

### [Captura de informações do código-fonte](<#/doc/utility/source_location>) (desde C++20)

Definido no header `[<source_location>](<#/doc/header/source_location>)`
---
[ source_location](<#/doc/utility/source_location>)(C++20) | uma classe que representa informações sobre o código-fonte, como nomes de arquivos, números de linha e nomes de funções
(classe)

### [Listas de inicializadores](<#/doc/utility/initializer_list>) (desde C++11)

Definido no header `[<initializer_list>](<#/doc/header/initializer_list>)`
---
[ initializer_list](<#/doc/utility/initializer_list>)(C++11) | referencia um array temporário criado na [inicialização por lista](<#/doc/language/list_initialization>)
(modelo de classe)

### Comparação de três vias (desde C++20)

Definido no header `[<compare>](<#/doc/header/compare>)`
---
[ three_way_comparablethree_way_comparable_with](<#/doc/utility/compare/three_way_comparable>)(C++20) | especifica que o operator <=> produz um resultado consistente em tipos dados
(concept)
[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado da comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(classe)
[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) | o tipo de resultado da comparação de 3 vias que suporta todos os 6 operadores e não é substituível
(classe)
[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado da comparação de 3 vias que suporta todos os 6 operadores e é substituível
(classe)
[ is_eqis_neqis_ltis_lteqis_gtis_gteq](<#/doc/utility/compare/named_comparison_functions>)(C++20) | funções de comparação nomeadas
(função)
[ compare_three_way](<#/doc/utility/compare/compare_three_way>)(C++20) | objeto de função restrito implementando x <=> y
(classe)
[ compare_three_way_result](<#/doc/utility/compare/compare_three_way_result>)(C++20) | obtém o tipo de resultado do operador de comparação de três vias <=> em tipos dados
(modelo de classe)
[ common_comparison_category](<#/doc/utility/compare/common_comparison_category>)(C++20) | a categoria de comparação mais forte para a qual todos os tipos dados podem ser convertidos
(modelo de classe)
[ strong_order](<#/doc/utility/compare/strong_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`
(objeto de ponto de customização)
[ weak_order](<#/doc/utility/compare/weak_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`
(objeto de ponto de customização)
[ partial_order](<#/doc/utility/compare/partial_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`
(objeto de ponto de customização)
[ compare_strong_order_fallback](<#/doc/utility/compare/compare_strong_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::strong_ordering`, mesmo que o operator<=> não esteja disponível
(objeto de ponto de customização)
[ compare_weak_order_fallback](<#/doc/utility/compare/compare_weak_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`, mesmo que o operator<=> não esteja disponível
(objeto de ponto de customização)
[ compare_partial_order_fallback](<#/doc/utility/compare/compare_partial_order_fallback>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::partial_ordering`, mesmo que o operator<=> não esteja disponível
(objeto de ponto de customização)

### [Suporte a coroutines](<#/doc/coroutine>) (desde C++20)

Tipos para suporte a coroutines, por exemplo, [std::coroutine_traits](<#/doc/coroutine/coroutine_traits>), [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>).

### [Funções variádicas](<#/doc/utility/variadic>)

Suporte para funções que aceitam um número arbitrário de parâmetros (via, por exemplo, [va_start](<#/doc/utility/variadic/va_start>), [va_arg](<#/doc/utility/variadic/va_arg>), [va_end](<#/doc/utility/variadic/va_end>)).

## Utilitários de propósito geral

### Swap

Definido no header `[<utility>](<#/doc/header/utility>)`
---
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)
[ exchange](<#/doc/utility/exchange>)(C++14) | substitui o argumento por um novo valor e retorna seu valor anterior
(modelo de função)
Definido no header `[<concepts>](<#/doc/header/concepts>)`

```cpp
 ranges::swap(C++20)
(objeto de ponto de customização)
```

### Operações de tipo (desde C++11)

Definido no header `[<utility>](<#/doc/header/utility>)`
---
[ forward](<#/doc/utility/forward>)(C++11) | encaminha um argumento de função e usa o argumento de modelo de tipo para preservar sua categoria de valor
(modelo de função)
[ forward_like](<#/doc/utility/forward_like>)(C++23) | encaminha um argumento de função como se o convertesse para a categoria de valor e constness da expressão do argumento de modelo de tipo especificado
(modelo de função)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(modelo de função)
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceção
(modelo de função)
[ as_const](<#/doc/utility/as_const>)(C++17) | obtém uma referência a const para seu argumento
(modelo de função)
[ declval](<#/doc/utility/declval>)(C++11) | obtém uma referência a um objeto do argumento de tipo de modelo para uso em um contexto não avaliado
(modelo de função)
[ to_underlying](<#/doc/utility/to_underlying>)(C++23) | converte uma enumeração para seu tipo subjacente
(modelo de função)

### Funções de comparação de inteiros (desde C++20)

Definido no header `[<utility>](<#/doc/header/utility>)`
---
[ cmp_equalcmp_not_equalcmp_lesscmp_greatercmp_less_equalcmp_greater_equal](<#/doc/utility/intcmp>)(C++20) | compara dois valores inteiros, garantindo que números negativos com sinal sejam menores que números sem sinal
(modelo de função)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)

### Operadores relacionais (até C++20)

Definido no header `[<utility>](<#/doc/header/utility>)`
---
Definido no namespace `std::rel_ops`

```cpp
 operator!=operator>operator<=operator>=(depreciado em C++20)
(modelo de função)
```

### Tags de construção (desde C++11)

Definido no header `[<utility>](<#/doc/header/utility>)`
---
[ piecewise_constructpiecewise_construct_t](<#/doc/utility/piecewise_construct_t>)(C++11) | tag de construção por partes
(tag)
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) | tag de construção in-place
(tag)
[ nontype nontype_t](<#/doc/utility/nontype>)(C++26) | tag de construção de valor
(tag)

### [Pares](<#/doc/utility/pair>) e [tuplas](<#/doc/utility/tuple>)

Definido no header `[<utility>](<#/doc/header/utility>)`
---
[ pair](<#/doc/utility/pair>) | implementa tupla binária, ou seja, um par de valores
(modelo de classe)
Definido no header `[<tuple>](<#/doc/header/tuple>)`

```cpp
 tuple(C++11)
(modelo de classe)
 apply(C++17)
(modelo de função)
 make_from_tuple(C++17)
(modelo de função)
```

##### [Protocolo de tupla](<#/doc/utility/tuple/tuple-like>) (desde C++11)

Definido no header `[<tuple>](<#/doc/header/tuple>)`

```cpp
Definido no header `<utility>`
Definido no header `<array>`
Definido no header `<ranges>`
Definido no header `<complex>`
 tuple_size(C++11)
(modelo de classe)
 tuple_element(C++11)
(modelo de classe)
```

### Tipos soma e wrappers com tipo apagado (desde C++17)

Definido no header `[<optional>](<#/doc/header/optional>)`
---
[ optional](<#/doc/utility/optional>)(C++17) | um wrapper que pode ou não conter um objeto
(modelo de classe)
Definido no header `[<expected>](<#/doc/header/expected>)`

```cpp
 expected(C++23)
(modelo de classe)
Definido no header `<variant>`
 variant(C++17)
(modelo de classe)
Definido no header `<any>`
 any(C++17)
(classe)
```

### [Bitset](<#/doc/utility/bitset>)

Definido no header `[<bitset>](<#/doc/header/bitset>)`
---
[ bitset](<#/doc/utility/bitset>) | implementa array de bits de comprimento constante
(modelo de classe)

### [Manipulação de bits](<#/doc/utility/bit>) (desde C++20)

O header [`<bit>`](<#/doc/header/bit>) fornece vários modelos de função para acessar, manipular e processar bits individuais e sequências de bits. A ordem dos bytes ([endianness](<#/doc/types/endian>)) de tipos escalares pode ser inspecionada através da facilidade [std::endian](<#/doc/types/endian>).

### [Objetos de função](<#/doc/utility/functional>) (desde C++11)

Aplicação parcial de funções (por exemplo, [std::bind](<#/doc/utility/functional/bind>)) e utilitários relacionados: utilitários para binding como [std::ref](<#/doc/utility/functional/ref>) e [std::placeholders](<#/doc/utility/functional/placeholders>), wrappers de função polimórficos: [std::function](<#/doc/utility/functional/function>), functors predefinidos (por exemplo, [std::plus](<#/doc/utility/functional/plus>), [std::equal_to](<#/doc/utility/functional/equal_to>)), conversores de ponteiro para membro para função [std::mem_fn](<#/doc/utility/functional/mem_fn>).

### [Suporte a hash](<#/doc/utility/hash>) (desde C++11)

Definido no header `[<functional>](<#/doc/header/functional>)`
---
[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)

### Veja também

[Documentação C](<#/>) para a biblioteca de utilidades
---