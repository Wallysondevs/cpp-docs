# std::push_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void push_heap( RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
void push_heap( RandomIt first, RandomIt last, Compare comp );
```

Insere o elemento na posição `last - 1` no [heap](<#/doc/algorithm>) `[`first`, `last - 1`)`. O heap após a inserção será `[`first`, `last`)`.

1) O heap é em relação ao `operator<` (ate C++20) [std::less](<#/doc/utility/functional/less>){} (desde C++20).

2) O heap é em relação a `comp`.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   `[`first`, `last - 1`)` não é um heap em relação ao comparador correspondente.

*   O tipo de `*first` não é [Swappable](<#/doc/named_req/Swappable>).

| (ate C++11)

*   `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
*   O tipo de `*first` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
*   O tipo de `*first` não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o range que indica o heap após a inserção
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `RandomIt` possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize \log(N)\\)log(N) comparações usando `operator<` (ate C++20) [std::less](<#/doc/utility/functional/less>){} (desde C++20).

2) No máximo \\(\scriptsize \log(N)\\)log(N) aplicações da função de comparação `comp`.

### Exemplo

Run this code
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    #include <vector>
    
    void println(std::string_view rem, const std::vector<int>& v)
    {
        std::cout << rem;
        for (int e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<int> v{3, 1, 4, 1, 5, 9};
    
        std::make_heap(v.begin(), v.end());
        println("after make_heap: ", v);
    
        v.push_back(6);
        println("after push_back: ", v);
    
        std::push_heap(v.begin(), v.end());
        println("after push_heap: ", v);
    }
```

Output:
```
    after make_heap: 9 5 4 1 1 3
    after push_back: 9 5 4 1 1 3 6
    after push_heap: 9 5 6 1 1 3 4
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3032](<https://cplusplus.github.io/LWG/issue3032>) | C++98 | os elementos de `[`first`, `last`)` não eram obrigados a ser swappable | obrigatório

### Veja também

[ is_heap](<#/doc/algorithm/is_heap>)(desde C++11) | verifica se o range fornecido é um max heap
(function template)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(desde C++11) | encontra o maior sub-range que é um max heap
(function template)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(function template)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(function template)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(function template)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(desde C++20) | adiciona um elemento a um max heap
(algorithm function object)