# std::sort

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void sort( RandomIt first, RandomIt last );
template< class ExecutionPolicy, class RandomIt >
void sort( ExecutionPolicy&& policy,
RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
void sort( RandomIt first, RandomIt last, Compare comp );
template< class ExecutionPolicy, class RandomIt, class Compare >
void sort( ExecutionPolicy&& policy,
RandomIt first, RandomIt last, Compare comp );
```

Ordena os elementos no range `[`first`, `last`)` em ordem não decrescente. A ordem de elementos iguais não é garantida de ser preservada.

1) Os elementos são [ordenados](<#/doc/algorithm>) em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Os elementos são ordenados em relação a comp.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for true. | (desde C++20)

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o range de elementos a serem ordenados
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (i.e. um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento é _menor_ que (i.e. é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [value category](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo RandomIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dado \\(\scriptsize N\\)N como last - first:

1,2) \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) aplicações do comparador comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1950>) e [libc++](<https://github.llvm.org/llvm-project/blob/e7fc254875ca9e82b899d5354fae9b5b779ff485/libcxx/include/__algorithm/sort.h#L264>).

### Notas

Antes de [LWG713](<https://cplusplus.github.io/LWG/issue713>), o requisito de complexidade permitia que `sort()` fosse implementado usando apenas [Quicksort](<https://en.wikipedia.org/wiki/Quicksort> "enwiki:Quicksort"), que pode precisar de \\(\scriptsize O(N^2)\\)O(N2) comparações no pior caso.

[Introsort](<https://en.wikipedia.org/wiki/Introsort> "enwiki:Introsort") pode lidar com todos os casos com \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) comparações (sem incorrer em sobrecarga adicional no caso médio), e assim é geralmente usado para implementar `sort()`.

libc++ não implementou o requisito de complexidade de tempo corrigido [até LLVM 14](<https://reviews.llvm.org/D113413>).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <functional>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        std::array<int, 10> s{5, 7, 4, 2, 8, 6, 1, 9, 0, 3};
    
        auto print = &s const rem)
        {
            for (auto a : s)
                std::cout << a << ' ';
            std::cout << ": " << rem << '\n';
        };
    
        std::sort(s.begin(), s.end());
        print("sorted with the default operator<");
    
        std::sort(s.begin(), s.end(), std::greater<int>());
        print("sorted with the standard library compare function object");
    
        struct
        {
            bool operator()(int a, int b) const { return a < b; }
        }
        customLess;
    
        std::sort(s.begin(), s.end(), customLess);
        print("sorted with a custom function object");
    
        std::sort(s.begin(), s.end(), 
                                      {
                                          return a > b;
                                      });
        print("sorted with a lambda expression");
    }
```

Saída:
```
    0 1 2 3 4 5 6 7 8 9 : sorted with the default operator<
    9 8 7 6 5 4 3 2 1 0 : sorted with the standard library compare function object
    0 1 2 3 4 5 6 7 8 9 : sorted with a custom function object
    9 8 7 6 5 4 3 2 1 0 : sorted with a lambda expression
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 713](<https://cplusplus.github.io/LWG/issue713>) | C++98 | a complexidade de tempo \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) era exigida apenas na média | é exigida para o pior caso

### Veja também

[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(modelo de função)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos enquanto preserva a ordem entre elementos iguais
(modelo de função)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem ascendente
(objeto de função de algoritmo)