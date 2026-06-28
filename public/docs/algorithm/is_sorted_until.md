# std::is_sorted_until

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
ForwardIt is_sorted_until( ForwardIt first, ForwardIt last );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt >
ForwardIt is_sorted_until( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class ForwardIt, class Compare >
ForwardIt is_sorted_until( ForwardIt first, ForwardIt last,
Compare comp );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class Compare >
ForwardIt is_sorted_until( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
Compare comp );
```

Examina o range `[`first`, `last`)` e encontra o maior range começando em `first` no qual os elementos estão ordenados em ordem não decrescente.

1) Encontra o maior range onde os elementos estão [ordenados](<#/doc/algorithm>) em relação ao `operator<` (até C++20) ou [std::less](<#/doc/utility/functional/less>){} (desde C++20).

3) Encontra o maior range onde os elementos estão ordenados em relação a `comp`.

2,4) O mesmo que (1,3), mas executado de acordo com a `policy`.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento for _menor_ que (isto é, for ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um `move` seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `ForwardIt` possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`ForwardIt` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve atender aos requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

O limite superior do maior range começando em `first` no qual os elementos estão ordenados em ordem crescente. Ou seja, o último `iterator` `it` para o qual o range `[`first`, `it`)` está ordenado.

Retorna `last` para ranges vazios e ranges de comprimento um.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) \\(\scriptsize O(N)\\)O(N) comparações usando `operator<` (até C++20) ou [std::less](<#/doc/utility/functional/less>){} (desde C++20).

3,4) \\(\scriptsize O(N)\\)O(N) aplicações do comparador `comp`.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L3211>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L3614>).

[is_sorted_until (1)](<#/doc/algorithm/is_sorted_until>)
---
```cpp
    template<class ForwardIt>
    constexpr // < since C++20
    ForwardIt is_sorted_until(ForwardIt first, ForwardIt last)
    {
        return std::is_sorted_until(first, last, std::less<>());
    }
```

[is_sorted_until (2)](<#/doc/algorithm/is_sorted_until>)
```cpp
    template<class ForwardIt, class Compare>
    constexpr // < since C++20
    ForwardIt is_sorted_until(ForwardIt first, ForwardIt last, Compare comp)
    {
        if (first != last)
        {
            ForwardIt next = first;
            while (++next != last)
            {
                if (comp(*next, *first))
                    return next;
                first = next;
            }
        }
        return last;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <string>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 g(rd());
        const int N = 6;
        int nums[N] = {3, 1, 4, 1, 5, 9};
    
        const int min_sorted_size = 4;
    
        for (int sorted_size = 0; sorted_size < min_sorted_size;)
        {
            std::shuffle(nums, nums + N, g);
            int *const sorted_end = std::is_sorted_until(nums, nums + N);
            sorted_size = std::distance(nums, sorted_end);
            assert(sorted_size >= 1);
    
            for (const auto i : nums)
                std::cout << i << ' ';
            std::cout << ": " << sorted_size << " initial sorted elements\n"
                      << std::string(sorted_size * 2 - 1, '^') << '\n';
        }
    }
```

Saída possível:
```
    4 1 9 5 1 3 : 1 initial sorted elements
    ^
    4 5 9 3 1 1 : 3 initial sorted elements
    ^^^^^
    9 3 1 4 5 1 : 1 initial sorted elements
    ^
    1 3 5 4 1 9 : 3 initial sorted elements
    ^^^^^
    5 9 1 1 3 4 : 2 initial sorted elements
    ^^^
    4 9 1 5 1 3 : 2 initial sorted elements
    ^^^
    1 1 4 9 5 3 : 4 initial sorted elements
    ^^^^^^^
```

### Veja também

[ is_sorted](<#/doc/algorithm/is_sorted>)(C++11) | verifica se um range está ordenado em ordem crescente
(modelo de função)
[ ranges::is_sorted_until](<#/doc/algorithm/ranges/is_sorted_until>)(C++20) | encontra o maior sub-range ordenado
(objeto de função de algoritmo)