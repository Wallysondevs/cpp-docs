# std::numeric_limits&lt;T&gt;::digits

```cpp
static const int digits;  // (até C++11)
static constexpr int digits;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits é o número de dígitos na base-[radix](<#/doc/types/numeric_limits/radix>) que podem ser representados pelo tipo `T` sem alteração. Para tipos inteiros, este é o número de bits sem contar o bit de sinal e os bits de preenchimento (se houver). Para tipos de ponto flutuante, este é o número de dígitos da mantissa (para implementações [IEC 559/IEEE 754](<#/doc/types/numeric_limits/is_iec559>), este é o número de dígitos armazenados para a mantissa mais um, porque a mantissa tem um 1 inicial implícito e ponto binário). 

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits  
(assumindo que não há [padding bits](<#/doc/language/objects>))   
/* non-specialized */ |  ​0​  
---|---
bool |  1  
char |  [CHAR_BIT](<#/doc/types/climits>) - [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;char&gt;::is_signed  
signed char |  [CHAR_BIT](<#/doc/types/climits>) - 1  
unsigned char |  [CHAR_BIT](<#/doc/types/climits>)  
wchar_t |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(wchar_t)  
- [std::numeric_limits](<#/doc/types/numeric_limits>)<wchar_t>::is_signed  
char8_t (desde C++20) |  [CHAR_BIT](<#/doc/types/climits>)  
---|---
char16_t (desde C++11) |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(char16_t)  
char32_t (desde C++11) |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(char32_t)  
short |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(short) - 1  
unsigned short |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(short)  
int |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(int) - 1  
unsigned int |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(int)  
long |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(long) - 1  
unsigned long |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(long)  
long long (desde C++11) |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(long long) - 1  
unsigned long long (desde C++11) |  [CHAR_BIT](<#/doc/types/climits>) * sizeof(long long)  
float |  [FLT_MANT_DIG](<#/doc/types/climits>)  
double |  [DBL_MANT_DIG](<#/doc/types/climits>)  
long double |  [LDBL_MANT_DIG](<#/doc/types/climits>)  
  
### Veja também

[ radix](<#/doc/types/numeric_limits/radix>)[static] |  a radix ou base inteira usada pela representação do tipo fornecido   
(membro constante estático público)  
[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] |  um a mais que a menor potência negativa da radix que é um valor de ponto flutuante normalizado válido   
(membro constante estático público)  
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] |  um a mais que a maior potência inteira da radix que é um valor de ponto flutuante finito válido   
(membro constante estático público)