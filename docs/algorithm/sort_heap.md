# std::sort_heap
Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void sort_heap( RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
void sort_heap( RandomIt first, RandomIt last, Compare comp );
```

Converte o [heap](<#/doc/algorithm>) `[`first`, `last`)` em um range ordenado. A propriedade de heap não é mais mantida.

1) O heap é em relação a operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20), e será ordenado em relação a operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) O heap é em relação a comp, e será ordenado em relação a comp.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `[`first`, `last`)` não é um heap.

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o heap a ser ordenado
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` uma movimentação seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo RandomIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize 2N \cdot \log(N)\\)2N⋅log(N) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo \\(\scriptsize 2N \cdot \log(N)\\)2N⋅log(N) aplicações da função de comparação comp.

### Implementação possível

[sort_heap (1)](<#/doc/algorithm/sort_heap>)
---
```
    template<class RandomIt>
    void sort_heap(RandomIt first, RandomIt last)
    {
        while (first != last)
            std::pop_heap(first, last--);
    }
```

[sort_heap (2)](<#/doc/algorithm/sort_heap>)
```
    template<class RandomIt, class Compare>
    void sort_heap(RandomIt first, RandomIt last, Compare comp)
    {
        while (first != last)
            std::pop_heap(first, last--, comp);
    }
```

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    #include <vector>
     
    void println(std::string_view fmt, const auto& v)
    {
        for (std::cout << fmt; const auto &i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::vector<int> v{3, 1, 4, 1, 5, 9};
     
        std::make_heap(v.begin(), v.end());
        println("after make_heap, v: ", v);
     
        std::sort_heap(v.begin(), v.end());
        println("after sort_heap, v: ", v);
    }
```

Saída:
```
    after make_heap, v: 9 4 5 1 1 3
    after sort_heap, v: 1 1 3 4 5 9
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2444](<https://cplusplus.github.io/LWG/issue2444>) | C++98 | no máximo \\(\scriptsize N \cdot \log(N)\\)N⋅log(N) comparações eram permitidas | aumentado para \\(\scriptsize 2N \cdot \log(N)\\)2N⋅log(N)

### Veja também

[ is_heap](<#/doc/algorithm/is_heap>)(C++11) | verifica se o range dado é um max heap
(modelo de função)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior sub-range que é um max heap
(modelo de função)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(modelo de função)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(modelo de função)
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)