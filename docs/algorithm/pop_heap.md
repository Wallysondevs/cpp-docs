# std::pop_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void pop_heap( RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
void pop_heap( RandomIt first, RandomIt last, Compare comp );
```

Troca o valor na posição `first` com o valor na posição `last - 1` e transforma o sub-range `[`first`, `last - 1`)` em um heap. Isso tem o efeito de remover o primeiro elemento do [heap](<#/doc/algorithm>) `[`first`, `last`)`.

1) `[`first`, `last`)` é um heap em relação ao `operator<`(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) `[`first`, `last`)` é um heap em relação a `comp`.

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

*   `[`first`, `last`)` está vazio.
*   `[`first`, `last`)` não é um heap em relação ao comparador correspondente.
*   O tipo de `*first` não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

*   `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
*   O tipo de `*first` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
*   O tipo de `*first` não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o heap não vazio a ser modificado
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `RandomIt` possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize 2\log(N)\\)2log(N) comparações usando `operator<`(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo \\(\scriptsize 2\log(N)\\)2log(N) aplicações da função de comparação `comp`.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
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
        std::vector<int> v{3, 1, 4, 1, 5, 9};
    
        std::make_heap(v.begin(), v.end());
        println("after make_heap: ", v);
    
        std::pop_heap(v.begin(), v.end()); // moves the largest to the end
        println("after pop_heap:  ", v);
    
        int largest = v.back();
        println("largest element: ", largest);
    
        v.pop_back(); // actually removes the largest element
        println("after pop_back:  ", v);
    }
```

Saída:
```
    after make_heap: 9 5 4 1 1 3
    after pop_heap:  5 3 4 1 1 9
    largest element: 9
    after pop_back:  5 3 4 1 1
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 1205](<https://cplusplus.github.io/LWG/issue1205>) | C++98 | o comportamento era incerto se `[`first`, `last`)` estivesse vazio | o comportamento é indefinido neste caso

### Veja também

[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)
[ is_heap](<#/doc/algorithm/is_heap>)(C++11) | verifica se o range dado é um max heap
(modelo de função)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior sub-range que é um max heap
(modelo de função)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(modelo de função)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(modelo de função)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)