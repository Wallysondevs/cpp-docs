# std::binary_search

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class T >
bool binary_search( ForwardIt first, ForwardIt last,
const T& value );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr bool binary_search( ForwardIt first, ForwardIt last,
const T& value );
template< class ForwardIt, class T, class Compare >
bool binary_search( ForwardIt first, ForwardIt last,
const T& value, Compare comp );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type,
class Compare >
constexpr bool binary_search( ForwardIt first, ForwardIt last,
const T& value, Compare comp );
```

Verifica se um elemento equivalente a `value` aparece dentro do range particionado `[`first`, `last`)`.

1) A equivalência é verificada usando `operator<`: Se `!bool(*iter < value) && !bool(value < *iter)` for verdadeiro para algum `iterator iter` em `[`first`, `last`)`, retorna `true`. Caso contrário, retorna `false`. Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * Para qualquer elemento `elem` de `[`first`, `last`)`, `bool(elem < value)` não implica `!bool(value < elem)`.
  * Os elementos `elem` de `[`first`, `last`)` não estão [particionados](<#/doc/algorithm>) em relação às expressões `bool(elem < value)` e `!bool(value < elem)`.

| (até C++20)
---|---
Equivalente a `std::binary_search(first, last, value, [std::less](<#/doc/utility/functional/less>){})`. | (desde C++20)

2) A equivalência é verificada usando `comp`:

Se `!bool(comp(*iter, value)) && !bool(comp(value, *iter))` for verdadeiro para algum `iterator iter` em `[`first`, `last`)`, retorna `true`. Caso contrário, retorna `false`.

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * Para qualquer elemento `elem` de `[`first`, `last`)`, `bool(comp(elem, value))` não implica `!bool(comp(value, elem))`.
  * Os elementos `elem` de `[`first`, `last`)` não estão [particionados](<#/doc/algorithm>) em relação às expressões `bool(comp(elem, value))` e `!bool(comp(value, elem))`.

### Parâmetros

- **first, last** — o range particionado de elementos a serem examinados
- **value** — valor para comparar os elementos
- **comp** — predicado binário que retorna `true` se o primeiro argumento for ordenado antes do segundo.
A assinatura da função predicado deve ser equivalente à seguinte: `bool pred(const Type1 &a, const Type2 &b);` Embora a assinatura não precise ter `const &`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1 &` não é permitido, nem `Type1` a menos que para `Type1` um `move` seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `T` possa ser implicitamente convertido para `Type1` e `Type2`, e um objeto do tipo `ForwardIt` possa ser desreferenciado e então implicitamente convertido para `Type1` e `Type2`.
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>). Não é exigido que satisfaça [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

`true` se um elemento equivalente a `value` for encontrado, `false` caso contrário.

### Complexidade

Dado \\(\scriptsize N\\)N como `[std::distance](<#/doc/iterator/distance>)(first, last)`:

1) No máximo \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1) comparações com `value` usando `operator<` (até C++20) `[std::less](<#/doc/utility/functional/less>){}` (desde C++20).

2) No máximo \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1) aplicações do comparador `comp`.

No entanto, se `ForwardIt` não for um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o número de incrementos do `iterator` é linear em \\(\scriptsize N\\)N.

### Notas

Embora `std::binary_search` exija apenas que `[`first`, `last`)` seja particionado, este algoritmo é geralmente usado no caso em que `[`first`, `last`)` está ordenado, de modo que a busca binária seja válida para qualquer valor.

`std::binary_search` apenas verifica se um elemento equivalente existe. Para obter um `iterator` para esse elemento (se existir), `[std::lower_bound](<#/doc/algorithm/lower_bound>)` deve ser usado em vez disso.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/binary_search>))

### Implementação possível

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L2236>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L4320>).

[binary_search (1)](<#/doc/algorithm/binary_search>)
---
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type>
    bool binary_search(ForwardIt first, ForwardIt last, const T& value)
    {
        return std::binary_search(first, last, value, std::less{});
    }
```

[binary_search (2)](<#/doc/algorithm/binary_search>)
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type,
             class Compare>
    bool binary_search(ForwardIt first, ForwardIt last, const T& value, Compare comp)
    {
        first = std::lower_bound(first, last, value, comp);
        return (!(first == last) and !(comp(value, *first)));
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        const auto haystack = {1, 3, 4, 5, 9};
    
        for (const auto needle : {1, 2, 3})
        {
            std::cout << "Searching for " << needle << '\n';
            if (std::binary_search(haystack.begin(), haystack.end(), needle))
                std::cout << "Found " << needle << '\n';
            else
                std::cout << "Not found!\n";
        }
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 1}, {2, 3}, {4, 2}, {4, 3}};
        auto cmpz = { return abs(x) < abs(y); };
        #ifdef __cpp_lib_algorithm_default_value_type
            assert(std::binary_search(nums.cbegin(), nums.cend(), {4, 2}, cmpz));
        #else
            assert(std::binary_search(nums.cbegin(), nums.cend(), CD{4, 2}, cmpz));
        #endif
    }
```

Saída:
```
    Searching for 1
    Found 1
    Searching for 2
    Not found!
    Searching for 3
    Found 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 270](<https://cplusplus.github.io/LWG/issue270>) | C++98 | `Compare` era exigido para satisfazer [Compare](<#/doc/named_req/Compare>) e `T` era exigido para ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) (ordenação fraca estrita exigida) | apenas um particionamento é exigido; comparações heterogêneas permitidas
[LWG 787](<https://cplusplus.github.io/LWG/issue787>) | C++98 | no máximo \\(\scriptsize \log_{2}(N)+2\\)log2(N)+2 comparações eram permitidas | corrigido para \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1)

### Veja também

[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)
[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um `iterator` para o primeiro elemento _não menor_ que o valor dado
(modelo de função)
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um `iterator` para o primeiro elemento _maior_ que um certo valor
(modelo de função)
[ ranges::binary_search](<#/doc/algorithm/ranges/binary_search>)(C++20) | determina se um elemento existe em um range parcialmente ordenado
(objeto de função de algoritmo)