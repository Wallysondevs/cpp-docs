# std::experimental::ranges::Assignable

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T, class U >
concept bool Assignable =
std::is_lvalue_reference<T>::value &&
CommonReference<
const std::remove_reference_t<T>&,
const std::remove_reference_t<U>&> &&
requires(T t, U&& u) {
{ t = std::forward<U>(u) } -> Same<T>&&;
};
```

O concept `Assignable<T, U>` especifica que uma expressão do tipo e categoria de valor especificados por `U` pode ser atribuída a uma expressão lvalue cujo tipo é especificado por `T`.

Dado

  * `t`, um lvalue do tipo `std::remove_reference_t<T>` que se refere a um objeto `o`,
  * `u`, uma expressão tal que `decltype((u))` é `U`,
  * `u2`, um objeto distinto que é igual a `u`,

`Assignable<T, U>` é satisfeito apenas se

  * `std::addressof(t = u) == std::addressof(o)` (ou seja, a expressão de atribuição resulta em um lvalue que se refere ao operando esquerdo);
  * Após avaliar `t = u`:
    * `t` é igual a `u2`, a menos que `u` seja um xvalue não-const que se refere a `o` (ou seja, a atribuição é uma auto-atribuição por movimento),
    * se `u` for um glvalue:
      * Se for um xvalue não-const, o objeto ao qual ele se refere está em um estado válido, mas não especificado;
      * Caso contrário, o objeto ao qual ele se refere não é modificado;

Não é necessário que haja qualquer relação de subsunção entre `Assignable<T, U>` e `std::is_lvalue_reference<T>::value`.

### Preservação de Igualdade

Uma expressão é _preservadora de igualdade_ se resultar em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve ser preservadora de igualdade é adicionalmente exigida como sendo _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ deve ser preservadora de igualdade e estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Notas

Uma restrição de dedução na forma `{ expression } -> Same<T>&&` efetivamente exige que `decltype((expression))&&` seja exatamente o mesmo tipo que `T&&`. Isso restringe tanto o tipo da expressão quanto sua categoria de valor.

A atribuição não precisa ser uma função total. Em particular, se atribuir a algum objeto `x` pode fazer com que algum outro objeto `y` seja modificado, então `x = y` provavelmente não está no domínio de `=`. Isso geralmente acontece se o operando direito for possuído direta ou indiretamente pelo operando esquerdo (por exemplo, com smart pointers para nós em uma estrutura de dados baseada em nós, ou com algo como `std::vector<std::any>`).