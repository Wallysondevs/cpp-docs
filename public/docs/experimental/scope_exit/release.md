# std::experimental::scope_exit&lt;EF&gt;::release

void release() noexcept; |  |  (library fundamentals TS v3)  

  
Torna o `scope_exit` inativo.

Uma vez que um `scope_exit` esteja inativo, ele não pode se tornar ativo novamente, e não chamará sua função de saída na destruição.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Observações

`release` pode ser chamado manualmente ou automaticamente pelo construtor de movimento de `scope_exit`.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (construtor)](<#/doc/experimental/scope_exit/scope_exit>) | constrói um novo `scope_exit`   
(função membro pública)  
[ (destrutor)](<#/doc/experimental/scope_exit/~scope_exit>) | chama a função de saída quando o escopo é encerrado se o `scope_exit` estiver ativo, então destrói o `scope_exit`   
(função membro pública)