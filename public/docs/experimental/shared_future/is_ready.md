# std::experimental::shared_future&lt;T&gt;::is_ready

bool is_ready() const;

  
Verifica se o estado compartilhado associado está pronto.

O comportamento é indefinido se valid() for false.

### Parâmetros

(nenhum)

### Valor de retorno

true se o estado compartilhado associado estiver pronto, caso contrário false.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também 

[ valid](<#/doc/thread/shared_future/valid>) | verifica se o future possui um estado compartilhado   
(função membro pública de `std::shared_future<T>`)  