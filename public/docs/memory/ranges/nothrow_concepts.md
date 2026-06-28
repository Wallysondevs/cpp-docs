# no-throw-input-iterator, no-throw-forward-iterator, no-throw-sentinel-for, no-throw-input-range, no-throw-forward-range

template< class I >  
concept no-throw-input-iterator =  
[std::input_iterator](<#/doc/iterator/input_iterator>)&lt;I&gt; &&  
[std::is_lvalue_reference_v](<#/doc/types/is_lvalue_reference>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;> &&  
[std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>, [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;>; |  (1)  |  (exposition only*)  
template< class I >  
concept no-throw-forward-iterator =  
no-throw-input-iterator&lt;I&gt; &&  
[std::forward_iterator](<#/doc/iterator/forward_iterator>)&lt;I&gt; &&  
no-throw-sentinel-for<I, I>; |  (2)  |  (exposition only*)  
template< class S, class I >  
concept no-throw-sentinel-for = [std::sentinel_for](<#/doc/iterator/sentinel_for>)<S, I>; |  (3)  |  (exposition only*)  
template< class R >  
concept no-throw-input-range =  
[ranges::range](<#/doc/ranges/range>)&lt;R&gt; &&  
no-throw-input-iterator<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;R&gt;> &&  
no-throw-sentinel-for<[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;R&gt;, [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;R&gt;>; |  (4)  |  (exposition only*)  
template< class R >  
concept no-throw-forward-range =  
no-throw-input-range&lt;R&gt; &&  
no-throw-forward-iterator<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;R&gt;>; |  (5)  |  (exposition only*)  

  
Esses concepts apenas para exposição especificam que nenhuma exceção é lançada a partir de operações exigidas por algoritmos em iterators, sentinels e ranges.

1) O concept `_no-throw-input-iterator_` exige que a desreferenciação do iterator produza um lvalue, como [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) e [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Requisitos semânticos

Como todos os concepts padrão, cada concept listado aqui é modelado apenas se todos os concepts que ele subsume forem modelados.

1) Um tipo `I` modela `_no-throw-input-iterator_` apenas se nenhuma exceção for lançada a partir de incremento, construção por cópia, construção por movimento, atribuição por cópia, atribuição por movimento, ou indireção através de iterators válidos.

3) Os tipos `S` e `I` modelam `_no-throw-sentinel-for_` apenas se nenhuma exceção for lançada a partir de construção por cópia, construção por movimento, atribuição por cópia, atribuição por movimento, ou comparações entre valores válidos dos tipos `I` e `S`.

4) Um tipo `R` modela `_no-throw-input-range_` apenas se nenhuma exceção for lançada a partir de chamadas para [ranges::begin](<#/doc/ranges/begin>) e [ranges::end](<#/doc/ranges/end>) em um objeto do tipo `R`.

### Notas

Esses concepts permitem que algumas operações em iterators e sentinels lancem exceções, por exemplo, operações em valores inválidos.

### Veja também

[ input_iterator](<#/doc/iterator/input_iterator>)(C++20) | especifica que um tipo é um input iterator, ou seja, seus valores referenciados podem ser lidos e ele pode ser pré- e pós-incrementado   
(concept)  
[ forward_iterator](<#/doc/iterator/forward_iterator>)(C++20) | especifica que um [`input_iterator`](<#/doc/iterator/input_iterator>) é um forward iterator, suportando comparação de igualdade e múltiplas passagens   
(concept)  
[ sentinel_for](<#/doc/iterator/sentinel_for>)(C++20) | especifica que um tipo é um sentinel para um tipo [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>)   
(concept)  
[ ranges::input_range](<#/doc/ranges/input_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`input_iterator`](<#/doc/iterator/input_iterator>)   
(concept)  
[ ranges::forward_range](<#/doc/ranges/forward_range>)(C++20) | especifica um range cujo tipo de iterator satisfaz [`forward_iterator`](<#/doc/iterator/forward_iterator>)   
(concept)