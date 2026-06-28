# swap(std::mdspan)

```cpp
friend constexpr void swap( mdspan& x, mdspan& y ) noexcept;  // (desde C++23)
```

Sobrecarga o algoritmo [`std::swap`](<#/doc/utility/swap>) para [`std::mdspan`](<#/doc/container/mdspan>). Troca o estado de x com o de y. Equivalente a:

std::[`swap`](<#/doc/utility/swap>)(x.`_[acc_](<#/doc/container/mdspan>)_` , y.`_[acc_](<#/doc/container/mdspan>)_`);
std::[`swap`](<#/doc/utility/swap>)(x.`_[map_](<#/doc/container/mdspan>)_` , y.`_[map_](<#/doc/container/mdspan>)_`);
std::[`swap`](<#/doc/utility/swap>)(x.`_[ptr_](<#/doc/container/mdspan>)_` , y.`_[ptr_](<#/doc/container/mdspan>)_`);

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) ordinário, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::mdspan` é uma classe associada dos argumentos.

### Parâmetros

- **x, y** — Objetos [`mdspan`](<#/doc/container/mdspan>) cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

| Esta seção está incompleta