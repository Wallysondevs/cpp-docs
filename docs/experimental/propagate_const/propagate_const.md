# std::experimental::propagate_const&lt;T&gt;::propagate_const

constexpr propagate_const() = default; | (1) | (fundamentos da biblioteca TS v2)
---|---|---
constexpr propagate_const( propagate_const&& p ) = default; | (2) | (fundamentos da biblioteca TS v2)
template< class U >
/* see below */ constexpr propagate_const( propagate_const&lt;U&gt;&& pu ); | (3) | (fundamentos da biblioteca TS v2)
template< class U >
/* see below */ constexpr propagate_const( U&& u ); | (4) | (fundamentos da biblioteca TS v2)
---|---|---
propagate_const( const propagate_const& ) = delete; | (5) | (fundamentos da biblioteca TS v2)

Deixe `t_` designar o membro de dados privado que é o objeto tipo ponteiro encapsulado.

1) Constrói um `propagate_const`, inicializando `this->t_` por padrão.

2) Construtor de movimento explicitamente padronizado que constrói `this->t_` por movimento a partir de `p.t_`.

3) Inicializa `this->t_` como se por inicialização direta não-por-lista a partir da expressão `std::move(pu.t_)`.
Este construtor não participa da resolução de sobrecarga a menos que [std::is_constructible](<#/doc/types/is_constructible>)<T, U>::value seja verdadeiro, e é `explicit` se e somente se [std::is_convertible](<#/doc/types/is_convertible>)<U, T>::value for falso.

4) Inicializa `this->t_` como se por inicialização direta não-por-lista com a expressão [std::forward](<#/doc/utility/forward>)&lt;U&gt;(u).
Este construtor não participa da resolução de sobrecarga a menos que [std::is_constructible](<#/doc/types/is_constructible>)<T, U>::value seja verdadeiro e [std::decay_t](<#/doc/types/decay>)&lt;U&gt; não seja uma especialização de `propagate_const`. Este construtor é `explicit` se e somente se [std::is_convertible](<#/doc/types/is_convertible>)<U, T>::value for falso.

5) O construtor de cópia é explicitamente deletado. `propagate_const` não é copiável.

### Parâmetros

- **p** — outro objeto `propagate_const` para mover de
- **pu** — outro objeto `propagate_const` de uma especialização diferente para mover de
- **u** — outro objeto para inicializar o ponteiro contido com

### Observações

Em Library Fundamental TS v2 (baseado em C++14), (4) e (5) são tipicamente implementados em pares de sobrecarga `explicit`/não-`explicit`. Desde Library Fundamental TS v3 (baseado em C++20), eles podem ser implementados em especificadores `explicit` condicionais.