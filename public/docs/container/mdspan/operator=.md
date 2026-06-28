# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::operator=

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
constexpr mdspan& operator=( const mdspan& rhs ) = default;
constexpr mdspan& operator=( mdspan&& rhs ) = default;
```

Atribui `rhs` a `*this` com

1) [operador de atribuição de cópia padronizado](<#/doc/language/as_operator>),

2) [operador de atribuição de movimento padronizado](<#/doc/language/move_operator>).

### Parâmetros

- **other** — outro `mdspan` para copiar ou mover de

### Valor de retorno

`*this`

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

| Esta seção está incompleta