# std::experimental::scope_fail&lt;EF&gt;::release

void release() noexcept; |  |  (library fundamentals TS v3)  

  
Torna o `scope_fail` inativo. 

Uma vez que um `scope_fail` está inativo, ele não pode se tornar ativo novamente e não chamará sua função de saída na destruição. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Observações

`release` pode ser chamado manualmente ou automaticamente pelo construtor de movimento de `scope_fail`. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (construtor)](<#/doc/experimental/scope_fail/scope_fail>) |  constrói um novo `scope_fail`   
(função membro pública)  
[ (destrutor)](<#/doc/experimental/scope_fail/~scope_fail>) |  chama a função de saída quando o escopo é encerrado via uma exceção se o `scope_fail` estiver ativo, então destrói o `scope_fail`   
(função membro pública)