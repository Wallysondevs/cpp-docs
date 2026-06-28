# operator-(std::reverse_iterator)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter1, class Iter2 >
typename reverse_iterator<Iter>::difference_type
operator-( const reverse_iterator<Iter1>& lhs,
const reverse_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
auto operator-( const reverse_iterator<Iter1>& lhs,
const reverse_iterator<Iter2>& rhs )
-> decltype(rhs.base() - lhs.base());
(constexpr desde C++17)
```

Retorna a distância entre dois adaptadores de iterador.

### Parâmetros

- **lhs, rhs** — adaptadores de iterador para calcular a diferença

### Valor de retorno

rhs.base() - lhs.base()

### Observações

operator- retorna rhs.base() - lhs.base() em vez de lhs.base() - rhs.base() porque este é um iterador reverso.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    int main()
    {
        std::vector vec{0, 1, 2, 3};
        std::reverse_iterator<std::vector<int>::iterator>
            vec_ri1{std::reverse_iterator{vec.rbegin()}},
            vec_ri2{std::reverse_iterator{vec.rend()}};
        std::cout << (vec_ri2 - vec_ri1) << ' '; // 4
        std::cout << (vec_ri1 - vec_ri2) << '\n'; // -4
    
        std::list lst{5, 6, 7, 8};
        std::reverse_iterator<std::list<int>::iterator>
            lst_ri1{std::reverse_iterator{lst.rbegin()}},
            lst_ri2{std::reverse_iterator{lst.rend()}};
    //  auto n = (lst_ri1 - lst_ri2); // Error: the underlying iterators do not
                                      //        model random access iterator
    }
```

Saída:
```
    4 -4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 280](<https://cplusplus.github.io/LWG/issue280>) | C++98 | subtração heterogênea não era permitida | permitida

### Veja também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/reverse_iterator/operator_arith>) | avança ou decrementa o iterador
(função membro pública)
[ operator+](<#/>) | avança o iterador
(modelo de função)