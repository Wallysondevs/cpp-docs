# guias de dedução para std::function_ref

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class F >
function_ref( F* ) -> function_ref<F>;
template< auto f >
function_ref( std::nontype_t<f> ) -> function_ref</*see below*/>;
template< auto f, class T >
function_ref( std::nontype_t<f>, T&& ) -> function_ref</*see below*/>;
```

1) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_function_v](<#/doc/types/is_function>)&lt;F&gt; for true.

2) Seja o tipo F [std::remove_pointer_t](<#/doc/types/remove_pointer>)<decltype(f)>. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_function_v](<#/doc/types/is_function>)&lt;F&gt; for true. O tipo deduzido é [std::function_ref](<#/doc/utility/functional/function_ref>)&lt;F&gt;.

3) Seja o tipo F decltype(f). Esta sobrecarga participa da resolução de sobrecarga apenas se :

  * F for da forma R(G::*)(A...) noexcept(E) (opcionalmente qualificado por cv, opcionalmente noexcept, opcionalmente qualificado por referência lvalue) para um tipo G, ou
  * F for da forma M G::* para um tipo G e um tipo de objeto M, nesse caso, seja R [std::invoke_result_t](<#/doc/types/result_of>)<F, T&>, A... seja um pacote vazio, e E seja false, ou
  * F for da forma R(*)(G, A...) noexcept(E) para um tipo G.

    O tipo deduzido é [std::function_ref](<#/doc/utility/functional/function_ref>)<R(A...) noexcept(E)>.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo