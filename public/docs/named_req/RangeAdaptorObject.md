# Requisitos nomeados C++: RangeAdaptorObject (desde C++20)

_Objetos adaptadores de range_ são objetos de ponto de customização que aceitam um [`viewable_range`](<#/doc/ranges/viewable_range>) como seu primeiro argumento e retornam um [`view`](<#/doc/ranges/view>). Alguns objetos adaptadores de range são unários, ou seja, eles recebem um [`viewable_range`](<#/doc/ranges/viewable_range>) como seu único argumento. Outros objetos adaptadores de range recebem um [`viewable_range`](<#/doc/ranges/viewable_range>) e outros argumentos subsequentes.

Se um objeto adaptador de range recebe apenas um argumento, ele também é um [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>).

Se um objeto adaptador de range recebe mais de um argumento, ele também suporta aplicação parcial: seja

* a um tal objeto adaptador de range, e
* args... argumentos (geralmente adequados para argumentos subsequentes),

a expressão a(args...) possui as seguintes propriedades:

* é válida se e somente se para cada argumento e em args... tal que `E` seja decltype((e)), [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;E&gt;, E> for verdadeiro,
* quando a chamada é válida, seu objeto resultante armazena um subobjeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;E&gt; inicializado diretamente sem lista com [std::forward](<#/doc/utility/forward>)&lt;E&gt;(e), para cada argumento e em args... (em outras palavras, objetos adaptadores de range vinculam argumentos por valor),
* o objeto resultante é um [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>),
* chamar o [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>) encaminha os argumentos vinculados (se houver) para o objeto adaptador de range associado. Os argumentos vinculados (se houver) são considerados como tendo a categoria de valor e a qualificação cv do [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>). Em outras palavras, a(args...)(r) é equivalente a [std::bind_back](<#/doc/utility/functional/bind_front>)(a, args...)(r) (mas o primeiro também suporta a sintaxe pipe).(desde C++23)

Assim como outros objetos de ponto de customização, seja

* a um objeto da versão não-cv-qualificada do tipo de quaisquer objetos adaptadores de range,
* args... qualquer grupo de argumentos que satisfaça as restrições do operator() do tipo de a,

chamadas para

* a(args...),
* [std::as_const](<#/doc/utility/as_const>)(a)(args...),
* std::move(a)(args...), e
* std::move([std::as_const](<#/doc/utility/as_const>)(a))(args...)

são todas equivalentes.

O objeto resultante de cada uma dessas expressões é ou um objeto [`view`](<#/doc/ranges/view>) ou um [RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>).

### Notas

operator() não é suportado para versões volatile-qualified ou const-volatile-qualified de tipos de objetos adaptadores de range. Arrays e funções são convertidos para ponteiros durante a vinculação.
*[_(as is)_]: A::pointer