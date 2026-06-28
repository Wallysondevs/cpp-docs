# std::random_access_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
concept random_access_iterator =
std::bidirectional_iterator<I> &&
std::derived_from</*ITER_CONCEPT*/<I>, std::random_access_iterator_tag> &&
std::totally_ordered<I> &&
std::sized_sentinel_for<I, I> &&
requires(I i, const I j, const std::iter_difference_t<I> n) {
{ i += n } -> std::same_as<I&>;
{ j + n } -> std::same_as<I>;
{ n + j } -> std::same_as<I>;
{ i -= n } -> std::same_as<I&>;
{ j - n } -> std::same_as<I>;
{ j[n] } -> std::same_as<std::iter_reference_t<I>>;
};
```

O concept `random_access_iterator` refina [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) adicionando suporte para avanço em tempo constante com os operadores `+=`, `+`, `-=` e `-`, cálculo de distância em tempo constante com `-`, e notação de array com indexação `[]`.

### Determinação do concept de Iterator

A definição deste concept é especificada através de um alias template apenas para exposição /*ITER_CONCEPT*/.

Para determinar /*ITER_CONCEPT*/&lt;I&gt;, seja ITER_TRAITS&lt;I&gt; denotando I se a especialização [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerada a partir do template primário, ou [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; caso contrário:

*   Se ITER_TRAITS&lt;I&gt;::iterator_concept for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
*   Caso contrário, se ITER_TRAITS&lt;I&gt;::iterator_category for válido e nomear um tipo, /*ITER_CONCEPT*/&lt;I&gt; denota o tipo.
*   Caso contrário, se [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;I&gt; for gerado a partir do template primário, /*ITER_CONCEPT*/&lt;I&gt; denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>).
*   Caso contrário, /*ITER_CONCEPT*/&lt;I&gt; não denota um tipo e resulta em uma falha de substituição.

### Requisitos semânticos

Sejam a e b iterators válidos do tipo `I` tal que b é alcançável a partir de a, e seja n um valor do tipo [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt; igual a b - a. std::random_access_iterator&lt;I&gt; é modelado apenas se todos os concepts que ele subsume forem modelados e:

*   (a += n) é igual a b.
*   [std::addressof](<#/doc/memory/addressof>)(a += n) é igual a [std::addressof](<#/doc/memory/addressof>)(a). [1](<#/doc/iterator/random_access_iterator>)
*   (a + n) é igual a (a += n).
*   (a + n) é igual a (n + a).
*   Para quaisquer dois inteiros positivos `x` e `y`, se a + (x + y) for válido, então a + (x + y) é igual a (a + x) + y.
*   a + 0 é igual a a.
*   Se (a + (n - 1)) for válido, então \--b é igual a (a + (n - 1)).
*   (b += -n) e (b -= n) são ambos iguais a a.
*   [std::addressof](<#/doc/memory/addressof>)(b -= n) é igual a [std::addressof](<#/doc/memory/addressof>)(b). [1](<#/doc/iterator/random_access_iterator>)
*   (b - n) é igual a (b -= n).
*   Se b for desreferenciável, então a[n] é válido e é igual a *b.
*   bool(a <= b) é verdadeiro.
*   Cada operação requerida tem complexidade de tempo constante.

Note que [std::addressof](<#/doc/memory/addressof>) retorna o endereço do objeto iterator, não o endereço do objeto para o qual o iterator aponta. Ou seja, `operator+=` e `operator-=` devem retornar uma referência para *this.

### Preservação da igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas para serem [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Variações de expressão implícitas

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão não modificadora para algum operando lvalue constante também requer [implicit expression variations](<#/doc/concepts>).

### Notas

Ao contrário dos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o concept `random_access_iterator` não exige que a desreferência retorne um lvalue.

### Exemplo

Demonstra uma possível implementação de [std::distance](<#/doc/iterator/distance>) via concepts do C++20.

Execute este código
```cpp
    #include <iterator>
    
    namespace cxx20
    {
        template<std::input_or_output_iterator Iter>
        constexpr std::iter_difference_t<Iter> distance(Iter first, Iter last)
        {
            if constexpr(std::random_access_iterator<Iter>)
                return last - first;
            else
            {
                std::iter_difference_t<Iter> result{};
                for (; first != last; ++first)
                    ++result;
                return result;
            }
        }
    }
    
    int main()
    {
        static constexpr auto il = {3, 1, 4};
    
        static_assert(std::random_access_iterator<decltype(il.begin())> &&
                      cxx20::distance(il.begin(), il.end()) == 3 &&
                      cxx20::distance(il.end(), il.begin()) == -3);
    }
```

### Veja também

[ bidirectional_iterator](<#/doc/iterator/bidirectional_iterator>)(C++20) | especifica que um [`forward_iterator`](<#/doc/iterator/forward_iterator>) é um iterator bidirecional, suportando movimento para trás
(concept)
[ contiguous_iterator](<#/doc/iterator/contiguous_iterator>)(C++20) | especifica que um `random_access_iterator` é um iterator contíguo, referindo-se a elementos que são contíguos na memória
(concept)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão