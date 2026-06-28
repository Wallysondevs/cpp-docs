# std::partial_sort_copy

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class RandomIt >
RandomIt partial_sort_copy( InputIt first, InputIt last,
RandomIt d_first, RandomIt d_last );
template< class ExecutionPolicy,
class ForwardIt, class RandomIt >
RandomIt partial_sort_copy( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
RandomIt d_first, RandomIt d_last );
template< class InputIt, class RandomIt, class Compare >
RandomIt partial_sort_copy( InputIt first, InputIt last,
RandomIt d_first, RandomIt d_last,
Compare comp );
template< class ExecutionPolicy,
class ForwardIt, class RandomIt, class Compare >
RandomIt partial_sort_copy( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
RandomIt d_first, RandomIt d_last,
Compare comp );
```

Ordena alguns dos elementos no range `[`first`, `last`)` em ordem crescente, armazenando o resultado no range `[`d_first`, `d_last`)`.

No máximo d_last - d_first dos elementos são colocados ordenados no range `[`d_first`, `d_first + n`)`. n é o número de elementos a serem ordenados ([std::min](<#/doc/algorithm/min>)([std::distance](<#/doc/iterator/distance>)(first, last), d_last - d_first)). A ordem de elementos iguais não é garantida ser preservada.

1) Os elementos são [ordenados](<#/doc/algorithm>) em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Os elementos são ordenados em relação a comp.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se *first não for [gravável](<#/doc/iterator>) para d_first, o programa é malformado.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   O tipo de *d_first não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

*   `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
*   O tipo de *d_first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
*   O tipo de *d_first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o range de elementos a serem ordenados
- **d_first, d_last** — iteradores de acesso aleatório que definem o range de destino
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento for _menor_ que (isto é, for ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo RandomIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

Um iterador para o elemento que define o limite superior do range ordenado, ou seja, d_first + [std::min](<#/doc/algorithm/min>)([std::distance](<#/doc/iterator/distance>)(first, last), d_last - d_first).

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last), \\(\scriptsize D\\)D como d_last - d_first:

1,2) Aproximadamente \\(\scriptsize N \cdot \log(\min(N,D))\\)N·log(min(N,D)) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) Aproximadamente \\(\scriptsize N \cdot \log(\min(N,D))\\)N·log(min(N,D)) aplicações do comparador comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1669>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L5064>).

### Exemplo

O código a seguir ordena um vetor de inteiros e os copia para um vetor menor e um maior.

Run this code
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <string_view>
    #include <type_traits>
    #include <vector>
    
    void println(std::string_view rem, const auto& v)
    {
        std::cout << rem;
        if constexpr (std::is_scalar_v<std::decay_t<decltype(v)>>)
            std::cout << v;
        else
            for (int e : v)
                std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        const auto v0 = {4, 2, 5, 1, 3};
        std::vector<int> v1{10, 11, 12};
        std::vector<int> v2{10, 11, 12, 13, 14, 15, 16};
        std::vector<int>::iterator it;
    
        it = std::partial_sort_copy(v0.begin(), v0.end(), v1.begin(), v1.end());
        println("Writing to the smaller vector in ascending order gives: ", v1);
    
        if (it == v1.end())
            println("The return value is the end iterator", ' ');
    
        it = std::partial_sort_copy(v0.begin(), v0.end(), v2.begin(), v2.end(),
                                    std::greater<int>());
    
        println("Writing to the larger vector in descending order gives: ", v2);
        println("The return value is the iterator to ", *it);
    }
```

Output:
```
    Writing to the smaller vector in ascending order gives: 1 2 3
    The return value is the end iterator
    Writing to the larger vector in descending order gives: 5 4 3 2 1 15 16
    The return value is the iterator to 15
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0896R4](<https://wg21.link/P0896R4>) | C++98 | *first não era exigido ser gravável para d_first | o programa é malformado se não for gravável

### Veja também

[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(modelo de função)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(modelo de função)
[ ranges::partial_sort_copy](<#/doc/algorithm/ranges/partial_sort_copy>)(C++20) | copia e ordena parcialmente um range de elementos
(objeto de função de algoritmo)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão