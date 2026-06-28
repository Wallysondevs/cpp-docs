# std::packaged_task&lt;R(Args...)&gt;::~packaged_task

~packaged_task();

  
Abandona o estado compartilhado e destrói o objeto de tarefa armazenado.

Assim como em [std::promise::~promise](<#/doc/thread/promise/~promise>), se o estado compartilhado for abandonado antes de ser preparado, uma exceção [std::future_error](<#/doc/thread/future_error>) é armazenada com o código de erro [std::future_errc::broken_promise](<#/doc/thread/future_errc>)).

### Parâmetros

(nenhum)

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   