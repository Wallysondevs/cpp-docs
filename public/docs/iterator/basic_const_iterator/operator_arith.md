# std::basic_const_iterator&lt;Iter&gt;::operator++,--,+=,-=

```cpp
constexpr basic_const_iterator& operator++();  // (1) (desde C++23)
constexpr void operator++(int);  // (2) (desde C++23)
constexpr basic_const_iterator operator++(int)
requires std::forward_iterator<Iter>;  // (3) (desde C++23)
constexpr basic_const_iterator& operator\--()
requires std::bidirectional_iterator<Iter>;  // (4) (desde C++23)
constexpr basic_const_iterator operator\--(int)
requires std::bidirectional_iterator<Iter>;  // (5) (desde C++23)
constexpr basic_const_iterator& operator+=( difference_type n )
requires std::random_access_iterator<Iter>;  // (6) (desde C++23)
constexpr basic_const_iterator& operator-=( difference_type n )
requires std::random_access_iterator<Iter>;  // (7) (desde C++23)
```

Incrementa ou decrementa o iterator, aplicando a operação correspondente no iterator subjacente.

1-3) Incrementa em um.

4,5) Decrementa em um.

6,7) Avança o iterator em n ou -n posições, respectivamente.

### Valor de retorno

1,4,6,7) *this

3,5) Uma cópia de *this que foi feita antes da alteração

2) (nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/move_iterator/operator_arith>)(desde C++11) | avança ou decrementa o iterator
(função membro pública de `std::move_iterator<Iter>`)