# std::ranges::includes

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
class Proj1 = std::identity, class Proj2 = std::identity,
std::indirect_strict_weak_order<
std::projected<I1, Proj1>,
std::projected<I2, Proj2>> Comp = ranges::less >
constexpr bool
includes( I1 first1, S1 last1, I2 first2, S2 last2,
Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {} )
template< ranges::input_range R1, ranges::input_range R2,
class Proj1 = std::identity, class Proj2 = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R1>, Proj1>,
std::projected<ranges::iterator_t<R2>, Proj2>> Comp = ranges::less >
constexpr bool
includes( R1&& r1, R2&& r2, Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {} )
```

1) Retorna true se as projeções do range ordenado `[`first2`, `last2`)` são uma [subsequência](<https://en.wikipedia.org/wiki/subsequence> "enwiki:subsequence") das projeções do range ordenado `[`first1`, `last1`)`.

2) O mesmo que (1), mas usa r1 e r2 como os ranges de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) e [ranges::begin](<#/doc/ranges/begin>)(r2) como first1 e first2 respectivamente, e [ranges::end](<#/doc/ranges/end>)(r1) e [ranges::end](<#/doc/ranges/end>)(r2) como last1 e last2 respectivamente.

Ambos os ranges devem estar ordenados com a função de comparação `comp` fornecida. Uma subsequência não precisa ser contígua.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — o range ordenado de elementos a examinar
- **r1** — o range ordenado de elementos a examinar
- **first2, last2** — o range ordenado de elementos a procurar
- **r2** — o range ordenado de elementos a procurar
- **comp** — função de comparação a aplicar aos elementos projetados
- **proj1** — projeção a aplicar aos elementos no primeiro range
- **proj2** — projeção a aplicar aos elementos no segundo range

### Valor de retorno

true se `[`first2`, `last2`)` é uma subsequência de `[`first1`, `last1`)`; caso contrário, false.

### Complexidade

No máximo \\(\scriptsize 2 \cdot (N_1+N_2-1)\\)2·(N1+N2-1) comparações, onde \\(\scriptsize N_1\\)N1 é [ranges::distance](<#/doc/iterator/ranges/distance>)(r1) e \\(\scriptsize N_2\\)N2 é [ranges::distance](<#/doc/iterator/ranges/distance>)(r2).

### Possível implementação
```cpp
    struct includes_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 class Proj1 = std::identity, class Proj2 = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<I1, Proj1>,
                     std::projected<I2, Proj2>> Comp = ranges::less>
        constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                                  Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            for (; first2 != last2; ++first1)
            {
                if (first1 == last1 || comp(*first2, *first1))
                    return false;
                if (!comp(*first1, *first2))
                    ++first2;
            }
            return true;
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 class Proj1 = std::identity, class Proj2 = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R1>, Proj1>,
                     std::projected<ranges::iterator_t<R2>, Proj2>> Comp = ranges::less>
        constexpr bool operator()(R1&& r1, R2&& r2, Comp comp = {},
                                  Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::ref(comp), std::ref(proj1), std::ref(proj2));
        }
    };
    
    inline constexpr auto includes = includes_fn {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <initializer_list>
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <string>
    
    template<class T>
    std::ostream& operator<<(std::ostream& os, std::initializer_list<T> const& list)
    {
        for (os << "{ "; auto const& elem : list)
            os << elem << ' ';
        return os << "} ";
    }
    
    struct true_false : std::numpunct<char>
    {
        std::string do_truename() const { return "? Yes\n"; }
        std::string do_falsename() const { return "? No\n"; }
    };
    
    int main()
    {
        std::cout.imbue(std::locale(std::cout.getloc(), new true_false));
    
        auto ignore_case =  { return std::tolower(a) < std::tolower(b); };
    
        const auto
            a = {'a', 'b', 'c'},
            b = {'a', 'c'},
            c = {'a', 'a', 'b'},
            d = {'g'},
            e = {'a', 'c', 'g'},
            f = {'A', 'B', 'C'},
            z = {'a', 'b', 'c', 'f', 'h', 'x'};
    
        std::cout
            << z << "includes\n" << std::boolalpha
            << a << std::ranges::includes(z.begin(), z.end(), a.begin(), a.end())
            << b << std::ranges::includes(z, b)
            << c << std::ranges::includes(z, c)
            << d << std::ranges::includes(z, d)
            << e << std::ranges::includes(z, e)
            << f << std::ranges::includes(z, f, ignore_case);
    }
```

Saída:
```
    { a b c f h x } includes
    { a b c } ? Yes
    { a c } ? Yes
    { a a b } ? No
    { g } ? No
    { a c g } ? No
    { A B C } ? Yes
```

### Veja também

[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou subrange dado
(objeto de função de algoritmo)
[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(modelo de função)