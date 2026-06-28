# std::is_sorted

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
bool is_sorted( ForwardIt first, ForwardIt last );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt >
bool is_sorted( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class ForwardIt, class Compare >
bool is_sorted( ForwardIt first, ForwardIt last, Compare comp );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class Compare >
bool is_sorted( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, Compare comp );
```

Verifica se os elementos no range `[`first`, `last`)` estão ordenados em ordem não decrescente.

1) Verifica se os elementos estão [ordenados](<#/doc/algorithm>) em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Verifica se os elementos estão ordenados em relação a comp.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que (isto é, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

true se os elementos no range estiverem ordenados em ordem não decrescente, false caso contrário.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) \\(\scriptsize O(N)\\)O(N) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) \\(\scriptsize O(N)\\)O(N) aplicações do comparador comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é indefinido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L3184>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L3642>).

[is_sorted (1)](<#/doc/algorithm/is_sorted>)
---
```cpp
    template<class ForwardIt>
    bool is_sorted(ForwardIt first, ForwardIt last)
    {
        return std::is_sorted_until(first, last) == last;
    }
```

[is_sorted (3)](<#/doc/algorithm/is_sorted>)
```cpp
    template<class ForwardIt, class Compare>
    bool is_sorted(ForwardIt first, ForwardIt last, Compare comp)
    {
        return std::is_sorted_until(first, last, comp) == last;
    }
```

### Notas

`std::is_sorted` retorna true para ranges vazios e ranges de comprimento um.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <functional>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v;
        assert(std::is_sorted(v.cbegin(), v.cend()) && "an empty range is always sorted");
        v.push_back(42);
        assert(std::is_sorted(v.cbegin(), v.cend()) && "a range of size 1 is always sorted");
    
        int data[] = {3, 1, 4, 1, 5};
        assert(not std::is_sorted(std::begin(data), std::end(data)));
    
        std::sort(std::begin(data), std::end(data));
        assert(std::is_sorted(std::begin(data), std::end(data)));
        assert(not std::is_sorted(std::begin(data), std::end(data), std::greater<>{}));
    }
```

### Veja também

[ is_sorted_until](<#/doc/algorithm/is_sorted_until>)(C++11) | encontra o maior sub-range ordenado
(modelo de função)
[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(objeto de função de algoritmo)