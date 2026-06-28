# std::basic_const_iterator&lt;Iter&gt;::operator==,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;

```cpp
Comparação de igualdade
template< std::sentinel_for<Iter> S >
constexpr bool operator==( const S& s ) const;  // (1) (desde C++23)
Comparações relacionais entre dois `basic_const_iterator`s
constexpr bool operator<( const basic_const_iterator& y ) const
requires std::random_access_iterator<Iter>;  // (2) (desde C++23)
constexpr bool operator>( const basic_const_iterator& y ) const
requires std::random_access_iterator<Iter>;  // (3) (desde C++23)
constexpr bool operator<=( const basic_const_iterator& y ) const
requires std::random_access_iterator<Iter>;  // (4) (desde C++23)
constexpr bool operator>=( const basic_const_iterator& y ) const
requires std::random_access_iterator<Iter>;  // (5) (desde C++23)
constexpr auto operator<=>( const basic_const_iterator& y ) const
requires std::random_access_iterator<Iter> && std::three_way_comparable<Iter>;  // (6) (desde C++23)
Comparações relacionais entre `basic_const_iterator` e outro tipo
template< /*different-from*/<basic_const_iterator> I >
constexpr bool operator<( const I& y ) const
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (7) (desde C++23)
template< /*different-from*/<basic_const_iterator> I >
constexpr bool operator>( const I& y ) const
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (8) (desde C++23)
template< /*different-from*/<basic_const_iterator> I >
constexpr bool operator<=( const I& y ) const
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (9) (desde C++23)
template< /*different-from*/<basic_const_iterator> I >
constexpr bool operator>=( const I& y ) const
requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;  // (10) (desde C++23)
template< /*different-from*/<basic_const_iterator> I >
constexpr auto operator<=>( const I& y ) const
requires std::random_access_iterator<Iter> &&
std::totally_ordered_with<Iter, I> &&
std::three_way_comparable_with<Iter, I>;  // (11) (desde C++23)
```

  
Compara um `basic_const_iterator` com outro valor.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

`I` satisfaz /*different-from*/<basic_const_iterator> se [std::same_as](<#/doc/concepts/same_as>)<I, basic_const_iterator&lt;Iter&gt;> for falso.

### Parâmetros

s  |  \-  |  um sentinel para `Iter`  
---|---|---
y  |  \-  |  um valor para comparar   
  
### Valor de retorno

1) base() == s

2) base() < y.base()

3) base() > y.base()

4) base() <= y.base()

5) base() >= y.base()

6) base() <=> y.base()

7) base() < y

8) base() > y

9) base() <= y

10) base() >= y

11) base() <=> y

### Observações

A sobrecarga ([1](<#/doc/iterator/basic_const_iterator/operator_cmp>)) pode ser usada para comparar dois valores `basic_const_iterator<Iter>` se `Iter` modela sentinel_for&lt;Iter&gt;.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

| Esta seção está incompleta   