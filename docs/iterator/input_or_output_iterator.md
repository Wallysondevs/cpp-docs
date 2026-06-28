# std::input_or_output_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept input_or_output_iterator =
requires(I i) {
{ *i } -> /*can-reference*/;
} &&
std::weakly_incrementable<I>;
```

O conceito `input_or_output_iterator` forma a base da taxonomia de conceitos de iteradores; todo tipo de iterador satisfaz os requisitos de `input_or_output_iterator`.

O conceito apenas para exposição /*can-reference*/ é satisfeito se e somente se o tipo é [referenciável](<#/doc/meta>).

### Notas

`input_or_output_iterator` por si só especifica apenas operações para desreferenciar e incrementar um iterador. A maioria dos algoritmos exigirá operações adicionais, por exemplo:

  * comparando iteradores com sentinelas (veja [`sentinel_for`](<#/doc/iterator/sentinel_for>));
  * lendo valores de um iterador (veja [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) e [`input_iterator`](<#/doc/iterator/input_iterator>));
  * escrevendo valores em um iterador (veja [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e [`output_iterator`](<#/doc/iterator/output_iterator>));
  * um conjunto mais rico de movimentos de iterador (veja [`forward_iterator`](<#/doc/iterator/forward_iterator>), [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>), [`random_access_iterator`](<#/doc/iterator/random_access_iterator>)).

Ao contrário dos requisitos de [LegacyIterator](<#/doc/named_req/Iterator>), o conceito `input_or_output_iterator` não exige copiabilidade.

*i é exigido ser preservador de igualdade, embora as operações de incremento exigidas por [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>) não o sejam.

### Exemplo

Um iterador mínimo.
```cpp
    #include <cstddef>
    #include <iterator>
    
    struct SimpleIterator
    {
        using difference_type = std::ptrdiff_t;
    
        int operator*();
    
        SimpleIterator& operator++();
        void operator++(int) { ++*this; }
    };
    
    static_assert(std::input_or_output_iterator<SimpleIterator>);
```