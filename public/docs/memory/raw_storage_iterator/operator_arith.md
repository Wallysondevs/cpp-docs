# std::raw_storage_iterator&lt;OutputIt,T&gt;::operator++, operator++(int)

raw_storage_iterator& operator++();
raw_storage_iterator operator++( int );

  
Avança o iterator. 

1) Pré-incremento. Retorna o iterator atualizado. 

2) Pós-incremento. Retorna o valor antigo do iterator. 

### Parâmetros

(nenhum) 

### Valor de retorno

1) *this

2) O valor antigo do iterator.