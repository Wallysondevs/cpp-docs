# std::ostreambuf_iterator&lt;CharT,Traits&gt;::operator*

ostreambuf_iterator& operator*();

  
Não faz nada, esta função membro é fornecida para satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>). 

Ela retorna o próprio iterator, o que torna possível usar código como `*iter = value` para enviar (inserir) o valor para o stream subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

`*this`