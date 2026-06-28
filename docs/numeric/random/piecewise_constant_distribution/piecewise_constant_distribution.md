# std::piecewise_constant_distribution&lt;RealType&gt;::piecewise_constant_distribution

```cpp
piecewise_constant_distribution();  // (1) (desde C++11)
template< class InputIt1, class InputIt2 >
piecewise_constant_distribution( InputIt1 first_i, InputIt1 last_i,
InputIt2 first_w );  // (2) (desde C++11)
template< class UnaryOperation >
piecewise_constant_distribution( std::initializer_list<RealType> ilist_i,
UnaryOperation fw );  // (3) (desde C++11)
template< class UnaryOperation >
piecewise_constant_distribution( std::size_t nw,
RealType xmin, RealType xmax,
UnaryOperation fw );  // (4) (desde C++11)
explicit piecewise_constant_distribution( const param_type& param );  // (5) (desde C++11)
```

  
Constrói um novo objeto de distribuição constante por partes.

1) Constrói um objeto de distribuição com n = 1, ρ0 = 1, b0 = 0, e b1 = 1.

2) Constrói um objeto de distribuição a partir de iterators sobre a sequência de intervalos `[`first_i`, `last_i`)` e uma sequência de pesos correspondente começando em first_w.

3) Constrói um objeto de distribuição onde os intervalos são obtidos da initializer list ilist_i e os pesos são gerados pela função fw.

4) Constrói um objeto de distribuição com os nw intervalos distribuídos uniformemente sobre [xmin, xmax] e os pesos gerados pela função fw.

5) Constrói um objeto de distribuição inicializado com os parâmetros param.

### Parâmetros

first_i  |  \-  |  iterator inicializado para o início da sequência de intervalos   
---|---|---
last_i  |  \-  |  iterator inicializado para um-depois-do-fim da sequência de intervalos   
first_w  |  \-  |  iterator inicializado para o início da sequência de densidade (peso)   
ilist_i  |  \-  |  initializer_list que fornece a sequência de intervalos   
fw  |  \-  |  função double(double) que fornece as densidades   
nw  |  \-  |  o número de densidades   
xmin  |  \-  |  o limite inferior da sequência de intervalos   
xmax  |  \-  |  o limite superior da sequência de intervalos   
param  |  \-  |  o conjunto de parâmetros da distribuição 