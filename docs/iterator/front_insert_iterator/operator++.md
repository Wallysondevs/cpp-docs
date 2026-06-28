# std::front_insert_iterator&lt;Container&gt;::operator++

```cpp
front_insert_iterator& operator++();  // (até C++20)
constexpr front_insert_iterator& operator++();  // (desde C++20)
front_insert_iterator operator++( int );  // (até C++20)
constexpr front_insert_iterator operator++( int );  // (desde C++20)
```

  
Não faz nada. Essas sobrecargas de operador são fornecidas para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>). Elas tornam possível que as expressões *iter++=value e *++iter=value sejam usadas para produzir (inserir) um valor no container subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

*this