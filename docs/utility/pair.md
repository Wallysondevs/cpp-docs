# std::pair

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template<
class T1,
class T2
> struct pair;
```

`std::pair` é um template de classe que fornece uma maneira de armazenar dois objetos heterogêneos como uma única unidade. Um pair é um caso específico de um [std::tuple](<#/doc/utility/tuple>) com dois elementos.

Se nem `T1` nem `T2` for um tipo de classe possivelmente cv-qualificado com destrutor não-trivial, ou um array destes, o destrutor de `pair` é trivial.

### Parâmetros de template

- **T1, T2** — os tipos dos elementos que o pair armazena.

### Tipos de membros

Tipo de membro | Definição
---|---
`first_type` | `T1`
`second_type` | `T2`

### Objetos membros

Nome do membro | Tipo
---|---
`first` | `T1`
`second` | `T2`

### Funções membro

[ (construtor)](<#/doc/utility/pair/pair>) | constrói um novo `pair`
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[ swap](<#/doc/utility/pair/swap>)(desde C++11) | troca o conteúdo
(função membro pública)

### Funções não-membro

[ make_pair](<#/doc/utility/pair/make_pair>) | cria um objeto `pair` de um tipo, determinado pelos tipos dos argumentos
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/pair/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(desde C++20) | compara lexicograficamente os valores no `pair`
(template de função)
[ std::swap(std::pair)](<#/doc/utility/pair/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(desde C++11) | acessa um elemento de um `pair`
(template de função)

### Classes auxiliares

[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(desde C++11) | obtém o tamanho de um `pair`
(especialização de template de classe)
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(desde C++11) | obtém o tipo dos elementos de `pair`
(especialização de template de classe)
[ std::basic_common_reference<std::pair>](<#/doc/utility/pair/basic_common_reference>)(desde C++23) | determina o tipo de referência comum de dois `pair`s
(especialização de template de classe)
[ std::common_type<std::pair>](<#/doc/utility/pair/common_type>)(desde C++23) | determina o tipo comum de dois `pair`s
(especialização de template de classe)
[ std::formatter<std::pair>](<#/doc/utility/format/tuple_formatter>)(desde C++23) | suporte de formatação para `pair`
(especialização de template de classe)

### Especializações auxiliares

```cpp
template< class T, class U >
constexpr bool enable_nonlocking_formatter_optimization<std::pair<T, U>>
= enable_nonlocking_formatter_optimization<T> &&
enable_nonlocking_formatter_optimization<U>;  // (desde C++23)
```

Esta especialização de [`std::enable_nonlocking_formatter_optimization`](<#/doc/utility/format/enable_nonlocking_formatter_optimization>) permite a implementação eficiente de [`std::print`](<#/doc/io/print>) e [`std::println`](<#/doc/io/println>) para imprimir um objeto `pair` quando ambos `T` e `U` a habilitam.

### [Deduction guides](<#/doc/utility/pair/deduction_guides>)(desde C++17)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2796](<https://cplusplus.github.io/LWG/issue2796>) | C++98 | a trivialidade do destrutor de `pair` era não especificada | especificada

### Veja também

[ tuple](<#/doc/utility/tuple>)(desde C++11) | implementa um container de tamanho fixo, que armazena elementos de tipos possivelmente diferentes
(template de classe)
[ tie](<#/doc/utility/tuple/tie>)(desde C++11) | cria um [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota um tuple em objetos individuais
(template de função)