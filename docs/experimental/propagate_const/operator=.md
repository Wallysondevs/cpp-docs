# std::experimental::propagate_const&lt;T&gt;::operator=

```cpp
constexpr propagate_const& operator=( propagate_const&& p ) = default;
template< class U >
constexpr propagate_const& operator=( propagate_const<U>&& pu );
template< class U >
constexpr propagate_const& operator=( U&& u );
propagate_const& operator=( const propagate_const& ) = delete;
```

|---|---|---|
| (1) | (library fundamentals TS v2) |
| (2) | (library fundamentals TS v2) |
| (3) | (library fundamentals TS v2) |
| (4) | (library fundamentals TS v2) |

Seja `t_` o membro de dados privado que é o objeto tipo ponteiro encapsulado.

1) Operador de atribuição de movimento explicitamente padronizado que atribui por movimento `this->t_` de `p.t_`.

2) Atribui `std::move(pu.t_)` a `this->t_`.
Esta sobrecarga participa da resolução de sobrecarga apenas se `U` for implicitamente conversível para `T`.

3) Atribui [std::forward](<#/doc/utility/forward>)`<U>(u)` a `this->t_`.
Esta sobrecarga participa da resolução de sobrecarga apenas se `U` for implicitamente conversível para `T` e [std::decay_t](<#/doc/types/decay>)`<U>` não for uma especialização de `propagate_const`.

4) O operador de atribuição de cópia é explicitamente deletado. `propagate_const` não é copiável.

### Parâmetros

- **p** — outro objeto `propagate_const` para mover de
- **pu** — outro objeto `propagate_const` de uma especialização diferente para mover de
- **u** — outro objeto para atribuir ao ponteiro contido

### Valor de retorno

`*this`.