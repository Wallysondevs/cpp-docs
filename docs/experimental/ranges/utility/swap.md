# std::experimental::ranges::swap

Definido no cabeçalho `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```c
namespace {
constexpr /* unspecified */ swap = /* unspecified */;
}
(customization point object)
Assinatura da chamada
template< class T, class U >
requires /* see below */
void swap( T&& t, U&& u ) noexcept(/* see below */);
```

Troca os valores referenciados por t e u.

Uma chamada para `ranges::swap` é equivalente a:

1) (void)swap([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t), [std::forward](<#/doc/utility/forward>)&lt;U&gt;(u)), se essa expressão for válida, onde a [resolução de sobrecarga](<#/doc/language/overload_resolution>) é realizada com os seguintes candidatos:

  * template&lt;class T&gt; void swap(T&, T&) = delete;
  * template&lt;class T, [std::size_t](<#/doc/types/size_t>) N&gt; void swap(T(&)[N], T(&)[N]) = delete;
  * quaisquer declarações de `swap` encontradas por [argument-dependent lookup](<#/doc/language/adl>).

Se a função selecionada pela resolução de sobrecarga não trocar os valores referenciados por t e u, o programa é malformado; nenhum diagnóstico é exigido.

2) Caso contrário, (void)[ranges::swap_ranges](<#/doc/algorithm/ranges/swap_ranges>)(t, u), se `T` e `U` forem referências lvalue para tipos de array de extensão igual (mas possivelmente tipos de elementos diferentes) e [ranges::swap](<#/doc/experimental/ranges/utility/swap>)(*t, *u) for uma expressão válida.

3) Caso contrário, se `T` e `U` forem ambos `V&` para algum tipo `V` que atenda aos requisitos sintáticos de MoveConstructible&lt;V&gt; e Assignable<V&, V>, troca os valores referenciados como se por V v{std::move(t)}; t = std::move(u); u = std::move(v);. Se os requisitos semânticos de qualquer um dos concepts não forem satisfeitos, o programa é malformado; nenhum diagnóstico é exigido.

4) Em todos os outros casos, uma chamada para `ranges::swap` é malformada.

`ranges::swap` pode ser usado em uma expressão constante se cada função que ele chama (conforme especificado acima) puder ser usada dessa forma.

### Customization point objects

O nome `ranges::swap` denota um _customization point object_, que é um [function object](<#/doc/named_req/FunctionObject>) de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`Semiregular`](<#/doc/experimental/ranges/concepts/Semiregular>) (denotado, para fins de exposição, como `SwapT`). Todas as instâncias de `SwapT` são iguais. Assim, `ranges::swap` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `ranges::swap` acima, `SwapT` satisfará ranges::Invocable&lt;const SwapT, Args...&gt;. Caso contrário, nenhum operador de chamada de função de `SwapT` participa da resolução de sobrecarga.

Em cada unidade de tradução na qual `ranges::swap` é definido, ele se refere à mesma instância do customization point object. (Isso significa que ele pode ser usado livremente em coisas como funções inline e function templates sem violar a [one-definition rule](<#/doc/language/definition>).)

### Exceções

1)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(noexcept((void)swap([std::forward](<#/doc/utility/forward>)&lt;T&gt;(t), [std::forward](<#/doc/utility/forward>)&lt;T&gt;(u))))

, onde `swap` é encontrado conforme descrito acima.

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(noexcept([ranges::swap](<#/doc/experimental/ranges/utility/swap>)(*t, *u)))

3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;V&gt;::value &&
[std::is_nothrow_move_assignable](<#/doc/types/is_move_assignable>)&lt;V&gt;::value)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)