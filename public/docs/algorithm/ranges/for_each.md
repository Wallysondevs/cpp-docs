# std::ranges::for_each, std::ranges::for_each_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirectly_unary_invocable<std::projected<I, Proj>> Fun >
constexpr for_each_result<I, Fun>
for_each( I first, S last, Fun f, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirectly_unary_invocable<
std::projected<ranges::iterator_t<R>, Proj>> Fun >
constexpr for_each_result<ranges::borrowed_iterator_t<R>, Fun>
for_each( R&& r, Fun f, Proj proj = {} );
Tipos auxiliares
template< class I, class F >
using for_each_result = ranges::in_fun_result<I, F>;
```

1) Aplica o `function object` `f` fornecido ao resultado do valor projetado por cada iterador no range `[`first`, `last`)`, em ordem.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

Para ambas as sobrecargas, se o tipo do iterador for mutável, `f` pode modificar os elementos do range através do iterador desreferenciado. Se `f` retornar um resultado, o resultado é ignorado.

As entidades tipo-função descritas nesta página são _algorithm function objects_ (informalmente conhecidas como _niebloids_), ou seja:

*   Listas explícitas de argumentos de modelo não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — par iterador-sentinela denotando o range ao qual aplicar a função
- **r** — o range de elementos ao qual aplicar a função
- **f** — a função a ser aplicada ao range projetado
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

{std::[ranges::next](<#/doc/iterator/ranges/next>)(std::move(first), last), std::move(f)}

### Complexidade

Exatamente `last - first` aplicações de `f` e `proj`.

### Possível implementação
```cpp
    struct for_each_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirectly_unary_invocable<std::projected<I, Proj>> Fun>
        constexpr ranges::for_each_result<I, Fun>
            operator()(I first, S last, Fun f, Proj proj = {}) const
        {
            for (; first != last; ++first)
                std::invoke(f, std::invoke(proj, *first));
            return {std::move(first), std::move(f)};
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirectly_unary_invocable<std::projected<ranges::iterator_t<R>,
                 Proj>> Fun>
        constexpr ranges::for_each_result<ranges::borrowed_iterator_t<R>, Fun>
            operator()(R&& r, Fun f, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(f), std::ref(proj));
        }
    };
    
    inline constexpr for_each_fn for_each;
```

---

### Exemplo

O exemplo a seguir usa uma [expressão lambda](<#/doc/language/lambda>) para incrementar todos os elementos de um vetor e, em seguida, usa um `operator()` sobrecarregado em um functor para calcular sua soma. Observe que para calcular a soma, é recomendado usar o algoritmo dedicado [std::accumulate](<#/doc/algorithm/accumulate>).

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <utility>
    #include <vector>
    
    struct Sum
    {
        void operator()(int n) { sum += n; }
        int sum {0};
    };
    
    int main()
    {
        std::vector<int> nums {3, 4, 2, 8, 15, 267};
    
        auto print =  { std::cout << ' ' << n; };
    
        namespace ranges = std::ranges;
        std::cout << "before:";
        ranges::for_each(std::as_const(nums), print);
        print('\n');
    
        ranges::for_each(nums,  { ++n; });
    
        // calls Sum::operator() for each number
        auto [i, s] = ranges::for_each(nums.begin(), nums.end(), Sum());
        assert(i == nums.end());
    
        std::cout << "after: ";
        ranges::for_each(nums.cbegin(), nums.cend(), print);
    
        std::cout << "\n" "sum: " << s.sum << '\n';
    
        using pair = std::pair<int, std::string>; 
        std::vector<pair> pairs {{1,"one"}, {2,"two"}, {3,"tree"}};
    
        std::cout << "project the pair::first: ";
        ranges::for_each(pairs, print,  { return p.first; });
    
        std::cout << "\n" "project the pair::second:";
        ranges::for_each(pairs, print, &pair::second);
        print('\n');
    }
```

Saída:
```
    before: 3 4 2 8 15 267 
    after:  4 5 3 9 16 268
    sum: 305
    project the pair::first:  1 2 3
    project the pair::second: one two tree
```

### Veja também

[ loop `for` baseado em range](<#/doc/language/range-for>)(C++11) | executa loop sobre range
---|---
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(algorithm function object)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um function object aos primeiros N elementos de uma sequência
(algorithm function object)
[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos
(modelo de função)