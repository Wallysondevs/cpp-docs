# std::bidirectional_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept bidirectional_iterator =
std::forward_iterator<I> &&
std::derived_from</*ITER_CONCEPT*/<I>, std::bidirectional_iterator_tag> &&
requires(I i) {
{ \--i } -> std::same_as<I&>;
{ i\-- } -> std::same_as<I>;
};
```

O concept `bidirectional_iterator` refina [`forward_iterator`](<#/doc/iterator/forward_iterator>) adicionando a capacidade de mover um iterator para trás.

### Determinação do concept de Iterator

A definição deste concept é especificada através de um alias template apenas para exposição /*ITER_CONCEPT*/.

Para determinar /*ITER_CONCEPT*/&lt;I&gt;, seja ITER_TRAITS&lt;I&gt; denotando I se a especialização [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; é gerada a partir do template primário, ou [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; caso contrário:

  * Se ITER_TRAITS&lt;I&gt;::iterator_concept é válido e nomeia um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
  * Caso contrário, se ITER_TRAITS&lt;I&gt;::iterator_category é válido e nomeia um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
  * Caso contrário, se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; é gerado a partir do template primário, /*ITER_CONCEPT*/&lt;I&gt; denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, /*ITER_CONCEPT*/&lt;I&gt; não denota um tipo e resulta em uma falha de substituição.

### Requisitos semânticos

Um iterator bidirecional `r` é dito ser _decrementável_ se e somente se existe algum `s` tal que ++s == r.

std::bidirectional_iterator&lt;I&gt; é modelado somente se todos os concepts que ele subsume são modelados, e dados dois objetos `a` e `b` do tipo `I`:

  * Se `a` é decrementável, `a` está no domínio das expressões \--a e a\--.
  * O pré-decremento produz um lvalue que se refere ao operando: [std::addressof](<#/doc/memory/addressof>)(\--a) == [std::addressof](<#/doc/memory/addressof>)(a).
  * O pós-decremento produz o valor anterior do operando: se bool(a == b), então bool(a\-- == b).
  * O pós-decremento e o pré-decremento realizam a mesma modificação em seu operando: Se bool(a == b), então após avaliar ambos a\-- e \--b, bool(a == b) ainda é verdadeiro.
  * Incremento e decremento são inversos um do outro:

  * Se `a` é incrementável e bool(a == b), então bool(\--(++a) == b).
  * Se `a` é decrementável e bool(a == b), então bool(++(\--a) == b).

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Notas

Ao contrário dos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), o concept `bidirectional_iterator` não exige que a desreferência retorne um lvalue.

### Exemplo

Um iterator bidirecional mínimo.
```cpp
    #include <cstddef>
    #include <iterator>
    
    struct SimpleBidiIterator
    {
        using difference_type = std::ptrdiff_t;
        using value_type = int;
    
        int operator*() const;
    
        SimpleBidiIterator& operator++();
    
        SimpleBidiIterator operator++(int)
        {
            auto tmp = *this;
            ++*this;
            return tmp;
        }
    
        SimpleBidiIterator& operator--();
    
        SimpleBidiIterator operator--(int)
        {
            auto tmp = *this;
            --*this;
            return tmp;
        }
    
        bool operator==(const SimpleBidiIterator&) const;
    };
    
    static_assert(std::bidirectional_iterator<SimpleBidiIterator>);
```

### Ver também

[ forward_iterator](<#/doc/iterator/forward_iterator>)(C++20) | especifica que um [`input_iterator`](<#/doc/iterator/input_iterator>) é um forward iterator, suportando comparação de igualdade e múltiplas passagens
(concept)
[ random_access_iterator](<#/doc/iterator/random_access_iterator>)(C++20) | especifica que um `bidirectional_iterator` é um random-access iterator, suportando avanço em tempo constante e indexação
(concept)