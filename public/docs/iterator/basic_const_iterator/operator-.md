# operator-(std::basic_const_iterator)

```cpp
template< std::sized_sentinel_for<Iter> S >
constexpr difference_type operator-( const S& s ) const;  // (1) (desde C++23)
template< /*not-a-const-iterator*/ S >
requires std::sized_sentinel_for<S, Iter>
friend constexpr difference_type
operator-( const S& s, const basic_const_iterator& i );  // (2) (desde C++23)
```

  
Retorna a distância entre `basic_const_iterator` e seu sentinel. 

S satisfaz o concept apenas para exposição /*not-a-const-iterator*/ se e somente se não for uma especialização de `basic_const_iterator`. 

### Parâmetros

i, s  |  \-  |  iterator e sentinel para calcular a diferença   
  
### Valor de retorno

1) base() - s

2) s - i.base()

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   