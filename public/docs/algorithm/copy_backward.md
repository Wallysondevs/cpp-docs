# std::copy_backward

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt1, class BidirIt2 >
BidirIt2 copy_backward( BidirIt1 first, BidirIt1 last, BidirIt2 d_last );
```

Copia os elementos do range `[`first`, `last`)` para outro range terminando em d_last. Os elementos são copiados em ordem inversa (o último elemento é copiado primeiro), mas sua ordem relativa é preservada.

O comportamento é indefinido se d_last estiver dentro de `(`first`, `last`]`. [std::copy](<#/doc/algorithm/copy>) deve ser usado em vez de `std::copy_backward` nesse caso.

### Parâmetros

- **first, last** — o range dos elementos a serem copiados
- **d_last** — o fim do range de destino
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

### Valor de retorno

Iterator para o último elemento copiado.

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) atribuições.

### Notas

Ao copiar ranges sobrepostos, [std::copy](<#/doc/algorithm/copy>) é apropriado ao copiar para a esquerda (o início do range de destino está fora do range de origem), enquanto `std::copy_backward` é apropriado ao copiar para a direita (o fim do range de destino está fora do range de origem).

### Possível implementação
```cpp
    template<class BidirIt1, class BidirIt2>
    BidirIt2 copy_backward(BidirIt1 first, BidirIt1 last, BidirIt2 d_last)
    {
        while (first != last)
            *(--d_last) = *(--last);
        return d_last;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector<int> source(4);
        std::iota(source.begin(), source.end(), 1); // fills with 1, 2, 3, 4
    
        std::vector<int> destination(6);
    
        std::copy_backward(source.begin(), source.end(), destination.end());
    
        std::cout << "destination contains: ";
        for (auto i: destination)
            std::cout << i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    destination contains: 0 0 1 2 3 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 1206](<https://cplusplus.github.io/LWG/issue1206>) | C++98 | 1. o comportamento era bem definido se d_last == last
2. o comportamento era indefinido se d_last == first | 1. tornado indefinido
2. tornado bem definido

### Ver também

[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ ranges::copy_backward](<#/doc/algorithm/ranges/copy_backward>)(C++20) | copia um range de elementos em ordem inversa
(objeto de função de algoritmo)