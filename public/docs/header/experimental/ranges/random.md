# Cabeçalho da biblioteca experimental &lt;experimental/ranges/random&gt;

Este cabeçalho faz parte da biblioteca [ranges](<#/doc/experimental/ranges>).

### Conceito de gerador de números aleatórios

Definido no namespace `std::experimental::ranges`
---
[ UniformRandomNumberGenerator](<#/doc/experimental/ranges/concepts/UniformRandomNumberGenerator>) | especifica que um tipo se qualifica como um gerador de números aleatórios uniformes
(concept)

### Sinopse
```cpp
    namespace std { namespace experimental { namespace ranges { inline namespace v1 {
    
    template <class G>
    concept bool UniformRandomNumberGenerator = /* see definition */;
    
    }}}}
```