# std::ranges::min

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< class T, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<const T*, Proj>> Comp = ranges::less >
constexpr const T&
min( const T& a, const T& b, Comp comp = {}, Proj proj = {} );
template< std::copyable T, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<const T*, Proj>> Comp = ranges::less >
constexpr T
min( std::initializer_list<T> r, Comp comp = {}, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
requires std::indirectly_copyable_storable<ranges::iterator_t<R>,
ranges::range_value_t<R>*>
constexpr ranges::range_value_t<R>
min( R&& r, Comp comp = {}, Proj proj = {} );
```

Retorna o menor dos elementos projetados fornecidos.

1) Retorna o menor entre a e b.

2) Retorna o primeiro menor elemento na initializer list r.

3) Retorna o primeiro menor valor no range r.

As entidades tipo função descritas nesta página são _objetos de função de algoritmo_ (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para argument-dependent lookup.
*   Quando qualquer um deles é encontrado por normal unqualified lookup como o nome à esquerda do operador de chamada de função, argument-dependent lookup é inibido.

### Parâmetros

- **a, b** — os valores a comparar
- **r** — o range de valores a comparar
- **comp** — comparação a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

1) O menor entre a e b, de acordo com a projeção. Se forem equivalentes, retorna a.

2,3) O menor elemento em r, de acordo com a projeção. Se vários valores forem equivalentes ao menor, retorna o mais à esquerda. Se o range estiver vazio (conforme determinado por [ranges::distance](<#/doc/iterator/ranges/distance>)(r)), o comportamento é indefinido.

### Complexidade

1) Exatamente uma comparação.

2,3) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(r) - 1 comparações.

### Possível implementação
```cpp
    struct min_fn
    {
        template<class T, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<const T*, Proj>> Comp = ranges::less>
        constexpr
        const T& operator()(const T& a, const T& b, Comp comp = {}, Proj proj = {}) const
        {
            return std::invoke(comp, std::invoke(proj, b), std::invoke(proj, a)) ? b : a;
        }
    
        template<std::copyable T, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<const T*, Proj>> Comp = ranges::less>
        constexpr
        T operator()(std::initializer_list<T> r, Comp comp = {}, Proj proj = {}) const
        {
            return *ranges::min_element(r, std::ref(comp), std::ref(proj));
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                      std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        requires std::indirectly_copyable_storable<ranges::iterator_t<R>,
                                                   ranges::range_value_t<R>*>
        constexpr
        ranges::range_value_t<R> operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            using V = ranges::range_value_t<R>;
            if constexpr (ranges::forward_range<R>)
                return
                    static_cast<V>(*ranges::min_element(r, std::ref(comp), std::ref(proj)));
            else
            {
                auto i = ranges::begin(r);
                auto s = ranges::end(r);
                V m(*i);
                while (++i != s)
                    if (std::invoke(comp, std::invoke(proj, *i), std::invoke(proj, m)))
                        m = *i;
                return m;
            }
        }
    };
    
    inline constexpr min_fn min;
```

---

### Notas

Capturar o resultado de `std::ranges::min` por referência produz uma referência pendente (dangling reference) se um dos parâmetros for um temporário e esse parâmetro for retornado:
```cpp
    int n = -1;
    const int& r = std::ranges::min(n + 2, n * 2); // r is dangling
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    int main()
    {
        namespace ranges = std::ranges;
        using namespace std::string_view_literals;
    
        std::cout << "smaller of 1 and 9999: " << ranges::min(1, 9999) << '\n'
                  << "smaller of 'a', and 'b': '" << ranges::min('a', 'b') << "'\n"
                  << "shortest of \"foo\", \"bar\", and \"hello\": \""
                  << ranges::min({"foo"sv, "bar"sv, "hello"sv}, {},
                                 &std::string_view::size) << "\"\n";
    }
```

Saída:
```
    smaller of 1 and 9999: 1
    smaller of 'a', and 'b': 'a'
    shortest of "foo", "bar", and "hello": "foo"
```

### Ver também

[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores fornecidos
(objeto de função de algoritmo)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(objeto de função de algoritmo)
[ ranges::min_element](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(objeto de função de algoritmo)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)
[ min](<#/doc/algorithm/min>) | retorna o menor dos valores fornecidos
(modelo de função)