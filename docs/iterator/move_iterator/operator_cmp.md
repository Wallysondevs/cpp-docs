# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::move_iterator)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter1, class Iter2 >
bool operator==( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator!=( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
(até C++20)
template< class Iter1, class Iter2 >
bool operator< ( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator<=( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator> ( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
template< class Iter1, class Iter2 >
bool operator>=( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
template< class Iter1, std::three_way_comparable_with<Iter1> Iter2 >
constexpr std::compare_three_way_result_t<Iter1, Iter2>
operator<=>( const std::move_iterator<Iter1>& lhs,
const std::move_iterator<Iter2>& rhs );
```

Compara os iterators subjacentes de lhs e rhs.

1) Esta sobrecarga participa da resolução de sobrecarga somente se lhs.base() == rhs.base() for bem-formado e conversível para bool. 3-6) Estas sobrecargas participam da resolução de sobrecarga somente se lhs.base() < rhs.base() for bem-formado e conversível para bool. O operator `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. | (desde C++20)

### Parâmetros

- **lhs, rhs** — adaptadores de iterator para comparar

### Valor de retorno

1) lhs.base() == rhs.base()

2) !(lhs == rhs)

3) lhs.base() < rhs.base()

4) !(rhs < lhs)

5) rhs < lhs

6) !(lhs < rhs)

7) lhs.base() <=> rhs.base()

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iterator>
     
    int main()
    {
        int a[]{9, 8, 7, 6};
        //            │  └───── x, y
        //            └──────── z
     
        // “x” e “y” são iguais, mas “x” é maior que “z”
        std::move_iterator<int*>
            x{std::end(a) - 1},
            y{std::end(a) - 1},
            z{std::end(a) - 2};
     
        // two-way comparisons
        assert(  x == y );
        assert(!(x != y));
        assert(!(x <  y));
        assert(  x <= y );
        assert(!(x == z));
        assert(  x != z );
        assert(!(x <  z));
        assert(!(x <= z));
     
        // three-way comparisons
        assert(  x <=> y == 0 );
        assert(!(x <=> y <  0));
        assert(!(x <=> y >  0));
        assert(!(x <=> z == 0));
        assert(!(x <=> z <  0));
        assert(  x <=> z >  0 );
    }
```

### Veja também

[ operator==(std::move_sentinel)](<#/doc/iterator/move_iterator/operator_cmp2>)(C++20) | compara o iterator subjacente e o sentinel subjacente
(modelo de função)