# std::indirect_binary_predicate

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class F, class I1, class I2 >
concept indirect_binary_predicate =
std::indirectly_readable<I1> &&
std::indirectly_readable<I2> &&
std::copy_constructible<F> &&
std::predicate<F&, /*indirect-value-t*/<I1>, /*indirect-value-t*/<I2>> &&
std::predicate<F&, /*indirect-value-t*/<I1>, std::iter_reference_t<I2>> &&
std::predicate<F&, std::iter_reference_t<I1>, /*indirect-value-t*/<I2>> &&
std::predicate<F&, std::iter_reference_t<I1>, std::iter_reference_t<I2>>;
```

O concept `indirect_binary_predicate` especifica requisitos para algoritmos que chamam predicados binários como seus argumentos. A principal diferença entre este concept e [std::predicate](<#/doc/concepts/predicate>) é que ele é aplicado aos tipos que `I1` e `I2` referenciam, em vez de `I1` e `I2` propriamente ditos.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2609R3](<https://wg21.link/P2609R3>) | C++20 | alguns requisitos foram definidos em termos de [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;& o que lidava incorretamente com projeções, resultando em incompatibilidade com o predicado F& | definido em termos de /*indirect-value-t*/&lt;I&gt; para lidar corretamente com tais projeções
[P2997R1](<https://wg21.link/P2997R1>) | C++20 | `indirect_binary_predicate` exigia que F& satisfizesse [`predicate`](<#/doc/concepts/predicate>) com [std::iter_common_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt; | não exige