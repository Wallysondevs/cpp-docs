# std::raw_storage_iterator&lt;OutputIt,T&gt;::operator=

```cpp
raw_storage_iterator& operator=( const T& el );  // (1)
raw_storage_iterator& operator=( T&& el );  // (2) (desde C++17)
```

  
1) Constrói um valor no local para onde o iterator aponta a partir de el.

2) Constrói um valor no local para onde o iterator aponta a partir de std::move(el).

### Parâmetros

el  |  \-  |  o valor a ser copiado ou movido de   
  
### Valor de retorno

*this