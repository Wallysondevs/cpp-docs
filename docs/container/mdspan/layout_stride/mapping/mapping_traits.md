# std::layout_stride::mapping&lt;Extents&gt;::mapping-traits

```cpp
static constexpr bool is_unique() noexcept;  // (1) (desde C++23)
constexpr bool is_exhaustive() const noexcept;  // (2) (desde C++23)
static constexpr bool is_strided() noexcept;  // (3) (desde C++23)
static constexpr bool is_always_unique() noexcept;  // (4) (desde C++23)
static constexpr bool is_always_exhaustive() noexcept;  // (5) (desde C++23)
static constexpr bool is_always_strided() noexcept;  // (6) (desde C++23)
```

Cada instância de cada especialização de `mapping` é única e com passo.

O mapeamento é exaustivo se uma das seguintes condições for verdadeira:

  * rank_ é ​0​, ou
  * existe uma permutação p dos inteiros no intervalo `[`​0​`, `rank_`)` tal que:

  * stride(p[0]) é igual a 1 e
  * stride(p[i]) é igual a stride(p[i - 1]) * extents().extent(p[i - 1])

    para todo i em `[`1`, `rank_`)`, onde p[i] é o i-ésimo elemento de p.

([`_rank__`](<#/doc/container/mdspan/layout_stride/mapping>) é uma constante membro estática apenas para exposição definida em std::layout_stride::mapping.)

Veja [LayoutMapping](<#/doc/named_req/LayoutMapping>) para a semântica desses traits de mapeamento de predicado.

### Parâmetros

(nenhum)

### Valor de retorno

1,3-4,6) true

2) true se o mapeamento for exaustivo (veja acima)

5) false

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

| Esta seção está incompleta