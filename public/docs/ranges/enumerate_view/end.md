# std::ranges::enumerate_view&lt;V&gt;::end

```cpp
constexpr auto end() requires (!__simple_view<V>);  // (1) (desde C++23)
constexpr auto end() const requires /*range-with-movable-references*/<const V>;  // (2) (desde C++23)
```

Retorna um [iterator](<#/doc/ranges/enumerate_view/iterator>) ou um [sentinel](<#/doc/ranges/enumerate_view/sentinel>) que se compara como igual ao iterator final da `enumerate_view`.

Seja [`_base__`](<#/doc/ranges/enumerate_view>) a view subjacente.

1) Equivalente a:
```cpp
    if constexpr (ranges::forward_range<V> and 
                  ranges::common_range<V>  and 
                  ranges::sized_range<V>)
        return /*iterator*/<false>(ranges::end(base_), ranges::distance(base_));
    else
        return /*sentinel*/<false>(ranges::end(base_));
```

2) Equivalente a:
```cpp
    if constexpr (ranges::forward_range<const V> and 
                  ranges::common_range<const V>  and 
                  ranges::sized_range<const V>)
        return /*iterator*/<true>(ranges::end(base_), ranges::distance(base_));
    else
        return /*sentinel*/<true>(ranges::end(base_));
```

### Parâmetros

(nenhum)

### Valor de retorno

Um [iterator](<#/doc/ranges/enumerate_view/iterator>) ou um [sentinel](<#/doc/ranges/enumerate_view/sentinel>) representando o final da `enumerate_view`, conforme descrito acima.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3919](<https://cplusplus.github.io/LWG/issue3919>) | C++23 | `ranges::distance` pode invocar UB para ranges subjacentes sized common não-forward | um tipo sentinel é retornado para tais ranges

### Ver também

[ begin](<#/doc/ranges/enumerate_view/begin>) | retorna um iterator para o início
(função membro pública)
[ ranges::end](<#/doc/ranges/end>)(C++20) | retorna um sentinel indicando o final de um range
(objeto de ponto de customização)