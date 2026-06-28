# std::projected_value_t

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< std::indirectly_readable I,
std::indirectly_regular_unary_invocable<I> Proj >
using projected_value_t =
std::remove_cvref_t<std::invoke_result_t<Proj&, std::iter_value_t<I>&>>;
```

O alias template `projected_value_t` obtém o tipo de valor removendo qualquer referência e seus qualificadores cv de nível superior do tipo de resultado da aplicação de `Proj` a [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;&.

`projected_value_t` é usado para determinar o tipo de valor padrão em alguns algoritmos, como [ranges::contains](<#/doc/algorithm/ranges/contains>).

### Parâmetros de template

- **I** — um tipo indiretamente legível
- **Proj** — projeção aplicada a uma referência lvalue ao tipo de valor de `I`

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | tipo de template padrão para valores de algoritmo usando `std::projected_value_t`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ indirect_result_t](<#/doc/iterator/indirect_result_t>)(C++20) | calcula o resultado de invocar um objeto invocável no resultado da desreferenciação de um conjunto de tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>)
(alias template)
[ projected](<#/doc/iterator/projected>)(C++20) | template auxiliar para especificar as restrições em algoritmos que aceitam projeções
(class template)