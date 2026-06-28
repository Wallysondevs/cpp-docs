# std::numeric_limits&lt;T&gt;::has_denorm_loss

```cpp
static const bool has_denorm_loss;  // (até C++11)
static constexpr bool has_denorm_loss;  // (desde C++11)
(obsoleto desde C++23)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_denorm_loss é verdadeiro para todos os tipos de ponto flutuante `T` que detectam perda de precisão ao criar um número subnormal como perda por desnormalização, em vez de como resultado inexato (veja abaixo).

### Especializações Padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_denorm_loss  
---|---
/* não especializado */ |  false  
bool |  false  
char |  false  
signed char |  false  
unsigned char |  false  
wchar_t |  false  
char8_t (desde C++20) |  false  
char16_t (desde C++11) |  false  
char32_t (desde C++11) |  false  
short |  false  
unsigned short |  false  
int |  false  
unsigned int |  false  
long |  false  
unsigned long |  false  
long long (desde C++11) |  false  
unsigned long long (desde C++11) |  false  
float |  definido pela implementação   
double |  definido pela implementação   
long double |  definido pela implementação   
  
### Notas

Implementações de ponto flutuante IEEE 754 compatíveis com o padrão para números subnormais são obrigadas a detectar a perda de precisão associada à criação de tal número, se ocorrer, e podem fazê-lo de uma das duas maneiras distintas:

  1. Perda por desnormalização: o resultado entregue difere do que teria sido calculado se o intervalo do expoente fosse ilimitado.
  2. Resultado inexato: o resultado entregue difere do que teria sido calculado se tanto o intervalo do expoente quanto a precisão fossem ilimitados.

Nenhuma implementação do mecanismo de perda por desnormalização existe (a perda de precisão é detectada após o arredondamento, como resultado inexato), e esta opção foi removida na revisão de 2008 do IEEE Std 754.

libstdc++, libc++, libCstd e stlport4 definem esta constante como false para todos os tipos de ponto flutuante. O Microsoft Visual Studio a define como true para todos os tipos de ponto flutuante.

Assim como em quaisquer cálculos de ponto flutuante, a perda de precisão pode levantar [FE_INEXACT](<#/doc/numeric/fenv/FE_exceptions>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ tinyness_before](<#/doc/types/numeric_limits/tinyness_before>)[static] |  identifica tipos de ponto flutuante que detectam "tinyness" antes do arredondamento   
(membro constante estático público)  
[ has_denorm](<#/doc/types/numeric_limits/has_denorm>)[static] |  identifica o estilo de desnormalização usado pelo tipo de ponto flutuante   
(membro constante estático público)