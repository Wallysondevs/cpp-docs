# Guias de dedução para std::extents

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class... Integrals >
explicit extents( Integrals... ) -> /* see below */;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para `std::extents` para permitir a dedução a partir de argumentos integrais.

O tipo deduzido é equivalente a [std::dextents](<#/doc/container/mdspan/extents>)<[std::size_t](<#/doc/types/size_t>), sizeof...(Integrals)> | (até C++26)
---|---
[std::extents](<#/doc/container/mdspan/extents>)<[std::size_t](<#/doc/types/size_t>),` `[` _maybe-static-ext_`](<#/doc/header/span>) ﻿&lt;Integrals&gt;...> | (desde C++26)

Esta sobrecarga participa da resolução de sobrecarga apenas se ([std::is_convertible_v](<#/doc/types/is_convertible>)<Integrals, [std::size_t](<#/doc/types/size_t>)> && ...) for verdadeiro.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ (construtor)](<#/doc/container/mdspan/extents/extents>) | constrói um `extents`
(função membro pública)