# std::ranges::max

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< class T, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<const T*, Proj>> Comp = ranges::less >
constexpr const T&
max( const T& a, const T& b, Comp comp = {}, Proj proj = {} );
template< std::copyable T, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<const T*, Proj>> Comp = ranges::less >
constexpr T
max( std::initializer_list<T> r, Comp comp = {}, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
requires std::indirectly_copyable_storable<ranges::iterator_t<R>,
ranges::range_value_t<R>*>
constexpr ranges::range_value_t<R>
max( R&& r, Comp comp = {}, Proj proj = {} );
```

Retorna o maior dos valores projetados fornecidos.

1) Retorna o maior entre a e b.

2) Retorna o primeiro maior valor na initializer list r.

3) Retorna o primeiro maior valor no range r.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **a, b** — os valores a comparar
- **r** — o range de valores a comparar
- **comp** — comparação a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

1) O maior entre a e b, de acordo com seus respectivos valores projetados. Se forem equivalentes, retorna a.

2,3) O maior valor em r, de acordo com a projeção. Se vários valores forem equivalentes ao maior, retorna o mais à esquerda. Se o range estiver vazio (conforme determinado por [ranges::distance](<#/doc/iterator/ranges/distance>)(r)), o comportamento é indefinido.

### Complexidade

1) Exatamente uma comparação.

2,3) Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(r) - 1 comparações.

### Possível implementação
```cpp
    struct max_fn
    {
        template<class T, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<const T*, Proj>> Comp = ranges::less>
        constexpr
        const T& operator()(const T& a, const T& b, Comp comp = {}, Proj proj = {}) const
        {
            return std::invoke(comp, std::invoke(proj, a), std::invoke(proj, b)) ? b : a;
        }
    
        template<std::copyable T, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<const T*, Proj>> Comp = ranges::less>
        constexpr
        T operator()(std::initializer_list<T> r, Comp comp = {}, Proj proj = {}) const
        {
            return *ranges::max_element(r, std::ref(comp), std::ref(proj));
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
                    static_cast<V>(*ranges::max_element(r, std::ref(comp), std::ref(proj)));
            else
            {
                auto i = ranges::begin(r);
                auto s = ranges::end(r);
                V m(*i);
                while (++i != s)
                    if (std::invoke(comp, std::invoke(proj, m), std::invoke(proj, *i)))
                        m = *i;
                return m;
            }
        }
    };
    
    inline constexpr max_fn max;
```

---

### Notas

Capturar o resultado de `std::ranges::max` por referência produz uma referência pendente (dangling reference) se um dos parâmetros for um temporário e esse parâmetro for retornado:
```cpp
    int n = -1;
    const int& r = std::ranges::max(n + 2, n * 2); // r is dangling
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    static_assert(std::ranges::max({0B10, 0X10, 010, 10}) == 16); // overload (2)
    
    int main()
    {
        namespace ranges = std::ranges;
        using namespace std::string_view_literals;
    
        std::cout << "larger of 1 and 9999: " << ranges::max(1, 9999) << '\n'
                  << "larger of 'a', and 'b': '" << ranges::max('a', 'b') << "'\n"
                  << "longest of \"foo\", \"bar\", and \"hello\": \""
                  << ranges::max({"foo"sv, "bar"sv, "hello"sv}, {},
                                 &std::string_view::size) << "\"\n";
    }
```

Saída:
```
    larger of 1 and 9999: 9999
    larger of 'a', and 'b': 'b'
    longest of "foo", "bar", and "hello": "hello"
```

### Veja também

[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores fornecidos
(objeto de função de algoritmo)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(objeto de função de algoritmo)
[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)
[ max](<#/doc/algorithm/max>) | retorna o maior dos valores fornecidos
(modelo de função)