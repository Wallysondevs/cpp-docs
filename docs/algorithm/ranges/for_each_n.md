# std::ranges::for_each_n, std::ranges::for_each_n_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, class Proj = std::identity,
std::indirectly_unary_invocable<std::projected<I, Proj>> Fun >
constexpr for_each_n_result<I, Fun>
for_each_n( I first, std::iter_difference_t<I> n, Fun f, Proj proj = {});
Tipos auxiliares
template< class I, class F >
using for_each_n_result = ranges::in_fun_result<I, F>;
```

1) Aplica o objeto de função `f` fornecido ao resultado projetado por `proj` da desreferenciação de cada iterator no range `[`first`, `first + n`)`, em ordem.

Se o tipo do iterator for mutável, `f` pode modificar os elementos do range através do iterator desreferenciado. Se `f` retornar um resultado, o resultado é ignorado. Se `n` for menor que zero, o comportamento é indefinido.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de modelo não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parameters

- **first** — iterator que denota o início do range ao qual a função será aplicada
- **n** — o número de elementos aos quais a função será aplicada
- **f** — a função a ser aplicada ao range projetado `[`first`, `first + n`)`
- **proj** — projeção a ser aplicada aos elementos

### Return value

Um objeto `{first + n, std::move(f)}`, onde `first + n` pode ser avaliado como `std::[ranges::next](<#/doc/iterator/ranges/next>)(std::move(first), n)` dependendo da categoria do iterator.

### Complexity

Exatamente `n` aplicações de `f` e `proj`.

### Possible implementation
```cpp
    struct for_each_n_fn
    {
        template<std::input_iterator I, class Proj = std::identity,
                 std::indirectly_unary_invocable<std::projected<I, Proj>> Fun>
        constexpr for_each_n_result<I, Fun>
            operator()(I first, std::iter_difference_t<I> n, Fun fun, Proj proj = Proj{}) const
        {
            for (; n-- > 0; ++first)
                std::invoke(fun, std::invoke(proj, *first));
            return {std::move(first), std::move(fun)};
        }
    };
    
    inline constexpr for_each_n_fn for_each_n {};
```

### Example

Run this code
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    struct P
    {
        int first;
        char second;
        friend std::ostream& operator<<(std::ostream& os, const P& p)
        {
            return os << '{' << p.first << ",'" << p.second << "'}";
        }
    };
    
    auto print =  name, auto const& v)
    {
        std::cout << name << ": ";
        for (auto n = v.size(); const auto& e : v)
            std::cout << e << (--n ? ", " : "\n");
    };
    
    int main()
    {
        std::array a {1, 2, 3, 4, 5};
        print("a", a);
        // Negate first three numbers:
        std::ranges::for_each_n(a.begin(), 3,  { n *= -1; });
        print("a", a);
    
        std::array s { P{1,'a'}, P{2, 'b'}, P{3, 'c'}, P{4, 'd'} };
        print("s", s);
        // Negate data members 'P::first' using projection:
        std::ranges::for_each_n(s.begin(), 2,  { x *= -1; }, &P::first);
        print("s", s);
        // Capitalize data members 'P::second' using projection:
        std::ranges::for_each_n(s.begin(), 3,  { c -= 'a'-'A'; }, &P::second);
        print("s", s);
    }
```

Output:
```
    a: 1, 2, 3, 4, 5
    a: -1, -2, -3, 4, 5
    s: {1,'a'}, {2,'b'}, {3,'c'}, {4,'d'}
    s: {-1,'a'}, {-2,'b'}, {3,'c'}, {4,'d'}
    s: {-1,'A'}, {-2,'B'}, {3,'C'}, {4,'d'}
```

### See also

[ range-`for` loop](<#/doc/language/range-for>)(C++11) | executa loop sobre range
---|---
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(objeto de função de algoritmo)
[ for_each_n](<#/doc/algorithm/for_each_n>)(C++17) | aplica um objeto de função aos primeiros N elementos de uma sequência
(modelo de função)
[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos
(modelo de função)