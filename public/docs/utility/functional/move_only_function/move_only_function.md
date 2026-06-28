# std::move_only_function::move_only_function

```cpp
move_only_function() noexcept;  // (1) (desde C++23)
move_only_function( std::nullptr_t ) noexcept;  // (2) (desde C++23)
move_only_function( move_only_function&& other ) noexcept;  // (3) (desde C++23)
move_only_function( const move_only_function& ) = delete;  // (4) (desde C++23)
template< class F >
move_only_function( F&& f );  // (5) (desde C++23)
template< class T, class... CArgs >
explicit move_only_function( std::in_place_type_t<T>, CArgs&&... args );  // (6) (desde C++23)
template< class T, class U, class... CArgs >
explicit move_only_function( std::in_place_type_t<T>,
std::initializer_list<U> il, CArgs&&... args );  // (7) (desde C++23)
```

Cria uma nova `std::move_only_function`.

1,2) O construtor padrão e o construtor que aceita nullptr constroem uma `std::move_only_function` vazia.

3) O construtor de movimento constrói uma `std::move_only_function` cujo alvo é o de other. other fica em um estado válido, mas não especificado, após a construção por movimento.

4) O construtor de cópia é deletado. `std::move_only_function` não satisfaz os requisitos [CopyConstructible](<#/doc/named_req/CopyConstructible>).

5) Seja `VT` [std::decay_t](<#/doc/types/decay>)&lt;F&gt;. Se f for um ponteiro de função nulo, um ponteiro nulo para um valor membro, ou uma `std::move_only_function` vazia (pode ser qualquer outra especialização), então constrói uma `std::move_only_function` vazia. Caso contrário, constrói uma `std::move_only_function` cujo alvo é do tipo `VT` e é inicializado diretamente (não por lista) com [std::forward](<#/doc/utility/forward>)&lt;F&gt;(f).

  * Esta sobrecarga participa da resolução de sobrecarga apenas se `VT` não for o mesmo que `move_only_function` nem uma especialização de [std::in_place_type_t](<#/doc/utility/in_place>), e /*is-callable-from*/&lt;VT&gt; (veja abaixo) for verdadeiro.
  * O programa é malformado se [std::is_constructible_v](<#/doc/types/is_constructible>)<VT, F> não for verdadeiro.

6) Seja `VT` [std::decay_t](<#/doc/types/decay>)&lt;T&gt;. Constrói uma `std::move_only_function` cujo alvo é do tipo `VT` e é inicializado diretamente (não por lista) com [std::forward](<#/doc/utility/forward>)&lt;CArgs&gt;(args)....

  * Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::is_constructible_v](<#/doc/types/is_constructible>)<VT, CArgs...> e /*is-callable-from*/&lt;VT&gt; (veja abaixo) forem verdadeiros.
  * O programa é malformado se `VT` não for do mesmo tipo que `T`.

7) Seja `VT` [std::decay_t](<#/doc/types/decay>)&lt;T&gt;. Constrói uma `std::move_only_function` cujo alvo é do tipo `VT` e é inicializado diretamente (não por lista) com il, [std::forward](<#/doc/utility/forward>)&lt;CArgs&gt;(args)....

  * Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::is_constructible_v](<#/doc/types/is_constructible>)<VT, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, CArgs...> e /*is-callable-from*/&lt;VT&gt; (veja abaixo) forem verdadeiros.
  * O programa é malformado se `VT` não for do mesmo tipo que `T`.

Para os construtores (5-7), o comportamento é indefinido se `VT` não satisfizer os requisitos [Destructible](<#/doc/named_req/Destructible>), ou se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;VT&gt; for verdadeiro, mas `VT` não satisfizer os requisitos [MoveConstructible](<#/doc/named_req/MoveConstructible>).

A constante /*is-callable-from*/&lt;VT&gt; depende de cv, ref e noex no parâmetro de template de `std::move_only_function` conforme abaixo:

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

- **other** — outra `std::move_only_function` da qual mover
- **f** — uma função ou um objeto [Callable](<#/doc/named_req/Callable>) para encapsular
- **args** — argumentos para construir o objeto alvo
- **il** — [std::initializer_list](<#/doc/utility/initializer_list>) para construir o objeto alvo

### Exceções

5-7) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em caso de falha de alocação ou propagar a exceção lançada pela inicialização do alvo. Nenhuma exceção é lançada se `VT` for um tipo de ponteiro de função ou uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>).

### Exemplo

| Esta seção está incompleta
Reason: sem exemplo

### Veja também

[ (constructor)](<#/doc/utility/functional/function/function>) | constrói uma nova instância de `std::function`
(função membro pública de `std::function<R(Args...)>`)
[ (constructor)](<#/doc/utility/functional/copyable_function/copyable_function>) | constrói um novo objeto `std::copyable_function`
(função membro pública de `std::copyable_function`)