# std::is_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
bool is_heap( RandomIt first, RandomIt last );
(constexpr desde C++20)
template< class ExecutionPolicy, class RandomIt >
bool is_heap( ExecutionPolicy&& policy,
RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
bool is_heap( RandomIt first, RandomIt last, Compare comp );
(constexpr desde C++20)
template< class ExecutionPolicy, class RandomIt, class Compare >
bool is_heap( ExecutionPolicy&& policy,
RandomIt first, RandomIt last, Compare comp );
```

Verifica se `[`first`, `last`)` é um [heap](<#/doc/algorithm>).

1) A propriedade de heap a ser verificada é em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) A propriedade de heap a ser verificada é em relação a comp.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range a ser verificado
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` uma move seja equivalente a uma copy(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo RandomIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

true se o range for um heap em relação ao comparador correspondente, false caso contrário.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) \\(\scriptsize O(N)\\)O(N) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) \\(\scriptsize O(N)\\)O(N) aplicações da função de comparação comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <bit>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9};
    
        std::cout << "initially, v:\n";
        for (const auto& i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    
        if (!std::is_heap(v.begin(), v.end()))
        {
            std::cout << "making heap...\n";
            std::make_heap(v.begin(), v.end());
        }
    
        std::cout << "after make_heap, v:\n";
        for (auto t{1U}; const auto& i : v)
            std::cout << i << (std::has_single_bit(++t) ? " | " : " ");
        std::cout << '\n';
    }
```

Saída:
```
    initially, v:
    3 1 4 1 5 9 2 6 5 3 5 8 9 7 9
    making heap...
    after make_heap, v:
    9 | 6 9 | 5 5 9 7 | 1 1 3 5 8 3 4 2 |
```

### Veja também

[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior sub-range que é um max heap
(modelo de função)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(modelo de função)
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(modelo de função)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(modelo de função)
[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)