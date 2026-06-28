# std::piecewise_linear_distribution&lt;RealType&gt;::piecewise_linear_distribution

```cpp
piecewise_linear_distribution();  // (1) (desde C++11)
template< class InputIt1, class InputIt2 >
piecewise_linear_distribution( InputIt1 first_i, InputIt1 last_i,
InputIt2 first_w );  // (2) (desde C++11)
template< class UnaryOperation >
piecewise_linear_distribution( std::initializer_list<RealType> ilist,
UnaryOperation fw );  // (3) (desde C++11)
template< class UnaryOperation >
piecewise_linear_distribution( std::size_t nw,
RealType xmin, RealType xmax,
UnaryOperation fw );  // (4) (desde C++11)
explicit piecewise_linear_distribution( const param_type& parm );  // (5) (desde C++11)
```

  
Constrói um novo objeto de distribuição linear por partes.

1) Constrói um objeto de distribuição com _n_ = 1, _ρ0_ = 1, _b0_ = 0 e _b1_ = 1.

2) Constrói um objeto de distribuição a partir de iterators sobre a sequência de intervalos `[`first_i`, `last_i`)` e uma sequência de pesos correspondente começando em first_w.

3) Constrói um objeto de distribuição onde os intervalos são obtidos da initializer list ilist e os pesos são gerados pela função fw.

4) Constrói um objeto de distribuição com os intervalos fw distribuídos uniformemente sobre [xmin, xmax].

5) Constrói um objeto de distribuição inicializado com os parâmetros param.

### Parâmetros

first_i  |  \-  |  iterator inicializado para o início da sequência de intervalos   
---|---|---
last_i  |  \-  |  iterator inicializado para um-depois-do-fim da sequência de intervalos   
first_w  |  \-  |  iterator inicializado para o início da sequência de densidade (peso)   
ilist  |  \-  |  initializer_list que produz a sequência de intervalos   
fw  |  \-  |  função double(double) que produz as densidades   
nw  |  \-  |  o número de densidades   
xmin  |  \-  |  o limite inferior da sequência de intervalos   
xmax  |  \-  |  o limite superior da sequência de intervalos   
parm  |  \-  |  o conjunto de parâmetros da distribuição 