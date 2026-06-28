# std::numeric_limits&lt;T&gt;::has_denorm

```cpp
static const std::float_denorm_style has_denorm;  // (até C++11)
static constexpr std::float_denorm_style has_denorm;  // (desde C++11)
(obsoleto desde C++23)
```

O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_denorm identifica os tipos de ponto flutuante que suportam [valores subnormais](<https://en.wikipedia.org/wiki/Denormal_number> "enwiki:Denormal number").

### Especializações padrão

`T` | valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::has_denorm
---|---
/* não especializado */ | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
bool | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
char | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
signed char | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
unsigned char | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
wchar_t | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
char8_t (desde C++20) | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
char16_t (desde C++11) | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
char32_t (desde C++11) | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
short | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
unsigned short | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
int | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
unsigned int | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
long | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
unsigned long | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
long long (desde C++11) | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
unsigned long long (desde C++11) | [std::denorm_absent](<#/doc/types/numeric_limits/float_denorm_style>)
float | geralmente [std::denorm_present](<#/doc/types/numeric_limits/float_denorm_style>)
double | geralmente [std::denorm_present](<#/doc/types/numeric_limits/float_denorm_style>)
long double | geralmente [std::denorm_present](<#/doc/types/numeric_limits/float_denorm_style>)

### Veja também

[ denorm_min](<#/doc/types/numeric_limits/denorm_min>)[static] | retorna o menor valor subnormal positivo do tipo de ponto flutuante fornecido
(função membro estática pública)
[ float_denorm_style](<#/doc/types/numeric_limits/float_denorm_style>) | indica os modos de desnormalização de ponto flutuante
(enum)