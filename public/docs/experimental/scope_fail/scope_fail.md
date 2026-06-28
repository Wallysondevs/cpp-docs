# std::experimental::scope_fail&lt;EF&gt;::scope_fail

template< class Fn >  
explicit scope_fail( Fn&& fn ) noexcept(/*see below*/); |  (1)  |  (TS de fundamentos da biblioteca v3)  
---|---|---
scope_fail( scope_fail&& other ) noexcept(/*see below*/); |  (2)  |  (TS de fundamentos da biblioteca v3)  
scope_fail( const scope_fail& ) = delete; |  (3)  |  (TS de fundamentos da biblioteca v3)  

  
Cria um `scope_fail` a partir de uma função, um objeto de função ou outro `scope_fail`.

1) Inicializa a função de saída com uma função ou objeto de função, e inicializa o contador de exceções não capturadas como se fosse com [std::uncaught_exceptions](<#/doc/error/exception/uncaught_exception>)(). O `scope_fail` construído está ativo.

Se `Fn` não for um tipo de referência lvalue e [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<EF, Fn> for verdadeiro, o `EF` armazenado é inicializado com [std::forward](<#/doc/utility/forward>)&lt;Fn&gt;(fn); caso contrário, é inicializado com fn.

Se a inicialização do `EF` armazenado lançar uma exceção, chama fn().

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_same_v](<#/doc/types/is_same>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Fn&gt;, scope_fail> for falso e [std::is_constructible_v](<#/doc/types/is_constructible>)<EF, Fn> for verdadeiro.

O programa é malformado se a expressão de chamada de função fn() for malformada.

O comportamento é indefinido se chamar fn() lançar uma exceção ou resultar em comportamento indefinido, mesmo que fn não tenha sido chamado.

2) Construtor de movimento. Inicializa o `EF` armazenado com o de other, e inicializa o contador de exceções não capturadas com o de other. O `scope_fail` construído está ativo se e somente se other estiver ativo antes da construção.

Se [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for verdadeiro, inicializa o `EF` armazenado (denotado por `exitfun`) com [std::forward](<#/doc/utility/forward>)&lt;EF&gt;(other.exitfun), caso contrário, inicializa-o com other.exitfun.

Após a construção por movimento bem-sucedida, other.release() é chamado e other se torna inativo.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for verdadeiro ou [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;EF&gt; for verdadeiro.

O comportamento é indefinido se

  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for verdadeiro e `EF` não atender aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>), ou
  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for falso e `EF` não atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).

3) `scope_fail` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

fn  |  \-  |  função ou objeto de função usado para inicializar o `EF` armazenado  
---|---|---
other  |  \-  |  `scope_fail` do qual mover   
  
### Exceções

Qualquer exceção lançada durante a inicialização do `EF` armazenado.

1)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<EF, Fn>
[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<EF, Fn&>)

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt;
[std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;EF&gt;)

### Exemplo

| Esta seção está incompleta  
Motivo: sem exemplo   
  
### Ver também

[ uncaught_exceptionuncaught_exceptions](<#/doc/error/exception/uncaught_exception>)(removido em C++20*)(C++17) |  verifica se o tratamento de exceções está atualmente em andamento   
(função)  
[ release](<#/doc/experimental/scope_fail/release>) |  torna o `scope_fail` inativo   
(função membro pública)