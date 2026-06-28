# std::prev

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class BidirIt >
BidirIt prev( BidirIt it, typename std::iterator_traits<BidirIt>::difference_type n = 1 );
(ate C++17)
template< class BidirIt >
constexpr
BidirIt prev( BidirIt it, typename std::iterator_traits<BidirIt>::difference_type n = 1 );
```

Retorna o n-ésimo predecessor (ou o -n-ésimo sucessor se n for negativo) do iterator it.

### Parâmetros

- **it** — um iterator
- **n** — número de elementos que deve ser retrocedido
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

### Valor de retorno

Um iterator do tipo `BidirIt` que contém o n-ésimo predecessor (ou o -n-ésimo sucessor se n for negativo) do iterator it.

### Complexidade

Linear.

No entanto, se `BidirIt` adicionalmente satisfizer os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), a complexidade é constante.

### Possível implementação
```cpp
    template<class BidirIt>
    constexpr // since C++17
    BidirIt prev(BidirIt it, typename std::iterator_traits<BidirIt>::difference_type n = 1)
    {
        std::advance(it, -n);
        return it;
    }
```

---

### Observações

Embora a expressão `--c.end()` frequentemente compile, não há garantia de que o faça: `c.end()` é uma expressão rvalue, e não há nenhum requisito de iterator que especifique que o decremento de um rvalue tenha garantia de funcionar. Em particular, quando iterators são implementados como ponteiros ou seu `operator--` é qualificado como lvalue-ref, `--c.end()` não compila, enquanto `std::prev(c.end())` compila.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{3, 1, 4};
    
        auto it = v.end();
        auto pv = std::prev(it, 2);
        std::cout << *pv << '\n';
    
        it = v.begin();
        pv = std::prev(it, -2);
        std::cout << *pv << '\n';
    }
```

Saída:
```
    1
    4
```

### Veja também

[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterator
(modelo de função)
[ advance](<#/doc/iterator/advance>) | avança um iterator por uma dada distância
(modelo de função)
[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(modelo de função)
[ ranges::prev](<#/doc/iterator/ranges/prev>)(C++20) | decrementa um iterator por uma dada distância ou até um limite
(objeto de função de algoritmo)