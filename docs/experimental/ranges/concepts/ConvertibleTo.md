# std::experimental::ranges::ConvertibleTo

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class From, class To >
concept bool ConvertibleTo =
std::is_convertible<From, To>::value &&
requires(From (&f)()) {
static_cast<To>(f());
};
```

O concept ConvertibleTo<From, To> especifica que uma expressão do tipo e categoria de valor especificados por `From` pode ser implícita e explicitamente convertida para o tipo `To`, e as duas formas de conversão são equivalentes.

Especificamente, ConvertibleTo<From, To> é satisfeito apenas se, dada a função inventada To test(From (&f)()) { return f(); } e uma função `f` do tipo From () tal que a expressão f() preserva a igualdade (veja abaixo),

  * Ou
    * `To` não é um tipo de objeto nem um tipo de referência a objeto, ou
    * static_cast<To>(f()) é igual a `test(f)`, e

  * Uma das seguintes condições é verdadeira:
    * `From` não é um tipo de referência a objeto, ou
    * `From` é uma rvalue reference para um tipo não qualificado como const, e o estado resultante do objeto referenciado por f() é válido, mas não especificado após qualquer uma das expressões acima; ou
    * o objeto referenciado por `f()` não é modificado por nenhuma das expressões acima.

Não é necessário que haja qualquer relação de subsunção entre ConvertibleTo<From, To> e [std::is_convertible](<#/doc/types/is_convertible>)<From, To>::value.

### Preservação de igualdade

Uma expressão _preserva a igualdade_ se ela resulta em saídas iguais dadas entradas iguais.

  * As entradas para uma expressão consistem em seus operandos.
  * As saídas de uma expressão consistem em seu resultado e todos os operandos modificados pela expressão (se houver).

Toda expressão que deve preservar a igualdade também deve ser _estável_: duas avaliações de tal expressão com os mesmos objetos de entrada devem ter saídas iguais na ausência de qualquer modificação explícita e intermediária desses objetos de entrada.

A menos que indicado de outra forma, toda expressão usada em uma _requires-expression_ deve preservar a igualdade e ser estável, e a avaliação da expressão pode modificar apenas seus operandos não-constantes. Operandos que são constantes não devem ser modificados.

### Veja também

[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(modelo de classe)