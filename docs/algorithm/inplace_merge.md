# std::inplace_merge

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt >
void inplace_merge( BidirIt first, BidirIt middle, BidirIt last );
template< class ExecutionPolicy, class BidirIt >
void inplace_merge( ExecutionPolicy&& policy,
BidirIt first, BidirIt middle, BidirIt last );
template< class BidirIt, class Compare >
void inplace_merge( BidirIt first, BidirIt middle, BidirIt last,
Compare comp );
template< class ExecutionPolicy, class BidirIt, class Compare >
void inplace_merge( ExecutionPolicy&& policy,
BidirIt first, BidirIt middle, BidirIt last,
Compare comp );
```

Mescla dois ranges ordenados consecutivos `[`first`, `middle`)` e `[`middle`, `last`)` em um único range ordenado `[`first`, `last`)`.

1) Se `[`first`, `middle`)` ou `[`middle`, `last`)` não estiver [ordenado](<#/doc/algorithm>) em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20), o comportamento é indefinido.

3) Se `[`first`, `middle`)` ou `[`middle`, `last`)` não estiver ordenado em relação a comp, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Esta função de mesclagem é estável, o que significa que para elementos equivalentes nos dois ranges originais, os elementos do primeiro range (preservando sua ordem original) precedem os elementos do segundo range (preservando sua ordem original).

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * `[`first`, `middle`)` ou `[`middle`, `last`)` não é um [range válido](<#/doc/iterator>).

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `BiditIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parameters

- **first** — o início do primeiro range ordenado
- **middle** — o fim do primeiro range ordenado e o início do segundo
- **last** — o fim do segundo range ordenado
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento for _menor_ que (ou seja, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo BidirIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`BidirIt` deve atender aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
-`Compare` deve atender aos requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexity

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) Exatamente \\(\scriptsize N-1\\)N-1 comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20) se memória adicional suficiente estiver disponível, \\(\scriptsize O(N \cdot \log(N))\\)O(N⋅log(N)) comparações caso contrário.

2) \\(\scriptsize O(N \cdot \log(N))\\)O(N⋅log(N)) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Exatamente \\(\scriptsize N-1\\)N-1 aplicações da função de comparação comp se memória adicional suficiente estiver disponível, \\(\scriptsize O(N \cdot \log(N))\\)O(N⋅log(N)) aplicações caso contrário.

4) \\(\scriptsize O(N \cdot \log(N))\\)O(N⋅log(N)) aplicações da função de comparação comp.

### Exceptions

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possible implementation

Veja as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L2508>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L4452>).

### Notes

Esta função tenta alocar um buffer temporário. Se a alocação falhar, o algoritmo menos eficiente é escolhido.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | mesclagem inplace constexpr ([1](<#/doc/algorithm/inplace_merge>)), ([3](<#/doc/algorithm/inplace_merge>))

### Example

O código a seguir é uma implementação de merge sort.

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    template<class Iter>
    void merge_sort(Iter first, Iter last)
    {
        if (last - first > 1)
        {
            Iter middle = first + (last - first) / 2;
            merge_sort(first, middle);
            merge_sort(middle, last);
            std::inplace_merge(first, middle, last);
        }
    }
    
    int main()
    {
        std::vector<int> v{8, 2, -2, 0, 11, 11, 1, 7, 3};
        merge_sort(v.begin(), v.end());
        for (const auto& n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    -2 0 1 2 3 7 8 11 11
```

### See also

[ merge](<#/doc/algorithm/merge>) | mescla dois ranges ordenados
(template de função)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(template de função)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(template de função)
[ ranges::inplace_merge](<#/doc/algorithm/ranges/inplace_merge>)(C++20) | mescla dois ranges ordenados in-place
(objeto de função de algoritmo)