# std::make_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class RandomIt >
void make_heap( RandomIt first, RandomIt last );
template< class RandomIt, class Compare >
void make_heap( RandomIt first, RandomIt last, Compare comp );
```

Constrói um [heap](<#/doc/algorithm>) no range `[`first`, `last`)`.

1) O heap construído é em relação a operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) O heap construído é em relação a comp.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (ate C++11)

  * `RandomIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o range a partir do qual construir o heap
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento é _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo RandomIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`RandomIt` deve satisfazer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Complexidade

Dada \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize 3N\\)3N comparações usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo \\(\scriptsize 3N\\)3N aplicações da função de comparação comp.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <string_view>
    #include <vector>
    
    void print(std::string_view text, const std::vector<int>& v = {})
    {
        std::cout << text << ": ";
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        print("Max heap");
    
        std::vector<int> v{3, 2, 4, 1, 5, 9};
        print("initially, v", v);
    
        std::make_heap(v.begin(), v.end());
        print("after make_heap, v", v);
    
        std::pop_heap(v.begin(), v.end());
        print("after pop_heap, v", v);
    
        auto top = v.back();
        v.pop_back();
        print("former top element", {top});
        print("after removing the former top element, v", v);
    
        print("\nMin heap");
    
        std::vector<int> v1{3, 2, 4, 1, 5, 9};
        print("initially, v1", v1);
    
        std::make_heap(v1.begin(), v1.end(), std::greater<>{});
        print("after make_heap, v1", v1);
    
        std::pop_heap(v1.begin(), v1.end(), std::greater<>{});
        print("after pop_heap, v1", v1);
    
        auto top1 = v1.back();
        v1.pop_back();
        print("former top element", {top1});
        print("after removing the former top element, v1", v1);
    }
```

Saída:
```
    Max heap:
    initially, v: 3 2 4 1 5 9
    after make_heap, v: 9 5 4 1 2 3
    after pop_heap, v: 5 3 4 1 2 9
    former top element: 9
    after removing the former top element, v: 5 3 4 1 2
    
    Min heap:
    initially, v1: 3 2 4 1 5 9
    after make_heap, v1: 1 2 4 3 5 9
    after pop_heap, v1: 2 3 4 9 5 1
    former top element: 1
    after removing the former top element, v1: 2 3 4 9 5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3032](<https://cplusplus.github.io/LWG/issue3032>) | C++98 | os elementos de `[`first`, `last`)` não eram obrigados a ser swappable | obrigatório

### Veja também

[ is_heap](<#/doc/algorithm/is_heap>)(C++11) | verifica se o range dado é um max heap
(modelo de função)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior sub-range que é um max heap
(modelo de função)
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)
[ pop_heap](<#/doc/algorithm/pop_heap>) | remove o maior elemento de um max heap
(modelo de função)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(modelo de função)
[ priority_queue](<#/doc/container/priority_queue>) | adapta um container para fornecer uma fila de prioridade
(modelo de classe)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)