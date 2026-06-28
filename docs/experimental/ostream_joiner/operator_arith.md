# std::experimental::ostream_joiner&lt;DelimT,CharT,Traits&gt;::operator++

ostream_joiner& operator++() noexcept; | | (library fundamentals TS v2)
---|---|---
ostream_joiner& operator++( int ) noexcept; | | (library fundamentals TS v2)

Não faz nada. Essas sobrecargas de operador são fornecidas para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>). Elas tornam possível que as expressões `*iter++=value` e `*++iter=value` sejam usadas para enviar (inserir) um valor para o stream subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

*this