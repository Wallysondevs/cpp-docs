# std::copyable_function::copyable_function

```cpp
copyable_function() noexcept;  // (1) (desde C++26)
copyable_function( std::nullptr_t ) noexcept;  // (2) (desde C++26)
copyable_function( const copyable_function& other );  // (3) (desde C++26)
copyable_function( copyable_function&& other ) noexcept;  // (4) (desde C++26)
template< class F >
copyable_function( F&& f );  // (5) (desde C++26)
template< class T, class... CArgs >
explicit copyable_function( std::in_place_type_t<T>, CArgs&&... args );  // (6) (desde C++26)
template< class T, class U, class... CArgs >
explicit copyable_function( std::in_place_type_t<T>,
std::initializer_list<U> il, CArgs&&... args );  // (7) (desde C++26)
```

  
Cria uma nova `std::copyable_function`.

1,2) O construtor padrão e o construtor que recebe `nullptr` constroem uma `std::copyable_function` vazia.

3) O construtor de cópia constrói uma `std::copyable_function` cujo alvo é uma cópia do alvo de `other`. Caso contrário, constrói uma `std::copyable_function` vazia se `other` estiver vazia.

4) O construtor de movimento constrói uma `std::copyable_function` cujo alvo é o de `other`. `other` fica em um estado válido, mas não especificado, após a construção por movimento.

5) Seja `VT` [std::decay_t](<#/doc/types/decay>)&lt;F&gt;. Se `f` for um ponteiro de função nulo, um ponteiro nulo para valor membro, ou uma `std::copyable_function` vazia (pode ser qualquer outra especialização), então constrói uma `std::copyable_function` vazia. Caso contrário, constrói uma `std::copyable_function` cujo alvo é do tipo `VT` e é inicializado diretamente (direct-non-list-initialized) com [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f).

  * Esta sobrecarga participa da resolução de sobrecarga apenas se `VT` não for o mesmo que `copyable_function` nem uma especialização de [std::in_place_type_t](<#/doc/utility/in_place>), e /*is-callable-from*/&lt;VT&gt; (veja abaixo) for verdadeiro.
  * O programa é malformado se [std::is_constructible_v](<#/doc/types/is_constructible>)<VT, F> ou [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;VT&gt; não for verdadeiro.

6) Seja `VT` [std::decay_t](<#/doc/types/decay>)&lt;T&gt;. Constrói uma `std::copyable_function` cujo alvo é do tipo `VT` e é inicializado diretamente (direct-non-list-initialized) com [std::forward](<#/doc/utility/forward>)&lt;CArgs&gt;(args)....

  * Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::is_constructible_v](<#/doc/types/is_constructible>)<VT, CArgs...> e /*is-callable-from*/&lt;VT&gt; (veja abaixo) forem verdadeiros.
  * O programa é malformado se `VT` não for do mesmo tipo que `T` ou [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;VT&gt; não for verdadeiro.

7) Seja `VT` [std::decay_t](<#/doc/types/decay>)&lt;T&gt;. Constrói uma `std::copyable_function` cujo alvo é do tipo `VT` e é inicializado diretamente (direct-non-list-initialized) com `il`, [std::forward](<#/doc/utility/forward>)&lt;CArgs&gt;(args)....

  * Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::is_constructible_v](<#/doc/types/is_constructible>)<VT, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, CArgs...> e /*is-callable-from*/&lt;VT&gt; (veja abaixo) forem verdadeiros.
  * O programa é malformado se `VT` não for do mesmo tipo que `T` ou [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;VT&gt; não for verdadeiro.

Para os construtores (5-7), o comportamento é indefinido a menos que `VT` satisfaça os requisitos [Destructible](<#/doc/named_req/Destructible>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>).

A constante /*is-callable-from*/&lt;VT&gt; depende de `cv`, `ref` e `noex` no parâmetro template de `std::copyable_function` conforme abaixo:

cv ref noexcept(noex) | /*is-callable-from*/&lt;VT&gt;  
---|---
noexcept(false) | [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, VT, Args...> &&  
[std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, VT&, Args...>  
noexcept(true) | [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, VT, Args...> &&  
[std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, VT&, Args...>  
const noexcept(false) | [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT, Args...> &&  
[std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT&, Args...>  
const noexcept(true) | [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT, Args...> &&  
[std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT&, Args...>  
& noexcept(false) | [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, VT&, Args...>  
---|---
& noexcept(true) | [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, VT&, Args...>  
const & noexcept(false) | [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT&, Args...>  
const & noexcept(true) | [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT&, Args...>  
&& noexcept(false) | [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, VT, Args...>  
&& noexcept(true) | [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, VT, Args...>  
const && noexcept(false) | [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT, Args...>  
const && noexcept(true) | [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, const VT, Args...>  
  
### Parâmetros

other  |  \-  |  outra `std::copyable_function` para copiar ou mover de   
---|---|---
f  |  \-  |  uma função ou um objeto [Callable](<#/doc/named_req/Callable>) para encapsular   
args  |  \-  |  argumentos para construir o objeto alvo   
il  |  \-  |  [std::initializer_list](<#/doc/utility/initializer_list>) para construir o objeto alvo   
  
### Exceções

3) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação ou propagar a exceção lançada pela inicialização do alvo.

5-7) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação ou propagar a exceção lançada pela inicialização do alvo. Nenhuma exceção é lançada se `VT` for um tipo de ponteiro de função ou uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ (construtor)](<#/doc/utility/functional/function/function>) | constrói uma nova instância de `std::function`   
(função membro pública de `std::function<R(Args...)>`)  
[ (construtor)](<#/doc/utility/functional/move_only_function/move_only_function>) | constrói um novo objeto `std::move_only_function`   
(função membro pública de `std::move_only_function`)