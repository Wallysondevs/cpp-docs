# std::experimental::ranges::all_of, std::experimental::ranges::any_of, std::experimental::ranges::none_of

Definido no cabeçalho `[<experimental/ranges/algorithm>](<#/doc/header/experimental/ranges/algorithm>)`

```c
template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
bool all_of( I first, S last, Pred pred, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
bool all_of( R&& r, Pred pred, Proj proj = Proj{} );
template< InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
bool any_of( I first, S last, Pred pred, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
bool any_of( R&& r, Pred pred, Proj proj = Proj{} );
template< InputIterator I, Sentinel<I> S, class Proj = identity,
IndirectUnaryPredicate<projected<I, Proj>> Pred >
bool none_of( I first, S last, Pred pred, Proj proj = Proj{} );
template< InputRange R, class Proj = ranges::identity,
IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred >
bool none_of( R&& r, Pred pred, Proj proj = Proj{} );
```

1) Verifica se o predicado unário pred retorna true para todos os elementos no range `[`first`, `last`)`.

3) Verifica se o predicado unário pred retorna true para pelo menos um elemento no range `[`first`, `last`)`.

5) Verifica se o predicado unário pred retorna true para nenhum elemento no range `[`first`, `last`)`.

2,4,6) O mesmo que (1,3,5), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

Não obstante as declarações acima, o número e a ordem reais dos parâmetros de template para as declarações de algoritmo não são especificados. Assim, se argumentos de template explícitos forem usados ao chamar um algoritmo, o programa é provavelmente não-portável.

### Parâmetros

- **first, last** — o range dos elementos a serem examinados
- **r** — o range dos elementos a serem examinados
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1,2) true se pred retornar true para todos os elementos no range, false caso contrário. Retorna true se o range estiver vazio.

3,4) true se pred retornar true para pelo menos um elemento no range, false caso contrário. Retorna false se o range estiver vazio.

5,6) true se pred retornar true para nenhum elemento no range, false caso contrário. Retorna true se o range estiver vazio.

### Complexidade

1-6) No máximo last - first aplicações do predicado e last - first aplicações da projeção.

### Possível implementação

Primeira versão
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
    bool all_of(I first, S last, Pred pred, Proj proj = Proj{})
    {
        return ranges::find_if_not(first, last, std::ref(pred), std::ref(proj)) == last;
    }
    
    template<InputRange R, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred>
    bool all_of(R&& r, Pred pred, Proj proj = Proj{})
    {
        return ranges::all_of(ranges::begin(r), ranges::end(r),
                              std::ref(pred), std::ref(proj));
    }
```

Segunda versão
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
    bool any_of(I first, S last, Pred pred, Proj proj = Proj{})
    {
        return ranges::find_if(first, last, std::ref(pred), std::ref(proj)) != last;
    }
    
    template<InputRange R, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred>
    bool any_of(R&& r, Pred pred, Proj proj = Proj{})
    {
        return ranges::any_of(ranges::begin(r), ranges::end(r),
                              std::ref(pred), std::ref(proj));
    }
```

Terceira versão
```cpp
    template<InputIterator I, Sentinel<I> S, class Proj = identity,
             IndirectUnaryPredicate<projected<I, Proj>> Pred>
    bool none_of(I first, S last, Pred pred, Proj proj = Proj{})
    {
        return ranges::find_if(first, last, std::ref(pred), std::ref(proj)) == last;
    }
    
    template<InputRange R, class Proj = ranges::identity,
             IndirectUnaryPredicate<projected<ranges::iterator_t<R>, Proj>> Pred>
    bool none_of(R&& r, Pred pred, Proj proj = Proj{})
    {
        return ranges::none_of(ranges::begin(r), ranges::end(r),
                               std::ref(pred), std::ref(proj));
    }
```

### Exemplo

Execute este código
```cpp
    #include <experimental/ranges/algorithm>
    #include <experimental/ranges/iterator>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    namespace ranges = std::experimental::ranges;
    
    int main()
    {
        std::vector<int> v(10, 2);
        std::partial_sum(v.cbegin(), v.cend(), v.begin());
        std::cout << "Among the numbers: ";
        ranges::copy(v, ranges::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        if (ranges::all_of(v.cbegin(), v.cend(),  { return i % 2 == 0; }))
            std::cout << "All numbers are even\n";
        if (ranges::none_of(v, std::bind(std::modulus<int>(), std::placeholders::_1, 2)))
            std::cout << "None of them are odd\n";
    
        struct DivisibleBy
        {
            const int d;
            DivisibleBy(int n) : d(n) {}
            bool operator()(int n) const { return n % d == 0; }
        };
    
        if (ranges::any_of(v, DivisibleBy(7)))
            std::cout << "At least one number is divisible by 7\n";
    }
```

Saída:
```
    Among the numbers: 2 4 6 8 10 12 14 16 18 20 
    All numbers are even
    None of them are odd
    At least one number is divisible by 7
```

### Ver também

[ all_ofany_ofnone_of](<#/doc/algorithm/all_any_none_of>)(C++11)(C++11)(C++11) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(modelo de função)