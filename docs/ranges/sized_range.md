# std::ranges::sized_range, std::ranges::disable_sized_range

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class T >
concept sized_range = ranges::range<T> &&
requires(T& t) {
ranges::size(t);
};
template< class >
constexpr bool disable_sized_range = false;
```

1) O concept `sized_range` especifica os requisitos de um tipo [`range`](<#/doc/ranges/range>) que conhece seu tamanho em tempo constante com a função `size`.

2) O `disable_sized_range` existe para permitir o uso de tipos range que fornecem uma função `size` (seja como membro ou não-membro), mas que de fato não modelam `sized_range`. Usuários podem especializar `disable_sized_range` para tipos definidos pelo programa cv-unqualified. Tais especializações devem ser utilizáveis em [expressões constantes](<#/doc/language/constant_expression>) e ter o tipo const bool.

### Requisitos semânticos

1) Dado um lvalue `t` do tipo [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;, `T` modela `sized_range` somente se

  * [ranges::size](<#/doc/ranges/size>)(t)

    

  * tem complexidade de tempo constante amortizada,
  * não altera o valor de `t` de uma maneira observável por expressões [que preservam a igualdade](<#/doc/concepts>), e
  * é igual a [ranges::distance](<#/doc/iterator/ranges/distance>)([ranges::begin](<#/doc/ranges/begin>)(t), [ranges::end](<#/doc/ranges/end>)(t)), e

  * se [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;T&gt; modela [`forward_iterator`](<#/doc/iterator/forward_iterator>), [ranges::size](<#/doc/ranges/size>)(t) é bem definido independentemente da avaliação de [ranges::begin](<#/doc/ranges/begin>)(t) (em outras palavras, um range dimensionado de passagem única pode suportar uma chamada a size somente antes da primeira chamada a begin, mas um range forward deve suportar size em todos os momentos).

### Notas

`disable_sized_range` não pode ser usado para desabilitar um range cujo iterator e sentinel satisfazem [`sized_sentinel_for`](<#/doc/iterator/sized_sentinel_for>); [std::disable_sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>) deve ser usado em vez disso.

`disable_sized_range` não pode ser especializado para tipos array ou tipos referência.

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <list>
    #include <ranges>
    
    static_assert
    (
        std::ranges::sized_range<std::list<int>> and
        not std::ranges::sized_range<std::forward_list<int>>
    );
    
    int main() {}
```

### Veja também

[ ranges::random_access_range](<#/doc/ranges/random_access_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)
(concept)
[ ranges::contiguous_range](<#/doc/ranges/contiguous_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>)
(concept)