# std::back_insert_iterator&lt;Container&gt;::operator*

```cpp
back_insert_iterator& operator*();  // (até C++20)
constexpr back_insert_iterator& operator*();  // (desde C++20)
```

Não faz nada, esta função membro é fornecida para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

Ela retorna o próprio iterator, o que torna possível usar código como `*iter = value` para enviar (inserir) o valor no container subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

`*this`