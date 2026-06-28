# std::regex_token_iterator&lt;BidirIt,CharT,Traits&gt;::operator++, operator++(int)

```cpp
regex_token_iterator& operator++();  // (desde C++11)
regex_token_iterator operator++( int );  // (desde C++11)
```

  
Avança o `iterator` para a próxima sub-correspondência.

| Esta seção está incompleta  
Razão: Explicar melhor. Por exemplo, `subs` é um `vector` apenas para exposição de sub-expressões correspondidas.   
  
Se `*this` é um `suffix iterator`, define `*this` como um `end-of-sequence iterator`.

Caso contrário, se `N + 1 < subs.size()`, incrementa `N` e define `result` para o endereço da correspondência atual.

Caso contrário, define `N` como ​0​ e incrementa `position`. Se `position` não é um `end-of-sequence iterator`, o `operator` define `result` para o endereço da correspondência atual.

Caso contrário, se qualquer um dos valores armazenados em `subs` for igual a -1 e `prev->suffix().length()` não for ​0​, o `operator` define `*this` como um `suffix iterator` que aponta para o `range` [`prev->suffix().first`, `prev->suffix().second`).

Caso contrário, define `*this` como um `end-of-sequence iterator`.

O comportamento é indefinido se o `iterator` é um `end-of-sequence iterator`.

### Parâmetros

(nenhum)

### Valor de retorno

1) `*this`

2) O valor anterior do `iterator`.