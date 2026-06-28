# std::experimental::unique_resource

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`

```c
template< class R, class D >
class unique_resource;
```

  
`unique_resource` é um wrapper RAII universal para handles de recurso que possui e gerencia um recurso através de um handle e descarta esse recurso quando o `unique_resource` é destruído.

O recurso é descartado usando o deleter do tipo `D` quando uma das seguintes situações ocorre:

  * o objeto `unique_resource` gerenciador é destruído,
  * o objeto `unique_resource` gerenciador é atribuído a partir de outro recurso via `operator=` ou `reset()`.

Seja o tipo `RS` igual a `R` se `R` for um tipo de objeto, ou [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;R&gt;> caso contrário:

  * `unique_resource` efetivamente mantém um subobjeto do tipo `RS` que é ou envolve o handle de recurso, um deleter do tipo `D` e um flag booleano indicando se o wrapper está possuindo o recurso.
  * Para fins explicativos, o subobjeto do tipo `RS` é chamado de _handle de recurso armazenado_, e o `R` armazenado (se `R` for um tipo de objeto) ou envolvido (se `R` for um tipo de referência) é chamado de _handle de recurso subjacente_. Esses dois termos não são usados pelo LFTS.

### Parâmetros de template

R  |  \-  |  tipo de handle de recurso   
---|---|---
D  |  \-  |  tipo de deleter   
Requisitos de tipo   
-`R` deve ser um tipo de objeto ou uma referência lvalue para um tipo de objeto. Seja `UnrefR` igual a [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;R&gt;, `UnrefR` deve ser [MoveConstructible](<#/doc/named_req/MoveConstructible>), e se `UnrefR` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;UnrefR&gt; deve ser verdadeiro.   
-`D` deve ser um tipo [Destructible](<#/doc/named_req/Destructible>) e [MoveConstructible](<#/doc/named_req/MoveConstructible>) [FunctionObject](<#/doc/named_req/FunctionObject>), e se `D` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;D&gt; deve ser verdadeiro. Dado um lvalue `d` do tipo `D` e um lvalue `r` do tipo `UnrefR`, a expressão `d(r)` deve ser bem-formada.   
  
### Funções membro

[ (construtor)](<#/doc/experimental/unique_resource/unique_resource>) |  constrói um novo `unique_resource`   
(função membro pública)  
[ (destrutor)](<#/doc/experimental/unique_resource/~unique_resource>) |  descarta o recurso gerenciado se este estiver presente   
(função membro pública)  
[ operator=](<#/>) |  atribui um `unique_resource`   
(função membro pública)  
  
#####  Modificadores   
  
[ release](<#/doc/experimental/unique_resource/release>) |  libera a posse   
(função membro pública)  
[ reset](<#/doc/experimental/unique_resource/reset>) |  descarta ou substitui o recurso gerenciado   
(função membro pública)  
  
#####  Observadores   
  
[ get](<#/doc/experimental/unique_resource/get>) |  acessa o handle de recurso subjacente   
(função membro pública)  
[ get_deleter](<#/doc/experimental/unique_resource/get_deleter>) |  acessa o deleter usado para descartar o recurso gerenciado   
(função membro pública)  
[ operator*operator->](<#/doc/experimental/unique_resource/operator_star_>) |  acessa o objeto apontado se o handle de recurso for um ponteiro   
(função membro pública)  
  
### Funções não-membro

[ make_unique_resource_checked](<#/doc/experimental/unique_resource/make_unique_resource_checked>) |  cria um `unique_resource`, verificando valor inválido   
(modelo de função)  
  
### [Guias de dedução](<#/doc/experimental/unique_resource/deduction_guides>)

### Notas

Tipos de handle de recurso que satisfazem [NullablePointer](<#/doc/named_req/NullablePointer>) também podem ser gerenciados por [std::unique_ptr](<#/doc/memory/unique_ptr>). Ao contrário de `unique_ptr`, `unique_resource` não exige [NullablePointer](<#/doc/named_req/NullablePointer>).

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) |  smart pointer com semântica de posse única de objeto   
(modelo de classe)  