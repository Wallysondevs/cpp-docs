# std::barrier&lt;CompletionFunction&gt;::wait

void wait( arrival_token&& arrival ) const; |  |  (desde C++20)  

  
Se `arrival` estiver associado ao ponto de sincronização de fase para a fase atual de `*this`, bloqueia no ponto de sincronização associado a `arrival` até que a etapa de conclusão de fase da fase do ponto de sincronização seja executada.

Caso contrário, se `arrival` estiver associado ao ponto de sincronização de fase para a fase imediatamente anterior de `*this`, retorna imediatamente.

Caso contrário, ou seja, se `arrival` estiver associado ao ponto de sincronização de fase para uma fase anterior de `*this` ou qualquer fase de um objeto `barrier` diferente de `*this`, o comportamento é indefinido.

### Parâmetros

arrival  |  \-  |  um `arrival_token` obtido por uma chamada anterior a [`arrive`](<#/doc/thread/barrier/arrive>) no mesmo `barrier`  
  
### Valor de retorno

(nenhum)

### Exceções

Lança [std::system_error](<#/doc/error/system_error>) com um código de erro permitido para tipos de mutex em caso de erro.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ arrive](<#/doc/thread/barrier/arrive>) | chega à barrier e decrementa a contagem esperada   
(função membro pública)  