# std::regex_token_iterator&lt;BidirIt,CharT,Traits&gt;::operator*, operator-&gt;

```cpp
const value_type& operator*() const;  // (1) (desde C++11)
const value_type* operator->() const;  // (2) (desde C++11)
```

Retorna um ponteiro ou referência para a correspondência atual.

### Valor de retorno

1) Retorna uma referência para a correspondência atual.

2) Retorna um ponteiro para a correspondência atual.

O comportamento é indefinido se o iterator for um iterator de fim de sequência.