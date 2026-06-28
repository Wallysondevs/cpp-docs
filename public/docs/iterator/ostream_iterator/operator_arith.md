# std::ostream_iterator&lt;T,CharT,Traits&gt;::operator++

ostream_iterator& operator++();
ostream_iterator& operator++( int );

  
Não faz nada. Essas sobrecargas de operador são fornecidas para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>). Elas tornam possível que as expressões `*iter++=value` e `*++iter=value` sejam usadas para enviar (inserir) um valor para o stream subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

`*this`