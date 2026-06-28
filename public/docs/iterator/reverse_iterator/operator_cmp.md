# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::reverse_iterator)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter1, class Iter2 >
bool operator==( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator!=( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator< ( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator<=( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator> ( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator>=( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
template< class Iter1, std::three_way_comparable_with<Iter1> Iter2 >
constexpr std::compare_three_way_result_t<Iter1, Iter2>
operator<=>( const std::reverse_iterator<Iter1>& lhs,
const std::reverse_iterator<Iter2>& rhs );
```

Compara os iteradores subjacentes de lhs e rhs.

* O resultado das comparações de igualdade é preservado (ou seja, iteradores subjacentes iguais implicam iteradores reversos iguais).
* O resultado das comparações relacionais é invertido (ou seja, um iterador subjacente maior implica um iterador reverso menor).

1) Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.base() == rhs.base() for bem-formado e conversível para bool.
2) Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.base() != rhs.base() for bem-formado e conversível para bool.
3) Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.base() > rhs.base() for bem-formado e conversível para bool.
4) Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.base() >= rhs.base() for bem-formado e conversível para bool.
5) Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.base() < rhs.base() for bem-formado e conversível para bool.
6) Esta sobrecarga participa da resolução de sobrecarga apenas se lhs.base() <= rhs.base() for bem-formado e conversível para bool. | (desde C++20)

### Parâmetros

- **lhs, rhs** — adaptadores de iterador para comparar

### Valor de retorno

1) lhs.base() == rhs.base()

2) lhs.base() != rhs.base()

3) lhs.base() > rhs.base()

4) lhs.base() >= rhs.base()

5) lhs.base() < rhs.base()

6) lhs.base() <= rhs.base()

7) rhs.base() <=> lhs.base()

### Observações

operator<=> retorna rhs.base() <=> lhs.base() em vez de lhs.base() <=> rhs.base() porque este é um iterador reverso.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iterator>
     
    int main()
    {
        int a[]{0, 1, 2, 3};
        //            ↑  └───── x, y
        //            └──────── z
        // “x” e “y” são iguais, mas “x” é menor que “z” (reversamente)
        std::reverse_iterator<int*>
            x{std::rend(a) - std::size(a)},
            y{std::rend(a) - std::size(a)},
            z{std::rbegin(a) + 1};
     
        // comparações bidirecionais
        assert(  x == y );
        assert(!(x != y));
        assert(!(x <  y));
        assert(  x <= y );
        assert(!(x == z));
        assert(  x != z );
        assert(  x <  z );
        assert(  x <= z );
     
        // comparações tridirecionais
        assert(  x <=> y == 0 );
        assert(!(x <=> y <  0));
        assert(!(x <=> y >  0));
        assert(!(x <=> z == 0));
        assert(  x <=> z <  0 );
        assert(!(x <=> z >  0));
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 280](<https://cplusplus.github.io/LWG/issue280>) | C++98 | atribuição heterogênea não era permitida | permitida