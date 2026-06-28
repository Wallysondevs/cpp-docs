# std::counted_iterator&lt;I&gt;::operator++,+,+=,--,-,-=

```cpp
constexpr counted_iterator& operator++();  // (1) (desde C++20)
constexpr decltype(auto) operator++( int );  // (2) (desde C++20)
constexpr counted_iterator operator++( int )
requires std::forward_iterator<I>;  // (3) (desde C++20)
constexpr counted_iterator& operator\--()
requires std::bidirectional_iterator<I>;  // (4) (desde C++20)
constexpr counted_iterator operator\--( int )
requires std::bidirectional_iterator<I>;  // (5) (desde C++20)
constexpr counted_iterator operator+( std::iter_difference_t<I> n ) const
requires std::random_access_iterator<I>;  // (6) (desde C++20)
constexpr counted_iterator& operator+=( std::iter_difference_t<I> n )
requires std::random_access_iterator<I>;  // (7) (desde C++20)
constexpr counted_iterator operator-( std::iter_difference_t<I> n ) const
requires std::random_access_iterator<I>;  // (8) (desde C++20)
constexpr counted_iterator& operator-=( std::iter_difference_t<I> n )
requires std::random_access_iterator<I>;  // (9) (desde C++20)
```

  
Incrementa ou decrementa o iterator subjacente `_current_` e a distância até o final `_length_`.

O comportamento dessas funções é indefinido se `_length_` for definido para um valor negativo.

1) Pré-incrementa em um. Equivalente a `++current; --length; return *this;`.

2) Pós-incrementa em um. Equivalente a `--length; try { return current++; } catch(...) { ++length; throw; }`.

3) Pós-incrementa em um. Equivalente a `counted_iterator temp{*this}; ++*this; return temp;`.

4) Pré-decrementa em um. Equivalente a `--current; ++length; return *this;`.

5) Pós-decrementa em um. Equivalente a `counted_iterator temp{*this}; --*this; return temp;`.

6) Retorna um adaptador de iterator que é avançado por n. Equivalente a `return counted_iterator(current + n, length - n);`.

7) Avança o adaptador de iterator por n. Equivalente a `current += n; length -= n; return *this;`.

8) Retorna um adaptador de iterator que é avançado por -n. Equivalente a `return counted_iterator(current - n, length + n);`.

9) Avança o adaptador de iterator por -n. Equivalente a `current -= n; length += n; return *this;`.

### Parâmetros

n  |  \-  |  o número de posições para incrementar ou decrementar o adaptador de iterator   
  
### Valor de retorno

1) `*this`

2,3) Uma cópia de `*this` que foi feita antes da alteração.

4) `*this`

5) Uma cópia de `*this` que foi feita antes da alteração.

6) Um adaptador de iterator que é avançado por n.

7) `*this`

8) Um adaptador de iterator que é avançado por -n.

9) `*this`

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <initializer_list>
    #include <iterator>
     
    int main()
    {
        const auto v = {1, 2, 3, 4, 5, 6};
        std::counted_iterator<std::initializer_list<int>::iterator> it1{v.begin(), 5};
     
        ++it1;              assert(*it1 == 2 && it1.count() == 4); // (1)
        auto it2 = it1++;   assert(*it2 == 2 && *it1 == 3);        // (3)
        --it1;              assert(*it1 == 2 && it1.count() == 4); // (4)
        auto it3 = it1--;   assert(*it3 == 2 && *it1 == 1);        // (5)
        auto it4 = it1 + 3; assert(*it4 == 4 && it4.count() == 2); // (6)
        auto it5 = it4 - 3; assert(*it5 == 1 && it5.count() == 5); // (8)
        it1 += 3;           assert(*it1 == 4 && it1.count() == 2); // (7)
        it1 -= 3;           assert(*it1 == 1 && it1.count() == 5); // (9)
    }
```

### Veja também

[ operator+](<#/>) (desde C++20) |  avança o iterator   
(function template)  
[ operator-](<#/doc/iterator/counted_iterator/operator->) (desde C++20) |  calcula a distância entre dois adaptadores de iterator   
(function template)