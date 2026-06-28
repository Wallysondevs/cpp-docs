# std::lexicographical_compare_three_way

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2, class Cmp >
constexpr auto lexicographical_compare_three_way
( InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2,
Cmp comp ) -> decltype(comp(*first1, *first2));
template< class InputIt1, class InputIt2 >
constexpr auto lexicographical_compare_three_way
( InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2 );
```

Compara lexicograficamente dois ranges `[`first1`, `last1`)` e `[`first2`, `last2`)` usando comparação de três vias e produz um resultado do tipo de categoria de comparação mais forte aplicável.

1) Retorna a ordem entre o primeiro par de elementos não equivalentes de acordo com `comp` em ambos os ranges, se houver; caso contrário (se um range for equivalente ao prefixo de outro de acordo com `comp`), retorna a ordem entre os comprimentos de ambos os ranges.

2) Equivalente a retornar std::lexicographical_compare_three_way(
first1, last1, first2, last2, [std::compare_three_way](<#/doc/utility/compare/compare_three_way>)());

Se o tipo de retorno não for um dos três tipos de categoria de comparação, o programa é malformado:

*   [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>)
*   [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>)
*   [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>)

### Parâmetros

- **first1, last1** — o primeiro range de elementos a examinar
- **first2, last2** — o segundo range de elementos a examinar
- **comp** — um objeto de função
Requisitos de tipo
-`InputIt1, InputIt2` devem atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

O valor de um tipo de categoria de comparação especificado acima.

### Complexidade

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1) No máximo \\(\scriptsize \min(N_1,N_2)\\)min(1,N2) aplicações de `comp`.

2) No máximo \\(\scriptsize \min(N_1,N_2)\\)min(N1,N2) aplicações de [std::compare_three_way](<#/doc/utility/compare/compare_three_way>)().

### Possível implementação
```cpp
    template<class I1, class I2, class Cmp>
    constexpr auto lexicographical_compare_three_way(I1 f1, I1 l1, I2 f2, I2 l2, Cmp comp)
        -> decltype(comp(*f1, *f2))
    {
        using ret_t = decltype(comp(*f1, *f2));
        static_assert(std::disjunction_v<
                          std::is_same<ret_t, std::strong_ordering>,
                          std::is_same<ret_t, std::weak_ordering>,
                          std::is_same<ret_t, std::partial_ordering>>,
                      "The return type must be a comparison category type.");
    
        bool exhaust1 = (f1 == l1);
        bool exhaust2 = (f2 == l2);
        for (; !exhaust1 && !exhaust2; exhaust1 = (++f1 == l1), exhaust2 = (++f2 == l2))
            if (auto c = comp(*f1, *f2); c != 0)
                return c;
    
        return !exhaust1 ? std::strong_ordering::greater:
               !exhaust2 ? std::strong_ordering::less:
                           std::strong_ordering::equal;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <compare>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    #include <utility>
    
    using namespace std::literals;
    
    void show_result(std::string_view s1, std::string_view s2, std::strong_ordering o)
    {
        std::cout << std::quoted(s1) << " is ";
        std::is_lt(o) ? std::cout << "less than ":
        std::is_gt(o) ? std::cout << "greater than ":
                        std::cout << "equal to ";
        std::cout << std::quoted(s2) << '\n';
    }
    
    std::strong_ordering cmp_icase(unsigned char x, unsigned char y)
    {
        return std::toupper(x) <=> std::toupper(y);
    };
    
    int main()
    {
        for (const auto& [s1, s2] :
        {
            std::pair{"one"sv, "ONE"sv}, {"two"sv, "four"sv}, {"three"sv, "two"sv}
        })
        {
            const auto res = std::lexicographical_compare_three_way(
                s1.cbegin(), s1.cend(), s2.cbegin(), s2.cend(), cmp_icase);
            show_result(s1, s2, res);
        }
    }
```

Saída:
```
    "one" is equal to "ONE"
    "two" is greater than "four"
    "three" is less than "two"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3410](<https://cplusplus.github.io/LWG/issue3410>) | C++20 | comparações extras entre iteradores eram exigidas | tal requisito removido

### Veja também

[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna verdadeiro se um range for lexicograficamente menor que outro
(function template)
[ compare_three_way](<#/doc/utility/compare/compare_three_way>)(C++20) | objeto de função restrito que implementa x <=> y
(class)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna verdadeiro se um range for lexicograficamente menor que outro
(algorithm function object)