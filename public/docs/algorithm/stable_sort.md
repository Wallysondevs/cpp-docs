# std::stable_sort

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void stable_sort( RandomIt first, RandomIt last );
template< class ExecutionPolicy, class RandomIt >
void stable_sort( ExecutionPolicy&& policy,
RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
void stable_sort( RandomIt first, RandomIt last, Compare comp );
template< class ExecutionPolicy, class RandomIt, class Compare >
void stable_sort( ExecutionPolicy&& policy,
RandomIt first, RandomIt last, Compare comp );
```

Ordena os elementos no range `[`first`, `last`)` em ordem não decrescente. A ordem dos elementos equivalentes é garantida ser preservada.

1) Os elementos são [ordenados](<#/doc/algorithm>) em relação ao operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Os elementos são ordenados em relação a comp.

2,4) O mesmo que (1,3), mas executado de acordo com policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (ate C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (ate C++11)

  * `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o range de elementos a serem ordenados
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento é _menor_ que (isto é, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo RandomIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dado \\(\scriptsize N\\)N como last - first:

1,2) \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) comparações usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20) se memória extra suficiente estiver disponível, caso contrário \\(\scriptsize O(N \cdot \log^{2}(N))\\)O(N·log2
(N)) comparações.

3,4) \\(\scriptsize O(N \cdot \log(N))\\)O(N·log(N)) aplicações do comparador comp se memória extra suficiente estiver disponível, caso contrário \\(\scriptsize O(N \cdot \log^{2}(N))\\)O(N·log2
(N)) aplicações.

### Exceções

As sobrecargas com um parâmetro template nomeado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L4977>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L4696>).

### Notas

Esta função tenta alocar um buffer temporário de tamanho igual à sequência a ser ordenada. Se a alocação falhar, o algoritmo menos eficiente é escolhido.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | ordenação estável constexpr, sobrecargas ([1](<#/doc/algorithm/stable_sort>)), ([3](<#/doc/algorithm/stable_sort>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <string>
    #include <vector>
    
    struct Employee
    {
        int age;
        std::string name; // Does not participate in comparisons
    };
    
    bool operator<(const Employee& lhs, const Employee& rhs)
    {
        return lhs.age < rhs.age;
    }
    
    #if __cpp_lib_constexpr_algorithms >= 202306L
    consteval auto get_sorted()
    {
        auto v = std::array{3, 1, 4, 1, 5, 9};
        std::stable_sort(v.begin(), v.end());
        return v;
    }
    static_assert(std::ranges::is_sorted(get_sorted()));
    #endif
    
    int main()
    {
        std::vector<Employee> v{{108, "Zaphod"}, {32, "Arthur"}, {108, "Ford"}};
    
        std::stable_sort(v.begin(), v.end());
    
        for (const Employee& e : v)
            std::cout << e.age << ", " << e.name << '\n';
    }
```

Saída:
```
    32, Arthur
    108, Zaphod
    108, Ford
```

### Veja também

[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(modelo de função)
[ partial_sort](<#/doc/algorithm/partial_sort>) | ordena os primeiros N elementos de um range
(modelo de função)
[ stable_partition](<#/doc/algorithm/stable_partition>) | divide elementos em dois grupos preservando sua ordem relativa
(modelo de função)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(objeto de função de algoritmo)