# std::experimental::scope_fail&lt;EF&gt;::~scope_fail

~scope_fail() noexcept; |  |  (library fundamentals TS v3)  

  
Chama a função de saída se o resultado de [std::uncaught_exceptions](<#/doc/error/exception/uncaught_exception>)() for maior que o contador de exceções não capturadas (tipicamente durante o desenrolamento da pilha) e o `scope_fail` estiver ativo, então destrói o `EF` armazenado (se for um objeto de função) e quaisquer outros membros de dados não estáticos.

### Notas

Se o destrutor é chamado durante o desenrolamento da pilha pode ser detectado pela comparação do resultado de [std::uncaught_exceptions](<#/doc/error/exception/uncaught_exception>)() e o contador de exceções não capturadas no `scope_fail`.

### Veja também

[ release](<#/doc/experimental/scope_fail/release>) |  torna o `scope_fail` inativo   
(função membro pública)  