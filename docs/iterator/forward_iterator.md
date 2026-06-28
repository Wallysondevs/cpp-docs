# std::forward_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept forward_iterator =
std::input_iterator<I> &&
std::derived_from</*ITER_CONCEPT*/<I>, std::forward_iterator_tag> &&
std::incrementable<I> &&
std::sentinel_for<I, I>;
```

Este concept refina [std::input_iterator](<#/doc/iterator/input_iterator>) ao exigir que `I` também modele [std::incrementable](<#/doc/iterator/incrementable>) (tornando-o adequado para algoritmos de múltiplas passagens), e garantindo que dois iterators para o mesmo range possam ser comparados entre si.

### Determinação do concept de Iterator

A definição deste concept é especificada através de um alias template apenas para exposição /*ITER_CONCEPT*/.

Para determinar /*ITER_CONCEPT*/&lt;I&gt;, seja ITER_TRAITS&lt;I&gt; denotando I se a especialização [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerada a partir do template primário, ou [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; caso contrário:

  * Se ITER_TRAITS&lt;I&gt;::iterator_concept for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
  * Caso contrário, se ITER_TRAITS&lt;I&gt;::iterator_category for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
  * Caso contrário, se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerado a partir do template primário, /*ITER_CONCEPT*/&lt;I&gt; denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, /*ITER_CONCEPT*/&lt;I&gt; não denota um tipo e resulta em uma falha de substituição.

### Requisitos semânticos

`I` modela `std::forward_iterator` se, e somente se, `I` modelar todos os concepts que ele subsume, e dados objetos i e j do tipo `I`:

  * A comparação entre iterators i e j tem um resultado definido se

    

  * i e j são iterators para a mesma sequência subjacente, ou
  * ambos i e j são inicializados por valor, caso em que eles se comparam como iguais.

  * Ponteiros e referências obtidos de um forward iterator em um range permanecem válidos enquanto o range existir.
  * Se i e j forem desreferenciáveis, eles oferecem a _garantia de múltiplas passagens_ , ou seja:

    

  * i == j implica ++i == ++j, e
  * ((void)[](auto x){ ++x; }(i), *i) é equivalente a *i.

### Notas

Ao contrário dos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), o concept `forward_iterator` não exige que a desreferência retorne uma referência.

### Exemplo

Um forward iterator mínimo.
```cpp
    #include <cstddef>
    #include <iterator>
    
    struct SimpleForwardIterator
    {
        using difference_type = std::ptrdiff_t;
        using value_type = int;
    
        int operator*() const;
    
        SimpleForwardIterator& operator++();
    
        SimpleForwardIterator operator++(int)
        {
            auto tmp = *this;
            ++*this;
            return tmp;
        }
    
        bool operator==(const SimpleForwardIterator&) const;
    };
    
    static_assert(std::forward_iterator<SimpleForwardIterator>);
```

### Veja também

[ input_iterator](<#/doc/iterator/input_iterator>)(C++20) | especifica que um tipo é um input iterator, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré- e pós-incrementado
(concept)
[ bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>)(C++20) | especifica que um `forward_iterator` é um bidirectional iterator, suportando movimento para trás
(concept)