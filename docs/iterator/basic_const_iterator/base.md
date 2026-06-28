# std::basic_const_iterator&lt;Iter&gt;::base

```cpp
constexpr const Iter& base() const& noexcept;  // (1) (desde C++23)
constexpr Iter base() &&;  // (2) (desde C++23)
```

Retorna o iterator base subjacente.

1) Retorna uma referência para o iterator subjacente.

2) Constrói por movimento o valor de retorno a partir do iterator subjacente.

### Parâmetros

(nenhum)

### Valor de retorno

1) Uma referência para o iterator subjacente.

2) Um iterator construído por movimento a partir do iterator subjacente.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator*operator->](<#/doc/iterator/basic_const_iterator/operator_star_>) | acessa o elemento apontado
(função membro pública)