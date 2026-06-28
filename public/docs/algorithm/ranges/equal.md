# std::ranges::equal

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
constexpr bool
equal( I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
class Pred = ranges::equal_to,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::indirectly_comparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
Pred, Proj1, Proj2>
constexpr bool
equal( R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );
```

1) Retorna true se os valores projetados do range `[`first1`, `last1`)` forem iguais aos valores projetados do range `[`first2`, `last2`)`, e false caso contrário.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

Dois ranges são considerados iguais se tiverem o mesmo número de elementos e cada par de elementos projetados correspondentes satisfizer pred. Ou seja, [std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj1, *first1), [std::invoke](<#/doc/utility/functional/invoke>)(proj2, *first2)) retorna true para todos os pares de elementos correspondentes em ambos os ranges.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first1, last1** — um par iterador-sentinela denotando o primeiro range de elementos a comparar
- **r1** — o primeiro range de elementos a comparar
- **first2, last2** — um par iterador-sentinela denotando o segundo range de elementos a comparar
- **r2** — o segundo range de elementos a comparar
- **pred** — predicado a aplicar aos elementos projetados
- **proj1** — projeção a aplicar ao primeiro range de elementos
- **proj2** — projeção a aplicar ao segundo range de elementos

### Valor de retorno

Se o comprimento do range `[`first1`, `last1`)` não for igual ao comprimento do range `[`first2`, `last2`)`, retorna false.

Se os elementos nos dois ranges forem iguais após a projeção, retorna true.

Caso contrário, retorna false.

### Observações

`ranges::equal` não deve ser usado para comparar os ranges formados pelos iteradores de [std::unordered_set](<#/doc/container/unordered_set>), [std::unordered_multiset](<#/doc/container/unordered_multiset>), [std::unordered_map](<#/doc/container/unordered_map>), ou [std::unordered_multimap](<#/doc/container/unordered_multimap>) porque a ordem em que os elementos são armazenados nesses containers pode ser diferente mesmo que os dois containers armazenem os mesmos elementos.

Ao comparar containers inteiros ou string views para igualdade, o operator== para o tipo correspondente é geralmente preferido.

`ranges::equal` não tem garantia de ser short-circuit. Por exemplo, se o primeiro par de elementos de ambos os ranges não for igual, o restante dos elementos também pode ser comparado. A comparação não short-circuit pode ocorrer quando os ranges são comparados com [std::memcmp](<#/doc/string/byte/memcmp>) ou algoritmos vetorizados específicos da implementação.

### Complexidade

No máximo min(last1 - first1, last2 - first2) aplicações do predicado e projeções correspondentes.

No entanto, se S1 e S2 ambos modelarem [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>) seus respectivos iteradores, e last1 - first1 != last2 - first2, então nenhuma aplicação do predicado é feita (a incompatibilidade de tamanho é detectada sem olhar para nenhum elemento).

### Possível implementação
```cpp
    struct equal_fn
    {
      template<std::input_iterator I1, std::sentinel_for<I1> S1,
               std::input_iterator I2, std::sentinel_for<I2> S2,
               class Pred = ranges::equal_to,
               class Proj1 = std::identity, class Proj2 = std::identity>
      requires std::indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
      constexpr bool
          operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                     Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
      {
          if constexpr (std::sized_sentinel_for<S1, I1> and std::sized_sentinel_for<S2, I2>)
              if (std::ranges::distance(first1, last1) != std::ranges::distance(first2, last2))
                  return false;
    
          for (; first1 != last1; ++first1, (void)++first2)
              if (!std::invoke(pred, std::invoke(proj1, *first1), std::invoke(proj2, *first2)))
                  return false;
          return true;
      }
    
      template<ranges::input_range R1, ranges::input_range R2,
               class Pred = ranges::equal_to,
               class Proj1 = std::identity, class Proj2 = std::identity>
      requires std::indirectly_comparable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                          Pred, Proj1, Proj2>
      constexpr bool
          operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
      {
          return (*this)(ranges::begin(r1), ranges::end(r1),
                         ranges::begin(r2), ranges::end(r2),
                         std::ref(pred), std::ref(proj1), std::ref(proj2));
      }
    };
    
    inline constexpr equal_fn equal;
```

---

### Exemplo

O código a seguir usa **ranges::equal** para testar se uma string é um palíndromo.

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    
    constexpr bool is_palindrome(const std::string_view s)
    {
        namespace views = std::views;
        auto forward = s | views::take(s.size() / 2);
        auto backward = s | views::reverse | views::take(s.size() / 2);
        return std::ranges::equal(forward, backward);
    }
    
    void test(const std::string_view s)
    {
        std::cout << std::quoted(s) << " is "
                  << (is_palindrome(s) ? "" : "not ")
                  << "a palindrome\n";
    }
    
    int main()
    {
        test("radar");
        test("hello");
        static_assert(is_palindrome("ABBA") and not is_palindrome("AC/DC"));
    }
```

Saída:
```
    "radar" is a palindrome
    "hello" is not a palindrome
```

### Ver também

[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna true se um range for lexicograficamente menor que outro
(objeto de função de algoritmo)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna um range de elementos que correspondem a uma chave específica
(objeto de função de algoritmo)
[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(modelo de classe)
[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)