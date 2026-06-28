# std::experimental::scope_success&lt;EF&gt;::~scope_success

~scope_success() noexcept(noexcept([std::declval](<#/doc/utility/declval>)<EF&>()())); |  |  (library fundamentals TS v3)  

  
Chama a função de saída se o resultado de [std::uncaught_exceptions](<#/doc/error/exception/uncaught_exception>)() for menor ou igual ao contador de exceções não capturadas (tipicamente em saída normal) e o `scope_success` estiver ativo, então destrói o `EF` armazenado (se for um objeto de função) e quaisquer outros membros de dados não estáticos. 

### Exceções

Lança qualquer exceção lançada ao chamar a função de saída. 

### Notas

Se o destrutor é chamado durante o desenrolamento da pilha (stack unwinding) pode ser detectado pela comparação do resultado de [std::uncaught_exceptions](<#/doc/error/exception/uncaught_exception>)() e o contador de exceções não capturadas no `scope_success`. 

Ao contrário de outras classes ou especializações de template de classe na standard library C++ e outros TR/TSs C++, o destrutor de `scope_success` tem permissão para lançar uma exceção. 

### Veja também

[ release](<#/doc/experimental/scope_success/release>) |  torna o `scope_success` inativo   
(função membro pública)  