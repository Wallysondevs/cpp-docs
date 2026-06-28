# std::experimental::optional&lt;T&gt;::swap

void swap( optional& other ) noexcept(/* see below */); |  |  (TS de fundamentos da biblioteca)  

  
Troca o conteúdo com o de `other`.

  * Se nem `*this` nem `other` contêm um valor, a função não tem efeito.

  * Se apenas um de `*this` e `other` contém um valor (vamos chamar este objeto de `in` e o outro de `un`), o valor contido de `un` é [inicializado diretamente](<#/doc/language/direct_initialization>) a partir de `std::move(*in)`, seguido pela destruição do valor contido de `in` como se por `in.val->T::~T()`. Após esta chamada, `in` não contém um valor e `un` contém um valor.

  * Se ambos `*this` e `other` contêm valores, os valores contidos são trocados chamando [std::swap](<#/doc/algorithm/swap>); `swap(**this, *other)`. `lvalues` de `T` devem satisfazer [Swappable](<#/doc/named_req/Swappable>).

### Parâmetros

other  |  \-  |  o objeto `optional` para trocar o conteúdo   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação `noexcept`: 

noexcept([std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value &&   
noexcept(swap([std::declval](<#/doc/utility/declval>)<T&>(), [std::declval](<#/doc/utility/declval>)<T&>())))

No caso de uma exceção lançada, os estados dos valores contidos de `*this` e `other` são determinados pelas garantias de segurança de exceção de `swap` do tipo `T` ou do construtor de movimento de `T`, o que for chamado. Para ambos `*this` e `other`, se o objeto continha um valor, ele permanece contendo um valor, e vice-versa. 

### Ver também

[ std::swap(std::experimental::optional)](<#/doc/experimental/optional/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(função)  