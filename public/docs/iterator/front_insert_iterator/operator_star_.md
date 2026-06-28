# std::front_insert_iterator&lt;Container&gt;::operator*

```cpp
front_insert_iterator& operator*(); |  | (ate C++20)
constexpr front_insert_iterator& operator*();  // (desde C++20)
```

  
Não faz nada, esta função membro é fornecida para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

Ele retorna o próprio iterator, o que torna possível usar código como `*iter = value` para enviar (inserir) o valor para o container subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

`*this`