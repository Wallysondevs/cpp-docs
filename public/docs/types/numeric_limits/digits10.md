# std::numeric_limits&lt;T&gt;::digits10

```cpp
static const int digits10;  // (até C++11)
static constexpr int digits10;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits10 é o número de dígitos de base 10 que podem ser representados pelo tipo `T` sem alteração, ou seja, qualquer número com essa quantidade de dígitos decimais significativos pode ser convertido para um valor do tipo `T` e de volta para a forma decimal, sem alteração devido a arredondamento ou estouro. Para tipos de base-[radix](<#/doc/types/numeric_limits/radix>), é o valor de [`digits()`](<#/doc/types/numeric_limits/digits>) (digits - 1 para tipos de ponto flutuante) multiplicado por \\(\small \log_{10}{radix}\\)log10(radix) e arredondado para baixo. 

### Especializações Padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits10  
---|---
/* não especializado */ |  ​0​  
bool |  ​0​  
char |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;char&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
signed char |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;signed char&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
unsigned char |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned char&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
wchar_t |  [std::numeric_limits](<#/doc/types/numeric_limits>)<wchar_t>::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
char8_t (desde C++20) |  [std::numeric_limits](<#/doc/types/numeric_limits>)<char8_t>::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
char16_t (desde C++11) |  [std::numeric_limits](<#/doc/types/numeric_limits>)<char16_t>::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
char32_t (desde C++11) |  [std::numeric_limits](<#/doc/types/numeric_limits>)<char32_t>::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
short |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;short&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
unsigned short |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned short&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
int |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
unsigned int |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned int&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
long |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;long&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
unsigned long |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned long&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
long long (desde C++11) |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;long long&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
unsigned long long (desde C++11) |  [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;unsigned long long&gt;::digits * [std::log10](<#/doc/numeric/math/log10>)(2)  
float |  [FLT_DIG](<#/doc/types/climits>) (6 para float IEEE)   
double |  [DBL_DIG](<#/doc/types/climits>) (15 para double IEEE)   
long double |  [LDBL_DIG](<#/doc/types/climits>) (18 para long double Intel de 80 bits; 33 para quadruple IEEE)   
  
### Exemplo

Um tipo binário de 8 bits pode representar qualquer número decimal de dois dígitos exatamente, mas números decimais de 3 dígitos de 256..999 não podem ser representados. O valor de `digits10` para um tipo de 8 bits é 2 (8 * [std::log10](<#/doc/numeric/math/log10>)(2) é 2.41) 

O tipo de ponto flutuante IEEE 754 padrão de 32 bits possui uma parte fracionária de 24 bits (23 bits escritos, um implícito), o que pode sugerir que ele pode representar decimais de 7 dígitos (24 * [std::log10](<#/doc/numeric/math/log10>)(2) é 7.22), mas os erros de arredondamento relativos não são uniformes e alguns valores de ponto flutuante com 7 dígitos decimais não sobrevivem à conversão para float de 32 bits e de volta: o menor exemplo positivo é 8.589973e9, que se torna 8.589974e9 após a ida e volta. Esses erros de arredondamento não podem exceder um bit na representação, e `digits10` é calculado como (24 - 1) * [std::log10](<#/doc/numeric/math/log10>)(2), que é 6.92. O arredondamento para baixo resulta no valor 6. 

Da mesma forma, a string de 16 dígitos 9007199254740993 não sobrevive à conversão de ida e volta texto->double->texto, tornando-se 9007199254740992: o tipo double IEEE 754 de 64 bits garante essa conversão de ida e volta apenas para 15 dígitos decimais. 

### Veja também

[ max_digits10](<#/doc/types/numeric_limits/max_digits10>)[static] (C++11) |  número de dígitos decimais necessários para diferenciar todos os valores deste tipo   
(membro constante estático público)  
[ radix](<#/doc/types/numeric_limits/radix>)[static] |  a base ou base inteira usada pela representação do tipo fornecido   
(membro constante estático público)  
[ digits](<#/doc/types/numeric_limits/digits>)[static] |  número de dígitos `radix` que podem ser representados sem alteração   
(membro constante estático público)  
[ min_exponent](<#/doc/types/numeric_limits/min_exponent>)[static] |  um a mais que a menor potência negativa da base que é um valor de ponto flutuante normalizado válido   
(membro constante estático público)  
[ max_exponent](<#/doc/types/numeric_limits/max_exponent>)[static] |  um a mais que a maior potência inteira da base que é um valor de ponto flutuante finito válido   
(membro constante estático público)