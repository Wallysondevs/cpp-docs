# std::complex&lt;T&gt;::real

```cpp
template primário std::complex<T>
  // (1)
T real() const; |  | (ate C++14)
constexpr T real() const;  // (desde C++14)
  // (2)
void real( T value ); |  | (ate C++20)
constexpr void real( T value );  // (desde C++20)
specialization std::complex<float>
  // (1)
float real() const; |  | (ate C++11)
constexpr float real() const;  // (desde C++11)
  // (2)
void real( float value ); |  | (ate C++20)
constexpr void real( float value );  // (desde C++20)
specialization std::complex<double>
  // (1)
double real() const; |  | (ate C++11)
constexpr double real() const;  // (desde C++11)
  // (2)
void real( double value ); |  | (ate C++20)
constexpr void real( double value );  // (desde C++20)
specialization std::complex<long double>
  // (1)
long double real() const; |  | (ate C++11)
constexpr long double real() const;  // (desde C++11)
  // (2)
void real( long double value ); |  | (ate C++20)
constexpr void real( long double value );  // (desde C++20)
```

  
Acessa a parte real do número complexo. 

1) Retorna a parte real.

2) Define a parte real para value.

### Parâmetros

value  |  \-  |  o valor para definir a parte real   
  
### Valor de retorno

1) A parte real de *this.

2) (nenhum)

### Observações

Em C++11, a sobrecarga (1) nas especializações de [std::complex](<#/doc/numeric/complex>) costumava ser especificada sem o qualificador const. No entanto, em C++11, um especificador [`constexpr`](<#/doc/language/constexpr>) usado em uma função membro não estática implica const, e, portanto, o comportamento é como se const fosse especificado. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 387](<https://cplusplus.github.io/LWG/issue387>) | C++98  | a parte real não podia ser definida diretamente  | pode ser definida diretamente via uma nova sobrecarga de `real`   
  
### Veja também

[ real](<#/doc/numeric/complex/real2>) |  retorna a parte real   
(modelo de função)  
[ imag](<#/doc/numeric/complex/imag>) |  acessa a parte imaginária do número complexo   
(função membro pública)