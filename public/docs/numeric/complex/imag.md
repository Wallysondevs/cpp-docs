# std::complex&lt;T&gt;::imag

```cpp
template primário std::complex<T>
  // (1)
T imag() const;  // (até C++14)
constexpr T imag() const;  // (desde C++14)
  // (2)
void imag( T value );  // (até C++20)
constexpr void imag( T value );  // (desde C++20)
especialização std::complex<float>
  // (1)
float imag() const;  // (até C++11)
constexpr float imag() const;  // (desde C++11)
  // (2)
void imag( float value );  // (até C++20)
constexpr void imag( float value );  // (desde C++20)
especialização std::complex<double>
  // (1)
double imag() const;  // (até C++11)
constexpr double imag() const;  // (desde C++11)
  // (2)
void imag( double value );  // (até C++20)
constexpr void imag( double value );  // (desde C++20)
especialização std::complex<long double>
  // (1)
long double imag() const;  // (até C++11)
constexpr long double imag() const;  // (desde C++11)
  // (2)
void imag( long double value );  // (até C++20)
constexpr void imag( long double value );  // (desde C++20)
```

  
Acessa a parte imaginária do número complexo. 

1) Retorna a parte imaginária.

2) Define a parte imaginária para value.

### Parâmetros

value  |  \-  |  o valor para definir a parte imaginária   
  
### Valor de retorno

1) A parte imaginária de *this.

2) (nenhum)

### Observações

Em C++11, a sobrecarga (1) nas especializações de [std::complex](<#/doc/numeric/complex>) costumava ser especificada sem o qualificador const. No entanto, em C++11, um especificador [`constexpr`](<#/doc/language/constexpr>) usado em uma função membro não estática implica const, e, portanto, o comportamento é como se const fosse especificado. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 387](<https://cplusplus.github.io/LWG/issue387>) | C++98  | a parte imaginária não podia ser definida diretamente  | pode ser definida diretamente via uma nova sobrecarga de `imag`   
  
### Ver também

[ imag](<#/doc/numeric/complex/imag2>) |  retorna a parte imaginária   
(modelo de função)  
[ real](<#/doc/numeric/complex/real>) |  acessa a parte real do número complexo   
(função membro pública)