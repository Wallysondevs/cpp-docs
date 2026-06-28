# std::optional

Definido no cabeçalho `[<optional>](<#/doc/header/optional>)`

```c
template< class T >
class optional;
```

O template de classe `std::optional` gerencia um valor contido _opcional_, ou seja, um valor que pode ou não estar presente.

Um caso de uso comum para `optional` é o valor de retorno de uma função que pode falhar. Ao contrário de outras abordagens, como [std::pair](<#/doc/utility/pair>)<T, bool>, `optional` lida bem com objetos caros de construir e é mais legível, pois a intenção é expressa explicitamente.

Qualquer instância de `optional<T>` em qualquer momento dado ou _contém um valor_ ou _não contém um valor_.

Se um `optional<T>` _contém um valor_, o valor é garantido como estando [aninhado dentro](<#/doc/language/objects>) do objeto `optional`, o que significa que nenhuma alocação de memória dinâmica jamais ocorre. Assim, um objeto `optional` modela um objeto, não um ponteiro, embora [operator*()](<#/doc/utility/optional/operator_star_>) e [operator->()](<#/doc/utility/optional/operator_star_>) sejam definidos.

Quando um objeto do tipo `optional<T>` é [convertido contextualmente para bool](<#/doc/language/implicit_cast>), a conversão retorna `true` se o objeto _contém um valor_ e `false` se ele _não contém um valor_.

O objeto `optional` _contém um valor_ nas seguintes condições:

  * O objeto é inicializado com/atribuído a partir de um valor do tipo `T` ou de outro `optional` que _contém um valor_.

O objeto _não contém um valor_ nas seguintes condições:

  * O objeto é inicializado por padrão.
  * O objeto é inicializado com/atribuído a partir de um valor do tipo [std::nullopt_t](<#/doc/utility/optional/nullopt_t>) ou de um objeto `optional` que _não contém um valor_.
  * A função membro [reset()](<#/doc/utility/optional/reset>) é chamada.

O objeto `optional` é uma [`view`](<#/doc/ranges/view>) que contém um elemento se _contém um valor_, ou zero elementos caso contrário, se _não contém um valor_. O tempo de vida do elemento contido está vinculado ao objeto. | (desde C++26)

Não existem `optional` de referências, funções, arrays ou `_cv_ void`; um programa é malformado se instanciar um `optional` com tal tipo. Além disso, um programa é malformado se instanciar um `optional` com os tipos de tag (possivelmente `cv-qualified`) [std::nullopt_t](<#/doc/utility/optional/nullopt_t>) ou [std::in_place_t](<#/doc/utility/in_place>).

### Parâmetros de template

- **T** — o tipo do valor para gerenciar o estado de inicialização. O tipo deve atender aos requisitos de [Destructible](<#/doc/named_req/Destructible>) (em particular, tipos de array e referência não são permitidos).

### Tipos de membro

Nome do membro | Definição
---|---
`value_type` | `T`
`iterator` (desde C++26) | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) e [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) definidos pela implementação, cujo `value_type` e `reference` são [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt; e T&, respectivamente.
`const_iterator` (desde C++26) | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) e [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) definidos pela implementação, cujo `value_type` e `reference` são [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt; e const T&, respectivamente.

Todos os requisitos para os tipos de iterator de um [Container](<#/doc/named_req/Container>) também se aplicam ao tipo `iterator` de `optional`.

### Funções membro

[ (construtor)](<#/doc/utility/optional/optional>) | constrói o objeto `optional`
(função membro pública)
[ (destrutor)](<#/doc/utility/optional/~optional>) | destrói o valor contido, se houver um
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)

##### Iteradores

[ begin](<#/doc/utility/optional/begin>)(C++26) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/utility/optional/end>)(C++26) | retorna um iterator para o fim
(função membro pública)

##### Observadores

[ operator->operator*](<#/doc/utility/optional/operator_star_>) | acessa o valor contido
(função membro pública)
[ operator boolhas_value](<#/doc/utility/optional/operator_bool>) | verifica se o objeto contém um valor
(função membro pública)
[ value](<#/doc/utility/optional/value>) | retorna o valor contido
(função membro pública)
[ value_or](<#/doc/utility/optional/value_or>) | retorna o valor contido se disponível, outro valor caso contrário
(função membro pública)

##### Operações monádicas

[ and_then](<#/doc/utility/optional/and_then>)(C++23) | retorna o resultado da função fornecida sobre o valor contido, se ele existir, ou um `optional` vazio caso contrário
(função membro pública)
[ transform](<#/doc/utility/optional/transform>)(C++23) | retorna um `optional` contendo o valor contido transformado, se ele existir, ou um `optional` vazio caso contrário
(função membro pública)
[ or_else](<#/doc/utility/optional/or_else>)(C++23) | retorna o próprio `optional` se ele contém um valor, ou o resultado da função fornecida caso contrário
(função membro pública)

##### Modificadores

[ swap](<#/doc/utility/optional/swap>) | troca os conteúdos
(função membro pública)
[ reset](<#/doc/utility/optional/reset>) | destrói qualquer valor contido
(função membro pública)
[ emplace](<#/doc/utility/optional/emplace>) | constrói o valor contido no local
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/optional/operator_cmp>)(C++17)(C++17)(C++17)(C++17)(C++17)(C++17)(C++20) | compara objetos `optional`
(template de função)
[ make_optional](<#/doc/utility/optional/make_optional>)(C++17) | cria um objeto `optional`
(template de função)
[ std::swap(std::optional)](<#/doc/utility/optional/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ std::hash<std::optional>](<#/doc/utility/optional/hash>)(C++17) | suporte a hash para `std::optional`
(especialização de template de classe)
[ nullopt_t](<#/doc/utility/optional/nullopt_t>)(C++17) | indicador de um `std::optional` que não contém um valor
(classe)
[ bad_optional_access](<#/doc/utility/optional/bad_optional_access>)(C++17) | exceção indicando acesso verificado a um `optional` que não contém um valor
(classe)

### Auxiliares

[ nullopt](<#/doc/utility/optional/nullopt>)(C++17) | um objeto do tipo `nullopt_t`
(constante)
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) | tag de construção in-place
(tag)

### Especializações auxiliares

```cpp
template< class T >
constexpr bool ranges::enable_view<std::optional<T>> = true;  // (desde C++26)
```

Esta especialização de [ranges::enable_view](<#/doc/ranges/view>) faz com que `optional` satisfaça [`view`](<#/doc/ranges/view>).

```cpp
template< class T >
constexpr auto format_kind<std::optional<T>> = range_format::disabled;  // (desde C++26)
```

Esta especialização de `format_kind` desabilita o [suporte de formatação de range](<#/doc/utility/format/ranges_formatter>) de `optional`.

### [Guias de dedução](<#/doc/utility/optional/deduction_guides>)

### Notas

```cpp
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_optional` | `201606L` | (C++17) | `std::optional`
`202106L`  // (C++23)
(DR20) | Totalmente constexpr
`202110L` | (C++23) | Operações monádicas
`__cpp_lib_optional_range_support` | `202406L` | (C++26) | Suporte a range para `std::optional`
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
    #include <string>
    
    // optional can be used as the return type of a factory that may fail
    std::optional<std::string> create(bool b)
    {
        if (b)
            return "Godzilla";
        return {};
    }
    
    // std::nullopt can be used to create any (empty) std::optional
    auto create2(bool b)
    {
        return b ? std::optional<std::string>{"Godzilla"} : std::nullopt;
    }
    
    int main()
    {
        std::cout << "create(false) returned "
                  << create(false).value_or("empty") << '\n';
    
        // optional-returning factory functions are usable as conditions of while and if
        if (auto str = create2(true))
            std::cout << "create2(true) returned " << *str << '\n';
    }
```

Saída:
```
    create(false) returned empty
    create2(true) returned Godzilla
```

### Veja também

[ variant](<#/doc/utility/variant>)(C++17) | uma união discriminada type-safe
(template de classe)
[ any](<#/doc/utility/any>)(C++17) | objetos que armazenam instâncias de qualquer tipo [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(classe)
[ expected](<#/doc/utility/expected>)(C++23) | um wrapper que contém um valor esperado ou um valor de erro
(template de classe)
[ ranges::single_viewviews::single](<#/doc/ranges/single_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) que contém um único elemento de um valor especificado
(template de classe) (objeto de ponto de customização)
[ ranges::empty_viewviews::empty](<#/doc/ranges/empty_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) vazia sem elementos
(template de classe) (template de variável)