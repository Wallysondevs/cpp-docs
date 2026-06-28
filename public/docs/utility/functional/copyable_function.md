# std::copyable_function

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class... >
class copyable_function; // não definido
template< class R, class... Args >
class copyable_function<R(Args...)>;
template< class R, class... Args >
class copyable_function<R(Args...) noexcept>;
template< class R, class... Args >
class copyable_function<R(Args...) &>;
template< class R, class... Args >
class copyable_function<R(Args...) & noexcept>;
template< class R, class... Args >
class copyable_function<R(Args...) &&>;
template< class R, class... Args >
class copyable_function<R(Args...) && noexcept>;
template< class R, class... Args >
class copyable_function<R(Args...) const>;
template< class R, class... Args >
class copyable_function<R(Args...) const noexcept>;
template< class R, class... Args >
class copyable_function<R(Args...) const &>;
template< class R, class... Args >
class copyable_function<R(Args...) const & noexcept>;
template< class R, class... Args >
class copyable_function<R(Args...) const &&>;
template< class R, class... Args >
class copyable_function<R(Args...) const && noexcept>;
```

  
O template de classe `std::copyable_function` é um wrapper de função polimórfico de propósito geral. Objetos `std::copyable_function` podem armazenar e invocar qualquer _alvo_ [CopyConstructible](<#/doc/named_req/CopyConstructible>) [Callable](<#/doc/named_req/Callable>) — funções, [expressões lambda](<#/doc/language/lambda>), [expressões bind](<#/doc/utility/functional/bind>), ou outros objetos de função, bem como ponteiros para funções membro e ponteiros para objetos membro.

O objeto chamável armazenado é chamado de _alvo_ de `std::copyable_function`. Se um `std::copyable_function` não contém um alvo, ele é chamado de _vazio_. Ao contrário de [std::function](<#/doc/utility/functional/function>), invocar um `std::copyable_function` _vazio_ resulta em comportamento indefinido.

`std::copyable_function` suporta todas as combinações possíveis de [cv-qualifiers](<#/doc/language/member_functions>) (não incluindo volatile), [ref-qualifiers](<#/doc/language/member_functions>), e [noexcept-specifiers](<#/doc/language/noexcept_spec>) fornecidas em seu parâmetro de template. Esses qualifiers e specifier (se houver) são adicionados ao seu [`operator()`](<#/>).

`std::copyable_function` satisfaz os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Tipos membro

Tipo  |  Definição   
---|---
`result_type` |  `R`  
  
### Funções membro

[ (construtor)](<#/doc/utility/functional/copyable_function/copyable_function>) |  constrói um novo objeto `std::copyable_function`   
(função membro pública)  
[ (destrutor)](<#/doc/utility/functional/copyable_function/~copyable_function>) |  destrói um objeto `std::copyable_function`   
(função membro pública)  
[ operator=](<#/>) |  substitui ou destrói o alvo   
(função membro pública)  
[ swap](<#/doc/utility/functional/copyable_function/swap>) |  troca os alvos de dois objetos `std::copyable_function`   
(função membro pública)  
[ operator bool](<#/doc/utility/functional/copyable_function/operator_bool>) |  verifica se o `std::copyable_function` possui um alvo   
(função membro pública)  
[ operator()](<#/>) |  invoca o alvo   
(função membro pública)  
  
### Funções não-membro

[ swap(std::copyable_function)](<#/doc/utility/functional/copyable_function/swap2>)(C++26) |  sobrecarrega o algoritmo [std::swap](<#/doc/utility/swap>)   
(função)  
[ operator==](<#/>)(C++26) |  compara um `std::copyable_function` com nullptr   
(função)  
  
### Notas

Implementações podem armazenar um objeto chamável de tamanho pequeno dentro do objeto `std::copyable_function`. Tal otimização de objeto pequeno é efetivamente exigida para ponteiros de função e especializações de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), e só pode ser aplicada a tipos `T` para os quais [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; é verdadeiro.

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_copyable_function`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | `std::copyable_function`  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) |  wrapper copiável de qualquer objeto chamável copy constructible   
(template de classe)  
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) |  wrapper move-only de qualquer objeto chamável que suporta qualifiers em uma dada assinatura de chamada   
(template de classe)  
[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) |  wrapper não-proprietário de qualquer objeto chamável   
(template de classe)