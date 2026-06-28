# std::istreambuf_iterator&lt;CharT,Traits&gt;::operator*

```cpp
CharT operator*() const;
```

Lê um único caractere chamando `sbuf_->sgetc()` onde `sbuf_` é o ponteiro armazenado para o buffer de stream.

O comportamento é indefinido se o iterator for um iterator de fim de stream.

### Parâmetros

(nenhum)

### Valor de retorno

O valor do caractere obtido.

### Exceções

Pode lançar exceções definidas pela implementação.