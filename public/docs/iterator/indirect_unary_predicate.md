# std::indirect_unary_predicate

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class F, class I >
concept indirect_unary_predicate =
std::indirectly_readable<I> &&
std::copy_constructible<F> &&
std::predicate<F&, /*indirect-value-t*/<I>> &&
std::predicate<F&, std::iter_reference_t<I>>;
```

O concept `indirect_unary_predicate` especifica requisitos para algoritmos que chamam predicados unários como seus argumentos. A principal diferença entre este concept e [std::predicate](<#/doc/concepts/predicate>) é que ele é aplicado ao tipo que `I` referencia, em vez de `I` em si.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2609R3](<https://wg21.link/P2609R3>) | C++20 | um dos requisitos foi definido em termos de [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;& o que lidava mal com projeções, resultando em incompatibilidade com o predicado F& | definido em termos de /*indirect-value-t*/&lt;I&gt; para lidar corretamente com tais projeções
[P2997R1](<https://wg21.link/P2997R1>) | C++20 | `indirect_unary_predicate` exigia que F& satisfizesse [`predicate`](<#/doc/concepts/predicate>) com [std::iter_common_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt; | não exige