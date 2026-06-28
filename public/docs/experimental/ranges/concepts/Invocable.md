# std::experimental::ranges::Invocable, std::experimental::ranges::RegularInvocable

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class F, class... Args >
concept bool Invocable =
requires(F&& f, Args&&... args) {
ranges::invoke(std::forward<F>(f), std::forward<Args>(args)...);
/* not required to be equality preserving */
};
template< class F, class... Args >
concept bool RegularInvocable = Invocable<F, Args...>;
```

  
O concept `Invocable` especifica que um tipo invocável `F` pode ser chamado com um conjunto de tipos de argumento `Args...` usando o template de função `ranges::invoke`.

O concept `RegularInvocable` adiciona ao concept `Invocable` ao exigir que a expressão `invoke` preserve a igualdade e não modifique nem o objeto de função nem os argumentos.

### Preservação de igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade é adicionalmente exigida ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita interveniente desses objetos de entrada.

Salvo indicação em contrário, toda expressão usada em uma _requires-expression_ deve preservar a igualdade e ser estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Notas

A distinção entre `Invocable` e `RegularInvocable` é puramente semântica.

Um gerador de números aleatórios pode satisfazer `Invocable` mas não pode satisfazer `RegularInvocable` (excluindo os [cômicos](<https://xkcd.com/221/>) [exemplos](<http://dilbert.com/strip/2001-10-25>)).