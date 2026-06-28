# std::ranges::slide_view&lt;V&gt;::sentinel

```cpp
class /*sentinel*/;  // (desde C++23)
(apenas para exposição*)
```

O tipo de retorno de [`slide_view::end`](<#/doc/ranges/slide_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>).

O /*sentinel*/ é usado apenas quando /*slide-caches-first*/&lt;V&gt; é verdadeiro.

### Membros de dados

Objeto membro | Definição
---|---
`_end__` (private) | Um sentinel do tipo [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt;.
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/ranges/slide_view/sentinel/sentinel>) | constrói um sentinel
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/ranges/slide_view/sentinel/operator_cmp>)(C++23) | compara um sentinel com um iterator retornado de [`slide_view::begin`](<#/doc/ranges/slide_view/begin>)
(função)
[ operator-](<#/doc/ranges/slide_view/sentinel/operator->)(C++23) | calcula a distância entre um sentinel e um iterator retornado de [`slide_view::begin`](<#/doc/ranges/slide_view/begin>)
(função)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 26.7.29.4 Classe `slide_view::sentinel` [range.slide.sentinel]

### Veja também

---