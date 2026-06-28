# std::experimental::scope_exit&lt;EF&gt;::scope_exit

template< class Fn >  
explicit scope_exit( Fn&& fn ) noexcept(/*see below*/); |  (1)  |  (library fundamentals TS v3)  
---|---|---
scope_exit( scope_exit&& other ) noexcept(/*see below*/); |  (2)  |  (library fundamentals TS v3)  
scope_exit( const scope_exit& ) = delete; |  (3)  |  (library fundamentals TS v3)  

  
Cria um `scope_exit` a partir de uma função, um objeto de função ou outro `scope_exit`.

1) Inicializa a função de saída com uma função ou objeto de função. O `scope_exit` construído está ativo.

Se `Fn` não for um tipo de referência lvalue e [std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<EF, Fn> for true, o `EF` armazenado é inicializado com [std::forward](<#/doc/utility/forward>)&lt;Fn&gt;(fn); caso contrário, é inicializado com fn.

Se a inicialização do `EF` armazenado lançar uma exceção, chama fn().

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_same_v](<#/doc/types/is_same>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;Fn&gt;, scope_exit> for false e [std::is_constructible_v](<#/doc/types/is_constructible>)<EF, Fn> for true.

O programa é malformado se a expressão de chamada de função fn() for malformada.

O comportamento é indefinido se chamar fn() lançar uma exceção ou resultar em comportamento indefinido, mesmo que fn não tenha sido chamada.

2) Construtor de movimento. Inicializa o `EF` armazenado com o de other. O `scope_exit` construído está ativo se e somente se other estiver ativo antes da construção.

Se [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for true, inicializa o `EF` armazenado (denotado por `exitfun`) com [std::forward](<#/doc/utility/forward>)&lt;EF&gt;(other.exitfun), caso contrário, o inicializa com other.exitfun.

Após a construção de movimento bem-sucedida, other.release() é chamado e other se torna inativo.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for true ou [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;EF&gt; for true.

O comportamento é indefinido se

  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for true e `EF` não atender aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>), ou
  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt; for false e `EF` não atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).

3) `scope_exit` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parameters

fn  |  \-  |  função ou objeto de função usado para inicializar o `EF` armazenado  
---|---|---
other  |  \-  |  `scope_exit` do qual mover   
  
### Exceptions

Qualquer exceção lançada durante a inicialização do `EF` armazenado.

1)

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept([std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<EF, Fn>
[std::is_nothrow_constructible_v](<#/doc/types/is_constructible>)<EF, Fn&>)

2)

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;EF&gt;
[std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;EF&gt;)

### Example

| Esta seção está incompleta  
Razão: sem exemplo   
  
### See also

[ release](<#/doc/experimental/scope_exit/release>) |  torna o `scope_exit` inativo   
(função membro pública)  