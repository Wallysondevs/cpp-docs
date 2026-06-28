# std::ranges::concat_view&lt;Views...&gt;::iterator&lt;Const&gt;::satisfy, prev, advance-fwd, advance-bwd

Os seguintes modelos de função membro apenas para exposição simplificam a descrição.

Cada modelo de função auxiliar possui um parâmetro de modelo não-tipo do tipo [std::size_t](<#/doc/types/size_t>).

  * Se o nome do parâmetro de modelo for N, o argumento de modelo é sempre `_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.index().
  * Se o nome do parâmetro de modelo for I, o argumento de modelo pode ser qualquer valor [std::size_t](<#/doc/types/size_t>) em `[`​0​`, `sizeof...(Views)`)`.

No entanto, o argumento de modelo pode não ser uma constante em tempo de compilação, portanto, o efeito real de `_helper_` ﻿<non_const>(/* arguments */) é similar a if (non_const == 0)
` ` _helper_` ﻿<0>(/* arguments */);
else if (non_const == 1)
` ` _helper_` ﻿<1>(/* arguments */);
/* other indices */
else if (non_const == (sizeof...(Views) - 1))
` ` _helper_` ﻿<sizeof...(Views) - 1>(/* arguments */);
.

### Modelos auxiliares

## Mini modelos auxiliares

template< [std::size_t](<#/doc/types/size_t>) N >
constexpr auto /*get-iter*/(); | (1) | (exposition only*)
template< [std::size_t](<#/doc/types/size_t>) I >
constexpr auto /*get-view*/(); | (2) | (exposition only*)
template< [std::size_t](<#/doc/types/size_t>) I >
constexpr auto /*get-begin*/(); | (3) | (exposition only*)
template< [std::size_t](<#/doc/types/size_t>) I >
constexpr auto /*get-end*/(); | (4) | (exposition only*)
template< [std::size_t](<#/doc/types/size_t>) N >
constexpr auto /*to-underlying-diff-type*/( difference_type value ); | (5) | (exposition only*)

Os mini modelos auxiliares simplificam a descrição dos principais modelos auxiliares e funções membro. Eles não estão incluídos nos documentos padrão C++.

1) Obtém o iterator subjacente contido em `_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.

Returns [`std::get`](<#/doc/utility/variant/get>)&lt;N&gt;(`_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿).

2) Obtém a I-ésima view na `concat_view` pai.

Returns [`std::get`](<#/doc/utility/tuple/get>)&lt;I&gt;(`_[parent_](<#/doc/ranges/concat_view/iterator>)_` ﻿->`_[views_](<#/doc/ranges/concat_view>)_` ﻿).

3) Obtém um iterator para o início da I-ésima view na `concat_view` pai.

Returns [ranges::begin](<#/doc/ranges/begin>)(`_get-view_` ﻿&lt;I&gt;()).

4) Obtém um iterator após o final ou uma sentinela da I-ésima view na `concat_view` pai.

Returns [ranges::end](<#/doc/ranges/end>)(`_get-view_` ﻿&lt;I&gt;()).

5) Converte `value` para o tipo de diferença subjacente do iterator subjacente contido em `_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.

Returns static_cast<[std::iter_difference_t](<#/doc/iterator/iter_t>)<[std::variant_alternative_t](<#/doc/utility/variant/variant_alternative>)<N,` ` _[base-iter](<#/doc/ranges/concat_view/iterator>)_` ﻿>>>(value).

## std::ranges::concat_view::_iterator_ ::_satisfy_ &lt;N&gt;

template< [std::size_t](<#/doc/types/size_t>) N >
constexpr void /*satisfy*/(); | | (exposition only*)

Ajusta a posição atual (global) de `_[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.

  * Se N for sizeof...(Views) - 1, não faz nada.
  * Caso contrário, equivalente a if (`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;() ==` ` _[get-end](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;())
{
` ` _[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.template emplace&lt;N + 1&gt;(`_[get-begin](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N + 1&gt;());
` ` _satisfy_` ﻿&lt;N + 1&gt;();
}.

## std::ranges::concat_view::_iterator_ ::_prev_ &lt;N&gt;

template< size_t N >
constexpr void /*prev*/(); | | (exposition only*)

Move `_[it_](<#/doc/ranges/concat_view/iterator>)_` para a posição anterior (global).

  * Se N for ​0​, equivalente a \--`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿<0>();.
  * Caso contrário, equivalente a if (`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;() ==` ` _[get-begin](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;())
{
` ` _[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.template emplace&lt;N - 1&gt;(`_[get-end](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N - 1&gt;());
` ` _prev_` ﻿&lt;N - 1&gt;();
}
else
` `\--`_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿<0>();.

## std::ranges::concat_view::_iterator_ ::_advance-fwd_ &lt;N&gt;

template< size_t N >
constexpr void /*advance-fwd*/( difference_type offset,
difference_type steps ); | | (exposition only*)

Avança a posição atual (global) `steps` passos para frente.

  * Se N for sizeof...(Views) - 1, equivalente a `_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;() +=` ` _[to-underlying-diff-type](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿(steps);.
  * Caso contrário, equivalente a auto n_size = [ranges::distance](<#/doc/iterator/ranges/distance>)(`_[get-view](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;()));
if (offset + steps < n_size)
` ` _[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;() +=` ` _[to-underlying-diff-type](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿(steps);
else
{
` ` _[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.template emplace&lt;N + 1&gt;(`_[get-begin](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N + 1&gt;());
` ` _advance-fwd_` ﻿&lt;N + 1&gt;(0, offset + steps - n_size);
}.

### Parâmetros

- **offset** — o deslocamento da posição atual (global) a partir do início do range para o qual `_[it_](<#/doc/ranges/concat_view/iterator>)_` atualmente se refere
- **steps** — o número de passos para avançar para frente

## std::ranges::concat_view::_iterator_ ::_advance-bwd_ &lt;N&gt;

template< size_t N >
constexpr void /*advance-bwd*/( difference_type offset,
difference_type steps ); | | (exposition only*)

Avança a posição atual (global) `steps` passos para trás.

  * Se N for ​0​, equivalente a `_[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;() -=` ` _[to-underlying-diff-type](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿(steps);.
  * Caso contrário, equivalente a if (offset >= steps)
` ` _[get-iter](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N&gt;() -=` ` _[to-underlying-diff-type](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿(steps);
else
{
` `auto prev_size = [ranges::distance](<#/doc/iterator/ranges/distance>)(`_[get-view](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N - 1&gt;());
` ` _[it_](<#/doc/ranges/concat_view/iterator>)_` ﻿.template emplace&lt;N - 1&gt;(`_[get-end](<#/doc/ranges/concat_view/iterator/helpers>)_` ﻿&lt;N - 1&gt;());
` ` _advance-bwd_` ﻿&lt;N - 1&gt;(prev_size, steps - offset);
}.

### Parâmetros

- **offset** — o deslocamento da posição atual (global) a partir do início do range para o qual `_[it_](<#/doc/ranges/concat_view/iterator>)_` atualmente se refere
- **steps** — o número de passos para avançar para trás