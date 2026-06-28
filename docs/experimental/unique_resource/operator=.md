# std::experimental::unique_resource&lt;R, D&gt;::operator=

unique_resource& operator=( unique_resource&& other )  
noexcept(/*see below*/); |  |  (library fundamentals TS v3)  

  
Operador de atribuição por movimento. Substitui o recurso gerenciado e o deleter pelos de `other`.

Formalmente, seja `RS` o tipo do handle de recurso armazenado:

  * Primeiro, chama `reset()` para descartar o recurso atualmente possuído, se houver.
  * Em seguida, atribui o handle de recurso armazenado e o deleter com os de `other`. `std::move` é aplicado ao handle de recurso armazenado ou ao deleter de `other` se [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;RS&gt; ou [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;D&gt; for verdadeiro, respectivamente. A atribuição do handle de recurso armazenado é executada primeiro, a menos que [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;D&gt; seja falso e [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;RS&gt; seja verdadeiro.
  * Finalmente, define `*this` para possuir o recurso se e somente se `other` o possuía antes da atribuição, e `other` para não possuir o recurso.

Se [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;RS&gt; for verdadeiro, `RS` deve satisfazer os requisitos [MoveAssignable](<#/doc/named_req/MoveAssignable>); caso contrário, `RS` deve satisfazer os requisitos [CopyAssignable](<#/doc/named_req/CopyAssignable>). Se [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;D&gt; for verdadeiro, `D` deve satisfazer os requisitos [MoveAssignable](<#/doc/named_req/MoveAssignable>); caso contrário, `D` deve satisfazer os requisitos [CopyAssignable](<#/doc/named_req/CopyAssignable>). O não cumprimento dos requisitos acima resulta em comportamento indefinido.

### Parâmetros

other  |  \-  |  wrapper de recurso do qual a posse será transferida   
  
### Valor de retorno

`*this`

### Exceções

Qualquer exceção lançada na atribuição por cópia.

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;RS&gt; && [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;D&gt;)

### Notas

Se uma cópia de um membro lançar uma exceção, este mecanismo deixa `other` intacto e `*this` no estado liberado.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ reset](<#/doc/experimental/unique_resource/reset>) |  descarta ou substitui o recurso gerenciado   
(função membro pública)  
[ operator=](<#/>) |  atribui o `unique_ptr`   
(função membro pública de `std::unique_ptr<T,Deleter>`)