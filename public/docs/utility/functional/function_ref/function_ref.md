# std::function_ref::function_ref

```cpp
template< class F >
function_ref( F* f ) noexcept;  // (1) (desde C++26)
template< class F >
function_ref( F&& f ) noexcept;  // (2) (desde C++26)
template< auto f >
function_ref( std::nontype_t<f> ) noexcept;  // (3) (desde C++26)
template< auto f, class U >
function_ref( std::nontype_t<f>, U&& obj ) noexcept;  // (4) (desde C++26)
template< auto f, class T >
function_ref( std::nontype_t<f>, /*cv*/ T* obj ) noexcept;  // (5) (desde C++26)
function_ref( const function_ref& other ) = default;  // (6) (desde C++26)
```

  
Cria um novo `std::function_ref`. 

1) Inicializa `_[bound-entity](<#/doc/utility/functional/function_ref>)_` com f, e `_[thunk-ptr](<#/doc/utility/functional/function_ref>)_` com o endereço de uma função `_thunk_`. O comportamento é indefinido se f for um ponteiro nulo. 

  * Esta sobrecarga participa da resolução de sobrecarga apenas se ambos [std::is_function_v](<#/doc/types/is_function>)&lt;F&gt; e /*is-invocable-using*/&lt;F&gt; forem verdadeiros.

2) Inicializa `_bound-entity_` com [std::addressof](<#/doc/memory/addressof>)(f), e `_thunk-ptr_` com o endereço de uma função `_thunk_`. 

  * Seja T [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;F&gt;. Esta sobrecarga participa da resolução de sobrecarga apenas se: 
    * [std::remove_cvref_t](<#/doc/types/remove_cvref>)<F> não for do mesmo tipo que `function_ref`, 
    * [std::is_member_pointer_v](<#/doc/types/is_member_pointer>)<T> for falso, e 
    * /*is-invocable-using*/</*cv*/ T&> for verdadeiro.

3) Inicializa `_bound-entity_` com um ponteiro para um objeto não especificado ou valor de ponteiro nulo, e `_thunk-ptr_` com o endereço de uma função `_thunk_`. 

  * Seja F decltype(f). Esta sobrecarga participa da resolução de sobrecarga apenas se /*is-invocable-using*/&lt;F&gt; for verdadeiro. 
  * O programa é malformado se f != nullptr for falso quando [std::is_pointer_v](<#/doc/types/is_pointer>)&lt;F&gt; || [std::is_member_pointer_v](<#/doc/types/is_member_pointer>)&lt;F&gt; for verdadeiro.

4) Inicializa `_bound-entity_` com [std::addressof](<#/doc/memory/addressof>)(obj), e `_thunk-ptr_` com o endereço de uma função `_thunk_`. 

  * Seja T [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;U&gt; e F decltype(f). Esta sobrecarga participa da resolução de sobrecarga apenas se: 
    * [std::is_rvalue_reference_v](<#/doc/types/is_rvalue_reference>)<U&&> for falso, e 
    * /*is-invocable-using*/<F, /*cv*/ T&> for verdadeiro. 
  * O programa é malformado se f != nullptr for falso quando [std::is_pointer_v](<#/doc/types/is_pointer>)&lt;F&gt; || [std::is_member_pointer_v](<#/doc/types/is_member_pointer>)&lt;F&gt; for verdadeiro.

5) Inicializa `_bound-entity_` com obj, e `_thunk-ptr_` com o endereço de uma função `_thunk_`. O comportamento é indefinido se obj for um ponteiro nulo quando [std::is_member_pointer_v](<#/doc/types/is_member_pointer>)&lt;F&gt; for verdadeiro. 

  * Seja F decltype(f). Esta sobrecarga participa da resolução de sobrecarga apenas se /*is-invocable-using*/<F, /*cv*/ T*> for verdadeiro. 
  * O programa é malformado se f != nullptr for falso quando [std::is_pointer_v](<#/doc/types/is_pointer>)&lt;F&gt; || [std::is_member_pointer_v](<#/doc/types/is_member_pointer>)&lt;F&gt; for verdadeiro.

6) O construtor de cópia padrão copia o `_bound-entity_` e o `_thunk-ptr_` de other.

O endereço de uma função `_thunk_` é usado para inicializar `_thunk-ptr_` de forma que uma chamada para `_thunk_`(`_bound-entity_` ,`_call-args_`...) seja [expressão-equivalente](<#/doc/language/expressions>) a: 

Sobrecargas  | Equivalência de Expressão   
---|---
([1,3](<#/doc/utility/functional/function_ref/function_ref>)) | [std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(f,`_call-args_`...)  
([2](<#/doc/utility/functional/function_ref/function_ref>)) | [std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(static_cast&lt;cv T&&gt;(f),`_call-args_`...)  
([4](<#/doc/utility/functional/function_ref/function_ref>)) | [std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(f, static_cast&lt;cv T&&gt;(obj),`_call-args_`...)  
([5](<#/doc/utility/functional/function_ref/function_ref>)) | [std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(f, obj,`_call-args_`...)  
  
/*is-invocable-using*/<T...> é verdadeiro se e somente se: 

  * [std::is_nothrow_invocable_r_v](<#/doc/types/is_invocable>)<R, T..., Args...> for verdadeiro se noex for verdadeiro, ou 
  * [std::is_invocable_r_v](<#/doc/types/is_invocable>)<R, T..., Args...> for verdadeiro

### Parâmetros

other  |  \-  |  outro `function_ref` para copiar   
---|---|---
f  |  \-  |  uma função ou um objeto [Callable](<#/doc/named_req/Callable>) para encapsular   
obj  |  \-  |  um objeto ou ponteiro para vincular   
  
### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (constructor)](<#/doc/utility/functional/move_only_function/move_only_function>) |  constrói um novo objeto `std::move_only_function`   
(função membro pública de `std::move_only_function`)  