# std::queue&lt;T,Container&gt;::front

reference front();
const_reference front() const;

  
Retorna uma referência para o primeiro elemento na queue. Este elemento será o primeiro a ser removido em uma chamada a [pop()](<#/doc/container/queue/pop>). Efetivamente chama c.front(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Referência para o primeiro elemento. 

### Complexidade

Constante. 

### Veja também

[ back](<#/doc/container/queue/back>) |  acessa o último elemento   
(função membro pública)  
[ pop](<#/doc/container/queue/pop>) |  remove o primeiro elemento   
(função membro pública)