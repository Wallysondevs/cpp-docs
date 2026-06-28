# std::partition_point

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class UnaryPred >
ForwardIt partition_point( ForwardIt first, ForwardIt last, UnaryPred p );
(constexpr desde C++20)
```

Examina o range particionado `[`first`, `last`)` e localiza o fim da primeira partição, ou seja, o primeiro elemento que não satisfaz `p` ou `last` se todos os elementos satisfazem `p`.

Se os elementos `elem` de `[`first`, `last`)` não estiverem [particionados](<#/doc/algorithm>) em relação à expressão `bool(p(elem))`, o comportamento é indefinido.

### Parâmetros

- **first, last** — o range particionado de elementos a examinar
- **p** — predicado unário que retorna `true` para os elementos encontrados no início do range.
A expressão `p(v)` deve ser conversível para `bool` para cada argumento `v` do tipo (possivelmente `const`) `VT`, onde `VT` é o tipo de valor de `ForwardIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro `VT&` não é permitido, nem `VT` a menos que para `VT` uma `move` seja equivalente a uma `copy` (desde C++11).
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

O iterator após o fim da primeira partição dentro de `[`first`, `last`)` ou `last` se todos os elementos satisfazem `p`.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last), executa \\(\scriptsize O(log(N))\\)O(log(N)) aplicações do predicado `p`.

### Notas

Este algoritmo é uma forma mais geral de [std::lower_bound](<#/doc/algorithm/lower_bound>), que pode ser expresso em termos de `std::partition_point` com o predicado `[&](const auto& e) { return e < value; });`.

### Implementação possível
```cpp
    template<class ForwardIt, class UnaryPred>
    constexpr // desde C++20
    ForwardIt partition_point(ForwardIt first, ForwardIt last, UnaryPred p)
    {
        for (auto length = std::distance(first, last); 0 < length; )
        {
            auto half = length / 2;
            auto middle = std::next(first, half);
            if (p(*middle))
            {
                first = std::next(middle);
                length -= (half + 1);
            }
            else
                length = half;
        }
    
        return first;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <iterator>
    
    auto print_seq = 
    {
        for (std::cout << rem; first != last; std::cout << *first++ << ' ') {}
        std::cout << '\n';
    };
    
    int main()
    {
        std::array v{1, 2, 3, 4, 5, 6, 7, 8, 9};
    
        auto is_even =  { return i % 2 == 0; };
    
        std::partition(v.begin(), v.end(), is_even);
        print_seq("After partitioning, v: ", v.cbegin(), v.cend());
    
        const auto pp = std::partition_point(v.cbegin(), v.cend(), is_even);
        const auto i = std::distance(v.cbegin(), pp);
        std::cout << "Partition point is at " << i << "; v[" << i << "] = " << *pp << '\n';
    
        print_seq("First partition (all even elements): ", v.cbegin(), pp);
        print_seq("Second partition (all odd elements): ", pp, v.cend());
    }
```

Saída possível:
```
    After partitioning, v: 8 2 6 4 5 3 7 1 9
    Partition point is at 4; v[4] = 5
    First partition (all even elements): 8 2 6 4
    Second partition (all odd elements): 5 3 7 1 9
```

### Veja também

[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ is_sorted](<#/doc/algorithm/is_sorted>)(C++11) | verifica se um range está ordenado em ordem crescente
(modelo de função)
[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(modelo de função)
[ ranges::partition_point](<#/doc/algorithm/ranges/partition_point>)(C++20) | localiza o ponto de partição de um range particionado
(objeto de função de algoritmo)