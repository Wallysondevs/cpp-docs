# std::input_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept input_iterator =
std::input_or_output_iterator<I> &&
std::indirectly_readable<I> &&
requires { typename /*ITER_CONCEPT*/<I>; } &&
std::derived_from</*ITER_CONCEPT*/<I>, std::input_iterator_tag>;
```

O concept `input_iterator` é um refinamento de [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>), adicionando o requisito de que os valores referenciados podem ser lidos (via [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)) e o requisito de que a tag do concept de iterator esteja presente.

### Determinação do concept de Iterator

A definição deste concept é especificada através de um alias template apenas para exposição /*ITER_CONCEPT*/.

Para determinar /*ITER_CONCEPT*/&lt;I&gt;, seja ITER_TRAITS&lt;I&gt; denotando I se a especialização [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerada a partir do template primário, ou [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; caso contrário:

  * Se ITER_TRAITS&lt;I&gt;::iterator_concept for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
  * Caso contrário, se ITER_TRAITS&lt;I&gt;::iterator_category for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
  * Caso contrário, se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerado a partir do template primário, /*ITER_CONCEPT*/&lt;I&gt; denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, /*ITER_CONCEPT*/&lt;I&gt; não denota um tipo e resulta em uma falha de substituição.

### Notas

Ao contrário dos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>), o concept `input_iterator` não exige [`equality_comparable`](<#/doc/concepts/equality_comparable>), uma vez que iterators de entrada são tipicamente comparados com sentinelas.

### Exemplo

Um iterator de entrada mínimo.
```cpp
    #include <cstddef>
    #include <iterator>
    
    struct SimpleInputIterator
    {
        using difference_type = std::ptrdiff_t;
        using value_type = int;
    
        int operator*() const;
    
        SimpleInputIterator& operator++();
        void operator++(int) { ++*this; }
    };
    
    static_assert(std::input_iterator<SimpleInputIterator>);
```

### Veja também

[ input_or_output_iterator](<#/doc/iterator/input_or_output_iterator>)(C++20) | especifica que objetos de um tipo podem ser incrementados e desreferenciados
(concept)
[ forward_iterator](<#/doc/iterator/forward_iterator>)(C++20) | especifica que um `input_iterator` é um iterator forward, suportando comparação de igualdade e múltiplas passagens
(concept)