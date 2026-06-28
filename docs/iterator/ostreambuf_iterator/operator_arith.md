# std::ostreambuf_iterator&lt;CharT,Traits&gt;::operator++

ostreambuf_iterator& operator++();
ostreambuf_iterator& operator++( int );

  
Não faz nada. Essas sobrecargas de operador são fornecidas para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>). Elas possibilitam que as expressões *iter++=value e *++iter=value sejam usadas para enviar (inserir) um valor no stream subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

*this