# std::istreambuf_iterator&lt;CharT,Traits&gt;::operator++, operator++(int)

```cpp
istreambuf_iterator& operator++();  // (1)
/* proxy */ operator++( int );  // (2)
```

  
Avança o iterator chamando `sbuf_->sbumpc()` onde `sbuf_` é o ponteiro armazenado para o stream buffer.

O comportamento é indefinido se o iterator for um iterator de fim de stream.

### Parâmetros

(nenhum)

### Valor de retorno

1) `*this`

2) Um objeto `proxy` contendo o caractere atual obtido via `operator*()` e o ponteiro `sbuf_`. Desreferenciar um objeto `proxy` com `operator*` produz o caractere armazenado.

O nome `proxy` é apenas para fins de exposição.

### Exceções

Pode lançar exceções definidas pela implementação.