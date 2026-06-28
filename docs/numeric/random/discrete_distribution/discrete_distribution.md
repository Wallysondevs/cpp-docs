# std::discrete_distribution&lt;IntType&gt;::discrete_distribution

```cpp
discrete_distribution();  // (1) (desde C++11)
template< class InputIt >
discrete_distribution( InputIt first, InputIt last );  // (2) (desde C++11)
discrete_distribution( std::initializer_list<double> weights );  // (3) (desde C++11)
template< class UnaryOperation >
discrete_distribution( std::size_t count, double xmin, double xmax,
UnaryOperation unary_op );  // (4) (desde C++11)
explicit discrete_distribution( const param_type& params );  // (5) (desde C++11)
```

Constrói um novo objeto de distribuição.

1) Construtor padrão. Constrói a distribuição com um único peso p = {1}. Esta distribuição sempre gerará 0.

2) Constrói a distribuição com pesos no range `[`first`, `last`)`. Se first == last, os efeitos são os mesmos do construtor padrão.

3) Constrói a distribuição com pesos em weights. Efetivamente chama discrete_distribution(weights.begin(), weights.end()).

4) Constrói a distribuição com count pesos que são gerados usando a função unary_op. Cada um dos pesos é igual a wi = unary_op(xmin + δ(i + 0.5)), onde δ = (xmax − xmin)
---
count
e i ∈ {0, ..., count − 1}. xmin e xmax devem ser tais que δ > 0. Se count == 0, os efeitos são os mesmos do construtor padrão.

5) Constrói a distribuição com params como os parâmetros da distribuição.

### Parâmetros

- **first, last** — o range de elementos que definem os números a serem usados como pesos. O tipo dos elementos referenciados por `InputIterator` deve ser conversível para double
- **weights** — initializer list contendo os pesos
- **unary_op** — objeto de função de operação unária que será aplicado. A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type &a); A assinatura não precisa ter const &. O tipo Type deve ser tal que um objeto do tipo double possa ser desreferenciado e então implicitamente convertido para Type. O tipo Ret deve ser tal que um objeto do tipo double possa ser desreferenciado e receba um valor do tipo Ret. ​
- **params** — o conjunto de parâmetros da distribuição

### Requisitos de tipo

-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).