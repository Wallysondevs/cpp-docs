# std::function_ref

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class... >
class function_ref; // not defined
template< class R, class... Args >
class function_ref<R(Args...)>;
template< class R, class... Args >
class function_ref<R(Args...) noexcept>;
template< class R, class... Args >
class function_ref<R(Args...) const>;
template< class R, class... Args >
class function_ref<R(Args...) const noexcept>;
```

O template de classe `std::function_ref` é um wrapper de função não-proprietário. Objetos `std::function_ref` podem armazenar e invocar referências a um _alvo_ [Callable](<#/doc/named_req/Callable>) - funções, [expressões lambda](<#/doc/language/lambda>), [expressões bind](<#/doc/utility/functional/bind>), ou outros objetos de função, mas não ponteiros para funções membro e ponteiros para objetos membro. [std::nontype](<#/doc/utility/nontype>) pode ser usado para construir `std::function_ref` passando ponteiros de função, ponteiros para funções membro e ponteiros para objetos membro.

`std::function_ref`s suporta todas as combinações possíveis de [cv-qualifiers](<#/doc/language/member_functions>) (excluindo volatile), e [noexcept-specifiers](<#/doc/language/noexcept_spec>) fornecidas em seu parâmetro de template.

Cada especialização de `std::function_ref` é um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) que satisfaz [`copyable`](<#/doc/concepts/copyable>).

### Tipos Membro

Membro | Definição
---|---
`_BoundEntityType_` (privado) | tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) não especificado que satisfaz [`copyable`](<#/doc/concepts/copyable>) e é capaz de armazenar um ponteiro para valor de objeto ou ponteiro para valor de função (tipo membro apenas para exposição*)
`_FunctionPointerType_` (privado) | R(*)(`_BoundEntityType_` ﻿, Args&&...) noexcept(noex ﻿) onde noex é verdadeiro se noexcept estiver presente na assinatura da função como parte do parâmetro de template de `std::function_ref`, falso caso contrário (tipo membro apenas para exposição*)

### Membros de Dados

Membro | Definição
---|---
`_BoundEntityType_` `_bound-entity_` | um objeto de entidade vinculada (objeto membro apenas para exposição*)
`_FunctionPointerType_` `_thunk-ptr_` | um ponteiro armazenado para função (objeto membro apenas para exposição*)

### Funções Membro

[ (construtor)](<#/doc/utility/functional/function_ref/function_ref>) | constrói um novo objeto `function_ref`
(função membro pública)
[ operator=](<#/>) | atribui um `function_ref`
(função membro pública)
[ operator()](<#/>) | invoca o thunk armazenado de um `function_ref`
(função membro pública)

### [Guias de Dedução](<#/doc/utility/functional/function_ref/deduction_guides>)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_function_ref`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | `std::function_ref`

### Exemplo

| Esta seção está incompleta
Razão: exemplo

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto callable copiável
(template de classe)
[ copyable_function](<#/doc/utility/functional/copyable_function>)(C++26) | wrapper copiável de qualquer objeto callable copiável que suporta qualificadores em uma dada assinatura de chamada
(template de classe)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto callable que suporta qualificadores em uma dada assinatura de chamada
(template de classe)
[ nontype nontype_t](<#/doc/utility/nontype>)(C++26) | tag de construção de valor
(tag)