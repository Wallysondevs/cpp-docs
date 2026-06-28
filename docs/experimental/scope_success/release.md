# std::experimental::scope_success&lt;EF&gt;::release

void release() noexcept; | | (library fundamentals TS v3)

Torna o `scope_success` inativo.

Uma vez que um `scope_success` está inativo, ele não pode se tornar ativo novamente e não chamará sua função de saída na destruição.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Observações

`release` pode ser chamado manualmente ou automaticamente pelo construtor de movimento de `scope_success`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ (constructor)](<#/doc/experimental/scope_success/scope_success>) | constrói um novo `scope_success`
(função membro pública)
[ (destructor)](<#/doc/experimental/scope_success/~scope_success>) | chama a função de saída quando o escopo é encerrado normalmente se o `scope_success` estiver ativo, então destrói o `scope_success`
(função membro pública)