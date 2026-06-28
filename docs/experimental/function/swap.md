# std::experimental::function&lt;R(Args...)&gt;::swap

void swap( function& other ); |  |  (library fundamentals TS)  

  
Troca os objetos invocáveis armazenados de `*this` e `other`.

Os allocators de `*this` e `other` não são trocados.

O comportamento é indefinido se `*this->get_memory_resource() != *other.get_memory_resource()`. | (library fundamentals TS)  
(até library fundamentals TS v3)  
O comportamento é indefinido se `this->get_allocator() != other.get_allocator()`. | (library fundamentals TS v3)  
  
### Parâmetros

other  |  \-  |  wrapper de função para trocar o objeto invocável armazenado com   
  
### Valor de retorno

(nenhum) 