# std::nth_element

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void nth_element( RandomIt first, RandomIt nth, RandomIt last );
template< class ExecutionPolicy, class RandomIt >
void nth_element( ExecutionPolicy&& policy,
RandomIt first, RandomIt nth, RandomIt last );
template< class RandomIt, class Compare >
void nth_element( RandomIt first, RandomIt nth, RandomIt last,
Compare comp );
template< class ExecutionPolicy, class RandomIt, class Compare >
void nth_element( ExecutionPolicy&& policy,
RandomIt first, RandomIt nth, RandomIt last,
Compare comp );
```

`nth_element` rearranja os elementos em `[`first`, `last`)` de forma que, após o rearranjo:

  * O elemento apontado por `nth` é alterado para qualquer elemento que ocorreria naquela posição se `[`first`, `last`)` estivesse ordenado.
  * Para cada iterator `i` em `[`first`, `nth`)` e cada iterator `j` em `[`nth`, `last`)`, a seguinte condição é satisfeita:

1,2) `bool(*j < *i)` (até C++20) `[std::less](<#/doc/utility/functional/less>){}(*j, *i)` (desde C++20) é falso.

3,4) `bool(comp(*j, *i))` é falso.

1) Os elementos são hipoteticamente [ordenados](<#/doc/algorithm>) em relação ao `operator<` (até C++20) `[std::less](<#/doc/utility/functional/less>){}` (desde C++20).

3) Os elementos são hipoteticamente ordenados em relação a `comp`.

2,4) O mesmo que (1,3), mas executado de acordo com a `policy`.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: `[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)<ExecutionPolicy>>` é verdadeiro. | (até C++20)
---|---
`[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<ExecutionPolicy>>` é verdadeiro. | (desde C++20)

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * `[`first`, `nth`)` ou `[`nth`, `last`)` não é um [range válido](<#/doc/iterator>).

  * O tipo de `*first` não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de `*first` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de `*first` não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parameters

- **first, last** — iterators de acesso aleatório que definem o range a ser ordenado
- **nth** — iterator de acesso aleatório que define o ponto de partição da ordenação
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento é _menor_ que (ou seja, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` uma movimentação seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `RandomIt` possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexity

Dado \\(\scriptsize N\\)N como `last - first`:

1) \\(\scriptsize O(N)\\)O(N) comparações usando `operator<` (até C++20) `[std::less](<#/doc/utility/functional/less>){}` (desde C++20) em média.

2) \\(\scriptsize O(N)\\)O(N) comparações usando `operator<` (até C++20) `[std::less](<#/doc/utility/functional/less>){}` (desde C++20), e \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) trocas.

3) \\(\scriptsize O(N)\\)O(N) aplicações do comparador `comp` em média.

4) \\(\scriptsize O(N)\\)O(N) aplicações do comparador `comp`, e \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) trocas.

### Exceptions

As sobrecargas com um parâmetro de modelo chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), `[std::terminate](<#/doc/error/terminate>)` é chamado. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, `[std::bad_alloc](<#/doc/memory/new/bad_alloc>)` é lançado.

### Possible implementation

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L4718>), [libc++](<https://github.com/llvm/llvm-project/blob/ed2d364/libcxx/include/__algorithm/nth_element.h>), e [MSVC STL](<https://github.com/microsoft/STL/blob/e97bb2b50a12816ce68cc5147b7a3a21fb68bfa3/stl/inc/algorithm#L8849-L8894>).

### Notes

O algoritmo usado é tipicamente [Introselect](<https://en.wikipedia.org/wiki/Introselect> "enwiki:Introselect"), embora outros [algoritmos de seleção](<https://en.wikipedia.org/wiki/Selection_algorithm> "enwiki:Selection algorithm") com complexidade média adequada sejam permitidos.

### Example

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <functional>
    #include <iostream>
    #include <numeric>
    #include <vector>
    
    void printVec(const std::vector<int>& vec)
    {
        std::cout << "v = {";
        for (char sep[]{0, ' ', 0}; const int i : vec)
            std::cout << sep << i, sep[0] = ',';
        std::cout << "};\n";
    }
    
    int main()
    {
        std::vector<int> v{5, 10, 6, 4, 3, 2, 6, 7, 9, 3};
        printVec(v);
    
        auto m = v.begin() + v.size() / 2;
        std::nth_element(v.begin(), m, v.end());
        std::cout << "\nThe median is " << v[v.size() / 2] << '\n';
        // The consequence of the inequality of elements before/after the Nth one:
        assert(std::accumulate(v.begin(), m, 0) < std::accumulate(m, v.end(), 0));
        printVec(v);
    
        // Note: comp function changed
        std::nth_element(v.begin(), v.begin() + 1, v.end(), std::greater{});
        std::cout << "\nThe second largest element is " << v[1] << '\n';
        std::cout << "The largest element is " << v[0] << '\n';
        printVec(v);
    }
```

Saída possível:
```
    v = {5, 10, 6, 4, 3, 2, 6, 7, 9, 3};
    
    The median is 6
    v = {3, 2, 3, 4, 5, 6, 10, 7, 9, 6};
    
    The second largest element is 9
    The largest element is 10
    v = {10, 9, 6, 7, 6, 3, 5, 4, 3, 2};
```

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | após o rearranjo, apenas um elemento antes de nth era exigido para não ser maior que um elemento após nth | corrigiu o requisito
[LWG 2163](<https://cplusplus.github.io/LWG/issue2163>) | C++98 | a sobrecarga ([1](<#/doc/algorithm/nth_element>)) usava `operator>` para comparar os elementos | alterado para `operator<`
[P0896R4](<https://wg21.link/P0896R4>) | C++98 | `[`first`, `nth`)` e `[`nth`, `last`)` não eram exigidos para serem ranges válidos | o comportamento é indefinido se qualquer um deles for inválido

### See also

[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(modelo de função)
[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)
[ partial_sort_copy](<#/doc/algorithm/partial_sort_copy>) | copia e ordena parcialmente um range de elementos
(modelo de função)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(modelo de função)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
[ ranges::nth_element](<#/doc/algorithm/ranges/nth_element>)(C++20) | ordena parcialmente o range dado, garantindo que ele seja particionado pelo elemento dado
(objeto de função de algoritmo)